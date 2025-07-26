const fs = require('fs');
const puppeteer = require('puppeteer');

const fallbackLinks = [
    "https://i.postimg.cc/wv4CqMmZ/00000-2761499418.png",
    "https://i.postimg.cc/wxPCntHs/00000-282338748.png",
    "https://i.postimg.cc/wv4CqMmZ/00000-2761499418.png",
    "https://i.postimg.cc/wxPCntHs/00000-282338748.png",
    "https://i.postimg.cc/8zgqPq7p/00000-3877599237.png",
    "https://i.postimg.cc/130bgJFp/00001-1561239748.png",
    "https://i.postimg.cc/MKQCwWK3/00001-2266340377.png",
    "https://i.postimg.cc/HLpRbX0F/00001-3740847295.png",
    "https://i.postimg.cc/W4XK8zXz/00002-1064898866.png",
    "https://i.postimg.cc/k4GHpCpc/00002-3320349376.png",
    "https://i.postimg.cc/XJPPMhM0/00002-773132038.png",
    "https://i.postimg.cc/D0bM7gF4/00003-11314228.png",
    "https://i.postimg.cc/3W5bNvJS/00003-3136955011.png",
    "https://i.postimg.cc/T2Ldyv3g/00003-3757708701.png",
    "https://i.postimg.cc/VsxYnZJT/00004-2632071809.png",
    "https://i.postimg.cc/GhvbQPYp/00004-3916057692.png",
    "https://i.postimg.cc/GmrdSBJx/00005-1565057563.png",
    "https://i.postimg.cc/mgwBxbmf/00005-2253981139.png",
    "https://i.postimg.cc/W4YV35R5/00006-2037772415.png",
    "https://i.postimg.cc/MTcSj1qq/00006-3664385297.png",
    "https://i.postimg.cc/W3QPmt1r/00007-606745623.png",
    "https://i.postimg.cc/Fz3XTmY6/00008-1626480615.png",
    "https://i.postimg.cc/yYCHkJ5C/00008-3939201963.png",
    "https://i.postimg.cc/YCpBz5MX/00008-4051480980.png",
    "https://i.postimg.cc/Gpt0ZvBG/00008-994499638.png",
    "https://i.postimg.cc/mrnxRhMq/00009-1900354196.png",
    "https://i.postimg.cc/k4R059v5/00009-3644640220.png",
    "https://i.postimg.cc/HnGfcK69/00010-871570101.png",
    "https://i.postimg.cc/Rhc2cR85/00010-933241079.png",
    "https://i.postimg.cc/ryx6XVpn/00011-1568147798.png",
    "https://i.postimg.cc/X7bRnRGV/00011-1812903525.png",
    "https://i.postimg.cc/qMx9q1y2/00011-3210608016.png",
    "https://i.postimg.cc/Z5f2F0fR/00014-2158409053.png",
    "https://i.postimg.cc/8Cj3yD3b/00014-2576923363.png",
    "https://i.postimg.cc/bJn5hgqD/00014-3548986958.png",
    "https://i.postimg.cc/TPFsFFvv/00015-2253363158.png",
    "https://i.postimg.cc/MH8FKBGs/00016-802862894.png",
    "https://i.postimg.cc/J0cdyhDR/00018-3519152143.png",
    "https://i.postimg.cc/WpMyY59x/00023-3153356973.png",
    "https://i.postimg.cc/sDsNk5qx/00026-2491825585.png",
    "https://i.postimg.cc/QxmyhHZb/00026-2883928523.png",
    "https://i.postimg.cc/HkLPxdpC/IMG-4111.jpg",
    "https://i.postimg.cc/0yHXKFQK/IMG-4112.jpg",
    "https://i.postimg.cc/tgZS3kZS/IMG-4115.jpg",
    "https://i.postimg.cc/MT194GY1/IMG-4129.jpg",
    "https://i.postimg.cc/TPzkCbnR/IMG-4130.jpg",
    "https://i.postimg.cc/4yZWTT8q/IMG-4181.jpg",
    "https://i.postimg.cc/SRrDSt3s/IMG-4182.jpg",
    "https://i.postimg.cc/1RcWrfXQ/IMG-4188.jpg",
    "https://i.postimg.cc/SNSgTkYz/IMG-4189.jpg",
    "https://i.postimg.cc/vH03Ck52/IMG-4190.jpg",
    "https://i.postimg.cc/W1tXV8nN/IMG-4191.jpg",
    "https://i.postimg.cc/rwbgw4nS/IMG-4232.jpg",
    "https://i.postimg.cc/d0y6k0pg/IMG-4233.jpg",
    "https://i.postimg.cc/Pxn4mjkJ/IMG-4246.jpg",
    "https://i.postimg.cc/cCsBbBCN/IMG-4247.jpg",
    "https://i.postimg.cc/vB7vhNQz/IMG-4251.jpg",
    "https://i.postimg.cc/hvp1WQQQ/IMG-4252.jpg",
    "https://i.postimg.cc/bYTT2WVY/IMG-4285.jpg",
    "https://i.postimg.cc/wTjk52nX/IMG-4286.jpg",
    "https://i.postimg.cc/RVpLgfzj/IMG-4288.jpg",
    "https://i.postimg.cc/pL9Y4TWy/IMG-4301.jpg",
    "https://i.postimg.cc/sgt9rrxm/IMG-4370.jpg",
    "https://i.postimg.cc/bvk0YB2h/IMG-4380.jpg",
    "https://i.postimg.cc/XJWfrkwy/IMG-4381.jpg",
    "https://i.postimg.cc/qRG8y6LD/IMG-4383.jpg",
    "https://i.postimg.cc/gjk3Dctz/IMG-4394.jpg",
    "https://i.postimg.cc/BbYHwWRx/IMG-4395.jpg",
    "https://i.postimg.cc/NGp60TL5/IMG-4406.jpg",
    "https://i.postimg.cc/CL5jn1fJ/IMG-4494.jpg",
    "https://i.postimg.cc/K8gBQHfM/IMG-4495.jpg",
    "https://i.postimg.cc/Zq83zv1Y/IMG-4496.jpg",
    "https://i.postimg.cc/s2dSL4H0/IMG-4497.jpg",
    "https://i.postimg.cc/Qtj78x3Q/IMG-4498.jpg",
    "https://i.postimg.cc/vBXVcFYp/IMG-4499.jpg",
    "https://i.postimg.cc/hvj7myhh/IMG-4500.jpg",
    "https://i.postimg.cc/1XjVrGNB/IMG-4501.jpg",
    "https://i.postimg.cc/7Psz4kQz/IMG-4502.jpg",
    "https://i.postimg.cc/CLRqLQWQ/IMG-4504.jpg",
    "https://i.postimg.cc/K8L3tgc7/IMG-4508.jpg",
    "https://i.postimg.cc/SNHzXG4N/IMG-4526.jpg",
    "https://i.postimg.cc/tgjZkC7K/IMG-4532.jpg",
    "https://i.postimg.cc/nLGsPbDC/IMG-4612.jpg",
    "https://i.postimg.cc/4d4KCL6w/IMG-4623.jpg",
    "https://i.postimg.cc/gjnnjxBZ/IMG-4668.jpg",
    "https://i.postimg.cc/5yTjCfZk/IMG-4771.jpg",
    "https://i.postimg.cc/V67Jzq4w/IMG-4772.jpg",
    "https://i.postimg.cc/2jK1JxVF/IMG-4774.jpg",
    "https://i.postimg.cc/15V8ZNFx/IMG-4775.jpg",
    "https://i.postimg.cc/2SpVj8d1/IMG-4776.jpg",
    "https://i.postimg.cc/W1MtdLSX/IMG-4778.jpg",
    "https://i.postimg.cc/bvprbCB8/IMG-4795.jpg",
    "https://i.postimg.cc/8C45bR2v/IMG-4796.jpg",
    "https://i.postimg.cc/rmYwB8FF/IMG-4806.jpg",
    "https://i.postimg.cc/d3kVvzLR/IMG-4807.jpg",
    "https://i.postimg.cc/j2pdjZ7p/IMG-4899.jpg",
    "https://i.postimg.cc/VspN4LVK/IMG-4903.jpg",
    "https://i.postimg.cc/9QjQ5gVT/IMG-4909.jpg",
    "https://i.postimg.cc/zXhGQYm8/IMG-4913.jpg",
    "https://i.postimg.cc/FHgs9bs6/IMG-4914.jpg",
    "https://i.postimg.cc/rpVyzdDw/IMG-4917.jpg",
    "https://i.postimg.cc/d1DqmzmM/IMG-4919.jpg",
    "https://i.postimg.cc/1zvmF9Fc/IMG-4924.jpg",
    "https://i.postimg.cc/D0XnRLMB/IMG-4929.jpg",
    "https://i.postimg.cc/ZRgJfVVW/IMG-4930.jpg",
    "https://i.postimg.cc/Z0z4m0kZ/IMG-4932.jpg",
    "https://i.postimg.cc/T2LbTS8H/IMG-4933.jpg",
    "https://i.postimg.cc/HWqyn2dW/IMG-4934.jpg",
    "https://i.postimg.cc/KvtgMM8P/IMG-4935.jpg",
    "https://i.postimg.cc/mgR1NgP0/IMG-4936.jpg",
    "https://i.postimg.cc/mgwzdWMh/IMG-4938.jpg",
    "https://i.postimg.cc/Zq592sFH/IMG-4940.jpg",
    "https://i.postimg.cc/HLvJg06g/IMG-4955.jpg",
    "https://i.postimg.cc/4dKYNK0h/IMG-4956.jpg",
    "https://i.postimg.cc/Y9Jh4rcD/IMG-4957.jpg",
    "https://i.postimg.cc/hvThTkcD/IMG-4958.jpg",
    "https://i.postimg.cc/y6ZDMZ9M/IMG-4959.jpg"
];

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
    const maxPages = 34;

    for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
        const url = `https://www.pixiv.net/novel/bookmark_new.php?p=${pageNum}`;
        console.log(`📄 Đang lấy trang ${pageNum}: ${url}`);
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

        await new Promise(resolve => setTimeout(resolve, 3000));

        const novels = await page.$$eval('li[class^="sc-"][class*="sc-bf8cea3f"]', (nodes, fallbackLinks) =>
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
                const cover = img && img.src && !img.src.includes("no_profile.png")
                    ? img.src
                    : fallbackLinks[Math.floor(Math.random() * fallbackLinks.length)];

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
            }).filter(Boolean), fallbackLinks
        );

        if (novels.length === 0) {
            console.log(`⚠️ Trang ${pageNum} không có truyện.`);
            break;
        }

        data.push(...novels);
    }

    const outPath = './pixiv_bookmarks.json';
    fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`✅ Xuất xong ${data.length} truyện từ ${maxPages} trang -> ${outPath}`);

    await browser.close();
})();
