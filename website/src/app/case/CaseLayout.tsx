import Link from "next/link";

export function CaseLayout({
  category,
  title,
  subtitle,
  description,
  stats,
  modules,
  cta,
  children,
}: {
  category: string;
  title: string;
  subtitle: string;
  description: string;
  stats: { value: string; label: string }[];
  modules?: { title: string; desc: string }[];
  cta?: { label: string; href: string };
  children?: React.ReactNode;
}) {
  return (
    <>
      <section
        className="bg-dark text-white"
        style={{
          paddingTop: "clamp(120px, 14vw, 200px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[960px] mx-auto px-5">
          <nav className="text-[13px] text-white/40 mb-10">
            <Link href="/" className="hover:text-white/70">
              首頁
            </Link>
            <span className="mx-2">/</span>
            <Link href="/case" className="hover:text-white/70">
              案例
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">{title}</span>
          </nav>

          <p className="text-[11px] tracking-[.14em] uppercase font-medium text-red mb-4">
            {category}
          </p>
          <h1
            className="font-bold"
            style={{
              fontSize: "clamp(32px, 4.4vw, 56px)",
              lineHeight: 1.1,
              letterSpacing: "-.025em",
            }}
          >
            {title}
          </h1>
          <p className="text-[13px] tracking-[.08em] uppercase text-white/40 mt-3">
            {subtitle}
          </p>
          <p className="text-white/60 text-[16px] mt-6 max-w-xl leading-relaxed">
            {description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-[14px] p-5"
                style={{
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.1)",
                }}
              >
                <p
                  className="font-bold"
                  style={{
                    fontSize: "clamp(28px, 3vw, 40px)",
                    color: "#5ae6a6",
                  }}
                >
                  {s.value}
                </p>
                <p className="text-[13px] text-white/50 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {modules && modules.length > 0 && (
        <section
          className="bg-paper"
          style={{
            paddingTop: "clamp(64px, 8vw, 112px)",
            paddingBottom: "clamp(64px, 8vw, 112px)",
          }}
        >
          <div className="max-w-[960px] mx-auto px-5">
            <p className="text-[11px] tracking-[.16em] uppercase font-medium text-text-secondary mb-4">
              HOW IT WORKS
            </p>
            <h2
              className="font-bold text-ink mb-10"
              style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
            >
              運作方式
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {modules.map((m, i) => (
                <div
                  key={m.title}
                  className="rounded-[14px] p-6 bg-white border border-hairline"
                >
                  <p className="text-[11px] tracking-[.14em] uppercase text-text-muted mb-2">
                    STEP {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-[17px] font-bold text-ink">{m.title}</h3>
                  <p className="text-[14px] text-text-secondary mt-2 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {children}

      <section
        className="bg-paper-alt"
        style={{
          paddingTop: "clamp(48px, 6vw, 72px)",
          paddingBottom: "clamp(48px, 6vw, 72px)",
        }}
      >
        <div className="max-w-[960px] mx-auto px-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-[15px] font-semibold text-ink">
              想打造你的專屬 Agent？
            </p>
            <p className="text-[14px] text-text-secondary mt-1">
              免費診斷——到店訪談與流程盤點，找出最值得優化的場景
            </p>
          </div>
          <a
            href={cta?.href ?? "/agents#diagnose"}
            className="px-6 py-3 bg-ink text-white font-semibold text-[14px] rounded-full hover:bg-red transition-colors shrink-0"
          >
            {cta?.label ?? "免費診斷"}
          </a>
        </div>
      </section>
    </>
  );
}
