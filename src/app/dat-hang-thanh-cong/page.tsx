import { redirect } from "next/navigation";

/** Đường dẫn cũ — trạng thái đơn hiện xem tại /don-hang/[mã đơn] */
export default function LegacyOrderSuccessPage() {
  redirect("/gio-hang");
}
