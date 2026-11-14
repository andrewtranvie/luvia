/**
 * Nội dung website Luvia — chép NGUYÊN VĂN từ tài liệu "Nội dung Web" khách hàng gửi.
 * Giao diện chỉ đọc chữ từ đây, không tự gõ lại câu chữ trong JSX.
 * Sửa câu chữ → sửa ở file này (giữ đúng giọng văn đã được khách duyệt).
 *
 * Ký hiệu {placeholder} được thay lúc hiển thị bằng hàm fill() bên dưới.
 */

export const NAV = {
  logo: "Luvia",
  menu: [
    { label: "Bộ sưu tập", href: "/san-pham" },
    { label: "Câu chuyện Luvia", href: "/cau-chuyen" },
    { label: "Quà tặng & Hợp tác", href: "/qua-tang" },
    { label: "Câu hỏi thường gặp", href: "/#faq" },
  ],
  cta: { label: "Mua nến", href: "/san-pham" },
  cartAriaLabel: "Giỏ hàng ({count} sản phẩm)",
  // Slogan chính thức khách chốt 2026-11-11, thay câu "Thắp sáng từ..." gửi 2026-10-31
  announcement: "Luvia - Hương thơm từ những điều tưởng chừng bỏ đi.",
} as const;

export const HERO = {
  eyebrow: "LUVIA · BỘ SƯU TẬP BỐN MÙA",
  /* Tách hai vế để vế sau in nghiêng màu xanh + gạch nét cọ bên dưới.
     Nếu sửa chữ, giữ vế đầu ngắn hơn vế sau để dòng trên không trống một nửa. */
  title: "Một mùa hương cho",
  titleAccent: "góc nhỏ của bạn.",
  body: "Có ngày bạn muốn căn phòng tươi mới hơn. Có ngày chỉ cần một chút ấm áp để chậm lại. Khám phá Xuân – Hạ – Thu – Đông cùng Luvia, thương hiệu nến thơm tái chế nâng cấp từ dầu ăn đã qua sử dụng.",
  primary: { label: "Mua nến bốn mùa", href: "/san-pham" },
  secondary: { label: "Quà tặng & Hợp tác", href: "/qua-tang" },
  askLumi: "Chưa biết chọn mùi? Hỏi Lumi",
  /* Dải ba điểm tin cậy dưới hero (khối "Eco Mini Proof Points" trong bản Stitch).
     ⚠️ ĐÂY LÀ CAM KẾT VỚI NGƯỜI MUA, không phải chữ trang trí — mọi con số phải
     tra được từ FILE TEM NHÃN (packing.pdf khách gửi 2026-10-21).
     Bản Stitch ghi "100% Tái chế an toàn · 40h+ · 0% Paraben & Phthalate";
     tôi KHÔNG chép nguyên vì: 40h+ sai (tem ghi 25–30 / 36–40 / 50–54 giờ, bản
     100 g chỉ 25 giờ), còn "0% Paraben & Phthalate" chưa có giấy xác nhận của
     bên bán hương liệu. Khách chốt lại thì sửa ở đây. */
  proofs: [
    { value: "100%", label: "Sáp đậu nành tự nhiên" },
    { value: "25–54h", label: "Thời gian cháy" },
    { value: "Upcycle", label: "Từ dầu ăn đã qua sử dụng" },
  ],
} as const;

export const COLLECTION = {
  id: "bo-suu-tap",
  eyebrow: "CẢM XÚC THEO MÙA",
  title: "Bốn mùa hương, bạn thương mùa nào?",
  lead: "Mỗi mùa có một cảm xúc riêng. Bạn có thể chọn theo điều mình yêu thích, một khoảnh khắc trong ngày, hoặc người mà bạn muốn gửi tặng.",
  quickAdd: { idle: "Thêm nhanh vào giỏ", done: "Đã thêm vào giỏ" },
  askLumi: "Phân vân chưa biết chọn? Hỏi Lumi",
  labels: {
    highlight: "Đặc điểm",
    netWeight: "Khối lượng tịnh",
    burnTime: "Thời gian cháy",
    sizes: "Trọng lượng",
    price: "Giá",
    priceFrom: "Giá từ",
    status: "Tình trạng",
    pending: "Đang cập nhật",
  },
} as const;

export const STOCK_STATUS = {
  in_stock: "Còn hàng",
  preorder: "Đặt trước",
  unavailable: "Tạm hết hàng",
} as const;

export const SALES_CLOSED_LABEL = "Sắp mở bán";

/**
 * Nội dung riêng của từng mùa (thẻ sản phẩm + trang chi tiết).
 *
 * ⚠️ `description` của cả 4 mùa do tôi viết lại 2026-11-12 theo góp ý nhóm khách
 * ("muốn có cái mô tả bình thường"): bản cũ là một câu dài bay bổng, bản mới gói trong
 * hai câu — mùi gì, cảm giác gì, hợp không gian nào. Chất liệu lấy từ dòng đầu mục
 * "ĐẶC ĐIỂM NỔI BẬT" trên tem nhãn và danh sách tinh dầu trong catalog.ts, không thêm
 * thông tin mới: nốt hương chi tiết (đầu / giữa / cuối) khách vẫn chưa cung cấp.
 * `suggestion` giữ nguyên — đó là phần "hợp với người thế nào", cũng là chất liệu
 * Lumi dùng để giải thích vì sao gợi ý một mùa.
 */
export const SEASON_COPY = {
  xuan: {
    season: "Xuân",
    name: "Ban Mai",
    nameEn: "Morning Air",
    concept: "Khi mọi thứ lại bắt đầu",
    headline: "Khi những khởi đầu mới khẽ gõ cửa",
    mood: "Hồi sinh · Tươi mới · Hy vọng",
    description:
      "Hương tươi mát, sảng khoái như làn gió sớm. Nhẹ và trong, hợp phòng khách hoặc bàn làm việc khi bạn muốn không gian tỉnh táo hơn.",
    suggestion:
      "Dành cho những ngày bạn muốn làm mới không gian, mở một bản nhạc yêu thích và tận hưởng niềm vui từ những điều giản dị.",
    cta: "Chọn Ban Mai",
  },
  ha: {
    season: "Hạ",
    name: "Liên Hương",
    nameEn: "Lotus Résidence",
    concept: "Chút rung động đầu hè",
    headline: "Một chút mộng mơ giữa ngày hạ",
    mood: "Trong sáng · Nữ tính · Lãng mạn",
    description:
      "Hương hoa sen thanh tao, dịu nhẹ từ tinh dầu sen hồng. Cảm giác bình yên, thư thái, hợp phòng ngủ hoặc một góc thư giãn cuối ngày.",
    suggestion:
      "Dành cho một buổi chiều thảnh thơi, trong không gian ngập hoa, bên chiếc bồn tắm ấm và ly thức uống yêu thích.",
    cta: "Chọn Liên Hương",
  },
  thu: {
    season: "Thu",
    name: "Bạch Trà",
    nameEn: "White Tea",
    concept: "Khoảng lặng trước khi đông về",
    headline: "Có một mùa thu dịu dàng đến thế",
    mood: "Thanh tao · Dịu dàng · Hoài niệm",
    description:
      "Hương trà trắng thanh khiết, nhẹ nhàng, có chút gỗ tuyết tùng ấm phía sau. Dễ chịu và không gắt, hợp phòng ngủ hay phòng làm việc cỡ vừa.",
    suggestion:
      "Dành cho những tâm hồn yêu sự bình yên, thích những buổi chiều không cần lịch trình và trân trọng cả những khoảnh khắc rất đỗi bình thường.",
    cta: "Chọn Bạch Trà",
  },
  dong: {
    season: "Đông",
    name: "Mộc Trầm",
    nameEn: "Cedarwood",
    concept: "Nơi những tâm hồn tìm về hơi ấm",
    headline: "Mùa đông có một nơi để trở về",
    mood: "Sâu lắng · Sum vầy · Chở che",
    description:
      "Hương trầm hương và gỗ tuyết tùng, ấm áp và trầm lắng. Đằm hơn ba mùa còn lại, hợp phòng khách hoặc không gian rộng vào buổi tối.",
    suggestion:
      "Dành cho những buổi tối bạn muốn tạm gác lại bộn bề, cuộn mình trong chiếc chăn ấm và tận hưởng không gian thân thuộc.",
    cta: "Chọn Mộc Trầm",
  },
} as const;

