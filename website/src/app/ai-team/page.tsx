import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { AiTeamForm } from "./AiTeamForm";

// 草稿頁：尚未公開。內容仍有【待 Gentle 確認】項目。
// 確認完成、移除標記後，才拿掉 noindex 並加入 sitemap；目前也不放在導覽列或頁尾。
export const metadata: Metadata = {
  title: "AI 團隊建置｜對外訊息都先經你同意｜居葉設計",
  description:
    "為一人公司與中小企業建一支 AI 小團隊：角色分工清楚、每天回報進度，任何對外訊息都先經你同意才送出。預約免費 30 分鐘 AI 團隊診斷。",
  alternates: { canonical: "https://www.gentleyehdesign.com/ai-team" },
  robots: { index: false, follow: false },
};

const LINE_URL = "https://line.me/R/ti/p/%40kij2619w";
const MAILTO =
  "mailto:gentleyehstudio@gmail.com?subject=" +
  encodeURIComponent("[GPT-AT] AI 團隊診斷預約") +
  "&body=" +
  encodeURIComponent(
    "請簡述你的工作與想交給 AI 的事（請勿提供客戶名單、報價、圖面或個資）",
  );

/** 尚未確認的內容：與 /privacy-policy 相同的黃色標示 */
function TBD({ children }: { children: ReactNode }) {
  return (
    <mark
      style={{
        background: "#f6e3a1",
        color: "#191a18",
        padding: "0 4px",
        borderRadius: 2,
      }}
    >
      【待 Gentle 確認：{children}】
    </mark>
  );
}

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

type Faq = { q: string; a: ReactNode; ld?: string };

// ld：只有完全不含待確認內容的問答才放進 FAQPage 結構化資料
const FAQS: Faq[] = [
  {
    q: "是真人 24 小時在回嗎？",
    a: (
      <>
        不是。AI 角色隨時可以收訊息、擬草稿；送出前由人確認，所以回覆時間取決於確認的時間。我們每天回報進度。
        <TBD>回報時間</TBD>
      </>
    ),
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
    a: (
      <>
        以你現有的 LINE、Email 等工具為主。<TBD>可串接工具清單</TBD>
      </>
    ),
  },
  {
    q: "個人版和企業版差在哪？",
    a: (
      <>
        AI 角色數量與使用情境不同；企業版有多人確認流程，也包含製造業的單據與 SOP 場景
        <TBD>製造業場景是否確實提供</TBD>。
      </>
    ),
  },
  {
    q: "費用多少？",
    a: (
      <>
        <TBD>
          首批 3 家：個人版設定費 NT$20,000、企業版 NT$48,000（定價 NT$25,000／60,000 的 8
          折）。月費個人版 NT$6,000、企業版 NT$15,000，首批與定價相同。
        </TBD>{" "}
        <TBD>含稅或未稅</TBD>
      </>
    ),
  },
  {
    q: "首批名額怎麼算？額滿後呢？",
    a: (
      <TBD>
        首批共 3 家，個人版與企業版合計、不分來源，以簽約並完成首筆付款的先後計算。額滿後本頁會當天更新，設定費適用定價。名額狀態以本頁公告為準。
      </TBD>
    ),
  },
  {
    q: "我預約了診斷，會幫我保留名額嗎？",
    a: <TBD>不會。預約診斷或試用不保留名額，以付款先後為準。</TBD>,
  },
  {
    q: "為什麼只有 3 家？",
    a: (
      <>
        每一家都要人工設定 AI 分工與確認流程，所以首批只接 3 家。
        <TBD>理由與名額須屬實</TBD>
      </>
    ),
  },
  {
    q: "設定費包含什麼？月費包含什麼？",
    a: (
      <>
        設定費：依診斷結果建立 AI 角色分工、確認流程與對外訊息的審核規則。月費：日常運作、每天回報與調整。
        <TBD>確切範圍</TBD>
      </>
    ),
  },
  {
    q: "AI 工具的用量費含在月費裡嗎？",
    a: <TBD>「月費內含」或「另計、實報實銷」</TBD>,
  },
  {
    q: "試用 7 天怎麼算？要先付錢嗎？",
    a: (
      <TBD>
        設定費是否分期、何時付款、試用期滿怎麼決定、不續用時已付款項是否退還。未確認前，本題不上線
      </TBD>
    ),
  },
  {
    q: "可以隨時取消月費嗎？",
    a: <TBD>取消方式、通知期、最短合約期。未確認前不寫「隨時取消」</TBD>,
  },
  {
    q: "線上簽約有 7 天解除權嗎？",
    a: (
      <TBD>
        若客戶是個人消費者、以網路或 LINE 締約，可能適用消費者保護法第 19
        條；依客戶需求客製的服務是否排除，須事先清楚告知（通訊交易解除權合理例外情事適用準則第 2 條第 2
        款）。本題答案請律師確認後再寫
      </TBD>
    ),
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
    a: (
      <>
        居葉國際文化有限公司（居葉設計），<TBD>統一編號 52373120 是否露出</TBD>
        <TBD>負責人姓名是否露出</TBD>
      </>
    ),
  },
];

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.filter((f) => f.ld).map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.ld },
  })),
};

