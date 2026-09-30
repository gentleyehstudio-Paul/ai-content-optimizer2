"use client";

import Image from "next/image";
import Link from "next/link";
import { BeforeAfter } from "@/components/BeforeAfter";
import { AgentsHeroCanvas } from "@/components/AgentsHeroCanvas";

const SCENARIOS = [
  { num: "01", text: "Logo 的字母被 AI 改寫、拉長、少一筆" },
  { num: "02", text: "做了一整組系列圖，風格一張一個樣" },
  { num: "03", text: "畫面有股塑膠感，主管一眼就看出是 AI" },
];

const WHY_ITEMS = [
  {
    title: "不懂向量",
    desc: "生成模型把 Logo 當成一團像素重畫，字形與比例必然走樣",
  },
  {
    title: "每次都是新的",
    desc: "沒有品牌素材約束，每一張都從隨機開始，系列自然對不起來",
  },
  {
    title: "過度平滑",
    desc: "預設的光線與質感太乾淨、太飽和，就是大家說的「AI 味」",
  },
];

const PROCESS = [
  { num: "01", title: "診斷", desc: "盤點 Logo 向量檔、色票與使用情境" },
  {
    num: "02",
    title: "生成場景",
    desc: "以 ComfyUI／Figma Weave 只生成場景與構圖",
  },
  {
    num: "03",
    title: "Logo 鎖定",
    desc: "原始向量 Logo 合成，依場景調整光影與透視",
  },
  {
    num: "04",
    title: "風格一致",
    desc: "以品牌素材訓練專屬 LoRA，或以參考圖控制",
  },
  {
    num: "05",
    title: "去 AI 味",
    desc: "顆粒、品牌調色、自然光；文字排版由設計師完成",
  },
];

const DELIVERABLES = [
  "高解析主視覺（Logo 以原檔合成）",
  "同風格系列延伸圖",
  "品牌專屬 LoRA 與使用說明",
  "使用模型與商用授權說明",
  "分層原始檔，方便後續修改",
];

const FAQ = [
  {
    q: "你們會用 AI 重畫我們的 Logo 嗎？",
    a: "不會——Logo 一律使用你提供的原始向量檔合成，AI 只生成背景與場景",
  },
  {
    q: "建立品牌 LoRA 要準備什麼？",
    a: "過往視覺、產品照與品牌規範——資源頁有完整的素材準備清單可下載",
  },
  {
    q: "生成的圖可以商用嗎？",
    a: "每份交付都附上使用模型與授權說明，讓法務與採購可以放心",
  },
  {
    q: "多久可以交件？",
    a: "依數量與用途而定，免費診斷後會提供明確的時程與報價",
  },
];