export const LUMI = {
  name: "Lumi",
  iconLabel: "Hỏi Lumi chọn mùi",
  windowTitle: "Lumi · AI tư vấn mùi hương",
  greeting:
    "Chào bạn, mình là Lumi, trợ lý AI tư vấn mùi của Luvia. Bạn đang chọn nến cho mình hay làm quà? Kể mình nghe một chút nhé.",
  inputPlaceholder: "Bạn thích mùi như thế nào?",
  /* ⚠️ nhãn do tôi viết 2026-11-12, chờ khách duyệt.
     Bộ cũ ("Chọn cho mình" / "Chọn làm quà" / "Mình chưa biết chọn mùi") đều quá mơ hồ:
     bấm xong Lumi vẫn phải hỏi lại hai ba lượt mới chọn được mùi. Bộ mới nói thẳng
     hoàn cảnh dùng — mỗi nút là một câu Lumi trả lời được ngay bằng một mùi cụ thể. */
  quickReplies: [
    "Mình muốn dễ ngủ hơn",
    "Để phòng làm việc cho tỉnh táo",
    "Thư giãn sau ngày dài",
    "Tả người mình muốn tặng",
    "Mùi nào nhẹ nhàng nhất?",
    "Nến làm từ dầu ăn cũ à?",
  ],
  /* Nút gợi ý lượt sau — hiện sau mỗi câu trả lời của Lumi. Trước đây bộ nút chỉ hiện ở
     tin nhắn đầu rồi biến mất, đúng lúc khách bí nhất là lúc không còn gì để bấm. */
  followUps: ["So sánh giúp mình hai mùi", "Còn mùi nào khác không?", "Mùi này hợp phòng bao nhiêu m²?"],
  followUpsLabel: "Hỏi tiếp:",
  card: {
    viewProduct: "Xem sản phẩm",
  },
  notSure:
    "Mình chưa có thông tin chắc chắn về lựa chọn này. Bạn muốn chuyển sang trao đổi với đội ngũ Luvia không?",
  handoffButton: "Nhắn đội ngũ Luvia",
  disclaimer: "Lumi là trợ lý AI. Gợi ý mang tính tham khảo; cảm nhận mùi hương có thể khác nhau ở mỗi người.",
  minimize: "Thu nhỏ",
  close: "Đóng",
  error: "Lumi đang gặp chút trục trặc. Bạn thử gửi lại giúp mình, hoặc nhắn đội ngũ Luvia nhé.",
  rateLimited: "Bạn đang hỏi hơi nhanh, Lumi xin nghỉ một chút. Bạn thử lại sau ít phút nhé.",
  askAboutProduct: "Hỏi Lumi về mùi này",
} as const;

/**
 * Ô "tả người nhận → Lumi gợi ý mùi" ở /qua-tang và /tu-van.
 * Dựng theo góp ý nhóm khách 2026-11-12: khách chỉ muốn tả vài nét tính cách
 * người được tặng rồi nhận một gợi ý kèm lý do, không muốn trả lời bảng câu hỏi.
 * ⚠️ toàn bộ nhãn và chip dưới đây do tôi viết, chờ khách duyệt.
 */
export const GIFT_FINDER = {
  eyebrow: "GỢI Ý QUÀ",
  title: "Tặng ai? Tả vài câu, Lumi chọn giúp.",
  lead: "Người ấy thích gì, hay làm gì lúc rảnh, phòng của họ ra sao — càng cụ thể Lumi càng gợi ý trúng.",
  placeholder: "Ví dụ: chị mình hướng nội, hay đọc sách buổi tối, phòng ngủ nhỏ...",
  chipsLabel: "Hoặc bấm nhanh vài nét tính cách:",
  chips: [
    "hướng nội",
    "thích đọc sách",
    "bận rộn, hay căng thẳng",
    "yêu thiên nhiên",
    "lãng mạn, mơ mộng",
    "thích sự tối giản",
    "hay thức khuya",
    "vừa chuyển nhà",
  ],
  submit: "Gợi ý mùi cho người này",
  empty: "Bạn tả giúp mình vài nét về người nhận nhé.",
  /** Câu gửi vào Lumi. {desc} = phần khách gõ. Ép Lumi nêu lý do ngay trong câu hỏi. */
  prompt:
    "Mình muốn chọn nến Luvia làm quà. Người nhận: {desc}. " +
    "Bạn gợi ý giúp mình MỘT mùi thôi, và nói rõ vì sao mùi đó hợp với người này nhé.",
} as const;

/**
 * Nguồn sự thật duy nhất về dầu ăn tái chế — nuôi system prompt của Lumi,
 * fallbackAnswer() và mục FAQ. Trước đây nội dung này nằm rải rác hơn mười chỗ,
 * không chỗ nào dùng chung, nên Lumi chỉ biết đúng hai câu chung chung.
 *
 * ⚠️ `facts` chỉ GOM LẠI những gì đã có trên web từ tài liệu khách gửi
 * (trang Câu chuyện + infographic "Một hũ nến Luvia được tạo ra như thế nào?"),
 * không thêm thông số mới. `unknowns` là những thứ khách CHƯA cung cấp —
 * Lumi phải nói thẳng là chưa công bố chứ không được suy đoán.
 * Cả khối chờ khách duyệt.
 */
