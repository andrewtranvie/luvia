import type { Metadata } from "next";
import { Be_Vietnam_Pro, Patrick_Hand } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { ThemeProvider } from "@/lib/themeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ThemeModeFloatingBar from "@/components/ThemeModeFloatingBar";

const body = Be_Vietnam_Pro({
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
  title: {
    default: "Luvia — Nến thơm từ dầu ăn tái chế",
    template: "%s · Luvia",
  },
  description:
    "Luvia — nến thơm thủ công làm từ dầu ăn tái chế, thân thiện với môi trường. Lan tỏa ánh sáng xanh cùng Luvia.",
  openGraph: {
    title: "Luvia — Nến thơm từ dầu ăn tái chế",
    description: "Lan tỏa ánh sáng xanh cùng Luvia 🌿",
    images: ["/brand/brand-board.jpg"],
    locale: "vi_VN",
  },
  icons: { icon: "/brand/logo-icon.jpg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${body.variable} ${hand.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <CartProvider>
          <ThemeProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ChatWidget />
            <ThemeModeFloatingBar />
          </ThemeProvider>
        </CartProvider>
      </body>
    </html>
  );
}
