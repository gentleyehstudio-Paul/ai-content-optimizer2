import type { Metadata } from "next";
import { CaseLayout } from "../CaseLayout";

export const metadata: Metadata = {
  title: "印刷校對系統 Agent — 案例 | Gentleyehstudio",
  description:
    "自動比對印前檔案與規格書，於送印前攔截色彩、尺寸與文字錯誤。校稿時間減少 70%，錯誤攔截率 99.2%。",
};

export default function Page() {
  return (
    <CaseLayout
      category="印刷 · PRINTING"
      title="印刷校對系統"
      subtitle="PREFLIGHT CHECKER"
      description="自動比對印前檔案與規格書，於送印前攔截色彩、尺寸與文字錯誤。大幅降低退件率與重印成本。"
      stats={[
        { value: "-70%", label: "校稿時間" },
        { value: "99.2%", label: "錯誤攔截率" },
        { value: "8+", label: "支援檔案格式" },
        { value: "500+", label: "月處理稿件量" },
      ]}
      modules={[
        {
          title: "上傳檔案",
          desc: "支援 PDF、AI、PSD、INDD 等 8 種以上常見印前格式",
        },
        {
          title: "自動比對",
          desc: "與規格書逐項比對色彩模式、解析度、出血、文字外框等項目",
        },
        {
          title: "錯誤報告",
          desc: "生成視覺化校對報告，標註問題位置與建議修正方式",
        },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "印刷校對系統 Agent — 案例",
            description:
              "自動比對印前檔案與規格書，校稿時間減少 70%，錯誤攔截率 99.2%",
            author: {
              "@type": "Organization",
              name: "Gentleyehstudio",
            },
            publisher: {
              "@type": "Organization",
              name: "Gentleyehstudio",
              url: "https://www.gentleyehdesign.com",
            },
            inLanguage: "zh-TW",
          }),
        }}
      />
    </CaseLayout>
  );
}
