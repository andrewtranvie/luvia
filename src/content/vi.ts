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
  title: "Một mùa hương cho góc nhỏ của bạn.",
  body: "Có ngày bạn muốn căn phòng tươi mới hơn. Có ngày chỉ cần một chút ấm áp để chậm lại. Khám phá Xuân – Hạ – Thu – Đông cùng Luvia, thương hiệu nến thơm tái chế nâng cấp từ dầu ăn đã qua sử dụng.",
  primary: { label: "Mua nến bốn mùa", href: "/san-pham" },
  secondary: { label: "Quà tặng & Hợp tác", href: "/qua-tang" },
  askLumi: "Chưa biết chọn mùi? Hỏi Lumi",
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

/** Nội dung riêng của từng mùa (thẻ sản phẩm + trang chi tiết) */
export const SEASON_COPY = {
  xuan: {
    season: "Xuân",
    name: "Ban Mai",
    nameEn: "Morning Air",
    concept: "Khi mọi thứ lại bắt đầu",
    headline: "Khi những khởi đầu mới khẽ gõ cửa",
    mood: "Hồi sinh · Tươi mới · Hy vọng",
    description:
      "Ban Mai mang theo cảm giác tươi mát, trong trẻo của làn gió sớm, gợi nhớ khoảnh khắc vạn vật dần thức giấc sau giấc ngủ đông. Không quá vội vàng, cũng chẳng cần rực rỡ.",
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
      "Liên Hương lấy cảm hứng từ vẻ đẹp thanh khiết của hoa sen, mang theo chút nữ tính, mềm mại và mơ mộng — như nét dịu dàng, trong trẻo của những rung động đầu tiên.",
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
      "Bạch Trà gợi lên cảm giác thanh tao, dịu nhẹ và một chút ấm áp giữa những ngày trời chuyển lạnh: những bông hoa trắng bên khung cửa, những tán phong đỏ nơi phương xa.",
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
      "Mộc Trầm mang cảm giác ấm áp, sâu lắng từ hương gỗ tuyết tùng, gợi nhớ những ngôi nhà gỗ bình yên giữa mùa đông. Một chút hoài niệm, một chút trầm tư, nhưng không hề cô đơn.",
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
  quickReplies: ["Chọn cho mình", "Chọn làm quà", "Mình chưa biết chọn mùi"],
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
      id: "faq-mui-dau",
      q: "Mình lo nến còn mùi dầu cũ thì sao?",
      a: "Đây là một băn khoăn dễ hiểu khi lần đầu biết đến nến từ dầu ăn đã qua sử dụng. Bạn có thể nhắn Luvia để tìm hiểu thêm thông tin nguyên liệu và khả năng trải nghiệm mùi trước khi chọn. Việc xử lý nguyên liệu và đánh giá mùi thành phẩm là những phần cần được làm rõ cho từng sản phẩm.",
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
  /** Các liên kết khách yêu cầu nhưng CHƯA có nội dung — chỉ hiện khi href khác null (cấu hình trong site.ts) */
  pendingLinks: ["Hướng dẫn sử dụng", "Chính sách giao hàng", "Chính sách đổi trả", "Chính sách bảo mật"],
} as const;

export const SEO = {
  title: "Luvia | Nến thơm bốn mùa Xuân Hạ Thu Đông",
  description:
    "Khám phá nến thơm bốn mùa Luvia, tùy chọn mùi và hộp quà, nhận gợi ý từ Lumi và đặt mua trực tuyến. Một mùa hương cho góc nhỏ của bạn.",
} as const;

/** Thay {key} trong chuỗi bằng giá trị tương ứng */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in values ? String(values[k]) : m));
}
