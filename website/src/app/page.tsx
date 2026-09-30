"use client";

import Image from "next/image";
import Link from "next/link";
import { HeroCanvas } from "@/components/HeroCanvas";
import { BeforeAfter } from "@/components/BeforeAfter";

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

const SECTION_PAD: React.CSSProperties = {
  padding: "clamp(72px,9vw,120px) clamp(20px,5vw,72px)",
};

const GRID3: React.CSSProperties = {
  marginTop: 44,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))",
  gap: 24,
};

const H2: React.CSSProperties = {
  margin: "14px 0 0",
  fontSize: "clamp(30px,4.2vw,56px)",
  lineHeight: 1.1,
  letterSpacing: "-.025em",
  fontWeight: 700,
};

function Label({
  children,
  dot = "#a63328",
  color = "#4e554e",
}: {
  children: React.ReactNode;
  dot?: string;
  color?: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontSize: 11,
        letterSpacing: ".16em",
        fontWeight: 600,
        color,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: dot,
          display: "inline-block",
        }}
      />
      {children}
    </span>
  );
}

const CARD_STYLE: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  background: "#fbfaf7",
  border: "1px solid #d8d9d1",
  borderRadius: 18,
  padding: "18px 20px 22px",
  color: "inherit",
  textDecoration: "none",
};

const CARD_HOVER =
  "transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_22px_40px_rgba(30,38,31,.10)]";

const NOTCH: React.CSSProperties = {
  width: 52,
  height: 9,
  borderRadius: 9,
  background: "#e4e6e0",
  boxShadow: "inset 0 1px 2px rgba(0,0,0,.12)",
  margin: "0 auto 16px",
};

const CARD_HEAD: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 10,
  letterSpacing: ".14em",
  color: "#5d645b",
  fontWeight: 600,
};

const IMG_BOX: React.CSSProperties = {
  height: 220,
  borderRadius: 12,
  background: "radial-gradient(ellipse at 50% 40%,#fff 0,#eeede8 70%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "16px 0",
};

const AGENT_NAME: React.CSSProperties = {
  fontSize: 40,
  fontWeight: 700,
  letterSpacing: "-.03em",
  lineHeight: 1.05,
  display: "flex",
  alignItems: "baseline",
  gap: 12,
  flexWrap: "wrap",
};

const ROLE_TAG: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: ".14em",
  color: "#a63328",
  fontWeight: 700,
};

