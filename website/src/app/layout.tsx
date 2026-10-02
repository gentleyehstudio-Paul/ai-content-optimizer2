import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gentleyehdesign.com"),
  title: "Gentleyehstudio — Hire an agent. Keep your brand.",
  description:
    "AI 品牌安全視覺代理：Logo 修正、去 AI 味、放大印刷。從 AI 草稿到品牌可以放心使用的作品。",
  openGraph: {
    title: "Gentleyehstudio — Hire an agent. Keep your brand.",
    description:
      "AI 品牌安全視覺代理：Logo 修正、去 AI 味、放大印刷。從 AI 草稿到品牌可以放心使用的作品。",
    siteName: "Gentleyehstudio",
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gentleyehstudio — Hire an agent. Keep your brand.",
    description:
      "AI 品牌安全視覺代理：Logo 修正、去 AI 味、放大印刷。從 AI 草稿到品牌可以放心使用的作品。",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Gentleyehstudio",
              legalName: "居葉國際文化有限公司",
              url: "https://www.gentleyehdesign.com",
              description:
                "AI 品牌安全視覺代理與企業培訓：Logo 修正、去 AI 味、放大印刷、AI 視覺應用課程",
              founder: {
                "@type": "Person",
                name: "葉致綱",
                alternateName: "Paul Yeh",
                jobTitle: "品牌設計師 · AI 應用規劃師",
              },
              knowsAbout: [
                "AI 圖片生成",
                "品牌設計",
                "AI 企業培訓",
                "中小企業 AI 數位轉型",
                "印刷輸出",
              ],
              areaServed: { "@type": "Country", name: "TW" },
              sameAs: [
                "https://www.linkedin.com/in/paul-yeh-82a185154/",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
