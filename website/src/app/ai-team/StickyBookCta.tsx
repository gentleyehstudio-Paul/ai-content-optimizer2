"use client";

import { useEffect, useState } from "react";

// 手機版底部固定按鈕：首屏 CTA 離開畫面後出現；#book 進入畫面（或已捲過）就隱藏，
// 所以不會蓋住表單與其後的頁尾。桌機（md 以上）不顯示。
export function StickyBookCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("hero-cta");
      const book = document.getElementById("book");
      if (!hero || !book) return;
      const vh = window.innerHeight;
      const heroGone = hero.getBoundingClientRect().bottom < 0;
      const bookReached = book.getBoundingClientRect().top < vh;
      setShow(heroGone && !bookReached);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 px-4 pt-3 transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
      style={{
        paddingBottom: "calc(12px + env(safe-area-inset-bottom))",
        background: "rgba(238,237,232,.92)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderTop: "1px solid #d8d9d1",
      }}
    >
      <a
        href="#book"
        tabIndex={show ? 0 : -1}
        className="flex items-center justify-between w-full px-6 py-3.5 bg-ink text-white font-semibold text-[15px] rounded-sm hover:!text-white"
      >
        預約免費 30 分鐘診斷
        <span>↓</span>
      </a>
    </div>
  );
}
