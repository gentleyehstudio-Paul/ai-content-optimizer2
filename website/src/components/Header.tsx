"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Agents", href: "/agents" },
  { label: "PrintScale-AI", href: "/printscale" },
  { label: "案例", href: "/case" },
  { label: "企業培訓", href: "/#training" },
  { label: "資源", href: "/#resources" },
  { label: "關於", href: "/#about" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
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
          background: "rgba(238,237,232,.78)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: scrolled ? "0 1px 0 #d8d9d1" : "none",
        }}
      >
        <div className="w-full max-w-[1280px] mx-auto px-5 flex items-center justify-between">
          <Link href="/" className="flex items-baseline gap-0 hover:!text-ink">
            <span className="text-[18px] font-bold tracking-tight text-ink">
              gentleyeh
            </span>
            <span className="text-[18px] font-normal tracking-tight text-ink">
              studio
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[14px] font-medium text-ink hover:text-red transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://lin.ee/gentleyehstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-5 py-2 text-[14px] font-semibold rounded-full border border-ink text-ink hover:bg-red hover:text-white hover:border-red transition-all"
            >
              預約諮詢
            </a>
          </nav>

          <button
            className="lg:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="選單"
          >
            <span
              className={`block w-5 h-[2px] bg-ink transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`block w-5 h-[2px] bg-ink transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-[2px] bg-ink transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
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
            <a
              href="https://lin.ee/gentleyehstudio"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-4 text-center px-8 py-4 text-[16px] font-semibold rounded-full bg-ink text-white hover:bg-red transition-colors"
            >
              預約諮詢
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