export const RECYCLED_OIL = {
  why: "Một lít dầu ăn đổ xuống cống có thể tạo thành lớp màng ngăn oxy trên mặt nước, gây ô nhiễm cho một lượng nước rất lớn và làm tắc nghẽn hệ thống thoát nước. Ở nhiều gia đình Việt, dầu sau khi chiên rán thường bị đổ bỏ hoặc dùng đi dùng lại — cả hai đều không tốt.",
  facts: [
    "Dầu ăn đã qua sử dụng được thu gom và lọc kỹ trước khi đưa vào sản xuất.",
    "Dầu đã qua xử lý được đun nóng và hòa trộn với sáp thực vật thành hỗn hợp sáp mịn, ổn định.",
    "Sau đó mới cho tinh dầu thiên nhiên theo bốn hương đặc trưng, rót vào hũ thủy tinh đã đặt bấc, để nguội rồi kiểm tra chất lượng và dán nhãn.",
    "Mục tiêu của Luvia là giảm lượng dầu thải đổ ra nguồn nước, đồng thời cho dầu đã qua sử dụng một vòng đời mới.",
  ],
  /** Những câu hỏi Lumi KHÔNG được tự trả lời — chưa có số liệu nào được khách công bố. */
  unknowns:
    "tỉ lệ dầu tái chế trong một hũ nến, phương pháp và nhiệt độ khử mùi cụ thể, kết quả kiểm nghiệm, chứng nhận chất lượng",
} as const;

export const MASCOT_BANNER = {
  eyebrow: "LUVIA & LUMI",
  title: "Lan tỏa ánh sáng xanh cùng Luvia.",
  body: "Lumi luôn ở đây để cùng bạn chọn mùi hương và kể lại hành trình những giọt dầu được trao thêm một đời sống mới.",
  steps: [
    { title: "Thu gom", desc: "Dầu ăn đã qua sử dụng được thu gom, lọc kỹ trước khi đưa vào sản xuất." },
    { title: "Chế tác", desc: "Kết hợp cùng sáp đậu nành và tinh dầu thiên nhiên, thủ công từng hũ nến." },
    { title: "Thắp sáng", desc: "Một ngọn lửa ấm áp cho góc nhỏ của bạn, mang theo câu chuyện tái sinh." },
  ],
  cta: "Hỏi Lumi ngay",
} as const;

export const STORY = {
  id: "cau-chuyen",
  title: "Hương thơm từ những điều tưởng chừng bỏ đi.",
  paragraphs: [
    "Luvia bắt đầu từ một câu hỏi: Liệu dầu ăn đã qua sử dụng có thể bắt đầu một vòng đời mới?",
    "Từ câu hỏi ấy, chúng mình phát triển nến thơm với định hướng tận dụng nguồn dầu sau xử lý làm một phần nguyên liệu. Một hũ nến vì thế mang theo cả mùi hương cho không gian sống và câu chuyện về cách nhìn lại những gì thường bị bỏ đi.",
    "Với Luvia, câu chuyện ấy bắt đầu từ những điều gần gũi: một góc phòng bạn yêu thích, một món quà bạn chọn, một nguyên liệu được trao thêm giá trị.",
  ],
  cta: { label: "Đọc câu chuyện Luvia", href: "/cau-chuyen" },
} as const;

export const GIFTS = {
  id: "qua-tang",
  eyebrow: "QUÀ TẶNG TINH TẾ",
  title: "Một mùa hương, gửi tới người bạn thương.",
  body: "Có những món quà bắt đầu từ việc nhớ người ấy thích điều gì. Một chút tươi vui của Hạ, nét dịu dàng của Thu, hay cảm giác bình yên của Đông — chọn một mùa hương như cách bạn gửi một lời quan tâm.",
  // ⚠️ nhãn do tôi viết sau khi bỏ bộ tự chọn, chờ khách duyệt
  cta: { label: "Xem bộ sưu tập bốn mùa", href: "/san-pham" },
  askLumi: "Nhờ Lumi gợi ý mùi",
  /** Nội dung riêng của trang /qua-tang */
  page: {
    title: "Quà tặng & Hợp tác",
    lead: "Chọn một mùa hương làm quà cho người bạn thương, hoặc trao đổi với Luvia về nhu cầu số lượng lớn cho không gian và doanh nghiệp.",
  },
  b2b: {
    id: "hop-tac",
    eyebrow: "HỢP TÁC DOANH NGHIỆP",
    title: "Bạn đang tìm nến thơm cho không gian hoặc quà tặng doanh nghiệp?",
    body: "Chia sẻ với Luvia mục đích sử dụng, số lượng dự kiến, ngân sách và thời gian cần nhận. Chúng mình sẽ trao đổi phương án phù hợp với nhu cầu của bạn.",
    cta: "Trao đổi nhu cầu hợp tác",
    formIntro: "Điền thông tin dưới đây, Luvia sẽ liên hệ lại để trao đổi phương án.",
  },
} as const;

/** Nhãn trường của các biểu mẫu gửi về /api/lead */
export const LEAD_FORMS = {
  b2b: {
    fields: {
      organization: "Tên đơn vị",
      contactName: "Người liên hệ",
      contactChannel: "Kênh liên hệ (số điện thoại, email hoặc Zalo)",
      need: "Nhu cầu",
      quantity: "Số lượng dự kiến",
      budget: "Ngân sách",
      timeline: "Thời gian cần nhận",
    },
    placeholders: {
      contactChannel: "Số điện thoại hoặc email",
      need: "Quà tặng đối tác, workshop nến xanh, hoặc trang trí không gian...",
      quantity: "Ví dụ: 50 hũ...",
      budget: "Ngân sách dự kiến",
      timeline: "Thời gian cần nhận hàng",
    },
    submit: "Gửi nhu cầu",
    submitting: "Đang gửi...",
    success: "Luvia đã nhận được nhu cầu của bạn và sẽ liên hệ lại để trao đổi phương án.",
  },
  error: "Chưa gửi được. Bạn thử lại hoặc liên hệ trực tiếp Luvia giúp mình nhé.",
  missing: "Vui lòng bổ sung {field} để tiếp tục.",
} as const;

