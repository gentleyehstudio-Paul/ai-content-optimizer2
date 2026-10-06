import type { Metadata } from "next";
import { CaseLayout } from "../CaseLayout";

export const metadata: Metadata = {
  title: "餐飲業營運指標 Agent — 案例 | Gentleyehstudio",
  description:
    "彙整各門店營收、出餐與庫存數據，管理者一眼掌握全店營運狀況。營收成長 +18%，出餐效率 +25%，導入 30+ 門店。",
};

export default function Page() {
  return (
    <CaseLayout
      category="餐飲 · FOOD & BEVERAGE"
      title="餐飲業營運指標"
      subtitle="OPERATIONS DASHBOARD"
      description="彙整各門店營收、出餐與庫存數據，管理者一眼掌握全店營運狀況。即時數據驅動決策，提升整體營運效率。"
      stats={[
        { value: "+18%", label: "營收成長" },
        { value: "+25%", label: "出餐效率" },
        { value: "30+", label: "導入門店數" },
        { value: "即時", label: "數據更新頻率" },
      ]}
      modules={[
        {
          title: "數據串接",
          desc: "自動彙整 POS、外送平台、庫存系統的即時數據",
        },
        {
          title: "指標儀表板",
          desc: "營收、出餐速度、庫存水位等關鍵指標一目瞭然",
        },
        {
          title: "異常示警",
          desc: "營收異常下滑、庫存即將斷貨時即時通知管理者",
        },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "餐飲業營運指標 Agent — 案例",
            description:
              "彙整各門店營收、出餐與庫存數據，營收成長 18%，導入 30+ 門店",
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
