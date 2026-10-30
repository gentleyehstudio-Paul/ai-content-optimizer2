import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { AiTeamForm } from "./AiTeamForm";

// 2026-10-30 12:46 Gentle 核准開放收錄：移除 noindex、加入 sitemap（仍不放在導覽列或頁尾）。
// 內容依 2026-10-30 定案（Gentle／Tesla），合併前由 Gentle 再看一次。
export const metadata: Metadata = {
  title: "AI 團隊建置｜對外訊息都先經你同意｜居葉設計",
  description:
    "為一人公司與中小企業建一支 AI 小團隊：角色分工清楚、每天回報進度，任何對外訊息都先經你同意才送出。預約免費 30 分鐘 AI 團隊診斷。",
  alternates: { canonical: "https://www.gentleyehdesign.com/ai-team" },
};

const LINE_URL = "https://line.me/R/ti/p/%40kij2619w";
const MAILTO =
  "mailto:gentleyehstudio@gmail.com?subject=" +
  encodeURIComponent("[GPT-AT] AI 團隊診斷預約") +
  "&body=" +
  encodeURIComponent(
    "請簡述你的工作與想交給 AI 的事（請勿提供客戶名單、報價、圖面或個資）",
  );

const SECTION: CSSProperties = {
  padding: "clamp(72px,9vw,128px) 0",
};

const H2: CSSProperties = {
  fontSize: "clamp(28px,4vw,52px)",
  lineHeight: 1.1,
  letterSpacing: "-.025em",
  fontWeight: 700,
};

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`text-[11px] tracking-[.16em] uppercase font-medium mb-6 ${
        light ? "text-white/50" : "text-text-secondary"
      }`}
    >
      {children}
    </p>
  );
}

const ROLES = [
  ["總監", "彙整各角色進度，每天回報"],
  ["接案經理", "整理詢問、追蹤每個案子的下一步"],
  ["補助研究員", "查找與整理公開的補助與計畫資訊"],
  ["SEO 專家", "整理網站內容與搜尋相關的建議"],
  ["流量變現顧問", "研究廣告與收入的做法，提出草稿"],
  ["短影音製作", "擬短影音腳本與字卡"],
  ["LINE 客服", "在 LINE 官方帳號收集訊息、擬回覆草稿"],
];

const FLOW = [
  "每位客戶一個專屬 LINE 群組",
  "官方帳號收集客戶的訊息與回覆",
  "各 AI 角色分工擬稿",
  "人確認",
  "官方帳號回覆客戶",
];

const ROLES_PERSONAL = "秘書、研究、客服";
const ROLES_BUSINESS = "秘書長、研究、客服、行銷內容、專案進度追蹤";
const TOOLS = "Gmail、Google 雲端硬碟、Notion、LINE 官方帳號、Make";
const PAYMENT =
  "簽約時先付設定費的 50%，交付後試用 7 天。滿意再付尾款 50%，並從那時開始收月費；不續用就不收尾款和月費，已付的 50% 不退。";

type Faq = { q: string; a: ReactNode; ld: string };

