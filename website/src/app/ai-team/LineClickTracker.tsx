"use client";

import { useEffect } from "react";
import { sendAiTeamEvent } from "./tracking";

// 只掛在 /ai-team：點任何 LINE 連結（預約區、表單錯誤訊息、頁尾）都送 GA4 line_click
export function LineClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || !/^https:\/\/line\.me\//.test(a.href)) return;
      const where = a.closest("footer") ? "footer" : a.closest("section[id]")?.id || "page";
      sendAiTeamEvent("line_click", { form: "ai-team", link_location: where });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