const DIVIDER: React.CSSProperties = {
  borderTop: "1px solid #d8d9d1",
  marginTop: 16,
  paddingTop: 14,
};

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          position: "relative",
          minHeight: "max(760px,calc(100svh - 68px))",
          overflow: "hidden",
          isolation: "isolate",
          background: "#050505",
          color: "#f4f4f1",
          display: "flex",
          flexDirection: "column",
          paddingTop: "clamp(36px,7vh,80px)",
        }}
      >
        <HeroCanvas />

        <div className="relative z-[3] max-w-[1280px] mx-auto px-5 w-full flex flex-col" style={{ flex: "1 1 auto", pointerEvents: "none" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 10,
              letterSpacing: 2,
              color: "#d6d6d0",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#fff",
                display: "inline-block",
              }}
            />
            BRAND-SAFE VISUAL AGENTS / 01
          </div>

          <h1
            style={{
              margin: "22px 0 0",
              fontWeight: 700,
              letterSpacing: "-.025em",
              fontSize: "clamp(38px,8.7vw,170px)",
              lineHeight: 0.94,
              color: "#ffffff",
              textShadow: "0 2px 30px rgba(0,0,0,.6)",
            }}
          >
            Hire an agent
            <br />
            <span
              style={{
                display: "block",
                width: "fit-content",
                color: "transparent",
                textShadow: "none",
                backgroundImage:
                  "radial-gradient(circle at center,#ffffff 0 1.7px,transparent 2.1px)",
                backgroundSize: "5px 5px",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitMaskImage:
                  "linear-gradient(100deg,#000 35%,rgba(0,0,0,.45) 100%)",
                maskImage:
                  "linear-gradient(100deg,#000 35%,rgba(0,0,0,.45) 100%)",
              }}
            >
              Keep your brand<span style={{ color: "#ffffff" }}>.</span>
            </span>
          </h1>

          <div
            style={{
              marginTop: 28,
              width: 120,
              borderTop: "1px dotted #77776f",
            }}
          />

          <div
            style={{
              flex: "1 1 auto",
              minHeight: "clamp(300px,36vh,420px)",
            }}
          />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 24,
              paddingBottom: 28,
              pointerEvents: "auto",
            }}
          >
            <div style={{ maxWidth: 430 }}>
              <p
                style={{
                  margin: "0 0 22px",
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: "#d2d2cc",
                  textShadow: "0 1px 14px rgba(0,0,0,.9)",
                }}
              >
                從 AI 草稿，到品牌可以放心使用的作品
                <br />
                每張產出，都由設計師把關
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="#results"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 28,
                    minHeight: 52,
                    background: "#ffffff",
                    color: "#050505",
                    padding: "0 22px",
                    borderRadius: 3,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  上傳你的 AI 圖，免費診斷
                  <span aria-hidden>↗</span>
                </a>
                <a
                  href="#results"
                  style={{
                    fontSize: 13,
                    color: "#ffffff",
                    borderBottom: "1px solid #77776f",
                    padding: "6px 0 4px",
                  }}
                >
                  看案例
                </a>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 9,
                letterSpacing: 1.6,
                color: "#9a9a93",
              }}
            >
              <button
                type="button"
                aria-label="Pause animation"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,.3)",
                  background: "transparent",
                  color: "#f4f4f1",
                  fontSize: 10,
                  cursor: "pointer",
                }}
              >
                ❚❚
              </button>
              <span>DATA → INK → RIVER</span>
            </div>
          </div>
        </div>

        <div
          className="max-w-[1280px] mx-auto px-5 w-full"
          style={{
            position: "relative",
            zIndex: 4,
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            borderTop: "1px solid rgba(255,255,255,.14)",
            padding: "12px 0 18px",
            fontSize: 9,
            letterSpacing: 1.6,
            color: "#9a9a93",
            background:
              "linear-gradient(to top,#050505 40%,rgba(5,5,5,0))",
          }}
        >
          <span>DATA → INK → RIVER</span>
          <span className="hidden sm:inline">
            GENTLEYEH — FROM DRAFT TO DEPLOYMENT
          </span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </section>

      {/* ── Before/After ── */}
      <section id="results" style={{ ...SECTION_PAD, background: "#f7f6f2" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 24,
          }}
        >
          <div>
            <Label>BEFORE / AFTER</Label>
            <h2 style={H2}>AI 生成，品牌不走樣</h2>
          </div>
          <p
            style={{
              margin: 0,
              maxWidth: 380,
              fontSize: 14,
              lineHeight: 1.7,
              color: "#51594f",
            }}
          >
            左右拖拉比較成果——先於工具：先看交付什麼，再談怎麼做
          </p>
        </div>

        <div style={GRID3}>
          <figure
            style={{
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <figcaption
              style={{ display: "flex", alignItems: "baseline", gap: 8 }}
            >
              <span style={{ fontSize: 16, fontWeight: 600 }}>Logo 修正</span>
              <span
                style={{ fontSize: 11, letterSpacing: ".08em", color: "#51594f" }}
              >
                Lulu · LogoLock
              </span>
            </figcaption>
            <BeforeAfter
              beforeSrc="/assets/logo-before.jpg"
              afterSrc="/assets/logo-after.jpg"
              ratio="4/3"
            />
            <p style={{ margin: 0, fontSize: 11, color: "#7a8077" }}>
              Rotary District 3521 — Logo 修正前後對比
            </p>
          </figure>

          <figure
            style={{
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <figcaption style={{ fontSize: 16, fontWeight: 600 }}>
              去 AI 味
            </figcaption>
            <BeforeAfter
              beforeSrc="/assets/deai-before.jpg"
              afterSrc="/assets/deai-after.jpg"
              ratio="4/3"
            />
          </figure>

          <figure
            style={{
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <figcaption
              style={{ display: "flex", alignItems: "baseline", gap: 8 }}
            >
              <span style={{ fontSize: 16, fontWeight: 600 }}>放大印刷</span>
              <span
                style={{ fontSize: 11, letterSpacing: ".08em", color: "#51594f" }}
              >
                Miles · LastMile
              </span>
            </figcaption>
            <BeforeAfter
              beforeSrc="/assets/idcard-before.jpg"
              afterSrc="/assets/idcard-after.jpg"
              ratio="4/3"
            />
          </figure>
        </div>
      </section>

      {/* ── Agents ── */}
      <section id="agents" style={{ ...SECTION_PAD, background: "#eeede8" }}>
        <Label>MEET THE AGENTS</Label>
        <h2 style={H2}>雇用一位 agent，守住你的品牌</h2>

        <div style={GRID3}>
          {/* Lulu */}
          <Link href="/agents" style={CARD_STYLE} className={CARD_HOVER}>
            <div style={NOTCH} />
            <div style={CARD_HEAD}>
              <span>GENTLEYEH · AGENT ID</span>
              <span>No. 01</span>
            </div>
            <div style={IMG_BOX}>
              <Image
                src="/assets/lulu.png"
                alt="Lulu"
                width={200}
                height={200}
                style={{ height: "92%", width: "auto", objectFit: "contain" }}
              />
            </div>
            <div style={AGENT_NAME}>
              Lulu <span style={ROLE_TAG}>LOGOLOCK</span>
            </div>
            <div style={DIVIDER}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>
                Logo 不變形・去 AI 味
              </p>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: 12,
                  lineHeight: 1.6,
                  color: "#51594f",
                }}
              >
                Lulu locks your logo and removes the AI look.
              </p>
              <p
                style={{
                  margin: "14px 0 0",
                  fontSize: 9,
                  letterSpacing: ".14em",
                  color: "#5d645b",
                }}
              >
                REVIEWED BY DESIGNER
              </p>
            </div>
          </Link>

          {/* Miles */}
          <Link href="/agents" style={CARD_STYLE} className={CARD_HOVER}>
            <div style={NOTCH} />
            <div style={CARD_HEAD}>
              <span>GENTLEYEH · AGENT ID</span>
              <span>No. 02</span>
            </div>
            <div style={IMG_BOX}>
              <Image
                src="/assets/miles.png"
                alt="Miles"
                width={200}
                height={200}
                style={{ height: "92%", width: "auto", objectFit: "contain" }}
              />
            </div>
            <div style={AGENT_NAME}>
              Miles <span style={ROLE_TAG}>LASTMILE</span>
            </div>
            <div style={DIVIDER}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>
                AI 圖落地到印刷與上架
              </p>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: 12,
                  lineHeight: 1.6,
                  color: "#51594f",
                }}
              >
                Miles goes the last mile — from AI image to print and platform.
              </p>
            </div>
          </Link>

          {/* Your team */}
          <Link
            href="/agents"
            style={{
              ...CARD_STYLE,
              background: "#1e261f",
              borderColor: "#1e261f",
              color: "#f2f2ed",
            }}
            className={CARD_HOVER}
          >
            <div style={{ ...NOTCH, background: "#3e483f", boxShadow: "none" }} />
            <div style={{ ...CARD_HEAD, color: "#a9b1a7" }}>
              <span>GENTLEYEH · TEAM ID</span>
              <span>No. 03</span>
            </div>
            <div
              style={{
                ...IMG_BOX,
                background: "transparent",
                border: "1px dotted #4a554b",
                color: "#a9b1a7",
                fontSize: 11,
                letterSpacing: ".14em",
              }}
            >
              YOUR TEAM
            </div>
            <div style={AGENT_NAME}>
              Your team <span style={ROLE_TAG}>ENTERPRISE</span>
            </div>
            <div style={{ ...DIVIDER, borderTopColor: "#3e483f" }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>
                企業 AI 視覺規範＋內訓
              </p>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: 12,
                  lineHeight: 1.6,
                  color: "#c9cfc6",
                }}
              >
                We build Lulu and Miles into your own team — shared prompts,
                brand LoRA, training.
              </p>
              <p
                style={{
                  margin: "14px 0 0",
                  fontSize: 9,
                  letterSpacing: ".14em",
                  color: "#a9b1a7",
                }}
              >
                IPAS CERTIFIED TRAINER
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Process ── */}
      <section id="process" style={{ ...SECTION_PAD, background: "#f7f6f2" }}>
        <Label>HOW IT WORKS</Label>
        <h2 style={H2}>AI 做得快，我們讓它做得對</h2>

        <div
          style={{
            marginTop: 44,
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(min(100%,220px),1fr))",
            gap: 24,
            borderTop: "1px solid #191a18",
          }}
        >
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.num}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                paddingTop: 20,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  letterSpacing: ".14em",
                  color: "#a63328",
                  fontWeight: 700,
                }}
              >
                {step.num}
              </span>
              <h3 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>
                {step.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "#51594f",
                }}
              >
                {step.desc}
              </p>
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: ".14em",
                  color: "#5d645b",
                  marginTop: "auto",
                }}
              >
                {step.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Industries ── */}
      <section
        id="industries"
        style={{
          padding: "clamp(48px,6vw,80px) clamp(20px,5vw,72px)",
          background: "#eeede8",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            gap: "8px 24px",
          }}
        >
          <Label>TRUSTED ACROSS INDUSTRIES</Label>
          <span style={{ fontSize: 12, color: "#7a8077" }}>
            客戶 Logo 取得授權後置換
          </span>
        </div>
        <div
          style={{
            marginTop: 28,
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(min(100%,200px),1fr))",
            borderTop: "1px solid #d8d9d1",
            borderLeft: "1px solid #d8d9d1",
          }}
        >
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.en}
              style={{
                padding: "28px 20px",
                borderRight: "1px solid #d8d9d1",
                borderBottom: "1px solid #d8d9d1",
              }}
            >
              <p style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
                {ind.zh}
              </p>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: 10,
                  letterSpacing: ".14em",
                  color: "#5d645b",
                }}
              >
                {ind.en}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PrintScale + Training ── */}
      <section
        id="training"
        style={{
          padding: "clamp(48px,6vw,80px) clamp(20px,5vw,72px)",
          background: "#f7f6f2",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(min(100%,420px),1fr))",
            gap: 24,
          }}
        >
          <div
            style={{
              background: "#1e261f",
              color: "#f2f2ed",
              borderRadius: 18,
              padding: "clamp(24px,3vw,40px)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Label dot="#f2f2ed" color="#a9b1a7">
              TOOL · PRINTSCALE-AI
            </Label>
            <h3
              style={{
                margin: "16px 0 0",
                fontWeight: 700,
                fontSize: "clamp(22px,2.5vw,32px)",
                lineHeight: 1.2,
              }}
            >
              AI 圖放大到可印刷品質
            </h3>
            <p
              style={{
                margin: "12px 0 0",
                fontSize: 14,
                lineHeight: 1.7,
                color: "#c9cfc6",
              }}
            >
              Miles 的放大工具把 AI 圖提升到 300dpi，細節不糊、不長出新東西
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 24,
              }}
            >
              {["300 dpi", "CMYK", "展板・海報・DM"].map((c) => (
                <span
                  key={c}
                  style={{
                    padding: "6px 12px",
                    border: "1px solid #4a554b",
                    borderRadius: 30,
                    fontSize: 12,
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 28 }}>
              <Link
                href="/printscale"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  minHeight: 46,
                  padding: "0 20px",
                  border: "1px solid #f2f2ed",
                  borderRadius: 3,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                免費試用 3 張 →
              </Link>
            </div>
          </div>

          <div
            style={{
              background: "#fbfaf7",
              border: "1px solid #d8d9d1",
              borderRadius: 18,
              padding: "clamp(24px,3vw,40px)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Label>ENTERPRISE TRAINING</Label>
            <h3
              style={{
                margin: "16px 0 0",
                fontWeight: 700,
                fontSize: "clamp(22px,2.5vw,32px)",
                lineHeight: 1.2,
              }}
            >
              把 AI 變成團隊動能
            </h3>
            <p
              style={{
                margin: "12px 0 0",
                fontSize: 14,
                lineHeight: 1.7,
                color: "#51594f",
              }}
            >
              企業 AI 視覺規範與共用提示詞庫
            </p>
            <div style={{ marginTop: 20, borderTop: "1px solid #d8d9d1" }}>
              {[
                ["品牌 LoRA 建置與內部導入", "規範"],
                ["品牌 LoRA 建置與內部導入", "工具"],
                ["半天・一天・系列課", "課程"],
              ].map(([text, label], i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "12px 0",
                    borderBottom: "1px solid #d8d9d1",
                    fontSize: 13,
                  }}
                >
                  <span>{text}</span>
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: ".12em",
                      color: "#5d645b",
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <Label>iPAS AI 應用規劃師認證講師</Label>
            </div>
            <div style={{ marginTop: 20 }}>
              <a
                href="mailto:gentleyehstudio@gmail.com"
                style={{
                  display: "inline-block",
                  fontSize: 14,
                  fontWeight: 600,
                  borderBottom: "1px solid #191a18",
                  paddingBottom: 3,
                }}
              >
                索取內訓方案 →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Resources ── */}
      <section
        id="resources"
        style={{ ...SECTION_PAD, background: "#eeede8" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(min(100%,380px),1fr))",
            gap: 40,
            alignItems: "end",
          }}
        >
          <div>
            <Label>FREE CHECKLIST</Label>
            <h2 style={{ ...H2, fontSize: "clamp(28px,3.6vw,48px)" }}>
              免費提供「AI 工作流顧問諮詢」
            </h2>
            <p
              style={{
                margin: "14px 0 0",
                maxWidth: 480,
                fontSize: 14,
                lineHeight: 1.7,
                color: "#51594f",
              }}
            >
              交出去之前，先用 12 個問題自己檢查一遍：Logo、光線、質感、文字
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <label
              htmlFor="resource-email"
              style={{
                display: "block",
                fontSize: 11,
                letterSpacing: ".16em",
                fontWeight: 600,
                color: "#4e554e",
                marginBottom: 8,
              }}
            >
              EMAIL
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <input
                id="resource-email"
                type="email"
                placeholder="you@company.com"
                style={{
                  flex: "1 1 200px",
                  minHeight: 52,
                  padding: "0 16px",
                  border: "1px solid #bec3b8",
                  borderRadius: 3,
                  background: "#fff",
                  fontSize: 15,
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  minHeight: 52,
                  padding: "0 20px",
                  border: "1px solid #191a18",
                  borderRadius: 3,
                  background: "transparent",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                寄給我 →
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section
        id="contact"
        style={{ ...SECTION_PAD, background: "#1e261f", color: "#f2f2ed" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(min(100%,380px),1fr))",
            gap: 48,
            alignItems: "end",
          }}
        >
          <div>
            <Label dot="#f2f2ed" color="#a9b1a7">
              BOOK A CALL
            </Label>
            <h2
              style={{
                margin: "18px 0 0",
                fontSize: "clamp(34px,5vw,72px)",
                lineHeight: 1.04,
                letterSpacing: "-.03em",
                fontWeight: 700,
              }}
            >
              落實你的 AI工作流
              <br />
              只差最後一哩路
            </h2>
            <p
              style={{
                margin: "20px 0 0",
                maxWidth: 480,
                fontSize: 14,
                lineHeight: 1.7,
                color: "#c9cfc6",
              }}
            >
              預約 30 分鐘免費診斷：看一次你的素材，告訴你哪裡能用、哪裡要修、怎麼落地
            </p>
            <a
              href="https://lin.ee/gentleyehstudio"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: 52,
                marginTop: 28,
                padding: "0 24px",
                border: "1px solid #f2f2ed",
                borderRadius: 3,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              預約 30 分鐘諮詢
            </a>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              border: "1px solid #3e483f",
              borderRadius: 18,
              padding: 20,
              justifySelf: "start",
            }}
          >
            <Image
              src="/assets/line-qrcode.png"
              alt="LINE QR Code"
              width={120}
              height={120}
              style={{ borderRadius: 8, flex: "none" }}
            />
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  letterSpacing: ".16em",
                  fontWeight: 600,
                  color: "#a9b1a7",
                }}
              >
                LINE 官方帳號
              </p>
              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: 13,
                  color: "#c9cfc6",
                }}
              >
                掃描加好友，直接傳圖問
              </p>
              <a
                href="https://lin.ee/gentleyehstudio"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: 10,
                  fontSize: 14,
                  borderBottom: "1px solid #f2f2ed",
                  paddingBottom: 2,
                }}
              >
                加入好友 →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