export default function AiTeamPage() {
  return (
    <>
      {/* ── 草稿提示 ── */}
      <div
        role="note"
        className="text-[14px] leading-relaxed"
        style={{
          background: "#f6e3a1",
          color: "#191a18",
          padding: "12px 20px",
          marginTop: 68,
        }}
      >
        <div className="max-w-[1080px] mx-auto">
          草稿頁，尚未公開。標示「待 Gentle 確認」的內容尚未定案；本頁不放任何客戶名稱、案例或推薦語。
        </div>
      </div>

      {/* ── 區塊 1：首屏 ── */}
      <section
        className="bg-paper overflow-hidden"
        style={{
          paddingTop: "clamp(64px,9vw,128px)",
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
              <TBD>「每天回報」可兌現</TBD>
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
            <TBD>
              「首批」「限 3 家」屬實；首屏是否顯示這行：首批 3 家設定費 8
              折，額滿即適用定價。名額規則見「方案與價格」。
            </TBD>
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
              診斷免費，談完不需要決定任何事。一頁建議會在 <TBD>3 個工作天內</TBD> 寄給你。
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
            個人版、企業版、製造業
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="border-t border-ink pt-5">
              <p className="text-[20px] font-bold text-ink">個人版</p>
              <p className="text-[12px] tracking-[.08em] text-text-secondary mt-1">
                一人公司、自由工作者、小老闆
              </p>
              <p className="mt-4 text-[15px] leading-[1.9] text-text-secondary">
                回客戶、整理資料、記待辦，都是你一個人。個人版幫你排好幾個 AI 角色
                <TBD>角色清單，例如秘書、研究、客服</TBD>，先擬好草稿，
                <strong className="text-ink">你點頭才送出</strong>。
              </p>
            </div>
            <div className="border-t border-ink pt-5">
              <p className="text-[20px] font-bold text-ink">企業版</p>
              <p className="text-[12px] tracking-[.08em] text-text-secondary mt-1">
                5 到 50 人的中小企業
              </p>
              <p className="mt-4 text-[15px] leading-[1.9] text-text-secondary">
                接案、客服、行銷各有專責的 AI 角色<TBD>角色清單</TBD>
                。草稿先給主管或指定人員確認，
                <strong className="text-ink">核准後才以公司名義送出</strong>，每天回報進度。
              </p>
            </div>
            <div className="border-t border-ink pt-5">
              <p className="text-[20px] font-bold text-ink">製造業場景（企業版）</p>
              <p className="mt-2 text-[13px]">
                <TBD>整區：服務確實提供；未確認前本區不上線</TBD>
              </p>
              <ul className="mt-4 text-[15px] leading-[1.9] text-text-secondary list-disc pl-5">
                <li>報價單、採購單等單據：AI 先整理並擬回覆草稿，由你們核對後才送出。</li>
                <li>老師傅的口頭經驗：整理成 SOP 草稿，由現場人員逐項確認。</li>
                <li>
                  本地端部署（資料不出工廠）：<strong className="text-ink">目前不承諾</strong>。
                </li>
              </ul>
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
                <span className="block text-[13px] font-normal mt-1">
                  <TBD>3 個工作天內</TBD>
                </span>
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
            <TBD>
              試用的付款方式（設定費是否分期）、不續用是否退費；確認前本區不寫付款細節
            </TBD>
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
            <TBD>價格含 5% 營業稅或未稅另加 5% 營業稅，上線前必須寫明</TBD>
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left text-[14px] border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b-2 border-ink">
                  <th className="py-3 pr-4 w-[28%]" />
                  <th className="py-3 pr-4 text-[18px] font-bold text-ink">個人版</th>
                  <th className="py-3 pr-4 text-[18px] font-bold text-ink">
                    企業版
                    <span className="block text-[12px] font-normal">
                      含製造業場景<TBD>製造業</TBD>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                {(
                  [
                    ["適合", "一人公司、自由工作者、小老闆", "5–50 人中小企業"],
                    [
                      "首批 3 家設定費（8 折）",
                      <TBD key="a">NT$20,000</TBD>,
                      <TBD key="b">NT$48,000</TBD>,
                    ],
                    [
                      "定價設定費（第 4 家起）",
                      <TBD key="a">NT$25,000</TBD>,
                      <TBD key="b">NT$60,000</TBD>,
                    ],
                    [
                      "月費（首批與定價相同）",
                      <TBD key="a">NT$6,000／月</TBD>,
                      <TBD key="b">NT$15,000／月</TBD>,
                    ],
                    [
                      "AI 角色",
                      <TBD key="a">角色數，例：3 個</TBD>,
                      <TBD key="b">角色數，例：4–5 個</TBD>,
                    ],
                    ["誰確認對外訊息", "你本人", "主管或指定人員"],
                    [
                      "7 天試用",
                      <>
                        有<TBD>付款與退費規則</TBD>
                      </>,
                      <>
                        有<TBD>付款與退費規則</TBD>
                      </>,
                    ],
                    [
                      "不包含",
                      <TBD key="a">AI 工具用量費是否另計、可串接工具、硬體</TBD>,
                      <>
                        <TBD>AI 工具用量費是否另計、可串接工具、硬體</TBD>
                        ；本地端部署目前不承諾
                      </>,
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
            <li>
              <TBD>
                首批名額共 3 家，個人版與企業版合計，不分來源（廣告、介紹或我們主動聯繫的客戶都算）；「首批」「限 3
                家」屬實
              </TBD>
            </li>
            <li>
              <TBD>
                名額以簽約並完成首筆付款的先後計算；只預約診斷或試用、尚未付款，不佔名額、也不保留名額
              </TBD>
            </li>
            <li>首批價只適用設定費；月費不打折。</li>
            <li>
              第 3 家完成付款後，本頁當天更新為「首批名額已額滿」，之後設定費適用定價（個人版{" "}
              <TBD>NT$25,000</TBD>、企業版 <TBD>NT$60,000</TBD>）。
            </li>
          </ul>
          <p className="mt-6 text-[15px] text-ink">
            首批名額狀態：<TBD>尚有名額／已額滿（或已簽約 n 家，剩 3−n 家）</TBD>｜最後更新：
            <TBD>YYYY-MM-DD</TBD>
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
                我們的運作使用雲端服務（LINE 官方帳號、雲端 AI 服務、雲端文件工具）。實際交付給你的服務與資料儲存地區，會在開始前以書面說明。
                <TBD>交付平台、儲存地區、是否用於模型訓練</TBD>
              </li>
              <li>
                <strong className="text-ink">誰能看到：</strong>
                我們的負責人與被指派的 AI 角色；你的 LINE 群組成員看得到群組訊息。
                <TBD>是否有其他人員或外包接觸</TBD>
              </li>
              <li>
                <strong className="text-ink">能不能裝在我自己的電腦：</strong>目前不承諾。
              </li>
              <li>
                <strong className="text-ink">保存多久、結束合作後怎麼處理：</strong>
                開始前以書面約定。<TBD>保存期限、匯出格式、刪除時間</TBD>
              </li>
              <li>
                <strong className="text-ink">有沒有保密約定：</strong>
                <TBD>保密約定範本是否存在</TBD>
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
              <p className="mt-4 text-[12px] leading-relaxed">
                <TBD>表單是否收電話（目前不收）</TBD>
              </p>
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
                <TBD>LINE 由誰回覆、營業時間</TBD>
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
            居葉國際文化有限公司｜<TBD>統一編號 52373120 是否露出</TBD>｜
            <a href="mailto:gentleyehstudio@gmail.com" className="underline">
              gentleyehstudio@gmail.com
            </a>
            ｜
            <a href="/privacy-policy" className="underline">
              隱私權政策
            </a>
          </p>
          <p>本頁不顯示任何客戶名稱、案例或推薦語。</p>
        </div>
      </section>
    </>
  );
}
