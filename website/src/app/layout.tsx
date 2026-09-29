import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gentleyehstudio — Hire an agent. Keep your brand.",
  description:
    "AI 品牌安全視覺代理：Logo 修正、去 AI 味、放大印刷。從 AI 草稿到品牌可以放心使用的作品。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-Hant" className="antialiased">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TXGL9R0B66"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-TXGL9R0B66');`}
        </Script>
      </head>
      <body className="min-h-dvh flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
