// /ai-team 的 GA4 事件（依 13-shortvideo-channel-plan.md 追蹤段落）。
// GA4 由 layout.tsx 以 next/script（afterInteractive）載入 G-TXGL9R0B66；gtag 不存在時一律略過。
// 事件參數不含姓名、Email 等個資。

export const ATTR_STORE = "gy_ai_team_attr"; // 最後一次帶參數進站（session）

type Gtag = (...args: unknown[]) => void;

function utmParams(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    const p = new URLSearchParams(
      window.location.search || sessionStorage.getItem(ATTR_STORE) || "",
    );
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content"]) {
      const v = p.get(k);
      if (v) out[k] = v.slice(0, 100);
    }
  } catch {
    // 略過
  }
  return out;
}

export function sendAiTeamEvent(name: string, params: Record<string, string>) {
  try {
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    if (typeof gtag !== "function") return;
    gtag("event", name, { ...params, ...utmParams() });
  } catch {
    // 追蹤失敗不影響使用
  }
}
