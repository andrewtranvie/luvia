/**
 * ⚠️ DỮ LIỆU MINH HỌA — KHÔNG PHẢI SỐ LIỆU THẬT CỦA SHOP ⚠️
 *
 * Đánh giá, lượt bán, lượt thích, tỉ lệ giảm giá và tồn kho dưới đây đều do
 * dựng giao diện mà bịa ra, khách hàng CHƯA cung cấp. Giữ hết ở một file để
 * khi có số thật thì xóa nguyên file này và sửa đúng những chỗ báo lỗi biên dịch.
 *
 * Cố ý KHÔNG để trong `catalog.ts` — file đó quy định "không thêm số sao, đánh giá
 * hay khẳng định an toàn khi chưa có căn cứ".
 * Cũng cố ý KHÔNG để trong `vi.ts` — file đó chỉ chứa câu chữ khách đã duyệt.
 *
 * Giá thì NGƯỢC LẠI: luôn lấy từ `catalog.ts`. `discount` ở đây chỉ dùng để tính
 * ngược ra giá gạch ngang hiển thị, không bao giờ làm thay đổi số tiền khách trả.
 */
import { getSeason, type SeasonId } from "@/lib/catalog";

export const DEMO_PRODUCT = {
  /** Tính ngược giá gạch ngang: giá gốc = giá bán / (1 - discount), làm tròn nghìn */
  discount: 0.15,
  soldCount: "1k+",
  likes: 66,
  /**
   * Tồn kho hiển thị, dùng để chặn số lượng tối đa đặt được.
   * Shop chốt để chung một con số cho mọi mùa × quy cách, không phân biệt.
   * Khi có kho thật thì đổi `demoStock` bên dưới sang tra theo mùa × quy cách.
   */
  stock: 100,
  reviews: [
    {
      name: "Thu Hà",
      stars: 5,
      seasonId: "xuan",
      date: "12/10/2026",
      text: "Mùi Ban Mai tươi mát, sáng nào làm việc ở nhà mình cũng đốt một chút, thấy tỉnh táo hẳn.",
    },
    {
      name: "Minh Khoa",
      stars: 5,
      seasonId: "dong",
      date: "08/10/2026",
      text: "Mộc Trầm ấm và trầm, không bị hắc. Mua làm quà, hộp in đẹp, đóng gói kỹ không vỡ.",
    },
    {
      name: "Lan Anh",
      stars: 4,
      seasonId: "ha",
      date: "02/10/2026",
      text: "Hương sen dịu, dễ ngủ. Lần đầu mình đốt chưa đủ lâu nên hơi lõm giữa, lần sau làm đúng hướng dẫn thì ổn.",
    },
    {
      name: "Quỳnh",
      stars: 5,
      seasonId: "thu",
      date: "28/09/2026",
      text: "Bạch Trà thanh, hợp để bàn làm việc. Bấc cotton cháy đều, không khói đen.",
    },
    {
      name: "Bảo Ngọc",
      stars: 5,
      seasonId: "ha",
      date: "21/09/2026",
      text: "Mùi sen rất tự nhiên, không ngọt gắt. Sẽ mua thêm quy cách 200 g.",
    },
    {
      name: "Đức Anh",
      stars: 5,
      seasonId: "xuan",
      date: "15/09/2026",
      text: "Giao nhanh, nến cháy đều. Hũ 100 g đốt được khá lâu so với giá.",
    },
  ] as { name: string; stars: number; seasonId: SeasonId; date: string; text: string }[],
} as const;

/** Điểm sao và số lượt đánh giá tính từ mảng reviews, không ghi tay để khỏi lệch nhau */
export const DEMO_REVIEW_COUNT = DEMO_PRODUCT.reviews.length;
export const DEMO_RATING =
  Math.round((DEMO_PRODUCT.reviews.reduce((s, r) => s + r.stars, 0) / DEMO_REVIEW_COUNT) * 10) / 10;

/** Tồn kho một tổ hợp mùa × quy cách; quy cách mùa đó không bán thì coi như hết hàng */
export const demoStock = (seasonId: SeasonId, variantId: string): number =>
  getSeason(seasonId)?.variants.includes(variantId) ? DEMO_PRODUCT.stock : 0;

/** Giá gạch ngang suy ra từ giá bán thật trong catalog.ts, làm tròn nghìn */
export const demoOriginalPrice = (price: number) =>
  Math.round(price / (1 - DEMO_PRODUCT.discount) / 1000) * 1000;
