import type { Metadata } from "next";
import { ArticleLayout } from "../ArticleLayout";

export const metadata: Metadata = {
  title: "AI 生成圖可以商用嗎？完整授權指南 | Gentleyehstudio",
  description:
    "Midjourney、DALL-E、Stable Diffusion 商用授權條件完整比較。附採購與法務可用的授權檢查清單，中小企業必讀。",
};

export default function Page() {
  return (
    <ArticleLayout
      tag="授權"
      date="2026-10-02"
      title="AI 生成圖可以商用嗎？完整授權指南"
    >
      <p>
        AI 生成圖片越來越好用，但「可以商用嗎？」是每個行銷與採購部門最常問的問題。不同工具的授權條件差異很大，搞錯可能造成法律風險。這篇整理主流工具的商用規則，讓你一次看清楚。
      </p>

      <h2>主流工具授權比較</h2>

      <table>
        <thead>
          <tr>
            <th>工具</th>
            <th>免費版可商用？</th>
            <th>付費版可商用？</th>
            <th>注意事項</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Midjourney</strong></td>
            <td>不可</td>
            <td>可（付費訂閱）</td>
            <td>年營收超過 100 萬美元需 Pro 以上方案</td>
          </tr>
          <tr>
            <td><strong>DALL-E (OpenAI)</strong></td>
            <td>可</td>
            <td>可</td>
            <td>生成圖的權利歸使用者所有</td>
          </tr>
          <tr>
            <td><strong>Stable Diffusion</strong></td>
            <td>可（開源）</td>
            <td>依模型授權</td>
            <td>不同微調模型（checkpoint）授權不同，需逐一確認</td>
          </tr>
          <tr>
            <td><strong>Adobe Firefly</strong></td>
            <td>有限制</td>
            <td>可</td>
            <td>訓練資料來自授權素材，商用風險較低</td>
          </tr>
        </tbody>
      </table>

      <h2>商用前必須確認的 5 件事</h2>

      <ol>
        <li><strong>使用的模型授權條款</strong>——不是所有 AI 工具都允許商用，免費版與付費版規定通常不同</li>
        <li><strong>是否包含可辨識的品牌元素</strong>——AI 可能生成類似真實品牌的 Logo 或產品，這有商標侵權風險</li>
        <li><strong>是否包含可辨識的人臉</strong>——即使是 AI 生成的臉，在某些法域仍有肖像權疑慮</li>
        <li><strong>是否用於註冊商標或專利</strong>——大多數工具的條款不允許將生成物註冊為商標</li>
        <li><strong>輸出是否經過後製</strong>——純 AI 生成物的著作權保護在多國仍有爭議，加入人類創作的後製可強化權利主張</li>
      </ol>

      <h2>給採購與法務的檢查清單</h2>

      <p>當供應商交付的視覺包含 AI 生成內容時，建議要求以下資訊：</p>

      <ul>
        <li>使用的 AI 工具名稱與版本</li>
        <li>帳號的訂閱方案（證明有商用授權）</li>
        <li>生成時使用的 Prompt（證明原創性）</li>
        <li>後製說明（人類介入的程度與方式）</li>
        <li>是否使用自訓練模型（LoRA / 微調），若有，訓練素材的來源與授權</li>
      </ul>

      <blockquote>
        Gentleyehstudio 的每份交付都附上使用模型與授權說明，讓法務與採購可以放心。
      </blockquote>

      <h2>台灣的法律現況</h2>

      <p>
        截至目前，台灣智慧財產局的見解是：純 AI 生成物因缺乏「人類精神創作」，不受著作權法保護。但如果人類在 Prompt 設計、素材選擇、後製修改上有實質貢獻，仍可能主張著作權。
      </p>
      <p>
        這意味著：<strong>單純用 AI 生成的圖，你無法阻止他人使用相同或類似的圖片</strong>。如果你的品牌視覺需要獨佔性與保護力，後製加工與人類創作介入是必要的。
      </p>

      <hr />

      <p>
        需要更進一步的協助？Gentleyehstudio 提供免費診斷——上傳你的 AI 圖，設計師會告訴你授權狀態與建議的處理方式。
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "AI 生成圖可以商用嗎？完整授權指南",
            description:
              "Midjourney、DALL-E、Stable Diffusion 商用授權條件完整比較，附採購與法務可用的檢查清單",
            author: {
              "@type": "Person",
              name: "葉致綱",
              alternateName: "Paul Yeh",
            },
            publisher: {
              "@type": "Organization",
              name: "Gentleyehstudio",
              url: "https://www.gentleyehdesign.com",
            },
            datePublished: "2026-10-02",
            inLanguage: "zh-TW",
          }),
        }}
      />
    </ArticleLayout>
  );
}
