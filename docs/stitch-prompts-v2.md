# Prompt Google Stitch v2: 8 màn theo tài liệu "Nội dung Web"

Bản này thay 6 prompt cũ trong `Showcase3DGallery.tsx`. Bộ prompt giữ phong cách 3D claymorphism cũ. Nội dung chữ chép nguyên văn từ `src/content/vi.ts`, tức tài liệu khách.

**Cách dùng:** dán **Khối phong cách chung** trước, rồi dán prompt của từng màn. Nếu Stitch giới hạn độ dài, có thể chỉ dán prompt màn, vì mỗi prompt đã nhắc lại phong cách ở dòng đầu.

**Không đưa vào thiết kế:**
- Số sao, đánh giá hoặc lượt bán.
- Thời gian cháy.
- Số liệu tác động môi trường, IFRA, các câu "không khói" hay "an toàn".
- Linh vật "Bé Nến", chương trình đổi dầu, mã giảm giá, trang Đội ngũ, đặt hàng qua Zalo, thanh "free ship".
- Giá cố định. Giá chưa chốt, các ô chưa có số liệu ghi "Đang cập nhật".

---

## Khối phong cách chung

```
Visual style for all LUVIA screens: soft 3D claymorphism, warm cozy lighting, rounded pill shapes, gentle inner shadows, frosted glass cards. Brand palette: cream background #FBF4E1, light cream #FFFCF3, leaf green #548333 (primary buttons), dark green #3B6324, soft green #E6F0D8, flame amber #F2A93B (accents, candle glow), ink text #2E3A22. Four season accent colors: Xuân spring green #8DB560, Hạ summer amber #F2A93B, Thu autumn terracotta #C9773B, Đông winter slate blue #6B7FA6. Typography: friendly rounded sans-serif, Vietnamese text with full diacritics. Products are amber glass candle jars with warm glowing flames, kraft paper boxes. Brand: "LUVIA – nến thơm tái chế nâng cấp từ dầu ăn đã qua sử dụng". No star ratings, no review counts, no burn-time claims, no eco statistics, no mascot named "Bé Nến". Floating round chat button "Lumi" at bottom-right on every screen (closed by default).
```

---

## 1. Trang chủ (`/`)

```
Design a 3D claymorphism desktop landing page for LUVIA scented candles (cream #FBF4E1 background, leaf green #548333 buttons, amber #F2A93B glow). Thin top announcement bar: "Khám phá bộ sưu tập Xuân – Hạ – Thu – Đông. Chọn mùa hương có sẵn hoặc tạo lựa chọn của riêng bạn." Frosted glass pill navbar: logo "Luvia", links "Bộ sưu tập", "Tự chọn mùi & hộp", "Câu chuyện Luvia", "Quà tặng & Hợp tác", "Câu hỏi thường gặp", green pill button "Mua nến", 3D cart icon with badge.
Hero: left text block with small eyebrow "LUVIA · BỘ SƯU TẬP BỐN MÙA", large headline "Một mùa hương cho góc nhỏ của bạn.", paragraph "Có ngày bạn muốn căn phòng tươi mới hơn. Có ngày chỉ cần một chút ấm áp để chậm lại. Khám phá Xuân – Hạ – Thu – Đông cùng Luvia, thương hiệu nến thơm tái chế nâng cấp từ dầu ăn đã qua sử dụng.", primary green 3D pill "Mua nến bốn mùa", secondary cream pill "Tự chọn mùi & hộp", text link "Chưa biết chọn mùi? Hỏi Lumi". Right: four glowing amber glass candle jars on round clay pedestals, each pedestal tinted with its season color (spring green, summer amber, autumn terracotta, winter slate blue), with subtle seasonal elements (blossoms, sun rays, falling leaves, snowflakes).
Below hero, section "Bốn mùa hương, bạn thương mùa nào?" with subtitle "Mỗi mùa có một cảm xúc riêng. Bạn có thể chọn theo điều mình yêu thích, một khoảnh khắc trong ngày, hoặc người mà bạn muốn gửi tặng." and a 4-column row of clay product cards: "Xuân – Nhẹ nhàng · Tươi mới", "Hạ – Rực rỡ · Tươi vui", "Thu – Dịu dàng · Ấm áp", "Đông – Bình yên · Sâu lắng". Each card: candle jar image, season name, mood line, small rows "Nốt hương: Đang cập nhật", "Giá: Đang cập nhật", status pill ("Còn hàng" or "Đặt trước" for Đông), button "Chọn Xuân"/"Chọn Hạ"/"Chọn Thu"/"Chọn Đông".
Then a two-option block "Chọn một hũ nến theo cách của bạn.": card "Nến bốn mùa" with button "Mua nến có sẵn", card "Tự chọn mùi & hộp" with button "Tạo lựa chọn của bạn".
Floating round amber "Lumi" chat button bottom-right. No ratings, no bestseller badges.
```

