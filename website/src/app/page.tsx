"use client";

import Image from "next/image";
import Link from "next/link";
import { HeroCanvas } from "@/components/HeroCanvas";
import { BeforeAfter } from "@/components/BeforeAfter";

const TELEMETRY = [
  { label: "AGENT", value: "LULU v2.4" },
  { label: "TASK", value: "LOGO_LOCK" },
  { label: "STATUS", value: "PROCESSING" },
  { label: "FIDELITY", value: "98.7%" },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "診斷",
    desc: "30 分鐘看懂你的素材、用途與品牌規範",
    tag: "DESIGNER",
  },
  {
    num: "02",
    title: "生成",
    desc: "AI 只負責場景與構圖，不碰你的 Logo",
    tag: "AGENT",
  },
  {
    num: "03",
    title: "品牌修正",
    desc: "合成原始向量 Logo、調整光影透視、去 AI 味",
    tag: "LULU",
  },
  {
    num: "04",
    title: "落地輸出",
    desc: "放大 300dpi、轉 CMYK、輸出各平台尺寸",
    tag: "MILES",
  },
];

const INDUSTRIES = [
  { zh: "半導體", en: "SEMICONDUCTOR" },
  { zh: "製造", en: "MANUFACTURING" },
  { zh: "電子", en: "ELECTRONICS" },
  { zh: "化工", en: "CHEMICALS" },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-dvh min-h-[600px] bg-near-black overflow-hidden">
        <HeroCanvas />

        <div className="relative z-10 h-full flex flex-col justify-center max-w-[1280px] mx-auto px-5">
          <p className="text-[11px] tracking-[.16em] uppercase font-medium text-white/50 mb-6">
            BRAND-SAFE VISUAL AGENTS / 01
          </p>

          <h1 className="text-white" style={{ lineHeight: 0.94, letterSpacing: "-.025em" }}>
            <span
              className="block font-extralight"
              style={{ fontSize: "clamp(38px, 8.7vw, 170px)" }}
            >
              Hire an agent
            </span>
            <span
              className="block font-bold mt-1"
              style={{ fontSize: "clamp(38px, 8.7vw, 170px)" }}
            >
              <span
                style={{
                  background:
                    "radial-gradient(circle, #fff 1px, transparent 1px)",
                  backgroundSize: "5px 5px",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  maskImage:
                    "linear-gradient(to right, #000 60%, transparent 95%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, #000 60%, transparent 95%)",
                }}
              >
                Keep your brand
              </span>
              <span className="text-white">.</span>
            </span>
          </h1>

          <p className="text-white/60 text-[15px] mt-6 max-w-md leading-relaxed">
            從 AI 草稿，到品牌可以放心使用的作品
            <br />
            每張產出，都由設計師把關
          </p>

          <div className="flex items-center gap-6 mt-8 flex-wrap">
            <a
              href="#results"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-ink font-semibold text-[15px] rounded-full hover:bg-red hover:text-white transition-all"
            >
              上傳你的 AI 圖，免費診斷
            </a>
            <a
              href="#results"
              className="text-white/70 text-[14px] hover:text-white transition-colors"
            >
              看案例
            </a>
          </div>

          {/* Telemetry labels (desktop) */}
          <div className="hidden lg:flex flex-col gap-3 absolute right-8 top-1/2 -translate-y-1/2">
            {TELEMETRY.map((t) => (
              <div key={t.label} className="text-right">
                <div className="text-[9px] tracking-[.2em] text-white/30 font-medium">
                  {t.label}
                </div>
                <div className="text-[11px] tracking-[.08em] text-white/50 font-mono">
                  {t.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between px-5 py-4 max-w-[1280px] mx-auto">
          <div className="text-[9px] tracking-[.15em] text-white/30 uppercase">
            DATA → INK → RIVER
          </div>
          <div className="text-[9px] tracking-[.15em] text-white/30 uppercase hidden sm:block">
            GENTLEYEH — FROM DRAFT TO DEPLOYMENT
          </div>
          <div className="text-[10px] tracking-[.12em] text-white/40">
            SCROLL TO EXPLORE ↓
          </div>
        </div>
      </section>

      {/* ── Before/After ── */}
      <section
        id="results"
        className="bg-paper-alt"
        style={{
          paddingTop: "clamp(72px, 9vw, 128px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-5">
          <p className="text-[11px] tracking-[.16em] uppercase font-medium text-text-secondary mb-3">
            BEFORE / AFTER
          </p>
          <h2
            className="font-bold text-ink"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
          >
            AI 生成，品牌不走樣
          </h2>
          <p className="text-text-secondary text-[15px] mt-3 max-w-xl">
            左右拖拉比較成果——先於工具：先看交付什麼，再談怎麼做
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-[16px] font-semibold">Logo 修正</h3>
                <span className="text-[11px] text-text-secondary tracking-wide">
                  Lulu · LogoLock
                </span>
              </div>
              <BeforeAfter variant="logo" ratio="4/3" />
              <p className="text-[11px] text-text-muted mt-2 italic">
                示意畫面 — 正式上線前替換為授權案例圖
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-[16px] font-semibold">去 AI 味</h3>
              </div>
              <BeforeAfter
                beforeSrc="/assets/deai-before.jpg"
                afterSrc="/assets/deai-after.jpg"
                ratio="4/3"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-[16px] font-semibold">放大印刷</h3>
                <span className="text-[11px] text-text-secondary tracking-wide">
                  Miles · LastMile
                </span>
              </div>
              <BeforeAfter
                beforeSrc="/assets/upscale-before.jpg"
                afterSrc="/assets/upscale-after.jpg"
                ratio="4/3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Agents ── */}
      <section
        id="agents"
        className="bg-paper"
        style={{
          paddingTop: "clamp(72px, 9vw, 128px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-5">
          <p className="text-[11px] tracking-[.16em] uppercase font-medium text-text-secondary mb-3">
            MEET THE AGENTS
          </p>
          <h2
            className="font-bold text-ink"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
          >
            雇用一位 agent，守住你的品牌
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {/* Lulu */}
            <div className="bg-white rounded-[18px] p-6 border border-hairline">
              <p className="text-[11px] tracking-[.16em] uppercase font-medium text-text-secondary mb-4">
                GENTLEYEH · AGENT ID
              </p>
              <div className="flex items-start gap-4">
                <Image
                  src="/assets/lulu.png"
                  alt="Lulu"
                  width={80}
                  height={80}
                  className="rounded-xl"
                />
                <div>
                  <p className="text-[11px] text-text-secondary">No. 01</p>
                  <h3 className="text-[24px] font-bold">Lulu</h3>
                  <p className="text-[11px] tracking-[.14em] text-text-secondary uppercase">
                    LOGOLOCK
                  </p>
                </div>
              </div>
              <p className="text-[14px] font-medium mt-4">
                Logo 不變形・去 AI 味
              </p>
              <p className="text-[12px] text-text-secondary mt-1 leading-relaxed">
                Lulu locks your logo and removes the AI look.
              </p>
              <p className="text-[9px] tracking-[.14em] text-text-muted uppercase mt-4">
                REVIEWED BY DESIGNER
              </p>
              <Link
                href="/agents"
                className="inline-block mt-4 text-[14px] font-semibold text-ink hover:text-red transition-colors"
              >
                了解 →
              </Link>
            </div>

            {/* Miles */}
            <div className="bg-white rounded-[18px] p-6 border border-hairline">
              <p className="text-[11px] tracking-[.16em] uppercase font-medium text-text-secondary mb-4">
                GENTLEYEH · AGENT ID
              </p>
              <div className="flex items-start gap-4">
                <Image
                  src="/assets/miles.png"
                  alt="Miles"
                  width={80}
                  height={80}
                  className="rounded-xl"
                />
                <div>
                  <p className="text-[11px] text-text-secondary">No. 02</p>
                  <h3 className="text-[24px] font-bold">Miles</h3>
                  <p className="text-[11px] tracking-[.14em] text-text-secondary uppercase">
                    LASTMILE
                  </p>
                </div>
              </div>
              <p className="text-[14px] font-medium mt-4">
                AI 圖落地到印刷與上架
              </p>
              <p className="text-[12px] text-text-secondary mt-1 leading-relaxed">
                Miles goes the last mile — from AI image to print and platform.
              </p>
            </div>

            {/* Your team */}
            <div className="bg-white rounded-[18px] p-6 border border-hairline">
              <p className="text-[11px] tracking-[.16em] uppercase font-medium text-text-secondary mb-4">
                GENTLEYEH · TEAM ID
              </p>
              <div>
                <p className="text-[11px] text-text-secondary">No. 03</p>
                <h3 className="text-[24px] font-bold">Your team</h3>
                <p className="text-[11px] tracking-[.14em] text-text-secondary uppercase">
                  ENTERPRISE
                </p>
              </div>
              <p className="text-[14px] font-medium mt-4">
                企業 AI 視覺規範＋內訓
              </p>
              <p className="text-[12px] text-text-secondary mt-1 leading-relaxed">
                We build Lulu and Miles into your own team — shared prompts,
                brand LoRA, training.
              </p>
              <p className="text-[9px] tracking-[.14em] text-text-muted uppercase mt-4">
                IPAS CERTIFIED TRAINER
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section
        id="process"
        className="bg-paper-alt"
        style={{
          paddingTop: "clamp(72px, 9vw, 128px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-5">
          <p className="text-[11px] tracking-[.16em] uppercase font-medium text-text-secondary mb-3">
            HOW IT WORKS
          </p>
          <h2
            className="font-bold text-ink"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
          >
            AI 做得快，我們讓它做得對
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {PROCESS_STEPS.map((step) => (
              <div key={step.num} className="flex flex-col gap-3">
                <span className="text-[36px] font-extralight text-text-secondary/40">
                  {step.num}
                </span>
                <h3 className="text-[20px] font-bold">{step.title}</h3>
                <p className="text-[14px] text-text-secondary leading-relaxed">
                  {step.desc}
                </p>
                <span className="text-[10px] tracking-[.14em] text-text-muted uppercase mt-auto">
                  {step.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section
        id="industries"
        className="bg-paper"
        style={{
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(48px, 6vw, 80px)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-5">
          <p className="text-[11px] tracking-[.16em] uppercase font-medium text-text-secondary mb-6">
            TRUSTED ACROSS INDUSTRIES
          </p>
          <p className="text-[12px] text-text-muted mb-8">
            客戶 Logo 取得授權後置換
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {INDUSTRIES.map((ind) => (
              <div
                key={ind.en}
                className="text-center py-8 px-4 rounded-xl border border-hairline bg-white"
              >
                <p className="text-[18px] font-semibold text-ink">{ind.zh}</p>
                <p className="text-[10px] tracking-[.14em] text-text-secondary uppercase mt-1">
                  {ind.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PrintScale + Training ── */}
      <section
        id="training"
        className="bg-dark text-white"
        style={{
          paddingTop: "clamp(72px, 9vw, 128px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 rounded-[18px] p-8 border border-white/10">
            <p className="text-[11px] tracking-[.16em] text-white/50 uppercase mb-4">
              TOOL · PRINTSCALE-AI
            </p>
            <h3
              className="font-bold"
              style={{ fontSize: "clamp(22px, 2.5vw, 32px)" }}
            >
              AI 圖放大到可印刷品質
            </h3>
            <p className="text-white/60 text-[14px] mt-3 leading-relaxed">
              Miles 的放大工具把 AI 圖提升到 300dpi，細節不糊、不長出新東西
            </p>
            <div className="flex gap-4 mt-6 text-[13px] text-white/50">
              <span>300 dpi</span>
              <span>CMYK</span>
              <span>展板・海報・DM</span>
            </div>
            <Link
              href="/printscale"
              className="inline-block mt-6 px-6 py-2.5 rounded-full border border-white/30 text-[14px] font-semibold hover:bg-red hover:border-red transition-all"
            >
              免費試用 3 張 →
            </Link>
          </div>

          <div className="bg-white/5 rounded-[18px] p-8 border border-white/10">
            <p className="text-[11px] tracking-[.16em] text-white/50 uppercase mb-4">
              ENTERPRISE TRAINING
            </p>
            <h3
              className="font-bold"
              style={{ fontSize: "clamp(22px, 2.5vw, 32px)" }}
            >
              把 AI 變成團隊動能
            </h3>
            <p className="text-white/60 text-[14px] mt-3 leading-relaxed">
              企業 AI 視覺規範與共用提示詞庫
            </p>
            <div className="flex flex-col gap-2 mt-6 text-[13px]">
              <div className="flex items-center gap-3">
                <span className="text-white/40 text-[11px] tracking-[.12em] uppercase w-12">
                  規範
                </span>
                <span className="text-white/70">
                  品牌 LoRA 建置與內部導入
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white/40 text-[11px] tracking-[.12em] uppercase w-12">
                  工具
                </span>
                <span className="text-white/70">
                  品牌 LoRA 建置與內部導入
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white/40 text-[11px] tracking-[.12em] uppercase w-12">
                  課程
                </span>
                <span className="text-white/70">半天・一天・系列課</span>
              </div>
            </div>
            <p className="text-[11px] text-white/40 mt-4 tracking-wide">
              iPAS AI 應用規劃師認證講師
            </p>
            <a
              href="mailto:gentleyehstudio@gmail.com"
              className="inline-block mt-4 text-[14px] font-semibold text-white hover:text-red transition-colors"
            >
              索取內訓方案 →
            </a>
          </div>
        </div>
      </section>

      {/* ── Resources ── */}
      <section
        id="resources"
        className="bg-paper-alt"
        style={{
          paddingTop: "clamp(72px, 9vw, 128px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[880px] mx-auto px-5">
          <p className="text-[11px] tracking-[.16em] uppercase font-medium text-text-secondary mb-3">
            FREE CHECKLIST
          </p>
          <h2
            className="font-bold text-ink"
            style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
          >
            免費提供「AI 工作流顧問諮詢」
          </h2>
          <p className="text-text-secondary text-[14px] mt-3 leading-relaxed max-w-lg">
            交出去之前，先用 12 個問題自己檢查一遍：Logo、光線、質感、文字
          </p>

          <form
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Email"
              className="flex-1 px-5 py-3 rounded-full bg-white border border-hairline text-[14px] outline-none focus:border-ink transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-ink text-white text-[14px] font-semibold hover:bg-red transition-colors"
            >
              寄給我 →
            </button>
          </form>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section
        id="contact"
        className="bg-dark text-white"
        style={{
          paddingTop: "clamp(72px, 9vw, 128px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[760px] mx-auto px-5 text-center">
          <p className="text-[11px] tracking-[.16em] text-white/50 uppercase mb-4">
            BOOK A CALL
          </p>
          <h2
            className="font-bold"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
          >
            落實你的 AI 工作流
          </h2>
          <p className="text-white/60 text-[22px] font-light mt-2">
            只差最後一哩路
          </p>
          <p className="text-white/50 text-[14px] mt-6 max-w-lg mx-auto leading-relaxed">
            預約 30 分鐘免費診斷：看一次你的素材，告訴你哪裡能用、哪裡要修、怎麼落地
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-2 mt-8 px-10 py-4 bg-white text-ink font-semibold text-[15px] rounded-full hover:bg-red hover:text-white transition-all"
          >
            預約 30 分鐘諮詢
          </a>

          <div className="mt-16 flex flex-col items-center">
            <p className="text-[11px] tracking-[.16em] text-white/50 uppercase mb-4">
              LINE 官方帳號
            </p>
            <Image
              src="/assets/line-qrcode.png"
              alt="LINE QR Code"
              width={120}
              height={120}
              className="rounded-lg"
            />
            <p className="text-white/50 text-[13px] mt-3">
              掃描加好友，直接傳圖問
            </p>
            <a
              href="#"
              className="mt-2 text-[14px] text-white hover:text-red transition-colors"
            >
              加入好友 →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
