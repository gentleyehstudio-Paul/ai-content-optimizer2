"use client";

const COURSES = [
  {
    tag: "FOUNDATION",
    title: "AI 圖片生成基礎",
    duration: "3 小時",
    audience: "行銷 · 設計 · 企劃",
    points: [
      "主流生成工具比較與選擇（Midjourney、DALL-E、Stable Diffusion）",
      "Prompt 撰寫框架：從產品照到品牌主視覺",
      "常見踩雷：授權風險、Logo 變形、AI 味判斷",
      "實作：為自家產品生成三張可用素材",
    ],
  },
  {
    tag: "ADVANCED",
    title: "品牌安全 AI 應用",
    duration: "6 小時（含實作）",
    audience: "設計主管 · 品牌經理 · 行銷總監",
    points: [
      "品牌素材盤點與 AI 工作流設計",
      "Logo 保護策略：向量合成 vs 生成",
      "風格一致性控制：LoRA 訓練與參考圖技巧",
      "去 AI 味：顆粒、調色、自然光修正",
      "實作：完成一張品牌安全的 AI 主視覺",
    ],
  },
  {
    tag: "PRINT-READY",
    title: "AI 圖落地印刷",
    duration: "3 小時",
    audience: "設計師 · 印前人員 · 採購",
    points: [
      "AI 圖放大到 300dpi 的方法與工具",
      "RGB → CMYK 轉換與色差控制",
      "輸出規格：展板、海報、DM、包裝",
      "印刷前的校色與打樣流程",
      "實作：將 AI 圖輸出為可送印檔案",
    ],
  },
];

const FOR_WHO = [
  {
    icon: "◆",
    title: "行銷團隊",
    desc: "快速產出社群素材與活動主視覺，不必每次都等外包",
  },
  {
    icon: "◆",
    title: "設計部門",
    desc: "把 AI 當助手不當對手——加速發想，保留品牌控制權",
  },
  {
    icon: "◆",
    title: "中小企業主",
    desc: "了解 AI 能做什麼、不能做什麼，做出正確的導入決策",
  },
  {
    icon: "◆",
    title: "採購 · 法務",
    desc: "釐清 AI 生成圖的商用授權與智慧財產權邊界",
  },
];

const DIFF = [
  {
    title: "設計師教，不是工程師教",
    desc: "授課者本身是品牌設計師，理解你的工作場景",
  },
  {
    title: "實戰導向",
    desc: "帶自己的素材來、帶可用的成品走",
  },
  {
    title: "品牌安全優先",
    desc: "不只教生成，更教如何保護你的 Logo、色票與風格",
  },
  {
    title: "附授權說明",
    desc: "每堂課都釐清模型授權，讓法務與採購安心",
  },
];

const FAQ = [
  {
    q: "沒有設計背景也能上嗎？",
    a: "可以——基礎課從零開始，著重在行銷與企劃人員也能理解的操作流程",
  },
  {
    q: "可以包班嗎？",
    a: "可以——企業包班可以針對你們的產品與品牌素材客製化內容與實作題目",
  },
  {
    q: "上完課之後有後續支援嗎？",
    a: "有——學員享有一個月的 LINE 群組諮詢，實際操作遇到問題可以隨時問",
  },
  {
    q: "可以開發票嗎？",
    a: "可以——居葉國際文化有限公司開立正式發票，企業報帳無問題",
  },
];