## 2. Trang một mùa (`/bo-suu-tap/thu`)

```
Design a 3D claymorphism product detail page for LUVIA, season "Thu" (autumn accent #C9773B on cream #FBF4E1). Same frosted navbar as home. Breadcrumb "Bộ sưu tập / Thu".
Left: large elevated round clay pedestal in soft terracotta with an amber glass candle jar and warm flickering flame, a few floating autumn leaves; small thumbnail strip below labeled "Ảnh thực tế".
Right: title "Nến thơm Luvia – Thu", mood line "Dịu dàng · Ấm áp", paragraph "Một khoảng chậm giữa ngày nhiều việc. Thu gợi cảm giác dịu dàng, ấm áp, dành cho lúc bạn muốn mở một cuốn sách và dành thời gian cho riêng mình." A highlighted suggestion chip "Khi bạn thích sự nhẹ nhàng, gần gũi trong những phút nghỉ ngơi."
A clean clay info table with rows: "Nốt hương: Đang cập nhật", "Thành phần: Đang cập nhật", "Khối lượng tịnh: Đang cập nhật", "Quy cách hộp: Đang cập nhật", "Giá: Đang cập nhật", "Tình trạng hàng: Còn hàng", "Thời gian giao dự kiến: 1–3 ngày".
Single variant pill "Quy cách: Hũ tiêu chuẩn" (selected), quantity stepper "Số lượng". Two wide 3D buttons: green "Mua ngay" and cream outlined "Thêm vào giỏ hàng". Below: link "Muốn chọn mùi và hộp theo ý bạn? Tùy chỉnh tại đây." and small amber chip "Hỏi Lumi về mùi này".
Add a small toast at top-right showing "Đã thêm vào giỏ hàng" with link "Xem giỏ hàng". No fragrance pyramid, no size options, no ratings.
```

## 3. Tự chọn mùi & hộp (`/tu-chon-mui-hop`)

```
Design a 3D claymorphism 3-step custom candle builder page for LUVIA (cream background, leaf green buttons). Headline "Một hũ nến mang lựa chọn của riêng bạn." Subtitle "Bắt đầu từ mùi hương bạn thích, chọn một mẫu hộp phù hợp, rồi xem lại sản phẩm trước khi đặt mua."
Top: 3-step clay progress stepper "1 Chọn mùi" → "2 Chọn hộp" → "3 Xem sản phẩm", step 2 active.
Left column (current step 2): heading "Chọn chiếc hộp cho món quà của bạn.", text "Mỗi mẫu hộp là một cách gửi gắm khác nhau. Chọn mẫu bạn thích để xem cùng hũ nến vừa chọn." Two selectable 3D clay tiles: "Hộp giấy kraft" (+0đ) and "Hộp quà có thiệp" (+25.000đ, selected with green ring). Under the selected tile, a textarea "Lời nhắn trên thiệp" with hint "Tối đa 120 ký tự" and character counter. Buttons: text link "Quay lại chọn mùi", green 3D pill "Xem sản phẩm của bạn".
Also show a small collapsed preview of step 1 above: "Đã chọn Thu" with four season scent chips (Xuân, Hạ, Thu, Đông) and a chip "Nhờ Lumi chọn mùi".
Right column: sticky clay preview card labeled "Hình minh họa lựa chọn" showing an amber candle jar beside a kraft gift box with a small card, and a price breakdown: "Giá nến", "Phụ phí mùi", "Phụ phí hộp/thiệp", "Đơn giá sản phẩm tùy chỉnh", note "Phí giao hàng được tính ở bước đặt hàng theo địa chỉ nhận."
Bottom secondary card: "Bạn muốn một mùi khác? Gửi yêu cầu riêng." with note "Yêu cầu này chuyển sang tư vấn và báo giá trước, chưa dẫn thẳng đến thanh toán." and outlined button "Gửi yêu cầu riêng". No wick options, no size options, no embossed label.
```

## 4. Trợ lý Lumi (popup chat)

