import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "案例 — AI 代理人實戰成果 | Gentleyehstudio",
  description:
    "從品牌視覺到產業 AI 代理人，查看 Gentleyehstudio 的實際客戶成果：半導體展會視覺、醫療即時翻譯、印刷校對系統、餐飲營運指標、LINE 客服機器人。",
};

const CASES = [
  {
    slug: "semiconductor",
    category: "品牌視覺",
    title: "半導體・識別卡改版",
    desc: "設備製造商・國際展會主視覺與系列社群素材，Logo 鎖定不變形",
    stats: [
      { value: "1–2 天", label: "交期" },
      { value: "3,000+", label: "素材產量" },
    ],
  },
  {
    slug: "medical-translator",
    category: "醫療",
    title: "醫療即時翻譯",
    desc: "協助第一線醫療人員與非母語病患即時溝通，降低問診誤解與等待時間",
    stats: [
      { value: "< 2秒", label: "口譯延遲" },
      { value: "12+", label: "支援語言" },
    ],
  },
  {
    slug: "preflight-checker",
    category: "印刷",
    title: "印刷校對系統",
    desc: "自動比對印前檔案與規格書，於送印前攔截色彩、尺寸與文字錯誤",
    stats: [
      { value: "-70%", label: "校稿時間" },
      { value: "99.2%", label: "錯誤攔截率" },
    ],
  },
  {
    slug: "operations-dashboard",
    category: "餐飲",
    title: "餐飲業營運指標",
    desc: "彙整各門店營收、出餐與庫存數據，管理者一眼掌握全店營運狀況",
    stats: [
      { value: "+18%", label: "營收成長" },
      { value: "30+", label: "導入門店" },
    ],
  },
  {
    slug: "line-customer-service",
    category: "客服",
    title: "LINE OA 客服機器人",
    desc: "串接 LINE 官方帳號，自動處理訂單查詢、常見問題與預約流程",
    stats: [
      { value: "< 5秒", label: "平均回覆" },
      { value: "-60%", label: "客服工時" },
    ],
  },
];

export default function CaseListPage() {
  return (
    <>
      <section
        className="bg-paper"
        style={{
          paddingTop: "clamp(120px, 14vw, 200px)",
          paddingBottom: "clamp(48px, 6vw, 80px)",
        }}
      >
        <div className="max-w-[1080px] mx-auto px-5">
          <p className="text-[11px] tracking-[.16em] uppercase font-medium text-text-secondary mb-6">
            CASE STUDIES
          </p>
          <h1
            className="font-bold text-ink"
            style={{
              fontSize: "clamp(32px, 4.4vw, 60px)",
              lineHeight: 1.08,
              letterSpacing: "-.025em",
            }}
          >
            案例
          </h1>
          <p className="text-text-secondary text-[16px] mt-4 max-w-lg leading-relaxed">
            品牌視覺與產業 AI 代理人的實戰成果
          </p>
        </div>
      </section>

      <section
        className="bg-paper"
        style={{ paddingBottom: "clamp(72px, 9vw, 128px)" }}
      >
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CASES.map((c) => (
              <Link
                key={c.slug}
                href={`/case/${c.slug}`}
                className="group rounded-[18px] p-8 flex flex-col justify-between bg-white border border-hairline hover:border-red/30 transition-colors hover:no-underline"
                style={{ minHeight: "320px" }}
              >
                <div>
                  <span className="text-[11px] tracking-[.14em] uppercase font-medium text-red">
                    {c.category}
                  </span>
                  <h2 className="text-[22px] font-bold text-ink mt-3 group-hover:text-red transition-colors leading-snug">
                    {c.title}
                  </h2>
                  <p className="text-[14px] text-text-secondary mt-3 leading-relaxed">
                    {c.desc}
                  </p>
                </div>

                <div className="flex gap-8 mt-8 pt-6 border-t border-hairline">
                  {c.stats.map((s) => (
                    <div key={s.label}>
                      <p className="text-[24px] font-bold text-ink">
                        {s.value}
                      </p>
                      <p className="text-[12px] text-text-muted mt-1">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="bg-dark text-white"
        style={{
          paddingTop: "clamp(72px, 9vw, 128px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[760px] mx-auto px-5 text-center">
          <p className="text-[11px] tracking-[.16em] text-white/50 uppercase mb-4">
            LET&apos;S BUILD YOUR AGENT
          </p>
          <h2
            className="font-bold"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
          >
            讓 AI 成為你的日常夥伴
          </h2>
          <p className="text-white/50 text-[14px] mt-3 leading-relaxed max-w-md mx-auto">
            從免費診斷開始——到店訪談與流程盤點，找出最值得優化的場景
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
