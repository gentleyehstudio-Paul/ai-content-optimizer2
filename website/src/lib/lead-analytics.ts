import { sanitizeUtmValue } from "./attribution";

/**
 * 成功的詢價才送出 GA4 `generate_lead`，而且同一次嘗試只送一次。
 *
 * 參數白名單：form、service、plan，以及五個 UTM。
 * 不送 email、姓名、電話、公司、需求內容、referrer 或落地頁。
 * gtag 還沒載入或呼叫失敗時略過，不影響表單結果，也不會事後補送。
 *
 * 去重鍵必須「每一次表單掛載各用一把」。同一把再呼叫會被丟掉；
 * 另一個表單或重新進入頁面要用新的鍵，否則第二筆真的詢價不會被記到。
 * /ai-team 既有的 generate_lead 也走這裡，避免再加第二個事件。
 */

const ALLOWED_PARAM = new Set([
  "form",
  "service",
  "plan",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
]);

type Gtag = (...args: unknown[]) => void;

const fired = new Set<string>();

export function resetLeadAnalyticsForTests(): void {
  fired.clear();
}

function sanitizeAnalyticsValue(raw: string): string {
  if (raw === "/") return "/";
  return sanitizeUtmValue(raw);
}

export function trackGenerateLead(params: Record<string, string>, dedupKey: string): boolean {
  if (!dedupKey || fired.has(dedupKey)) return false;
  fired.add(dedupKey);
  const safe: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (!ALLOWED_PARAM.has(key) || typeof value !== "string") continue;
    const clean = sanitizeAnalyticsValue(value);
    if (clean) safe[key] = clean;
  }
  try {
    if (typeof window === "undefined") return false;
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    if (typeof gtag !== "function") return false;
    gtag("event", "generate_lead", safe);
    return true;
  } catch {
    return false;
  }
}

export type LeadAttempt = {
  dedupKey: string;
  /** 開始送出。進行中或已經成功過就回 false。 */
  start(): boolean;
  /**
   * 伺服器回成功後才呼叫。機器人蜜罐回 false，而且這次嘗試之後不再補送事件。
   * 真人成功回 true，且只會有一次 true。
   */
  shouldTrack(isBot: boolean): boolean;
  /** 失敗時放開，讓同一張表單可以再試。不會因此送出事件。 */
  release(): void;
};

export function createLeadAttempt(
  dedupKey = `lead:${Math.random().toString(36).slice(2)}`,
): LeadAttempt {
  let inFlight = false;
  let tracked = false;
  return {
    dedupKey,
    start() {
      if (inFlight || tracked) return false;
      inFlight = true;
      return true;
    },
    shouldTrack(isBot: boolean) {
      if (tracked) return false;
      tracked = true;
      return !isBot;
    },
    release() {
      inFlight = false;
    },
  };
}
