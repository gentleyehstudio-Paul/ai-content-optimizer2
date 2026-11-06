"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { readLeadAttribution } from "@/lib/attribution-client";

/**
 * 每次客戶端換頁時，把首次造訪歸因寫進 sessionStorage。
 * 不渲染 UI，也不改 Cookie、同意或 gtag 設定。
 * 只依賴 pathname：在 effect 裡讀 location.search，避免 useSearchParams 把靜態頁面拉成動態。
 */
export function AttributionCapture() {
  const pathname = usePathname();
  useEffect(() => {
    readLeadAttribution();
  }, [pathname]);
  return null;
}
