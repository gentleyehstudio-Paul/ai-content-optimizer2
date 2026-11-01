"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HERO_A3 } from "@/app/ai-team/heroA3.config";

const NAV_ITEMS = [
  { label: "Agents", href: "/agents" },
  { label: "PrintScale-AI", href: "/printscale" },
  { label: "案例", href: "/case" },
  { label: "企業培訓", href: "/training" },
  { label: "指南", href: "/resources" },
  { label: "關於", href: "/#about" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // /ai-team 的「預約諮詢」直接跳到本頁表單（#book），其他頁維持 /contact
  const pathname = usePathname();
  const ctaHref = pathname === "/ai-team" ? "#book" : "/contact";
  // H-B（heroA3.config.ts）：只有 /ai-team 藍色首屏、還沒捲動時 Header 透明＋白字；其他頁與捲動後不變
  const onAiTeam = HERO_A3.header === "H-B" && pathname === "/ai-team";
  const overHero = onAiTeam && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-[68px] flex items-center transition-shadow duration-300"
        style={{
          background: overHero ? "transparent" : "rgba(238,237,232,.78)",
          backdropFilter: overHero ? "none" : "blur(14px)",
          WebkitBackdropFilter: overHero ? "none" : "blur(14px)",
          boxShadow: scrolled ? "0 1px 0 #d8d9d1" : "none",
          ...(onAiTeam ? { transition: "background-color .3s, box-shadow .3s" } : {}),
        }}
      >
        <div className="w-full max-w-[1280px] mx-auto px-5 flex items-center justify-between">
          <Link href="/" className={`flex items-baseline gap-0 ${overHero ? "hover:!text-white" : "hover:!text-ink"}`}>
            <span className={`text-[18px] font-bold tracking-tight ${overHero ? "text-white" : "text-ink"}`}>
              gentleyeh
            </span>
            <span className={`text-[18px] font-normal tracking-tight ${overHero ? "text-white" : "text-ink"}`}>
              studio
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  overHero
                    ? "text-[14px] font-medium text-white hover:!text-white hover:opacity-70 transition-opacity"
                    : "text-[14px] font-medium text-ink hover:text-red transition-colors"
                }
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={ctaHref}
              className={
                overHero
                  ? "ml-2 px-5 py-2 text-[14px] font-semibold rounded-full border border-white text-white hover:bg-white hover:!text-ink transition-all"
                  : "ml-2 px-5 py-2 text-[14px] font-semibold rounded-full border border-ink text-ink hover:bg-red hover:text-white hover:border-red transition-all"
              }
            >
              預約諮詢
            </Link>
          </nav>

          <button
            className="lg:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="選單"
          >
            <span
              className={`block w-5 h-[2px] ${overHero ? "bg-white" : "bg-ink"} transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`block w-5 h-[2px] ${overHero ? "bg-white" : "bg-ink"} transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-[2px] ${overHero ? "bg-white" : "bg-ink"} transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-paper flex flex-col pt-[68px]">
          <nav className="flex flex-col gap-1 p-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-[24px] font-semibold py-3 text-ink hover:text-red transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={ctaHref}
              onClick={() => setMenuOpen(false)}
              className="mt-4 text-center px-8 py-4 text-[16px] font-semibold rounded-full bg-ink text-white hover:bg-red transition-colors"
            >
              預約諮詢
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