export function TrainingContent() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="bg-dark text-white"
        style={{
          paddingTop: "clamp(120px, 14vw, 200px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-5">
          <p className="text-[11px] tracking-[.16em] uppercase font-medium text-white/50 mb-6">
            AI VISUAL TRAINING FOR BUSINESS
          </p>
          <h1
            className="font-bold"
            style={{
              fontSize: "clamp(32px, 4.4vw, 60px)",
              lineHeight: 1.08,
              letterSpacing: "-.025em",
            }}
          >
            企業 AI 課程・培訓
          </h1>
          <p className="text-white/60 text-[16px] mt-4 max-w-lg leading-relaxed">
            不只教你生成圖片——更教你如何在品牌安全的前提下，讓 AI
            成為團隊的設計生產力。從 Midjourney 到印刷落地，即學即用。
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-white text-ink font-semibold text-[15px] rounded-full hover:bg-red hover:text-white transition-colors"
          >
            預約企業培訓
          </a>
        </div>
      </section>

      {/* ── For Who ── */}
      <section
        className="bg-paper"
        style={{
          paddingTop: "clamp(72px, 9vw, 128px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-5">
          <p className="text-[11px] tracking-[.16em] uppercase font-medium text-text-secondary mb-3">
            WHO IS THIS FOR
          </p>
          <h2
            className="font-bold text-ink mb-10"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
          >
            這門課適合誰？
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FOR_WHO.map((item) => (
              <div
                key={item.title}
                className="py-6 border-t border-hairline"
              >
                <span className="text-red text-[14px]">{item.icon}</span>
                <h3 className="text-[17px] font-bold text-ink mt-2">
                  {item.title}
                </h3>
                <p className="text-[14px] text-text-secondary mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Courses ── */}
      <section
        className="bg-paper-alt"
        style={{
          paddingTop: "clamp(72px, 9vw, 128px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-5">
          <p className="text-[11px] tracking-[.16em] uppercase font-medium text-text-secondary mb-3">
            CURRICULUM
          </p>
          <h2
            className="font-bold text-ink mb-12"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
          >
            課程內容
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {COURSES.map((course) => (
              <div
                key={course.tag}
                className="bg-white rounded-[18px] p-8 border border-hairline flex flex-col"
              >
                <p className="text-[11px] tracking-[.16em] uppercase text-text-secondary mb-3">
                  {course.tag}
                </p>
                <h3 className="text-[20px] font-bold text-ink">
                  {course.title}
                </h3>
                <div className="flex items-center gap-3 mt-3 text-[13px] text-text-secondary">
                  <span>{course.duration}</span>
                  <span className="text-hairline">|</span>
                  <span>{course.audience}</span>
                </div>
                <ul className="mt-6 flex flex-col gap-3 flex-1">
                  {course.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="text-red mt-0.5 shrink-0 text-[12px]">
                        ✓
                      </span>
                      <span className="text-[14px] text-ink leading-relaxed">
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section
        className="bg-paper"
        style={{
          paddingTop: "clamp(72px, 9vw, 128px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[880px] mx-auto px-5">
          <p className="text-[11px] tracking-[.16em] uppercase font-medium text-text-secondary mb-3">
            WHY GENTLEYEHSTUDIO
          </p>
          <h2
            className="font-bold text-ink mb-10"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
          >
            為什麼選我們
          </h2>
          <div className="flex flex-col gap-0">
            {DIFF.map((item) => (
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

      {/* ── Instructor ── */}
      <section
        className="bg-paper-alt"
        style={{
          paddingTop: "clamp(72px, 9vw, 128px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[880px] mx-auto px-5">
          <p className="text-[11px] tracking-[.16em] uppercase font-medium text-text-secondary mb-3">
            INSTRUCTOR
          </p>
          <h2
            className="font-bold text-ink mb-6"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
          >
            講師
          </h2>
          <div className="py-6 border-t border-hairline">
            <h3 className="text-[20px] font-bold text-ink">葉致綱 Paul Yeh</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {[
                "品牌設計師 · Gentleyehstudio 創辦人",
                "iPAS AI 應用規劃師",
                "輔仁大學應用美術碩士",
                "服務客戶涵蓋半導體、製造、電子、化工產業",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2 text-[15px] text-text-secondary leading-relaxed"
                >
                  <span className="text-red mt-0.5 shrink-0">·</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        className="bg-paper"
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
        id="contact"
        className="bg-dark text-white"
        style={{
          paddingTop: "clamp(72px, 9vw, 128px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[760px] mx-auto px-5">
          <p className="text-[11px] tracking-[.16em] text-white/50 uppercase mb-4">
            BOOK A SESSION
          </p>
          <h2
            className="font-bold"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
          >
            預約企業培訓
          </h2>
          <p className="text-white/50 text-[14px] mt-3 leading-relaxed max-w-lg">
            告訴我們你的團隊規模與需求，三個工作天內回覆課程規劃與報價
          </p>

          <form
            className="mt-10 flex flex-col gap-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="聯絡人"
                className="px-4 py-3.5 rounded-sm text-[15px] outline-none"
                style={{
                  background: "#252e26",
                  border: "1px solid #4a554b",
                  color: "#f2f2ed",
                }}
              />
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
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="公司名稱"
                className="px-4 py-3.5 rounded-sm text-[15px] outline-none"
                style={{
                  background: "#252e26",
                  border: "1px solid #4a554b",
                  color: "#f2f2ed",
                }}
              />
              <input
                type="text"
                placeholder="預計人數"
                className="px-4 py-3.5 rounded-sm text-[15px] outline-none"
                style={{
                  background: "#252e26",
                  border: "1px solid #4a554b",
                  color: "#f2f2ed",
                }}
              />
            </div>
            <textarea
              placeholder="需求說明（想上哪些主題、團隊背景等）"
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
              送出諮詢
              <span>↗</span>
            </button>
          </form>
        </div>
      </section>

      {/* ── JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Course",
              name: "企業 AI 課程 — AI 圖片生成基礎",
              description:
                "為行銷、設計、企劃人員設計的 AI 圖片生成基礎課程，涵蓋 Midjourney、DALL-E、Stable Diffusion 等工具的操作與品牌應用",
              provider: {
                "@type": "Organization",
                name: "Gentleyehstudio",
                url: "https://www.gentleyehdesign.com",
              },
              educationalLevel: "Beginner",
              teaches:
                "AI 圖片生成、Prompt 撰寫、品牌素材應用、商用授權",
              inLanguage: "zh-TW",
              courseMode: "onsite",
              duration: "PT3H",
            },
            {
              "@context": "https://schema.org",
              "@type": "Course",
              name: "企業 AI 課程 — 品牌安全 AI 應用",
              description:
                "針對設計主管與品牌經理的進階 AI 視覺課程，學習 Logo 保護、LoRA 風格控制、去 AI 味技巧",
              provider: {
                "@type": "Organization",
                name: "Gentleyehstudio",
                url: "https://www.gentleyehdesign.com",
              },
              educationalLevel: "Advanced",
              teaches:
                "品牌安全 AI 應用、Logo 向量合成、LoRA 訓練、風格一致性控制",
              inLanguage: "zh-TW",
              courseMode: "onsite",
              duration: "PT6H",
            },
            {
              "@context": "https://schema.org",
              "@type": "Course",
              name: "企業 AI 課程 — AI 圖落地印刷",
              description:
                "學習將 AI 生成圖片放大到 300dpi 印刷品質，掌握 RGB 轉 CMYK、校色打樣等印刷前流程",
              provider: {
                "@type": "Organization",
                name: "Gentleyehstudio",
                url: "https://www.gentleyehdesign.com",
              },
              educationalLevel: "Intermediate",
              teaches:
                "AI 圖片放大、300dpi 輸出、CMYK 轉換、印刷校色",
              inLanguage: "zh-TW",
              courseMode: "onsite",
              duration: "PT3H",
            },
          ]),
        }}
      />
    </>
  );
}
