import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * Next sinh /robots.txt từ file này.
 *
 * Chặn nhóm trang mua hàng vì hai lý do: chúng không có nội dung để tìm kiếm
 * (giỏ hàng, thanh toán đều phụ thuộc từng người), và /don-hang/[code] hiển thị
 * đơn hàng kèm tên, số điện thoại, địa chỉ của khách — tuyệt đối không để Google
 * đánh chỉ mục. Mã đơn tuy khó đoán nhưng khách hay tự dán link đi nơi khác,
 * đó là đường để bot lần ra.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/gio-hang", "/dat-hang", "/thanh-toan", "/dat-hang-thanh-cong", "/don-hang/", "/api/"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