export const PRODUCT_PAGE = {
  namePrefix: "Nến thơm Luvia – ",
  info: {
    highlights: "Đặc điểm nổi bật",
    ingredients: "Thành phần",
    netWeight: "Khối lượng tịnh",
    burnTime: "Thời gian cháy",
    spaceNote: "Không gian phù hợp",
    storage: "Bảo quản",
    price: "Giá",
    status: "Tình trạng hàng",
  },
  variant: "Quy cách",
  quantity: "Số lượng",
  buyNow: "Mua ngay",
  addToCart: "Thêm vào giỏ hàng",
  added: "Đã thêm vào giỏ hàng",
  viewCart: "Xem giỏ hàng",
  askLumi: "Hỏi Lumi về mùi này",

  /** Thư viện ảnh — thứ tự phải khớp Season.gallery trong catalog.ts */
  gallery: {
    zoom: "Phóng to ảnh sản phẩm",
    prev: "Ảnh trước",
    next: "Ảnh sau",
    close: "Đóng ảnh phóng to",
    lightbox: "Ảnh phóng to",
    // ⚠️ ba nhãn do tôi viết theo nội dung đọc được trong ảnh khách gửi, chờ khách duyệt
    views: ["Poster giới thiệu", "Hũ 200 g", "Trọn bộ 3 quy cách"],
  },
  share: {
    label: "Chia sẻ:",
    facebook: "Chia sẻ lên Facebook",
    messenger: "Chia sẻ qua Messenger",
    pinterest: "Chia sẻ lên Pinterest",
    zalo: "Chia sẻ qua Zalo",
  },
  like: { idle: "Thích", done: "Đã thích" },
  meta: { reviews: "đánh giá", sold: "Đã bán" },
  /** Bốn ký hiệu in sẵn trên tem nhãn hộp (ảnh khách gửi 2026-10-21) */
  badges: ["♻️ Upcycle", "💧 Tinh dầu tự nhiên", "🌱 Vegan", "🕯️ Bấc cotton"],
  shipping: {
    label: "Vận chuyển",
    time: "Giao trong {days} kể từ khi đặt",
    fee: "Phí vận chuyển {min} – {max} tùy khu vực",
    note: "Đóng gói chống sốc, hũ thủy tinh được bọc kỹ.",
  },
  scent: {
    label: "Mùi hương",
    season: "Mùa",
    oil: "Tinh dầu chính",
    feel: "Cảm nhận",
  },
  gift: {
    label: "Gói quà",
    checkbox: "Thêm {box} (+{price})",
    placeholder: "Viết lời nhắn trên thiệp (tối đa {max} ký tự)",
  },
  stock: {
    available: "Còn {n} sản phẩm",
    soldOut: "Hết hàng",
    decrease: "Giảm số lượng",
    increase: "Tăng số lượng",
  },
  tabs: { desc: "Mô tả sản phẩm", care: "Hướng dẫn sử dụng", reviews: "Đánh giá" },
  reviewsBlock: {
    title: "Khách hàng nói gì",
    allStars: "Tất cả",
    starSuffix: "sao",
    allScents: "Mọi mùi hương",
    scentPrefix: "Mùi",
    empty: "Chưa có đánh giá cho bộ lọc này. Chọn “Tất cả” để xem mọi đánh giá.",
    srStars: "{n}/5 sao",
  },
} as const;

/**
 * Cách bảo quản — chép từ tem nhãn, giống nhau cả 4 mùi. Tách riêng khỏi
 * CANDLE_CARE vì trang chi tiết hiển thị nội dung này trong bảng thông số,
 * không phải trong khối hướng dẫn phía dưới (tránh lặp hai lần một trang).
 */
export const CANDLE_STORAGE = ["Để nơi khô ráo, thoáng mát.", "Tránh ánh nắng trực tiếp."];

/**
 * Hướng dẫn dùng và lưu ý an toàn — chép từ tem nhãn khách gửi
 * (packing.pdf, 2026-10-21). Bốn mùi dùng chung một bộ nội dung nên để ở đây,
 * không tách theo mùa. Lỗi chính tả trên tem ("bể mặt", "cắt bắc", "dì chuyên")
 * đã sửa lại cho đúng khi đưa lên web.
 */
export const CANDLE_CARE = {
  title: "Dùng nến sao cho bền hương",
  groups: [
    {
      id: "huong-dan",
      title: "Hướng dẫn sử dụng",
      items: [
        "Đặt nến trên bề mặt phẳng, chịu nhiệt tốt.",
        "Lần đầu đốt nên để nến cháy ít nhất 1–2 giờ.",
        "Cắt bấc còn khoảng 0,5–0,7 cm trước mỗi lần sử dụng.",
        "Đảm bảo không gian thông thoáng khi sử dụng.",
      ],
    },
    {
      id: "an-toan",
      title: "Lưu ý an toàn",
      items: [
        "Để xa tầm tay trẻ em và vật nuôi.",
        "Không đốt nến gần vật dễ cháy.",
        "Không để nến cháy quá lâu (tối đa 4 giờ mỗi lần).",
        "Sử dụng trên bề mặt chịu nhiệt, tránh di chuyển khi nến đang cháy.",
      ],
    },
  ],
  expiry: "Hạn sử dụng: 2 năm kể từ ngày sản xuất.",
} as const;

export const CART = {
  title: "Giỏ hàng của bạn",
  columns: {
    product: "Tên sản phẩm",
    scent: "Mùi",
    variant: "Quy cách",
    box: "Mẫu hộp",
    message: "Lời nhắn",
    unitPrice: "Đơn giá",
    quantity: "Số lượng",
    lineTotal: "Thành tiền",
  },
  actions: { changeQty: "Đổi số lượng", edit: "Chỉnh sửa tùy chọn", remove: "Xóa sản phẩm" },
  subtotal: "Tạm tính sản phẩm",
  shippingNote: "Phí giao hàng sẽ được tính ở bước tiếp theo.",
  /** ⚠️ Hai câu do tôi viết 2026-11-13 cho mốc miễn phí giao hàng — khách chưa duyệt.
      Số tiền lấy từ FREE_SHIPPING_THRESHOLD trong `lib/site.ts`, không gõ cứng ở đây. */
  freeShippingProgress: "Mua thêm {amount} để được miễn phí giao hàng.",
  freeShippingReached: "Đơn của bạn được miễn phí giao hàng.",
  checkout: "Tiến hành đặt hàng",
  continue: "Tiếp tục chọn nến",
  empty: "Giỏ hàng đang chờ mùa hương đầu tiên của bạn.",
  emptyCta: { label: "Khám phá bộ sưu tập", href: "/san-pham" },
} as const;

export const CHECKOUT = {
  title: "Hoàn tất đơn hàng của bạn.",
  body: "Kiểm tra lựa chọn của bạn và điền thông tin nhận hàng. Tổng chi phí sẽ được hiển thị trước khi bạn xác nhận.",
  sections: {
    customer: "Thông tin nhận hàng",
    shipping: "Giao hàng",
    payment: "Thanh toán",
    review: "Kiểm tra đơn",
  },
  fields: {
    name: "Họ tên",
    phone: "Số điện thoại",
    email: "Email nhận thông báo",
    province: "Tỉnh/Thành phố",
    address: "Địa chỉ nhận hàng đầy đủ",
    note: "Ghi chú giao hàng",
  },
  shipping: {
    fee: "Phí vận chuyển",
    eta: "Thời gian nhận dự kiến",
    prep: "Thời gian chuẩn bị",
    transit: "Thời gian vận chuyển",
    chooseProvince: "Chọn tỉnh/thành để xem phí vận chuyển",
  },
  totals: {
    subtotal: "Tạm tính",
    discount: "Giảm giá",
    shipping: "Phí giao hàng",
    total: "Tổng thanh toán",
    /** Hiện thay cho "0₫" khi đơn đạt mốc miễn phí giao hàng */
    freeShipping: "Miễn phí",
  },
  agree:
    "Tôi đã kiểm tra thông tin đơn hàng và đồng ý với Điều kiện mua hàng, Chính sách đổi trả và Chính sách bảo mật.",
  submit: {
    online: "Đặt hàng & thanh toán",
    bank: "Đặt hàng & xem hướng dẫn chuyển khoản",
    cod: "Xác nhận đặt hàng",
  },
  help: "Cần đổi mùi hoặc mẫu hộp? Quay lại chỉnh sửa trước khi xác nhận.",
  missingField: "Vui lòng bổ sung {field} để tiếp tục.",
  unavailable: "Lựa chọn {name} hiện chưa thể đặt. Bạn vui lòng chọn phương án khác hoặc nhắn Luvia.",
  salesClosed: "Luvia chưa mở nhận đơn trực tuyến. Bạn có thể nhắn Luvia để được hỗ trợ.",
  genericError: "Chưa tạo được đơn hàng. Bạn thử lại hoặc nhắn Luvia giúp mình nhé.",
  preorderNote: "Đặt trước",
} as const;

