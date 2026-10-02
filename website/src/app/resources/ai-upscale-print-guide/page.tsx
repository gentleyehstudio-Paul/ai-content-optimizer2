import type { Metadata } from "next";
import { ArticleLayout } from "../ArticleLayout";

export const metadata: Metadata = {
  title: "AI 圖怎麼放大到可印刷？300dpi 輸出完整教學 | Gentleyehstudio",
  description:
    "從 72dpi 到 300dpi、RGB 到 CMYK，完整教學把 AI 生成圖片放大到可送印品質。展板、海報、DM 適用。",
};

export default function Page() {
  return (
    <ArticleLayout
      tag="印刷"
      date="2026-10-02"
      title="AI 圖怎麼放大到可印刷？300dpi 輸出完整教學"
    >
      <p>
        AI 生成的圖片通常是 1024×1024 或 2048×2048 像素，換算下來只有 8-17 公分的印刷尺寸。要印成展板或海報，必須放大——但放大方法不對，細節會糊掉或長出不該有的東西。
      </p>

      <h2>為什麼 AI 圖不能直接印？</h2>

      <p>印刷品質的基本要求是 <strong>300dpi</strong>（每英寸 300 點）。以一張 A3 海報（29.7×42cm）為例：</p>

      <table>
        <thead>
          <tr>
            <th>輸出尺寸</th>
            <th>300dpi 需要的像素</th>
            <th>AI 原圖（1024px）對應</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A4（21×29.7cm）</td>
            <td>2480 × 3508 px</td>
            <td>約 87 dpi — 模糊</td>
          </tr>
          <tr>
            <td>A3（29.7×42cm）</td>
            <td>3508 × 4961 px</td>
            <td>約 62 dpi — 非常模糊</td>
          </tr>
          <tr>
            <td>展板（60×90cm）</td>
            <td>7087 × 10630 px</td>
            <td>約 29 dpi — 無法使用</td>
          </tr>
        </tbody>
      </table>

      <h2>放大的方法比較</h2>

      <h3>方法一：Photoshop 重新取樣</h3>
      <ul>
        <li>使用「影像 → 影像尺寸 → 保留細節 2.0」</li>
        <li>優點：操作簡單，不會改變內容</li>
        <li>缺點：放大超過 2 倍就開始模糊，細節不會增加</li>
        <li><strong>適合：</strong>放大幅度小（1.5-2 倍）的情況</li>
      </ul>

      <h3>方法二：AI 超解析度工具</h3>
      <ul>
        <li>工具：Topaz Gigapixel、Real-ESRGAN、Magnific AI</li>
        <li>優點：能「補」出細節，放大 4-8 倍仍清晰</li>
        <li>缺點：可能改變圖片內容（多出紋理、改變線條），需要人工檢查</li>
        <li><strong>適合：</strong>大幅放大（3 倍以上），但需要品質把關</li>
      </ul>

      <h3>方法三：PrintScale-AI（我們的工具）</h3>
      <ul>
        <li>專為 AI 生成圖設計的放大流程</li>
        <li>保留原圖構圖與細節，不重新生成內容</li>
        <li>輸出直接是 300dpi + CMYK，可送印</li>
        <li><strong>適合：</strong>需要直接送印的專案</li>
      </ul>

      <h2>RGB 轉 CMYK：不轉會怎樣？</h2>

      <p>
        AI 生成的圖一律是 RGB 色彩模式（螢幕用），印刷則需要 CMYK（四色印刷）。直接用 RGB 檔送印，最常見的問題：
      </p>

      <ul>
        <li><strong>綠色變暗</strong>——RGB 的鮮綠在 CMYK 中無法重現</li>
        <li><strong>藍紫色偏紅</strong>——螢幕上的亮藍印出來會偏灰紫</li>
        <li><strong>整體偏暗</strong>——CMYK 的色域比 RGB 小，高飽和色會「壓縮」</li>
      </ul>

      <p>
        建議做法：在 Photoshop 中轉換為 CMYK（編輯 → 轉換描述檔 → Japan Color 2001 Coated），轉換後以螢幕軟打樣預覽，調整偏色。
      </p>

      <h2>送印前的檢查清單</h2>

      <ol>
        <li><strong>解析度</strong>——確認 300dpi（展板可接受 150dpi）</li>
        <li><strong>色彩模式</strong>——CMYK（不是 RGB）</li>
        <li><strong>出血</strong>——四邊各加 3mm 出血</li>
        <li><strong>文字</strong>——所有文字轉外框或嵌入字型</li>
        <li><strong>黑色</strong>——大面積黑色用四色黑（C60 M40 Y40 K100），不要純 K100</li>
        <li><strong>檔案格式</strong>——PDF/X-1a 或 TIFF（問印刷廠偏好）</li>
        <li><strong>打樣</strong>——重要物料建議先數位打樣校色</li>
      </ol>

      <blockquote>
        不確定你的 AI 圖能不能印？免費試用 PrintScale-AI 三張，或上傳讓設計師診斷。
      </blockquote>

      <hr />

      <p>
        如果你的團隊經常需要將 AI 圖輸出為印刷品，可以考慮我們的企業培訓課程「AI 圖落地印刷」——3 小時學會從放大到送印的完整流程。
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "AI 圖怎麼放大到可印刷？300dpi 輸出完整教學",
            description:
              "從 72dpi 到 300dpi、RGB 到 CMYK，完整教學把 AI 生成圖片放大到可送印品質",
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
