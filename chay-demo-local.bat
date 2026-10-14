@echo off
chcp 65001 >nul
title LUVIA - Khoi Dong Demo Local Cho Khach Hang
echo ======================================================================
echo             🌿 LUVIA - NẾN THƠM TỪ DẦU ĂN TÁI CHẾ 🌿
echo       HỆ THỐNG TRÌNH DIỄN 2 PHONG CÁCH GIAO DIỆN CHO KHÁCH HÀNG
echo ======================================================================
echo.
echo [1/2] Đang mở Bản 1 (Eco Craft Mộc Mạc) tại:
echo       -> http://localhost:3000/?style=craft
start "" "http://localhost:3000/?style=craft"
echo.
timeout /t 2 /nobreak >nul
echo [2/2] Đang mở Bản 2 (3D Claymorphism Sống Động) tại:
echo       -> http://localhost:3000/?style=3d
start "" "http://localhost:3000/?style=3d"
echo.
echo ======================================================================
echo [MẸO DEMO NGÀY MAI]:
echo  - Bạn có thể đặt 2 cửa sổ cạnh nhau (Split Screen) để khách so sánh trực quan.
echo  - Khách muốn xem bản nào, chỉ cần bấm nút chuyển đổi ở góc trên Header
echo    hoặc thanh công cụ góc trái dưới màn hình.
echo  - Nếu muốn xem toàn bộ 6 màn hình 3D kèm Prompt Google Stitch:
echo    -> http://localhost:3000/demo-3d
echo ======================================================================
echo.
echo Server đang hoạt động tốt. Nhấn phím bất kỳ để đóng cửa sổ này.
pause >nul
