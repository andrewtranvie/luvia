import type { MetadataRoute } from "next";
import { SEASONS } from "@/lib/catalog";
import { SITE } from "@/lib/site";

/**
 * Next sinh /sitemap.xml từ file này.
 *
 * Chỉ liệt kê trang có nội dung thật. Nhóm giỏ hàng / thanh toán / đơn hàng nằm
 * ngoài danh sách và đã bị chặn trong robots.ts. Trang sản phẩm đọc từ SEASONS
 * nên thêm hay bớt mùi hương trong catalog là sitemap tự đúng theo.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    priority,
  });

  return [
    page("", 1),
    page("/san-pham", 0.9),
    ...SEASONS.map((s) => page(`/san-pham/${s.id}`, 0.8)),
    page("/qua-tang", 0.7),
    page("/cau-chuyen", 0.6),
    page("/tu-van", 0.6),
  ];
}
