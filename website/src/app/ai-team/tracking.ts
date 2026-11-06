// /ai-team 的 GA4 事件（依 13-shortvideo-channel-plan.md 追蹤段落）。
// GA4 由 layout.tsx 以 next/script（afterInteractive）載入 gtag.js（G-TXGL9R0B66），不是 GTM 容器。
// generate_lead 在 gtag 尚未出現時只推進既有 dataLayer 一次，不保證 GA4 收到。
// line_click 仍沿用原本的行為：gtag 不存在就略過。事件參數不含姓名、Email、電話或其他個資。
// generate_lead 走 trackGenerateLead：同一筆成功只送一次，失敗的表單不會送。
// line_click 維持原本可以重複送出，不跟詢價去重。
// 站外的 GA4 加強型評估或 GTM 後台是否另外聽表單，程式庫裡看不到。

import { sanitizeUtmValue } from "@/lib/attribution";
import { trackGenerateLead } from "@/lib/lead-analytics";

export const ATTR_STORE = "gy_ai_team_attr"; // 最後一次帶參數進站（session）

type Gtag = (...args: unknown[]) => void;

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

function utmParams(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    const p = new URLSearchParams(window.location.search || sessionStorage.getItem(ATTR_STORE) || "");
    for (const key of UTM_KEYS) {
      const value = sanitizeUtmValue(p.get(key) ?? "");
      if (value) out[key] = value;
    }
  } catch {
    // 略過
  }
  return out;
}

export function sendAiTeamEvent(
  name: string,
  params: Record<string, string>,
  dedupKey?: string,
) {
  try {
    if (name === "generate_lead") {
      const key = dedupKey || `ai-team-lead:${Math.random().toString(36).slice(2)}`;
      trackGenerateLead({ ...params, ...utmParams() }, key);
      return;
    }
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    if (typeof gtag !== "function") return;
    gtag("event", name, { ...params, ...utmParams() });
  } catch {
    // 追蹤失敗不影響使用
  }
}
