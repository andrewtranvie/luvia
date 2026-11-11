import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Patrick_Hand } from "next/font/google";
import "./globals.css";
import { ShopCartProvider } from "@/lib/shop-cart";
import { ThemeProvider } from "@/lib/themeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { SEO } from "@/content/vi";
import { SITE } from "@/lib/site";

// Stitch dùng Plus Jakarta Sans cho toàn bộ thang chữ — giữ đúng để khớp bản thiết kế.
const body = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

const hand = Patrick_Hand({
  variable: "--font-hand-script",
  subsets: ["latin", "vietnamese"],
  weight: "400",
});

export const metadata: Metadata = {
  /* Thiếu metadataBase thì Next sinh ảnh og:image dạng đường dẫn tương đối
     ("/brand/og-cover.jpg"), mà Facebook/Zalo bắt buộc URL tuyệt đối → share link
     ra không có ảnh bìa. SITE.url đọc NEXT_PUBLIC_SITE_URL, phải đặt biến này trên
     Vercel; thiếu nó thì mọi link tuyệt đối trên production hoá thành localhost:3000. */
  metadataBase: new URL(SITE.url),
  title: {
    default: SEO.title,
    template: "%s · Luvia",
  },
  description: SEO.description,
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    images: ["/brand/og-cover.jpg"],
    locale: "vi_VN",
    type: "website",
    siteName: SITE.name,
  },
};
// Favicon / app icon: dùng quy ước file của Next (src/app/favicon.ico, icon.png, apple-icon.png)
// sinh từ logo chính thức trong public/brand/logo-icon.png.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" data-style="clay3d" className={`${body.variable} ${hand.variable} h-full antialiased`}>
      <head>
        {/* Icon font của bản thiết kế Stitch */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col bg-surface font-sans text-body-md text-on-surface">
        <ShopCartProvider>
          <ThemeProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ChatWidget />
          </ThemeProvider>
        </ShopCartProvider>
      </body>
    </html>
  );
}
