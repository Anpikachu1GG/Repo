const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1366, height: 768 },
        args: ['--lang=ja,en-US,en']
    });

    const page = await browser.newPage();

    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
    );

    const cookiesPath = './pixiv_cookies.json';
    if (!fs.existsSync(cookiesPath)) {
        console.error("❌ Chưa có file pixiv_cookies.json.");
        await browser.close();
        return;
    }

    let cookies = JSON.parse(fs.readFileSync(cookiesPath, 'utf-8'));
    cookies = cookies.map(cookie => {
        if (cookie.sameSite === null || cookie.sameSite === undefined) {
            delete cookie.sameSite;
        }
        return cookie;
    });

    await page.setCookie(...cookies);

    const data = [];
    const maxPages = 3;

    for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
        const url = `https://www.pixiv.net/novel/bookmark_new.php?p=${pageNum}`;
        console.log(`📄 Đang lấy trang ${pageNum}: ${url}`);
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

        // ❗ Thay vì page.waitForTimeout
        await new Promise(resolve => setTimeout(resolve, 3000));

        const novels = await page.$$eval('li[class^="sc-"][class*="sc-bf8cea3f"]', nodes =>
            nodes.map(novel => {
                const a = novel.querySelector('a[href^="/novel/show.php?id="]');
                if (!a) return null;

                const href = a.getAttribute('href');
                const idMatch = href.match(/id=(\d+)/);
                const id = idMatch ? idMatch[1] : null;
                if (!id) return null;

                const description = a.textContent.trim();
                const authorElem = novel.querySelector('a[href^="/en/users/"]');
                const author = authorElem ? authorElem.textContent.trim() : "Không rõ tác giả";

                const img = novel.querySelector('img[src*="novel-cover-master"]');
                const cover = img ? img.src : "https://s.pximg.net/common/images/no_profile.png";

                const descElem = novel.querySelector('div[title]');
                const title = descElem ? descElem.textContent.trim() : "";

                return {
                    id,
                    name: title,
                    link: `https://www.pixiv.net/novel/show.php?id=${id}`,
                    description: author + (description ? "｜" + description : ""),
                    cover,
                    host: "https://www.pixiv.net"
                };
            }).filter(Boolean)
        );

        if (novels.length === 0) {
            console.log(`⚠️ Trang ${pageNum} không có truyện.`);
            break;
        }

        data.push(...novels);
    }

    const outPath = './pixiv_bookmarks.json';
    fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`✅ Xuất xong ${data.length} truyện từ 3 trang -> ${outPath}`);

    await browser.close();
})();
