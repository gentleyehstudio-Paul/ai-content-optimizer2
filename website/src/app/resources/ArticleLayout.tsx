import Link from "next/link";

export function ArticleLayout({
  tag,
  date,
  title,
  children,
}: {
  tag: string;
  date: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <article
        className="bg-paper"
        style={{
          paddingTop: "clamp(120px, 14vw, 200px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[720px] mx-auto px-5">
          <Link
            href="/resources"
            className="text-[13px] text-text-secondary hover:text-red transition-colors"
          >
            ← 返回指南
          </Link>

          <div className="flex items-center gap-3 mt-8">
            <span className="text-[11px] tracking-[.14em] uppercase font-medium text-red">
              {tag}
            </span>
            <span className="text-[12px] text-text-muted">{date}</span>
          </div>

          <h1
            className="font-bold text-ink mt-4"
            style={{
              fontSize: "clamp(28px, 3.6vw, 44px)",
              lineHeight: 1.15,
              letterSpacing: "-.02em",
            }}
          >
            {title}
          </h1>

          <div className="mt-10 prose-article">{children}</div>
        </div>
      </article>

      <section
        className="bg-paper-alt"
        style={{
          paddingTop: "clamp(48px, 6vw, 72px)",
          paddingBottom: "clamp(48px, 6vw, 72px)",
        }}
      >
        <div className="max-w-[720px] mx-auto px-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-[15px] font-semibold text-ink">
              需要協助落地？
            </p>
            <p className="text-[14px] text-text-secondary mt-1">
              上傳你的 AI 圖，設計師免費診斷
            </p>
          </div>
          <a
            href="/agents#diagnose"
            className="px-6 py-3 bg-ink text-white font-semibold text-[14px] rounded-full hover:bg-red transition-colors shrink-0"
          >
            免費診斷
          </a>
        </div>
      </section>
    </>
  );
}
