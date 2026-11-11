import OrderStatusClient from "./OrderStatusClient";

/* Trang này hiện tên, số điện thoại, địa chỉ của khách. robots.txt chỉ là lời đề nghị,
   thẻ noindex mới là thứ bắt buộc bot tuân theo — giữ cả hai. */
export const metadata = {
  title: "Trạng thái đơn hàng",
  robots: { index: false, follow: false },
};

/** Mã đơn chỉ có sau khi khách đặt hàng → render theo request, không prerender lúc build */
export const instant = false;

export default async function OrderStatusPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <OrderStatusClient code={decodeURIComponent(code)} />;
}
