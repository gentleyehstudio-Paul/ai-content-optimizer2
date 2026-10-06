import type { Metadata } from "next";
import { CaseLayout } from "../CaseLayout";

export const metadata: Metadata = {
  title: "LINE OA 客服機器人 Agent — 案例 | Gentleyehstudio",
  description:
    "串接 LINE 官方帳號，自動處理訂單查詢、常見問題與預約流程。平均回覆 < 5 秒，客服工時節省 60%，上線 50+ 門市。",
};

export default function Page() {
  return (
    <CaseLayout
      category="客服 · CUSTOMER SERVICE"
      title="LINE OA 客服機器人"
      subtitle="CONVERSATIONAL AGENT"
      description="串接 LINE 官方帳號，自動處理訂單查詢、常見問題與預約流程。24 小時不間斷服務，接手重複性詢問。"
      stats={[
        { value: "< 5秒", label: "平均回覆時間" },
        { value: "92%", label: "問題涵蓋率" },
        { value: "-60%", label: "客服工時節省" },
        { value: "50+", label: "上線門市數" },
      ]}
      modules={[
        {
          title: "意圖辨識",
          desc: "自動判斷客戶訊息類型：訂單查詢、預約、退換貨、常見問題",
        },
        {
          title: "自動回覆",
          desc: "依據知識庫即時回覆，複雜問題自動轉接真人客服",
        },
        {
          title: "數據回饋",
          desc: "記錄常見問題與客戶滿意度，持續優化回覆品質",
        },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "LINE OA 客服機器人 Agent — 案例",
            description:
              "串接 LINE 官方帳號自動處理訂單查詢與預約，客服工時節省 60%",
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