export const ORDER_STATUS = {
  awaitingPayment: "Luvia đã ghi nhận đơn {code}. Bạn hoàn tất thanh toán theo hướng dẫn bên dưới nhé.",
  paid: "Thanh toán thành công. Cảm ơn bạn đã chọn Luvia!",
  cod: "Luvia đã nhận đơn {code}. Bạn sẽ thanh toán khi nhận hàng.",
  failed: "Thanh toán chưa hoàn tất. Lựa chọn của bạn vẫn được lưu trong đơn {code}.",
  retry: "Thử thanh toán lại",
  changeMethod: "Đổi phương thức thanh toán",
  labels: {
    code: "Mã đơn",
    items: "Chi tiết sản phẩm/tùy chỉnh",
    total: "Tổng tiền",
    address: "Địa chỉ nhận",
    orderStatus: "Trạng thái đơn",
    paymentStatus: "Trạng thái thanh toán",
    eta: "Thời gian dự kiến",
    transferContent: "Nội dung chuyển khoản",
    deadline: "Thời hạn thanh toán",
  },
  // ⚠️ bốn câu do tôi viết khi làm đồng hồ đếm ngược mã QR, chờ khách duyệt
  scanHint: "Quét mã bằng app ngân hàng — số tiền và nội dung chuyển khoản đã điền sẵn.",
  countdown: "Mã QR còn hiệu lực {time}",
  expired: "Mã QR đã hết hạn. Bạn bấm tạo mã mới để tiếp tục nhé.",
  regenerate: "Tạo mã mới",
  /* ⚠️ ba câu do tôi viết 2026-11-12, chờ khách duyệt.
     Nút sao chép có vì khách mở web bằng điện thoại thì không tự quét được mã QR
     trên màn hình máy đó — họ phải dán số tài khoản và nội dung vào app ngân hàng.
     confirmHint: web chưa có cách nào tự biết khách đã chuyển tiền, nên phải nhờ
     khách nhắn lại, nếu không đơn sẽ không ai xác nhận. */
  copy: "Sao chép",
  copied: "Đã sao chép",
  confirmHint: "Chuyển khoản xong, bạn nhắn mã đơn kèm ảnh biên lai tới {phone} để Luvia xác nhận và gửi hàng nhé.",
  viewOrder: "Xem chi tiết đơn hàng",
  continue: "Tiếp tục khám phá",
  notFound: "Không tìm thấy đơn hàng. Bạn kiểm tra lại mã đơn và số điện thoại giúp mình nhé.",
  lookupPhone: "Số điện thoại đặt hàng",
  lookup: "Xem đơn hàng",
} as const;

/** Giá trị trạng thái lưu trong Google Sheet — chủ shop chọn đúng các chữ này */
export const ORDER_STATE_VALUES = {
  order: { pending: "Chờ xác nhận", confirmed: "Đã xác nhận", shipping: "Đang giao", done: "Hoàn tất", cancelled: "Đã hủy" },
  payment: { unpaid: "Chưa thanh toán", awaiting: "Chờ thanh toán", paid: "Đã thanh toán", failed: "Thanh toán thất bại" },
} as const;

export const FAQ = {
  id: "faq",
  title: "Câu hỏi thường gặp",
  items: [
    {
      id: "faq-nguyen-lieu",
      q: "Nến Luvia được phát triển từ nguyên liệu gì?",
      a: "Luvia phát triển nến thơm theo hướng sử dụng dầu ăn đã qua sử dụng sau xử lý làm một phần nguyên liệu phối trộn. Bạn có thể xem thành phần cụ thể của từng sản phẩm tại phần thông tin sản phẩm hoặc liên hệ Luvia để được giải đáp.",
    },
    {
      id: "faq-xu-ly-dau",
      q: "Dầu ăn đã qua sử dụng có được đưa thẳng vào nến không?",
      a: "Không. Trong định hướng phát triển của Luvia, dầu cần được xử lý trước khi phối trộn thành nến. Chất lượng thành phẩm còn phụ thuộc vào công thức, nguyên liệu và quá trình kiểm tra thực tế.",
    },
    {
      // ⚠️ câu mới 2026-11-12 theo góp ý nhóm khách (thầy cô có thể vặn chỗ này), chờ khách duyệt
      id: "faq-vi-sao-dau-tai-che",
      q: "Vì sao Luvia chọn làm nến từ dầu ăn đã qua sử dụng?",
      a: `${RECYCLED_OIL.why} ${RECYCLED_OIL.facts[3]}`,
    },
    {
      // ⚠️ câu mới 2026-11-12, nội dung gom từ trang Câu chuyện + infographic khách gửi, chờ khách duyệt
      id: "faq-quy-trinh-dau",
      q: "Dầu được xử lý thế nào trước khi thành nến?",
      a: `${RECYCLED_OIL.facts[0]} ${RECYCLED_OIL.facts[1]} ${RECYCLED_OIL.facts[2]} Các thông số chi tiết hơn (${RECYCLED_OIL.unknowns}) hiện chưa được công bố — bạn nhắn Luvia nếu cần trao đổi thêm.`,
    },
    {
      // ⚠️ câu trả lời viết lại 2026-11-12: bản cũ chỉ nói "bạn có thể nhắn Luvia để tìm hiểu thêm",
      //    tức là không trả lời gì. Bản mới nói rõ dầu được lọc rồi đun trộn với sáp trước khi
      //    cho tinh dầu, nhưng vẫn không hứa kết quả kiểm nghiệm nào. Chờ khách duyệt.
      id: "faq-mui-dau",
      q: "Mình lo nến còn mùi dầu cũ thì sao?",
      a: "Đây là băn khoăn dễ hiểu khi lần đầu biết đến nến từ dầu ăn đã qua sử dụng. Dầu được lọc kỹ rồi đun trộn với sáp thực vật thành hỗn hợp sáp mịn, sau đó mới cho tinh dầu thiên nhiên theo từng hương — nên mùi bạn cảm nhận khi đốt là mùi tinh dầu. Luvia chưa công bố kết quả kiểm nghiệm mùi, vì vậy nếu bạn muốn chắc chắn trước khi mua, hãy nhắn cho Luvia để trao đổi trực tiếp.",
    },
    {
      id: "faq-chon-mua",
      q: "Chưa từng mua nến thơm thì nên chọn mùa nào?",
      a: "Bạn có thể bắt đầu từ cảm giác mình muốn có trong căn phòng: Xuân tươi mới, Hạ tươi vui, Thu dịu dàng hoặc Đông sâu lắng. Nếu vẫn phân vân, hãy nhắn Lumi để cùng tìm hiểu thêm về lựa chọn của bạn.",
    },
    {
      id: "faq-giao-hang",
      q: "Bao giờ mình nhận được hàng?",
      a: "Thời gian dự kiến được hiển thị trên trang sản phẩm và tại bước đặt hàng. Với sản phẩm đặt trước, bạn kiểm tra thêm thời gian chuẩn bị được ghi trên đơn. Nếu cần làm quà vào một ngày cụ thể, hãy trao đổi với Luvia trước khi đặt.",
    },
    {
      id: "faq-tu-chon",
      q: "Mình có thể tự chọn mùi và mẫu hộp không?",
      // ⚠️ câu trả lời do tôi viết lại sau khi bỏ bộ tự chọn, chờ khách duyệt
      a: "Được. Ngay trên trang sản phẩm của mỗi mùa hương, bạn chọn mùi, quy cách và có thể thêm hộp quà kèm thiệp để viết lời nhắn, rồi xem lại giá trước khi đặt mua. Nếu muốn một mùi hoặc mẫu hộp ngoài danh mục, bạn liên hệ Luvia để được tư vấn khả năng thực hiện và báo giá.",
    },
    {
      id: "faq-lumi",
      q: "Lumi giúp mình chọn mùi như thế nào?",
      a: "Lumi là trợ lý AI tư vấn dựa trên sở thích bạn chia sẻ và thông tin mùi hương của Luvia. Bạn bấm icon Lumi ở góc dưới bên phải để trò chuyện, xem gợi ý rồi tự chọn sản phẩm mình thích.",
    },
    {
      id: "faq-dat-nhieu",
      q: "Mình có thể đặt nhiều sản phẩm để làm quà không?",
      a: "Bạn có thể gửi nhu cầu qua mục Quà tặng & Hợp tác. Luvia sẽ trao đổi về số lượng, ngân sách, cách đóng gói và thời gian dự kiến trước khi thống nhất phương án.",
    },
    {
      id: "faq-van-de",
      q: "Nếu nhận sản phẩm có vấn đề, mình liên hệ ở đâu?",
      a: "Bạn gửi thông tin đơn hàng và hình ảnh tình trạng sản phẩm tới luvia.nenthom@gmail.com hoặc liên hệ 0372 268 723. Luvia sẽ tiếp nhận và trao đổi hướng xử lý theo chính sách áp dụng cho đơn hàng.",
    },
  ],
} as const;

