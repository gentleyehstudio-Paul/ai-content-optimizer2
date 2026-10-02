import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="border-t border-hairline bg-paper"
      style={{ borderColor: "#d8d9d1" }}
    >
      <div className="max-w-[1280px] mx-auto px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="mb-3">
              <span className="text-[18px] font-bold tracking-tight">
                gentleyeh
              </span>
              <span className="text-[18px] font-normal tracking-tight">
                studio
              </span>
              <sup className="text-[7px] font-normal">®</sup>
            </div>
            <p className="text-[13px] text-text-secondary leading-relaxed">
              設計師的眼光，AI 的速度
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-medium tracking-[.16em] uppercase text-text-secondary mb-4">
              ABOUT
            </h4>
            <p className="text-[13px] text-text-muted leading-relaxed">
              葉致綱 Paul Yeh — 品牌設計背景、AI 顧問、iPAS AI
              應用規劃師、輔仁大學應用美術碩士
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-medium tracking-[.16em] uppercase text-text-secondary mb-4">
              SITE
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/agents"
                  className="text-[14px] text-ink hover:text-red"
                >
                  Lulu・Logo 不變形
                </Link>
              </li>
              <li>
                <Link
                  href="/printscale"
                  className="text-[14px] text-ink hover:text-red"
                >
                  PrintScale-AI
                </Link>
              </li>
              <li>
                <Link
                  href="/case"
                  className="text-[14px] text-ink hover:text-red"
                >
                  案例模板
                </Link>
              </li>
              <li>
                <Link
                  href="/training"
                  className="text-[14px] text-ink hover:text-red"
                >
                  企業培訓
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-medium tracking-[.16em] uppercase text-text-secondary mb-4">
              FOLLOW
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="https://threads.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-ink hover:text-red"
                >
                  Threads
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-ink hover:text-red"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/paul-yeh-82a185154/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-ink hover:text-red"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-hairline text-center text-[12px] text-text-secondary">
          © 2026 居葉國際文化有限公司 Gentleyehstudio
        </div>
      </div>
    </footer>
  );
}
