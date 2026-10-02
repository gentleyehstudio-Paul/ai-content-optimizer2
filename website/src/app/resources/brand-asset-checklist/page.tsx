import type { Metadata } from "next";
import { ArticleLayout } from "../ArticleLayout";

export const metadata: Metadata = {
  title: "品牌素材準備清單——給第一次委託 AI 視覺的你 | Gentleyehstudio",
  description:
    "Logo 向量檔、色票、字型、品牌規範⋯⋯第一次委託 AI 品牌視覺前，備齊這份清單讓成品品質差一倍。",
};

export default function Page() {
  return (
    <ArticleLayout
      tag="品牌"
      date="2026-10-02"
      title="品牌素材準備清單——給第一次委託 AI 視覺的你"
    >
      <p>
        AI 生成圖的品質，有一半取決於你提供的素材。很多客戶第一次合作時不確定該準備什麼，這篇把完整清單整理出來，照著做就對了。
      </p>

      <h2>必備素材</h2>

      <h3>1. Logo 原始檔</h3>
      <ul>
        <li><strong>格式：</strong>AI、EPS 或 SVG（向量格式）</li>
        <li><strong>為什麼重要：</strong>AI 生成模型會把 Logo 當像素重畫，字母變形、比例走樣是最常見的問題。我們需要向量檔來「合成」而非「生成」你的 Logo</li>
        <li><strong>常見問題：</strong>只有 PNG 或 JPG 的 Logo → 我們可以協助向量化，但會增加工時</li>
      </ul>

      <h3>2. 品牌色票</h3>
      <ul>
        <li><strong>格式：</strong>Pantone 色號、CMYK 值、HEX/RGB 值</li>
        <li><strong>為什麼重要：</strong>AI 生成的顏色偏飽和且不穩定，需要手動校回品牌色</li>
        <li><strong>建議：</strong>如果有品牌手冊（Brand Guideline），直接提供最完整</li>
      </ul>

      <h3>3. 品牌字型</h3>
      <ul>
        <li><strong>格式：</strong>OTF 或 TTF 字型檔，或字型名稱</li>
        <li><strong>為什麼重要：</strong>文字排版由設計師完成（不由 AI 生成），需要正確的品牌字型</li>
      </ul>

      <h2>加分素材</h2>

      <h3>4. 過往視覺參考</h3>
      <ul>
        <li>過去的廣告、海報、社群貼文、產品包裝</li>
        <li>用途：讓我們理解你的品牌視覺語言，訓練風格一致的 LoRA 模型</li>
        <li><strong>數量：</strong>10-30 張最理想，涵蓋不同情境</li>
      </ul>

      <h3>5. 產品照片</h3>
      <ul>
        <li>實際產品的高解析照片（正面、側面、使用情境）</li>
        <li>用途：AI 生成場景時，產品以實拍合成，避免 AI 重新「發明」你的產品</li>
      </ul>

      <h3>6. 使用情境說明</h3>
      <ul>
        <li>這批視覺要用在哪裡？（社群、官網、展板、印刷品）</li>
        <li>最終輸出尺寸與格式需求</li>
        <li>有沒有必須避開的元素或風格？</li>
      </ul>

      <h2>一頁式檢查表</h2>

      <table>
        <thead>
          <tr>
            <th>項目</th>
            <th>格式</th>
            <th>必備</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Logo 向量檔</td>
            <td>AI / EPS / SVG</td>
            <td>✓</td>
          </tr>
          <tr>
            <td>品牌色票</td>
            <td>Pantone / CMYK / HEX</td>
            <td>✓</td>
          </tr>
          <tr>
            <td>品牌字型</td>
            <td>OTF / TTF / 字型名稱</td>
            <td>✓</td>
          </tr>
          <tr>
            <td>品牌手冊</td>
            <td>PDF</td>
            <td>加分</td>
          </tr>
          <tr>
            <td>過往視覺 10-30 張</td>
            <td>JPG / PNG</td>
            <td>加分</td>
          </tr>
          <tr>
            <td>產品照片</td>
            <td>高解析 JPG</td>
            <td>加分</td>
          </tr>
          <tr>
            <td>使用情境說明</td>
            <td>文字 / 簡報</td>
            <td>加分</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        不確定手邊的素材夠不夠？直接傳給我們，免費診斷時會一併盤點，告訴你還缺什麼。
      </blockquote>

      <hr />

      <p>
        準備好素材後，就可以開始免費診斷——上傳你的 AI 圖或品牌素材，設計師三個工作天內回覆完整建議。
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "品牌素材準備清單——給第一次委託 AI 視覺的你",
            description:
              "Logo 向量檔、色票、字型、品牌規範，第一次委託 AI 品牌視覺前的完整準備清單",
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
