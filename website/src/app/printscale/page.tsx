"use client";

import { BeforeAfter } from "@/components/BeforeAfter";
import Image from "next/image";

const SPECS = [
  { label: "解析度", value: "300 dpi" },
  { label: "輸出尺寸", value: "展板・海報・DM", note: "上限待定" },
  { label: "格式", value: "PNG・TIFF・PDF" },
  { label: "色彩", value: "RGB → CMYK" },
];

const STEPS = [
  {
    num: "01",
    title: "上傳 AI 圖",
    desc: "JPG 或 PNG，一次最多三張",
  },
  {
    num: "02",
    title: "選擇用途",
    desc: "印刷、展板或社群，自動套用尺寸與色彩",
  },
  {
    num: "03",
    title: "下載可印刷檔",
    desc: "附上使用模型與授權說明",
  },
];

const PRICING = [
  {
    tag: "FREE TRIAL",
    name: "免費試用",
    price: "3 張",
    desc: "留下 Email 即可開始",
    featured: true,
  },
  {
    tag: "PAY PER USE",
    name: "單次",
    price: "NT$ 3,800",
    desc: "臨時要送印的專案",
    featured: false,
  },
  {
    tag: "SUBSCRIPTION",
    name: "訂閱",
    price: "NT$ 680 / 月",
    desc: "行銷團隊的固定產能",
    featured: false,
  },
];

const FAQ = [
  {
    q: "放大後會變成另一張圖嗎？",
    a: "不會——放大以保留原圖構圖與細節為優先，不重新生成內容",
  },
  {
    q: "可以直接送印嗎？",
    a: "可以——輸出 CMYK 檔，重要物料建議先打樣校色，Miles 也能協助",
  },
  {
    q: "試用需要綁卡嗎？",
    a: "不需要，只要一個 Email",
  },
];

export default function PrintScalePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="bg-paper"
        style={{
          paddingTop: "clamp(120px, 14vw, 200px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-5">
          <p className="text-[11px] tracking-[.16em] uppercase font-medium text-text-secondary mb-6">
            PRINTSCALE-AI · A TOOL BY MILES
          </p>
          <h1
            className="font-bold text-ink"
            style={{
              fontSize: "clamp(32px, 4.4vw, 60px)",
              lineHeight: 1.04,
              letterSpacing: "-.025em",
            }}
          >
            AI 圖放大到可印刷品質
          </h1>
          <p className="text-text-secondary text-[16px] mt-4 max-w-lg leading-relaxed">
            不只生成，更要能用——把 AI 圖提升到
            300dpi，細節清楚、不長出不該有的東西
          </p>
          <a
            href="#trial"
            className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-ink text-white font-semibold text-[15px] rounded-full hover:bg-red transition-colors"
          >
            免費試用 3 張
          </a>

          <div className="mt-12">
            <BeforeAfter
              beforeSrc="/assets/upscale-before.jpg"
              afterSrc="/assets/upscale-after.jpg"
              beforeLabel="72 DPI"
              afterLabel="300 DPI"
              ratio="16/9"
            />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <p className="text-[12px] text-text-muted">
              局部放大 ×3 — 左：原圖　右：PrintScale
            </p>
          </div>
        </div>
      </section>

      {/* ── Specs + Steps ── */}
      <section
        className="bg-paper-alt"
        style={{
          paddingTop: "clamp(72px, 9vw, 128px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {SPECS.map((spec) => (
              <div key={spec.label} className="py-4 border-t border-hairline">
                <p className="text-[11px] tracking-[.14em] text-text-secondary uppercase mb-2">
                  {spec.label}
                </p>
                <p
                  className="font-bold text-ink"
                  style={{ fontSize: "clamp(22px, 2.4vw, 30px)" }}
                >
                  {spec.value}
                </p>
                {spec.note && (
                  <p className="text-[11px] text-text-muted mt-1">
                    {spec.note}
                  </p>
                )}
              </div>
            ))}
          </div>

          <h2
            className="font-bold text-ink mb-10"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
          >
            三步完成
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step) => (
              <div key={step.num} className="flex flex-col gap-3">
                <span className="text-red font-bold text-[44px] leading-none">
                  {step.num}
                </span>
                <h3 className="text-[18px] font-bold text-ink">{step.title}</h3>
                <p className="text-[14px] text-text-secondary leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section
        className="bg-paper"
        style={{
          paddingTop: "clamp(72px, 9vw, 128px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-5">
          <h2
            className="font-bold text-ink mb-3"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
          >
            方案與價格
          </h2>
          <p className="text-[12px] text-text-muted mb-10">
            所有方案均含 CMYK 轉檔與授權說明
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map((plan) => (
              <div
                key={plan.tag}
                className={`rounded-[18px] p-8 border ${
                  plan.featured
                    ? "bg-dark text-white border-dark"
                    : "bg-white border-hairline"
                }`}
              >
                <p
                  className={`text-[11px] tracking-[.16em] uppercase mb-4 ${
                    plan.featured ? "text-white/50" : "text-text-secondary"
                  }`}
                >
                  {plan.tag}
                </p>
                <h3 className="text-[20px] font-bold">{plan.name}</h3>
                <p
                  className="font-bold mt-2"
                  style={{ fontSize: "clamp(30px, 3.4vw, 44px)" }}
                >
                  {plan.price}
                </p>
                <p
                  className={`text-[14px] mt-3 ${
                    plan.featured ? "text-white/60" : "text-text-secondary"
                  }`}
                >
                  {plan.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        className="bg-paper-alt"
        style={{
          paddingTop: "clamp(72px, 9vw, 128px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[880px] mx-auto px-5">
          <h2
            className="font-bold text-ink mb-8"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
          >
            常見問題
          </h2>
          <div className="flex flex-col">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="border-b border-hairline group"
              >
                <summary className="flex items-center justify-between py-5 cursor-pointer list-none text-[17px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="text-red text-[20px] ml-4 shrink-0 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="pb-5 text-[15px] text-text-secondary leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        id="trial"
        className="bg-dark text-white"
        style={{
          paddingTop: "clamp(72px, 9vw, 128px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[760px] mx-auto px-5 text-center">
          <p className="text-[11px] tracking-[.16em] text-white/50 uppercase mb-4">
            FREE TRIAL
          </p>
          <h2
            className="font-bold"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
          >
            免費試用 3 張
          </h2>
          <form
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Email"
              className="flex-1 px-5 py-3 rounded-sm text-[15px] outline-none"
              style={{
                background: "#252e26",
                border: "1px solid #4a554b",
                color: "#f2f2ed",
              }}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-ink text-[14px] font-semibold rounded-sm hover:bg-red hover:text-white transition-colors flex items-center gap-3 justify-center"
            >
              開始試用
              <span>↗</span>
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
