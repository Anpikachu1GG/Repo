@echo off
chcp 65001 >nul
setlocal

:: Đường dẫn tới thư mục chứa script
cd /d "E:\Download\Phone Link"

:: Chạy Node.js script
echo 📥 Đang chạy script Pixiv...
node pixiv_bookmark_exporter.js

:: Kiểm tra file json có tồn tại không
IF NOT EXIST pixiv_bookmarks.json (
    echo ❌ Không tìm thấy file pixiv_bookmarks.json
    pause
    exit /b
)

:: Đẩy lên GitHub
echo 📤 Đang commit và push file...
git add pixiv_bookmarks.json
git commit -m "📚 Auto update Pixiv bookmark %date% %time%"
git push origin main

echo ✅ Hoàn tất.
pause