// ld：FAQPage 結構化資料用的純文字，必須與畫面上的答案一致
const FAQS: Faq[] = [
  {
    q: "是真人 24 小時在回嗎？",
    a: "不是。AI 角色隨時待命，可以收訊息、擬草稿，並每天回報進度；送出前一定由人確認。真人回覆時間是週一至週五 8:00–17:00。",
    ld: "不是。AI 角色隨時待命，可以收訊息、擬草稿，並每天回報進度；送出前一定由人確認。真人回覆時間是週一至週五 8:00–17:00。",
  },
  {
    q: "AI 會不會自己亂回客戶？",
    a: "不會自行送出。所有對外訊息都先擬草稿，經你（或你指定的人）同意才送出。",
    ld: "不會自行送出。所有對外訊息都先擬草稿，經你（或你指定的人）同意才送出。",
  },
  {
    q: "會取代我的員工嗎？",
    a: "它處理整理、擬稿、提醒這類重複工作；判斷與決定仍由人來做。",
    ld: "它處理整理、擬稿、提醒這類重複工作；判斷與決定仍由人來做。",
  },
  {
    q: "保證能省多少時間、增加多少營收嗎？",
    a: "不保證。7 天試用期間，以你實際的使用情況來判斷值不值得。",
    ld: "不保證。7 天試用期間，以你實際的使用情況來判斷值不值得。",
  },
  {
    q: "要換系統或學新軟體嗎？",
    a: `以你現有的工具為主。目前可串接：${TOOLS}。清單以外的工具另外報價。`,
    ld: `以你現有的工具為主。目前可串接：${TOOLS}。清單以外的工具另外報價。`,
  },
  {
    q: "個人版和企業版差在哪？",
    a: `AI 角色數量與確認流程不同。個人版 3 個角色（${ROLES_PERSONAL}），由你本人確認；企業版 5 個角色（${ROLES_BUSINESS}），由主管或指定人員確認。`,
    ld: `AI 角色數量與確認流程不同。個人版 3 個角色（${ROLES_PERSONAL}），由你本人確認；企業版 5 個角色（${ROLES_BUSINESS}），由主管或指定人員確認。`,
  },
  {
    q: "費用多少？",
    a: "設定費 NT$25,000–60,000（首批 3 家 NT$20,000–48,000），月費 NT$6,000–15,000，以上皆未稅，另加 5% 營業稅。個人版：首批設定費 NT$20,000（定價 NT$25,000），月費 NT$6,000；企業版：首批設定費 NT$48,000（定價 NT$60,000），月費 NT$15,000。",
    ld: "設定費 NT$25,000–60,000（首批 3 家 NT$20,000–48,000），月費 NT$6,000–15,000，以上皆未稅，另加 5% 營業稅。個人版：首批設定費 NT$20,000（定價 NT$25,000），月費 NT$6,000；企業版：首批設定費 NT$48,000（定價 NT$60,000），月費 NT$15,000。",
  },
  {
    q: "首批名額怎麼算？額滿後呢？",
    a: "首批共 3 家，個人版與企業版合計、不分來源，以簽約並完成首筆付款的先後計算。額滿後會盡快更新本頁，設定費適用定價。名額狀態以本頁公告為準。",
    ld: "首批共 3 家，個人版與企業版合計、不分來源，以簽約並完成首筆付款的先後計算。額滿後會盡快更新本頁，設定費適用定價。名額狀態以本頁公告為準。",
  },
  {
    q: "我預約了診斷，會幫我保留名額嗎？",
    a: "不會。預約診斷或試用都不保留名額，以簽約並完成首筆付款的先後為準。",
    ld: "不會。預約診斷或試用都不保留名額，以簽約並完成首筆付款的先後為準。",
  },
  {
    q: "為什麼只有 3 家？",
    a: "首批由我們的負責人親自建置與陪跑，人力有限，所以只接 3 家。",
    ld: "首批由我們的負責人親自建置與陪跑，人力有限，所以只接 3 家。",
  },
  {
    q: "設定費包含什麼？月費包含什麼？",
    a: "設定費：依診斷結果建立 AI 角色分工、確認流程與對外訊息的審核規則。月費：日常運作、每天回報與調整。不包含：AI 工具用量費（另計、實報實銷）、硬體，以及可串接清單以外的工具（另外報價）。",
    ld: "設定費：依診斷結果建立 AI 角色分工、確認流程與對外訊息的審核規則。月費：日常運作、每天回報與調整。不包含：AI 工具用量費（另計、實報實銷）、硬體，以及可串接清單以外的工具（另外報價）。",
  },
  {
    q: "AI 工具的用量費含在月費裡嗎？",
    a: "不含。AI 工具用量費另計，實報實銷。",
    ld: "不含。AI 工具用量費另計，實報實銷。",
  },
  {
    q: "試用 7 天怎麼算？要先付錢嗎？",
    a: PAYMENT,
    ld: PAYMENT,
  },
  {
    q: "可以隨時取消月費嗎？",
    a: "最短合約期 3 個月。之後要取消，請提前 30 天以書面通知。",
    ld: "最短合約期 3 個月。之後要取消，請提前 30 天以書面通知。",
  },
  {
    q: "資料安全嗎？",
    a: (
      <>
        請看上方「
        <a href="#privacy" className="underline">
          你的資料，我們這樣處理
        </a>
        」。不確定的地方，我們會在開始前先說清楚。
      </>
    ),
    ld: "請看本頁「你的資料，我們這樣處理」。不確定的地方，我們會在開始前先說清楚。",
  },
  {
    q: "你們是誰？",
    a: "居葉國際文化有限公司（居葉設計）。",
    ld: "居葉國際文化有限公司（居葉設計）。",
  },
];

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.ld },
  })),
};