```
Design a 3D claymorphism floating AI chat popup for LUVIA, anchored bottom-right over a blurred home page. Collapsed state shown small: round amber glowing button with a tiny candle-flame icon and tooltip "Hỏi Lumi chọn mùi".
Open state: frosted glass card about 380px wide. Header: small glowing flame avatar, title "Lumi · AI tư vấn mùi hương", icons "Thu nhỏ" and "Đóng".
Messages: Lumi bubble "Chào bạn, mình là Lumi, trợ lý AI tư vấn mùi của Luvia. Bạn đang chọn nến cho mình hay làm quà? Kể mình nghe một chút nhé." Quick reply chips: "Chọn cho mình", "Chọn làm quà", "Mình chưa biết chọn mùi", "Tư vấn mùi tùy chỉnh". User bubble (green): "Mình muốn một mùi ấm áp để đọc sách buổi tối". Lumi reply: "Theo sở thích bạn vừa chia sẻ, mình gợi ý Thu. Mùi này dịu dàng, ấm áp, phù hợp với mong muốn thư giãn khi đọc sách. Bạn muốn xem sản phẩm hay chọn thêm mẫu hộp?" followed by one embedded clay product card (terracotta accent): candle thumbnail, "Thu – Dịu dàng · Ấm áp", two buttons "Xem sản phẩm" and "Tùy chỉnh mùi & hộp" (no price, no add-to-cart).
Below the cards, an outlined button "Nhắn đội ngũ Luvia". Input field placeholder "Bạn thích mùi như thế nào?" with send button. Tiny footer disclaimer "Lumi là trợ lý AI. Gợi ý mang tính tham khảo; cảm nhận mùi hương có thể khác nhau ở mỗi người." Also show a mobile variant where the popup is a bottom sheet that does not cover the "Mua ngay" button.
```

## 5. Giỏ hàng (`/gio-hang`)

```
Design a 3D claymorphism shopping cart page for LUVIA (cream background, leaf green buttons). Title "Giỏ hàng của bạn".
Left: list of two clay line-item cards, each showing a candle thumbnail and a clear configuration list:
Line 1: "Nến thơm Luvia – Thu", "Quy cách: Hũ tiêu chuẩn", "Mẫu hộp: Hộp giấy kraft", unit price, quantity stepper, line total.
Line 2 (custom, small badge "Tùy chỉnh"): "Mùi: Đông", "Quy cách: Hũ tiêu chuẩn", "Mẫu hộp: Hộp quà có thiệp", "Lời nhắn: Chúc mẹ một mùa đông thật ấm", small amber pill "Đặt trước", unit price, quantity stepper, line total.
Each line has text actions "Chỉnh sửa tùy chọn" and "Xóa sản phẩm".
Right: sticky clay summary card with "Tạm tính sản phẩm", note "Phí giao hàng sẽ được tính ở bước tiếp theo.", wide green 3D button "Tiến hành đặt hàng", link "Tiếp tục chọn nến".
Also include a small empty-state variant: an unlit candle jar on a pedestal, text "Giỏ hàng đang chờ mùa hương đầu tiên của bạn." and button "Khám phá bộ sưu tập". No coupon field, no oil-exchange card, no free-shipping progress bar, no Zalo button.
```

## 6. Đặt hàng (`/dat-hang`)

```
Design a 3D claymorphism checkout page for LUVIA (cream background, leaf green primary). Title "Hoàn tất đơn hàng của bạn." Subtitle "Kiểm tra lựa chọn của bạn và điền thông tin nhận hàng. Tổng chi phí sẽ được hiển thị trước khi bạn xác nhận."
Left column, stacked clay section cards:
1. "Thông tin nhận hàng": inputs "Họ tên *", "Số điện thoại *", "Email nhận thông báo", dropdown "Tỉnh/Thành phố *", "Địa chỉ nhận hàng đầy đủ *", textarea "Ghi chú giao hàng". Show one field in error state with red helper text "Vui lòng bổ sung số điện thoại để tiếp tục."
2. "Giao hàng": rows "Phí vận chuyển", "Thời gian chuẩn bị", "Thời gian vận chuyển", "Thời gian nhận dự kiến".
3. "Thanh toán": only two radio clay tiles "Thanh toán khi nhận hàng (COD)" and "Chuyển khoản ngân hàng" (selected). No card or e-wallet options.
Right column sticky card "Kiểm tra đơn": compact list of cart lines with their options (mùi, hộp, lời nhắn), link "Cần đổi mùi hoặc mẫu hộp? Quay lại chỉnh sửa trước khi xác nhận.", totals "Tạm tính", "Phí giao hàng", bold "Tổng thanh toán". Checkbox "Tôi đã kiểm tra thông tin đơn hàng và đồng ý với Điều kiện mua hàng, Chính sách đổi trả và Chính sách bảo mật." Wide green 3D button "Đặt hàng & xem hướng dẫn chuyển khoản" (shown with a subtle loading spinner variant to indicate it cannot be double-clicked). No coupon field.
```

## 7. Trạng thái đơn hàng (`/don-hang/LV-261014-AB12`)

