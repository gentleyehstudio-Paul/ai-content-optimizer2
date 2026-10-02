import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "資源 — AI 品牌應用指南與教學 | Gentleyehstudio",
  description:
    "AI 圖片商用授權、品牌素材準備清單、AI 圖放大印刷教學。免費下載，中小企業 AI 數位轉型的實用資源。",
};

const ARTICLES = [
  {
    slug: "ai-image-licensing-guide",
    tag: "授權",
    title: "AI 生成圖可以商用嗎？完整授權指南",
    desc: "Midjourney、DALL-E、Stable Diffusion 的商用條件一次看清楚，附採購與法務可用的檢查清單",
    date: "2026-10-02",
  },
  {
    slug: "brand-asset-checklist",
    tag: "品牌",
    title: "品牌素材準備清單——給第一次委託 AI 視覺的你",
    desc: "Logo 向量檔、色票、字型、品牌規範⋯⋯交付前備齊這些，成品品質差一倍",
    date: "2026-10-02",
  },
  {
    slug: "ai-upscale-print-guide",
    tag: "印刷",
    title: "AI 圖怎麼放大到可印刷？300dpi 輸出完整教學",
    desc: "從 72dpi 到 300dpi、RGB 到 CMYK，一步步帶你把 AI 圖變成送印檔案",
    date: "2026-10-02",
  },
];

export default function ResourcesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="bg-paper"
        style={{
          paddingTop: "clamp(120px, 14vw, 200px)",
          paddingBottom: "clamp(48px, 6vw, 80px)",
        }}
      >
        <div className="max-w-[880px] mx-auto px-5">
          <p className="text-[11px] tracking-[.16em] uppercase font-medium text-text-secondary mb-6">
            RESOURCES
          </p>
          <h1
            className="font-bold text-ink"
            style={{
              fontSize: "clamp(32px, 4.4vw, 60px)",
              lineHeight: 1.08,
              letterSpacing: "-.025em",
            }}
          >
            資源
          </h1>
          <p className="text-text-secondary text-[16px] mt-4 max-w-lg leading-relaxed">
            AI 視覺應用的實用指南——授權、品牌素材、印刷輸出，免費閱讀
          </p>
        </div>
      </section>

      {/* ── Article List ── */}
      <section
        className="bg-paper"
        style={{
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[880px] mx-auto px-5">
          <div className="flex flex-col">
            {ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/resources/${article.slug}`}
                className="group py-8 border-b border-hairline flex flex-col gap-3 hover:no-underline"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[11px] tracking-[.14em] uppercase font-medium text-red">
                    {article.tag}
                  </span>
                  <span className="text-[12px] text-text-muted">
                    {article.date}
                  </span>
                </div>
                <h2 className="text-[22px] font-bold text-ink group-hover:text-red transition-colors leading-snug">
                  {article.title}
                </h2>
                <p className="text-[15px] text-text-secondary leading-relaxed">
                  {article.desc}
                </p>
                <span className="text-[14px] font-semibold text-ink group-hover:text-red transition-colors mt-1">
                  閱讀全文 →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="bg-dark text-white"
        style={{
          paddingTop: "clamp(72px, 9vw, 128px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[760px] mx-auto px-5 text-center">
          <p className="text-[11px] tracking-[.16em] text-white/50 uppercase mb-4">
            NEED HELP?
          </p>
          <h2
            className="font-bold"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
          >
            想了解更多？
          </h2>
          <p className="text-white/50 text-[14px] mt-3 leading-relaxed max-w-md mx-auto">
            從免費診斷開始——上傳你的 AI 圖，設計師親自看圖回覆
          </p>
          <a
            href="/agents#diagnose"
            className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-white text-ink font-semibold text-[15px] rounded-full hover:bg-red hover:text-white transition-colors"
          >
            免費診斷
          </a>
        </div>
      </section>
    </>
  );
}