export const CLOSING = {
  title: "Góc nhỏ của bạn đang chờ mùa nào?",
  body: "Ghé xem bốn mùa hương, chọn một chút cảm xúc bạn muốn giữ lại hôm nay.",
  primary: { label: "Mua nến bốn mùa", href: "/san-pham" },
  secondary: { label: "Quà tặng & Hợp tác", href: "/qua-tang" },
} as const;

export const FOOTER = {
  tagline: "LUVIA — Hương thơm từ những điều tưởng chừng bỏ đi.",
  description: "Nến thơm tái chế nâng cấp từ dầu ăn đã qua sử dụng.",
  emailLabel: "Email",
  hotlineLabel: "Hotline",
  addressLabel: "Địa chỉ liên hệ",
} as const;

/**
 * ⚠️ BỐN TRANG CHÍNH SÁCH DO TÔI SOẠN 2026-11-13 — KHÁCH CHƯA DUYỆT.
 *
 * User yêu cầu "bịa 4 phần đó, tham khảo các web bán đồ hay dùng". Tôi soạn theo thông lệ
 * thương mại điện tử Việt Nam, nhưng đây là CAM KẾT PHÁP LÝ với người mua thật, nên trước
 * khi chạy quảng cáo hay bán cho khách lạ thì chủ shop phải đọc và chốt từng con số.
 *
 * Những con số LẤY TỪ DỮ LIỆU THẬT trong mã nguồn, không bịa (sửa ở đây phải sửa cả nơi gốc):
 *   - phí và thời gian giao: SHIPPING_ZONES trong `lib/site.ts`
 *   - hướng dẫn dùng, lưu ý an toàn, hạn 2 năm: CANDLE_CARE + CANDLE_STORAGE (tem packing.pdf)
 *   - phương thức thanh toán: PAYMENT_METHODS (chỉ COD và chuyển khoản, chưa có cổng online)
 *   - liên hệ: SITE.email / SITE.hotline / SITE.address
 *   - không có cookie quảng cáo hay công cụ theo dõi: đã rà toàn bộ src/, không có
 *     analytics/gtag/pixel; dự án chỉ có 6 khoá localStorage liệt kê trong mục Bảo mật
 *
 * Những con số TÔI TỰ ĐẶT, chủ shop phải chốt: 7 ngày đổi trả, 48 giờ báo lỗi vỡ,
 * 3–5 ngày làm việc hoàn tiền, 2 lần giao lại, mốc miễn phí giao 500.000₫.
 */