export default function AiTeamPage() {
  return (
    <>
      {/* ── 區塊 1：首屏 ── */}
      <section
        className="bg-paper overflow-hidden"
        style={{
          paddingTop: "clamp(120px,14vw,200px)",
          paddingBottom: "clamp(64px,8vw,112px)",
        }}
      >
        <div className="max-w-[1080px] mx-auto px-5">
          <Eyebrow>AI TEAM ・ 居葉設計</Eyebrow>
          <h1
            className="font-black text-ink"
            style={{
              fontSize: "clamp(44px,8.6vw,128px)",
              lineHeight: 1.02,
              letterSpacing: "-.04em",
              fontWeight: 900,
            }}
          >
            任何對外訊息，
            <br />
            都先經你同意。
          </h1>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end">
            <p className="text-text-secondary text-[15px] leading-[1.9] max-w-xl">
              為一人公司、小老闆與中小企業建一支 AI 小團隊：角色分工清楚、隨時待命、每天回報進度。
            </p>
            <div className="flex flex-col gap-4 items-start">
              <a
                href="#book"
                className="px-8 py-3.5 bg-ink text-white font-semibold text-[14px] rounded-sm hover:bg-red hover:!text-white transition-colors flex items-center gap-4"
              >
                預約免費 30 分鐘 AI 團隊診斷
                <span>↓</span>
              </a>
              <a href="#team" className="text-[14px] text-ink underline underline-offset-4">
                看看我們自己的 AI 團隊怎麼分工
              </a>
            </div>
          </div>
          <p className="mt-10 text-[12px] tracking-[.04em] font-light text-text-secondary">
            首批 3 家設定費 8 折，額滿即適用定價。名額規則見「方案與價格」。
          </p>
        </div>
      </section>

      {/* ── 區塊 2：你會得到什麼 ── */}
      <section className="bg-paper-alt" style={SECTION}>
        <div className="max-w-[1080px] mx-auto px-5 grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-10">
          <div>
            <Eyebrow>WHAT YOU GET</Eyebrow>
            <h2 className="text-ink" style={H2}>
              先談 30 分鐘，拿到一頁 AI 分工建議
            </h2>
          </div>
          <div className="text-[15px] leading-[1.9] text-text-secondary">
            <p>30 分鐘線上談你的工作流程，我們會給你一頁「AI 分工建議」：</p>
            <ul className="mt-4 border-t border-hairline">
              {[
                "哪些工作適合交給哪一個 AI 角色（例如整理資料、擬回覆草稿、提醒待辦）；",
                "哪些事情一定要你親自確認；",
                "如果要開始，需要準備什麼。",
              ].map((t) => (
                <li key={t} className="py-3 border-b border-hairline text-ink">
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6">
              診斷免費，談完不需要決定任何事。一頁建議會在 3 個工作天內寄給你。
            </p>
            <p className="mt-3">
              診斷時只需要用文字描述流程，
              <strong className="text-ink">請不要提供客戶名單、報價、圖面或個人資料</strong>。
            </p>
          </div>
        </div>
      </section>

      {/* ── 區塊 3：我們自己的 AI 團隊 ── */}
      <section id="team" className="bg-paper scroll-mt-24" style={SECTION}>
        <div className="max-w-[1080px] mx-auto px-5">
          <Eyebrow>OUR OWN TEAM</Eyebrow>
          <h2 className="text-ink" style={H2}>
            我們自己就是這樣工作的
          </h2>
          <p className="mt-6 text-[15px] leading-[1.9] text-text-secondary max-w-2xl">
            這不是概念圖。居葉設計自己的工作，就是由一支 AI 團隊分工擬稿、由人確認後才送出。
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-hairline">
            {ROLES.map(([role, duty], i) => (
              <div key={role} className="p-6 border-r border-b border-hairline">
                <p className="text-[11px] tracking-[.16em] text-text-secondary">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-[20px] font-bold text-ink">{role}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-text-secondary">{duty}</p>
              </div>
            ))}
          </div>

          <ol className="mt-16 grid grid-cols-1 md:grid-cols-5 border-t border-ink">
            {FLOW.map((step, i) => {
              const human = step === "人確認";
              return (
                <li key={step} className="pt-5 pr-5 pb-2">
                  <p
                    className="text-[11px] tracking-[.16em]"
                    style={{ color: human ? "#a63328" : "#5d645b" }}
                  >
                    STEP {i + 1}
                  </p>
                  <p
                    className="mt-2 text-[15px] leading-relaxed"
                    style={{
                      color: human ? "#a63328" : "#191a18",
                      fontWeight: human ? 700 : 500,
                    }}
                  >
                    {step}
                    {human && (
                      <span className="block text-[12px] font-normal mt-1">
                        這一步一定有人看過
                      </span>
                    )}
                  </p>
                </li>
              );
            })}
          </ol>

          <p
            className="mt-20 font-black text-ink"
            style={{
              fontSize: "clamp(28px,4.6vw,64px)",
              lineHeight: 1.15,
              letterSpacing: "-.03em",
              fontWeight: 900,
            }}
          >
            AI 負責整理與擬稿；
            <br />
            送出前，一定有人看過。
          </p>
        </div>
      </section>

      {/* ── 區塊 4：適合誰 ── */}
      <section className="bg-paper-alt" style={SECTION}>
        <div className="max-w-[1080px] mx-auto px-5">
          <Eyebrow>WHO IT&apos;S FOR</Eyebrow>
          <h2 className="text-ink" style={H2}>
            個人版、企業版
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="border-t border-ink pt-5">
              <p className="text-[20px] font-bold text-ink">個人版</p>
              <p className="text-[12px] tracking-[.08em] text-text-secondary mt-1">
                一人公司、自由工作者、小老闆
              </p>
              <p className="mt-4 text-[15px] leading-[1.9] text-text-secondary">
                回客戶、整理資料、記待辦，都是你一個人。個人版幫你排好 3 個 AI 角色（{ROLES_PERSONAL}），先擬好草稿，
                <strong className="text-ink">你點頭才送出</strong>。
              </p>
            </div>
            <div className="border-t border-ink pt-5">
              <p className="text-[20px] font-bold text-ink">企業版</p>
              <p className="text-[12px] tracking-[.08em] text-text-secondary mt-1">
                5 到 50 人的中小企業
              </p>
              <p className="mt-4 text-[15px] leading-[1.9] text-text-secondary">
                5 個 AI 角色各有專責（{ROLES_BUSINESS}）。草稿先給主管或指定人員確認，
                <strong className="text-ink">核准後才以公司名義送出</strong>，每天回報進度。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 區塊 5：怎麼開始 ── */}
      <section className="bg-paper" style={SECTION}>
        <div className="max-w-[1080px] mx-auto px-5">
          <Eyebrow>HOW TO START</Eyebrow>
          <h2 className="text-ink" style={H2}>
            四個步驟，每一步都可以停
          </h2>
          <ol className="mt-12 grid grid-cols-1 md:grid-cols-4 border-t border-ink">
            {[
              <>預約免費 30 分鐘診斷</>,
              <>
                收到一頁 AI 分工建議
                <span className="block text-[13px] font-normal mt-1">3 個工作天內</span>
              </>,
              <>決定要不要試用 7 天</>,
              <>試用後再決定是否續用</>,
            ].map((t, i) => (
              <li key={i} className="pt-5 pr-6 pb-2">
                <p
                  className="font-black text-ink"
                  style={{ fontSize: "clamp(40px,5vw,72px)", lineHeight: 1, fontWeight: 900 }}
                >
                  {i + 1}
                </p>
                <p className="mt-4 text-[16px] font-bold text-ink leading-relaxed">{t}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-[14px] leading-relaxed text-text-secondary">
            付款方式：{PAYMENT}
          </p>
        </div>
      </section>

      {/* ── 區塊 6：方案與價格 ── */}
      <section className="bg-paper-alt" style={SECTION}>
        <div className="max-w-[1080px] mx-auto px-5">
          <Eyebrow>PLANS &amp; PRICING</Eyebrow>
          <h2 className="text-ink" style={H2}>
            方案與價格
          </h2>
          <p className="mt-6 text-[14px] text-text-secondary">
            以下價格皆未稅，另加 5% 營業稅。
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left text-[14px] border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b-2 border-ink">
                  <th className="py-3 pr-4 w-[28%]" />
                  <th className="py-3 pr-4 text-[18px] font-bold text-ink">個人版</th>
                  <th className="py-3 pr-4 text-[18px] font-bold text-ink">
                    企業版
                  </th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                {(
                  [
                    ["適合", "一人公司、自由工作者、小老闆", "5–50 人中小企業"],
                    ["首批 3 家設定費（8 折）", "NT$20,000", "NT$48,000"],
                    ["定價設定費（第 4 家起）", "NT$25,000", "NT$60,000"],
                    ["月費（首批與定價相同）", "NT$6,000／月", "NT$15,000／月"],
                    ["AI 角色", `3 個（${ROLES_PERSONAL}）`, `5 個（${ROLES_BUSINESS}）`],
                    ["誰確認對外訊息", "你本人", "主管或指定人員"],
                    [
                      "7 天試用",
                      "有；簽約先付設定費 50%，滿意再付尾款 50%",
                      "有；簽約先付設定費 50%，滿意再付尾款 50%",
                    ],
                    ["最短合約期", "3 個月；之後取消需提前 30 天書面通知", "3 個月；之後取消需提前 30 天書面通知"],
                    ["可串接工具", TOOLS, TOOLS],
                    [
                      "不包含",
                      "AI 工具用量費（另計、實報實銷）、硬體；清單以外的工具另外報價",
                      "AI 工具用量費（另計、實報實銷）、硬體；清單以外的工具另外報價；本地端部署目前不承諾",
                    ],
                  ] as [string, ReactNode, ReactNode][]
                ).map(([k, p, b]) => (
                  <tr key={k} className="border-b border-hairline align-top">
                    <th className="py-4 pr-4 font-medium text-ink">{k}</th>
                    <td className="py-4 pr-4">{p}</td>
                    <td className="py-4 pr-4">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-12 text-[18px] font-bold text-ink">首批名額規則</h3>
          <ul className="mt-4 text-[15px] leading-[1.9] text-text-secondary list-disc pl-5">
            <li>首批名額共 3 家，個人版與企業版合計，不分來源（廣告、介紹或我們主動聯繫的客戶都算）。</li>
            <li>名額以簽約並完成首筆付款的先後計算；預約診斷或試用都不保留名額。</li>
            <li>首批價只適用設定費；月費不打折。</li>
            <li>
              第 3 家完成付款後，會盡快將本頁更新為「首批名額已額滿」，之後設定費適用定價（個人版 NT$25,000、企業版 NT$60,000，皆未稅）。
            </li>
          </ul>
          <p className="mt-6 text-[15px] text-ink">
            首批名額狀態：尚有名額（已簽約 0 家）｜最後更新：2026/10/30
          </p>
        </div>
      </section>

      {/* ── 區塊 7：資料保密 ── */}
      <section id="privacy" className="bg-paper scroll-mt-24" style={SECTION}>
        <div className="max-w-[1080px] mx-auto px-5 grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-10">
          <div>
            <Eyebrow>YOUR DATA</Eyebrow>
            <h2 className="text-ink" style={H2}>
              你的資料，我們這樣處理
            </h2>
          </div>
          <div className="text-[15px] leading-[1.9] text-text-secondary">
            <h3 className="text-[16px] font-bold text-ink">我們承諾</h3>
            <ul className="mt-3 list-disc pl-5">
              <li>任何以你名義送出的對外訊息，都先擬草稿、經你同意才送出。</li>
              <li>
                你的公司名稱、資料、作品與案例，不會出現在我們的廣告、官網或社群，除非你另以書面同意。
              </li>
              <li>診斷階段只需要文字描述流程，請不要提供客戶名單、報價、圖面或個人資料。</li>
              <li>
                你可以隨時要求查詢、更正或刪除你提供的資料：來信{" "}
                <a href="mailto:gentleyehstudio@gmail.com" className="underline">
                  gentleyehstudio@gmail.com
                </a>
                ，主旨寫「資料查詢」。
              </li>
            </ul>
            <h3 className="mt-8 text-[16px] font-bold text-ink">我們會先說清楚的事</h3>
            <ul className="mt-3 list-disc pl-5">
              <li>
                <strong className="text-ink">資料放在哪裡：</strong>
                開始前以書面說明使用平台、資料存放地區與是否用於模型訓練。
              </li>
              <li>
                <strong className="text-ink">誰能看到：</strong>
                我們的負責人與被指派的 AI 角色；你的 LINE 群組成員看得到群組訊息。沒有其他人員或外包會接觸你的資料。
              </li>
              <li>
                <strong className="text-ink">能不能裝在我自己的電腦：</strong>目前不承諾。
              </li>
              <li>
                <strong className="text-ink">保存多久、結束合作後怎麼處理：</strong>
                保存期限、匯出與刪除方式，開始前以書面約定。
              </li>
              <li>
                <strong className="text-ink">有沒有保密約定：</strong>
                可依需求簽署保密協議。
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 區塊 8：常見問題 ── */}
      <section className="bg-paper-alt" style={SECTION}>
        <div className="max-w-[1080px] mx-auto px-5">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="text-ink" style={H2}>
            常見問題
          </h2>
          <div className="mt-10 border-t border-ink">
            {FAQS.map((f) => (
              <details key={f.q} className="group border-b border-hairline">
                <summary className="cursor-pointer list-none py-5 flex justify-between gap-6 text-[16px] font-bold text-ink">
                  {f.q}
                  <span className="text-text-secondary font-normal group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <div className="pb-6 text-[15px] leading-[1.9] text-text-secondary max-w-3xl">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }}
        />
      </section>

      {/* ── 區塊 9：預約 ── */}
      <section id="book" className="bg-dark text-white scroll-mt-16" style={SECTION}>
        <div className="max-w-[1080px] mx-auto px-5">
          <Eyebrow light>BOOK A CALL</Eyebrow>
          <h2 style={H2}>先談 30 分鐘，再決定</h2>
          <p className="mt-6 text-[15px] leading-[1.9] text-white/60 max-w-2xl">
            免費 30 分鐘 AI 團隊診斷。談完你會拿到一頁 AI 分工建議，不需要當場決定。
          </p>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[7fr_4fr] gap-14">
            <div>
              <p className="text-[12px] tracking-[.16em] text-white/50 mb-5">EMAIL 表單</p>
              <AiTeamForm />
            </div>

            <div className="lg:border-l lg:pl-10" style={{ borderColor: "#4a554b" }}>
              <p className="text-[12px] tracking-[.16em] text-white/50 mb-5">LINE</p>
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[18px] font-bold underline underline-offset-4 hover:!text-white"
              >
                用 LINE 預約（居葉設計 @kij2619w）
              </a>
              <p className="mt-2 text-[13px] text-white/60">加入後傳「GPT-AT」</p>
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block"
              >
                <img
                  src="/assets/line-qrcode.png"
                  alt="居葉設計 LINE 官方帳號 QR Code（@kij2619w）"
                  width={140}
                  height={140}
                  className="rounded-sm bg-white p-2"
                />
              </a>
              <p className="mt-3 text-[12px] leading-relaxed">
                由負責人本人回覆，營業時間週一至週五 8:00–17:00。
              </p>

              <p className="mt-10 text-[12px] tracking-[.16em] text-white/50 mb-3">EMAIL</p>
              <a href={MAILTO} className="text-[15px] underline underline-offset-4 hover:!text-white">
                寫信預約：gentleyehstudio@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 區塊 10：頁尾說明 ── */}
      <section className="bg-paper" style={{ padding: "40px 0" }}>
        <div className="max-w-[1080px] mx-auto px-5 text-[12px] leading-[1.9] text-text-secondary">
          <p>
            居葉國際文化有限公司｜
            <a href="mailto:gentleyehstudio@gmail.com" className="underline">
              gentleyehstudio@gmail.com
            </a>
          </p>
          <p>本頁不顯示任何客戶名稱、案例或推薦語。</p>
        </div>
      </section>
    </>
  );
}
