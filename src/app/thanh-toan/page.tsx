import { redirect } from "next/navigation";

/** Đường dẫn cũ — luồng đặt hàng hiện nằm ở /dat-hang */
export default function LegacyCheckoutPage() {
  redirect("/dat-hang");
}
