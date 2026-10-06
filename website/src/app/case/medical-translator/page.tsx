import type { Metadata } from "next";
import { CaseLayout } from "../CaseLayout";

export const metadata: Metadata = {
  title: "醫療即時口譯 Agent — 案例 | Gentleyehstudio",
  description:
    "協助第一線醫療人員與非母語病患即時溝通。口譯延遲 < 2 秒、支援 12+ 語言、問診準確率 98%，3 天即可導入。",
};

export default function Page() {
  return (
    <CaseLayout
      category="醫療 · HEALTHCARE"
      title="醫療即時口譯"
      subtitle="MEDICAL LIVE TRANSLATOR"
      description="協助第一線醫療人員與非母語病患即時溝通，降低問診誤解與等待時間。多語言即時語音轉譯，讓溝通零時差。"
      stats={[
        { value: "< 2秒", label: "口譯延遲" },
        { value: "12+", label: "支援語言" },
        { value: "98%", label: "問診準確率" },
        { value: "3天", label: "導入時間" },
      ]}
      modules={[
        {
          title: "語音輸入",
          desc: "醫護人員以母語說明症狀與處置，系統即時擷取語音",
        },
        {
          title: "AI 即時轉譯",
          desc: "結合醫療術語庫的即時翻譯，確保專業用語準確",
        },
        {
          title: "雙向語音輸出",
          desc: "患者以母語聽取說明並回應，雙向溝通無障礙",
        },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "醫療即時口譯 Agent — 案例",
            description:
              "協助第一線醫療人員與非母語病患即時溝通，口譯延遲低於 2 秒",
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