export default function AgentsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative bg-paper-alt overflow-hidden"
        style={{
          minHeight: "clamp(520px, 80vh, 900px)",
        }}
      >
        <AgentsHeroCanvas />
        <div className="relative z-10 max-w-[1280px] mx-auto px-5" style={{ paddingTop: "clamp(120px, 14vw, 200px)", paddingBottom: "clamp(72px, 9vw, 128px)" }}>
          <p className="text-[11px] tracking-[.16em] uppercase font-medium text-text-secondary mb-6">
            INK / GLASS / HUMAN TOUCH
          </p>
          <h1
            className="font-bold text-ink"
            style={{
              fontSize: "clamp(38px, 8.7vw, 120px)",
              lineHeight: 0.94,
              letterSpacing: "-.025em",
            }}
          >
            Hire an agent
            <br />
            <span className="font-extralight">Keep your brand.</span>
          </h1>
          <p className="text-text-secondary text-[15px] mt-6 max-w-md leading-relaxed">
            從 AI 草稿，到品牌可以放心使用的作品
            <br />
            每張產出，都由設計師把關
          </p>
          <a
            href="#diagnose"
            className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-ink text-white font-semibold text-[15px] rounded-full hover:bg-red transition-colors"
          >
            上傳你的 AI 圖，免費診斷
          </a>
        </div>
      </section>

      {/* ── Scenarios ── */}
      <section
        className="bg-paper"
        style={{
          paddingTop: "clamp(72px, 9vw, 128px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[880px] mx-auto px-5">
          <h2
            className="font-bold text-ink"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
          >
            你是不是也遇到……
          </h2>
          <div className="flex flex-col gap-6 mt-10">
            {SCENARIOS.map((s) => (
              <div
                key={s.num}
                className="flex items-start gap-4 py-6 border-b border-hairline"
              >
                <span className="text-red font-bold text-[19px] mt-0.5 shrink-0">
                  {s.num}
                </span>
                <p className="text-[19px] text-ink leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why ── */}
      <section
        className="bg-paper-alt"
        style={{
          paddingTop: "clamp(72px, 9vw, 128px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[880px] mx-auto px-5">
          <p className="text-[11px] tracking-[.16em] uppercase font-medium text-text-secondary mb-3">
            WHY IT HAPPENS
          </p>
          <h2
            className="font-bold text-ink"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
          >
            AI 會畫圖，但它不認得你的品牌
          </h2>
          <div className="flex flex-col gap-0 mt-10">
            {WHY_ITEMS.map((item) => (
              <div
                key={item.title}
                className="py-6 border-t border-hairline"
              >
                <h3 className="text-[17px] font-bold text-ink">
                  {item.title}
                </h3>
                <p className="text-[15px] text-text-secondary mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section
        className="bg-paper"
        style={{
          paddingTop: "clamp(72px, 9vw, 128px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-5">
          <p className="text-[11px] tracking-[.16em] uppercase font-medium text-text-secondary mb-3">
            HOW LULU WORKS
          </p>
          <h2
            className="font-bold text-ink mb-12"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
          >
            我們的流程
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {PROCESS.map((step) => (
              <div key={step.num} className="flex flex-col gap-2">
                <span className="text-red font-bold text-[14px]">
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

      {/* ── Case + Deliverables ── */}
      <section
        className="bg-paper-alt"
        style={{
          paddingTop: "clamp(72px, 9vw, 128px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Case card */}
            <Link
              href="/case"
              className="group bg-dark rounded-[18px] p-8 text-white hover:no-underline"
            >
              <p className="text-[11px] tracking-[.16em] text-white/50 uppercase mb-4">
                CASE · 半導體
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Image
                  src="/assets/upscale-before.jpg"
                  alt="Before"
                  width={300}
                  height={200}
                  className="rounded-lg w-full object-cover"
                />
                <Image
                  src="/assets/upscale-after.jpg"
                  alt="After"
                  width={300}
                  height={200}
                  className="rounded-lg w-full object-cover"
                />
              </div>
              <h3 className="text-[20px] font-bold">
                企業形象：識別卡改版＋風格一致
              </h3>
              <p className="text-white/60 text-[14px] mt-4 font-semibold group-hover:text-red transition-colors">
                看完整案例 →
              </p>
            </Link>

            {/* Deliverables */}
            <div className="bg-white rounded-[18px] p-8 border border-hairline">
              <h3
                className="font-bold text-ink mb-6"
                style={{ fontSize: "clamp(22px, 2.5vw, 32px)" }}
              >
                交付內容
              </h3>
              <ul className="flex flex-col gap-4">
                {DELIVERABLES.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span className="text-red mt-0.5 shrink-0">✓</span>
                    <span className="text-[15px] text-ink">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        className="bg-paper-alt"
        style={{
          paddingTop: "clamp(48px, 6vw, 80px)",
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

      {/* ── Diagnosis CTA ── */}
      <section
        id="diagnose"
        className="bg-dark text-white"
        style={{
          paddingTop: "clamp(72px, 9vw, 128px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[760px] mx-auto px-5">
          <p className="text-[11px] tracking-[.16em] text-white/50 uppercase mb-4">
            FREE DIAGNOSIS
          </p>
          <h2
            className="font-bold"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
          >
            上傳你的 AI 圖，免費診斷
          </h2>
          <p className="text-white/50 text-[14px] mt-3 leading-relaxed max-w-lg">
            設計師親自看圖，三個工作天內回覆：哪裡有 AI 味、Logo
            能否修正、建議的落地方式
          </p>

          <form
            className="mt-10 flex flex-col gap-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div
              className="border border-dashed rounded-[14px] p-8 text-center cursor-pointer hover:border-white/40 transition-colors"
              style={{ borderColor: "#5a665b" }}
            >
              <p className="text-white/50 text-[14px]">拖放或點擊上傳圖片</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                required
                placeholder="Email"
                className="px-4 py-3.5 rounded-sm text-[15px] outline-none"
                style={{
                  background: "#252e26",
                  border: "1px solid #4a554b",
                  color: "#f2f2ed",
                }}
              />
              <input
                type="text"
                placeholder="公司"
                className="px-4 py-3.5 rounded-sm text-[15px] outline-none"
                style={{
                  background: "#252e26",
                  border: "1px solid #4a554b",
                  color: "#f2f2ed",
                }}
              />
            </div>

            <textarea
              placeholder="需求說明"
              rows={3}
              className="px-4 py-3.5 rounded-sm text-[15px] outline-none resize-none"
              style={{
                background: "#252e26",
                border: "1px solid #4a554b",
                color: "#f2f2ed",
              }}
            />

            <button
              type="submit"
              className="self-start px-8 py-3.5 bg-white text-ink font-semibold text-[14px] rounded-sm hover:bg-red hover:text-white transition-colors flex items-center gap-4"
            >
              送出免費診斷
              <span>↗</span>
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