export const POLICIES = {
  updated: "13/11/2026",
  pendingNote: "Nội dung đang trong quá trình hoàn thiện. Vui lòng liên hệ Luvia nếu cần xác nhận trước khi đặt hàng.",
  backLabel: "Chính sách & Hỗ trợ",
  contactTitle: "Cần hỏi thêm?",
  updatedLabel: "Cập nhật lần cuối",
  docs: [
    {
      slug: "huong-dan-su-dung",
      title: "Hướng dẫn sử dụng",
      summary: "Cách đốt, cách giữ nến cháy đều và những lưu ý an toàn khi dùng nến thơm Luvia.",
      sections: [
        {
          heading: "Lần đầu thắp nến",
          body: "Lần đốt đầu tiên quyết định tuổi thọ của cả hũ nến. Hãy để nến cháy đủ lâu cho lớp sáp chảy đều ra sát thành hũ, nếu tắt sớm, sáp sẽ tạo thành một hố lõm ở giữa và những lần sau nến chỉ cháy trong cái hố đó.",
          items: [
            "Đặt nến trên bề mặt phẳng, chịu nhiệt tốt.",
            "Lần đầu đốt nên để nến cháy ít nhất 1–2 giờ.",
            "Đảm bảo không gian thông thoáng khi sử dụng.",
          ],
        },
        {
          heading: "Những lần sau",
          items: [
            "Cắt bấc còn khoảng 0,5–0,7 cm trước mỗi lần sử dụng.",
            "Bấc quá dài làm ngọn lửa cao, sinh khói đen và ám muội lên thành hũ.",
            "Dập nến bằng nắp hũ hoặc dụng cụ chụp bấc thay vì thổi, để tránh sáp nóng bắn ra và giảm khói.",
            "Dừng sử dụng khi sáp còn khoảng 1 cm dưới đáy, tránh hũ thủy tinh quá nóng.",
          ],
        },
        {
          heading: "Lưu ý an toàn",
          body: "Nến đang cháy là một ngọn lửa thật trong nhà bạn. Vài điều dưới đây không thừa:",
          items: [
            "Để xa tầm tay trẻ em và vật nuôi.",
            "Không đốt nến gần vật dễ cháy.",
            "Không để nến cháy quá lâu (tối đa 4 giờ mỗi lần).",
            "Sử dụng trên bề mặt chịu nhiệt, tránh di chuyển khi nến đang cháy.",
            "Không bao giờ để nến cháy mà không có người trông, kể cả khi đi ngủ.",
          ],
        },
        {
          heading: "Bảo quản",
          items: [
            "Để nơi khô ráo, thoáng mát.",
            "Tránh ánh nắng trực tiếp.",
            "Đậy nắp khi không dùng để hương không bay mất và bụi không bám vào mặt sáp.",
            "Hạn sử dụng: 2 năm kể từ ngày sản xuất.",
          ],
        },
        {
          heading: "Vài điều bình thường, không phải lỗi",
          body: "Nến Luvia làm từ sáp thực vật và dầu ăn tái chế nên bề mặt không mịn như sáp công nghiệp. Lớp vân trắng lấm tấm trên mặt sáp, mặt sáp hơi gồ ghề sau khi nguội, hay mùi nhạt dần ở những centimet cuối cùng đều là đặc tính của sáp tự nhiên, không ảnh hưởng tới chất lượng.",
        },
        {
          heading: "Khi nến đã cháy hết",
          body: "Rửa sạch phần sáp còn lại bằng nước ấm và xà phòng, bạn sẽ có một hũ thủy tinh để cắm bút, trồng cây nhỏ hoặc đựng đồ trang điểm. Đó cũng là tinh thần của Luvia: đồ vật nào cũng có thể sống thêm một đời nữa.",
        },
      ],
    },
    {
      slug: "chinh-sach-giao-hang",
      title: "Chính sách giao hàng",
      summary: "Phạm vi giao, phí vận chuyển theo khu vực, thời gian nhận hàng và cách xử lý khi giao không thành công.",
      sections: [
        {
          heading: "Phạm vi giao hàng",
          body: "Luvia giao hàng tới toàn bộ 34 tỉnh/thành trên cả nước thông qua đối tác vận chuyển. Hiện Luvia chưa nhận giao hàng ra nước ngoài và chưa có dịch vụ giao hỏa tốc trong ngày.",
        },
        {
          heading: "Phí vận chuyển",
          items: [
            "Nội thành Hà Nội: 25.000₫",
            "Các tỉnh miền Bắc: 30.000₫",
            "Các tỉnh/thành khác: 35.000₫",
            "Đơn hàng từ 500.000₫: miễn phí vận chuyển toàn quốc.",
          ],
          note: "Phí hiển thị ngay ở bước đặt hàng sau khi bạn chọn tỉnh/thành, bạn sẽ biết chính xác số tiền phải trả trước khi bấm xác nhận.",
        },
        {
          heading: "Thời gian nhận hàng",
          body: "Thời gian tính từ lúc đơn được xác nhận, gồm 1 ngày chuẩn bị hàng cộng với thời gian vận chuyển:",
          items: [
            "Nội thành Hà Nội: 1–2 ngày vận chuyển",
            "Các tỉnh miền Bắc: 2–3 ngày vận chuyển",
            "Các tỉnh/thành khác: 3–5 ngày vận chuyển",
          ],
          note: "Đơn tùy chỉnh mùi, hộp quà hoặc khắc lời nhắn riêng cần thêm thời gian chuẩn bị, Luvia sẽ báo bạn mốc cụ thể khi xác nhận đơn. Dịp lễ Tết và ngày cao điểm của đơn vị vận chuyển có thể chậm hơn dự kiến.",
        },
        {
          heading: "Đóng gói",
          body: "Nến đựng trong hũ thủy tinh nên dễ vỡ. Mỗi hũ được quấn chống sốc riêng, chèn kín trong hộp carton và dán niêm phong. Nếu đơn là quà tặng, Luvia đóng gói để người nhận không nhìn thấy giá, bạn chỉ cần ghi rõ trong ô Ghi chú khi đặt hàng.",
        },
        {
          heading: "Khi nhận hàng",
          body: "Luvia khuyến khích bạn quay video lúc mở hộp. Nếu hũ nến bị vỡ hoặc giao sai, đoạn video này là căn cứ để Luvia đổi lại cho bạn ngay mà không cần tranh luận.",
          items: [
            "Kiểm tra niêm phong và tình trạng bên ngoài thùng hàng trước khi ký nhận.",
            "Với đơn COD, bạn được đồng kiểm cùng nhân viên giao hàng: mở hộp xem đúng mùi, đúng số lượng rồi mới thanh toán.",
            "Nếu thùng hàng bị móp, ướt hoặc rách niêm phong, bạn có quyền từ chối nhận và báo lại cho Luvia.",
          ],
        },
        {
          heading: "Giao hàng không thành công",
          body: "Đơn vị vận chuyển sẽ liên hệ trước khi giao. Nếu không gặp được bạn, họ giao lại tối đa 2 lần. Sau 2 lần không thành công, đơn hàng được chuyển hoàn về Luvia và Luvia sẽ liên hệ với bạn để thống nhất cách xử lý. Với đơn đã chuyển khoản, Luvia hoàn lại tiền hàng, phí vận chuyển hai chiều do bên gây ra việc giao hỏng chịu.",
        },
      ],
    },
    {
      slug: "chinh-sach-doi-tra",
      title: "Chính sách đổi trả",
      summary: "Trường hợp nào được đổi trả, trong bao lâu, cần chuẩn bị gì và tiền được hoàn như thế nào.",
      sections: [
        {
          heading: "Thời hạn",
          body: "Bạn có 7 ngày kể từ ngày nhận hàng để yêu cầu đổi hoặc trả. Riêng trường hợp hũ nến vỡ hoặc giao sai, vui lòng báo Luvia trong vòng 48 giờ kèm video mở hộp để Luvia làm việc với đơn vị vận chuyển.",
        },
        {
          heading: "Được đổi hoặc trả khi",
          items: [
            "Hũ nến bị nứt, vỡ hoặc móp méo khi tới tay bạn.",
            "Giao sai mùi, sai quy cách hoặc thiếu sản phẩm so với đơn đã đặt.",
            "Lỗi từ khâu sản xuất: bấc lệch hẳn khỏi tâm làm nến không cháy được, sáp nứt vỡ thành mảng, nắp hũ không đóng kín.",
            "Hương sai lệch rõ rệt so với mô tả, hoặc nến có mùi lạ khó chịu khi vừa mở nắp.",
            "Sản phẩm đã quá hạn sử dụng ghi trên tem tại thời điểm giao.",
          ],
        },
        {
          heading: "Không áp dụng đổi trả khi",
          items: [
            "Sản phẩm đã được đốt, trừ khi lỗi chỉ lộ ra trong quá trình sử dụng (ví dụ bấc tắt liên tục dù đã cắt đúng).",
            "Quá 7 ngày kể từ ngày nhận hàng.",
            "Hũ vỡ nhưng không có video mở hộp và thùng hàng đã bị mở trước đó.",
            "Sản phẩm hư hỏng do bảo quản sai: phơi nắng, để nơi nóng ẩm làm sáp chảy, làm rơi vỡ sau khi nhận.",
            "Đơn tùy chỉnh theo yêu cầu riêng, có khắc tên hoặc lời nhắn cá nhân, trừ khi lỗi thuộc về Luvia.",
            "Bạn đổi ý về mùi hương sau khi đã đốt. Mùi là chuyện rất cá nhân, nếu chưa chắc chắn, hãy nhắn Lumi hoặc hotline để được tư vấn trước khi đặt.",
          ],
          note: "Lớp vân trắng trên mặt sáp, bề mặt hơi gồ ghề hoặc hương nhạt dần ở phần sáp cuối là đặc tính của sáp thực vật, không được tính là lỗi sản phẩm.",
        },
        {
          heading: "Các bước thực hiện",
          items: [
            "Bước 1 — Liên hệ Luvia qua hotline hoặc email trong thời hạn nêu trên, kèm mã đơn hàng.",
            "Bước 2 — Gửi ảnh hoặc video cho thấy rõ tình trạng sản phẩm và tem nhãn trên hũ.",
            "Bước 3 — Luvia phản hồi trong vòng 2 ngày làm việc, xác nhận phương án đổi hàng hoặc hoàn tiền.",
            "Bước 4 — Đóng gói sản phẩm như lúc nhận, kèm hóa đơn hoặc phiếu giao hàng nếu còn giữ, rồi gửi về theo địa chỉ Luvia hướng dẫn.",
          ],
        },
        {
          heading: "Ai chịu phí vận chuyển",
          items: [
            "Lỗi thuộc về Luvia hoặc đơn vị vận chuyển: Luvia chịu toàn bộ phí hai chiều.",
            "Bạn đổi ý hoặc đổi sang mùi khác dù hàng không lỗi: bạn chịu phí gửi về và phí gửi sản phẩm mới đi.",
          ],
        },
        {
          heading: "Hoàn tiền",
          body: "Sau khi Luvia nhận được hàng gửi về và xác nhận tình trạng, tiền được hoàn trong 3–5 ngày làm việc. Đơn chuyển khoản sẽ được hoàn về đúng tài khoản đã chuyển. Đơn COD, Luvia chuyển khoản lại theo số tài khoản bạn cung cấp. Luvia không hoàn tiền mặt trực tiếp.",
        },
      ],
    },
    {
      slug: "chinh-sach-bao-mat",
      title: "Chính sách bảo mật",
      summary: "Luvia thu thập thông tin gì, dùng để làm gì, chia sẻ với ai và bạn có quyền gì với dữ liệu của mình.",
      sections: [
        {
          heading: "Thông tin Luvia thu thập",
          items: [
            "Thông tin bạn tự điền khi đặt hàng: họ tên, số điện thoại, email, tỉnh/thành, địa chỉ nhận hàng và ghi chú đơn.",
            "Nội dung bạn trò chuyện với trợ lý Lumi.",
            "Địa chỉ IP, dùng để giới hạn số lần gửi đơn và số lượt chat từ một máy, nhằm chặn spam.",
          ],
          note: "Luvia không yêu cầu và không bao giờ lưu mật khẩu, số thẻ ngân hàng hay mã OTP của bạn. Với đơn chuyển khoản, bạn thao tác hoàn toàn trên ứng dụng ngân hàng của mình, website chỉ hiển thị mã QR.",
        },
        {
          heading: "Dùng để làm gì",
          items: [
            "Xử lý và giao đơn hàng của bạn.",
            "Liên hệ xác nhận đơn, báo tình trạng giao hàng hoặc xử lý đổi trả.",
            "Trả lời câu hỏi của bạn khi bạn chủ động liên hệ.",
          ],
          note: "Luvia không gửi email quảng cáo nếu bạn không đăng ký, và không bán hay trao đổi thông tin của bạn cho bất kỳ bên nào.",
        },
        {
          heading: "Những bên được tiếp cận thông tin",
          items: [
            "Đơn vị vận chuyển: nhận tên, số điện thoại và địa chỉ của bạn để giao hàng.",
            "Vercel: nền tảng vận hành website, lưu nhật ký kỹ thuật của máy chủ.",
            "Google Gemini: xử lý nội dung bạn chat với Lumi để tạo câu trả lời. Luvia dùng gói trả phí của Google, theo điều khoản của gói này, Google không dùng nội dung chat để huấn luyện mô hình.",
          ],
          note: "Dù vậy, bạn không nên gõ số tài khoản ngân hàng, giấy tờ tùy thân hay thông tin nhạy cảm vào khung chat với Lumi. Cần trao đổi riêng tư, hãy gọi hotline.",
        },
        {
          heading: "Dữ liệu lưu trên máy của bạn",
          body: "Website Luvia không dùng cookie quảng cáo và không cài bất kỳ công cụ theo dõi nào của bên thứ ba. Thay vào đó, trình duyệt của bạn tự lưu một số thông tin để bạn không phải nhập lại:",
          items: [
            "Giỏ hàng và sản phẩm bạn bấm Mua ngay.",
            "Thông tin bạn đã điền dở ở trang đặt hàng.",
            "Danh sách đơn bạn đã đặt trên chính máy này.",
            "Lịch sử trò chuyện với Lumi.",
          ],
          note: "Những dữ liệu này nằm trên máy bạn, Luvia không đọc được. Xóa dữ liệu duyệt web của trình duyệt là chúng biến mất. Lưu ý kèm theo: vì đơn hàng lưu trên máy, bạn mở lại link đơn bằng máy khác sẽ cần tra cứu bằng số điện thoại.",
        },
        {
          heading: "Thời gian lưu trữ",
          body: "Thông tin đơn hàng được lưu trong thời gian cần thiết để phục vụ bảo hành, đổi trả và nghĩa vụ kế toán. Khi không còn cần thiết, Luvia sẽ xóa hoặc ẩn danh dữ liệu.",
        },
        {
          heading: "Quyền của bạn",
          body: "Bạn có quyền yêu cầu Luvia cho biết đang lưu những thông tin gì về mình, sửa lại thông tin sai, hoặc xóa thông tin của bạn khỏi hệ thống. Gửi yêu cầu qua email hoặc hotline bên dưới, Luvia phản hồi trong vòng 7 ngày làm việc.",
        },
      ],
    },
  ],
} as const;

export type PolicyDoc = (typeof POLICIES.docs)[number];

export const SEO = {
  title: "Luvia | Nến thơm bốn mùa Xuân Hạ Thu Đông",
  description:
    "Khám phá nến thơm bốn mùa Luvia, tùy chọn mùi và hộp quà, nhận gợi ý từ Lumi và đặt mua trực tuyến. Một mùa hương cho góc nhỏ của bạn.",
} as const;

/** Thay {key} trong chuỗi bằng giá trị tương ứng */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in values ? String(values[k]) : m));
}