```
Design a 3D claymorphism order status page for LUVIA (cream background), showing four state variants side by side as separate cards or tabs:
A) Awaiting bank transfer: amber badge "Chờ thanh toán", message "Luvia đã ghi nhận đơn LV-261014-AB12. Bạn hoàn tất thanh toán theo hướng dẫn bên dưới nhé." A clay payment card with VietQR code, bank name, account number, account name, "Nội dung chuyển khoản: LV-261014-AB12", "Thời hạn thanh toán" (24 hours).
B) Cash on delivery: green badge, message "Luvia đã nhận đơn LV-261014-AB12. Bạn sẽ thanh toán khi nhận hàng."
C) Paid (confirmed by shop): green check, message "Thanh toán thành công. Cảm ơn bạn đã chọn Luvia!"
D) Failed: soft red badge, message "Thanh toán chưa hoàn tất. Lựa chọn của bạn vẫn được lưu trong đơn LV-261014-AB12." buttons "Thử thanh toán lại" and "Đổi phương thức thanh toán".
Shared order detail card below: "Mã đơn", "Chi tiết sản phẩm/tùy chỉnh" (lines with mùi, hộp, lời nhắn), "Tổng tiền", "Địa chỉ nhận", "Trạng thái đơn: Chờ xác nhận", "Trạng thái thanh toán", "Thời gian dự kiến". Buttons "Xem chi tiết đơn hàng" and "Tiếp tục khám phá". Small lookup form "Số điện thoại đặt hàng" + button "Xem đơn hàng".
```

## 8. Câu chuyện, Quà tặng & Hợp tác, FAQ, chân trang (nửa dưới trang chủ)

```
Design the lower half of the LUVIA landing page in 3D claymorphism (cream background, leaf green, amber glow).
Section "Câu chuyện Luvia": headline "Đừng đổ đi, hãy thắp sáng." Three short paragraphs: "Luvia bắt đầu từ một câu hỏi: Liệu dầu ăn đã qua sử dụng có thể bắt đầu một vòng đời mới?" / "Từ câu hỏi ấy, chúng mình phát triển nến thơm với định hướng tận dụng nguồn dầu sau xử lý làm một phần nguyên liệu..." / "Với Luvia, câu chuyện ấy bắt đầu từ những điều gần gũi: một góc phòng bạn yêu thích, một món quà bạn chọn, một nguyên liệu được trao thêm giá trị." Illustration: a 3D clay scene of a small cooking-oil bottle turning into a glowing candle jar (no numbers or statistics). Link "Tìm hiểu về nguyên liệu".
Section "Quà tặng & Hợp tác": headline "Một mùa hương, gửi tới người bạn thương." text about choosing a season as a gift, buttons "Tự chọn mùi & hộp quà" and "Nhờ Lumi gợi ý mùi"; kraft gift box with a candle and small card. Beside it a B2B clay card: "Bạn đang tìm nến thơm cho không gian hoặc quà tặng doanh nghiệp?" with text "Chia sẻ với Luvia mục đích sử dụng, số lượng dự kiến, ngân sách và thời gian cần nhận..." and an inline form: "Tên đơn vị", "Người liên hệ", "Kênh liên hệ (số điện thoại, email hoặc Zalo)", "Nhu cầu", "Số lượng dự kiến", "Ngân sách", "Thời gian cần nhận", button "Gửi nhu cầu".
Section "Câu hỏi thường gặp": clay accordion with 9 questions, first one open: "Nến Luvia được phát triển từ nguyên liệu gì?", then "Dầu ăn đã qua sử dụng có được đưa thẳng vào nến không?", "Mình lo nến còn mùi dầu cũ thì sao?", "Chưa từng mua nến thơm thì nên chọn mùa nào?", "Bao giờ mình nhận được hàng?", "Mình có thể tự chọn mùi và mẫu hộp không?", "Lumi giúp mình chọn mùi như thế nào?", "Mình có thể đặt nhiều sản phẩm để làm quà không?", "Nếu nhận sản phẩm có vấn đề, mình liên hệ ở đâu?".
Closing banner: "Góc nhỏ của bạn đang chờ mùa nào?" / "Ghé xem bốn mùa hương, chọn một chút cảm xúc bạn muốn giữ lại hôm nay." buttons "Mua nến bốn mùa", "Tự chọn mùi & hộp".
Footer (dark green #3B6324): "LUVIA — Đừng đổ đi, hãy thắp sáng.", "Nến thơm tái chế nâng cấp từ dầu ăn đã qua sử dụng.", Email luvia.nenthom@gmail.com, Hotline 0372 268 723, Địa chỉ liên hệ: Đại học FPT – Campus Hòa Lạc – Hà Nội. No team members, no collection points, no statistics.
```
