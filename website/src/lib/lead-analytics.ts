import { sanitizeUtmValue } from "./attribution";

/**
 * 成功的詢價才送出 GA4 `generate_lead`，而且同一次嘗試只送一次。
 *
 * 參數白名單：form、service、plan，以及五個 UTM。
 * 不送 email、姓名、電話、公司、需求內容、referrer 或落地頁。
 *
 * gtag 已存在就呼叫它一次。還沒存在時，比照 layout.tsx 的 stub，把同一筆命令推進
 * 頁面上的 `dataLayer` 一次，讓稍後載入的 gtag.js 可以讀到佇列。
 * 這不是送達保證：廣告阻擋、腳本沒跑、或沒有人消費 dataLayer 時，GA4 不會收到。
 * 不改同意設定、不繞過阻擋、不把事件寫進 storage，也不會事後再試。
 *
 * 去重鍵是「這一次元件掛載的這一筆成功」。同一把再呼叫會被丟掉。
 * 元件卸下後再掛載會換一把新鍵，下一筆合法成功仍會送出，不會被上一筆永遠擋住。
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

type DataLayerWindow = Window & { dataLayer?: unknown[]; gtag?: Gtag };

/**
 * 交給頁面既有的 gtag / dataLayer。回傳 true 只代表已交給這個佇列，不代表 GA4 已收到。
 */
function handoffGenerateLead(safe: Record<string, string>): boolean {
  const w = window as DataLayerWindow;
  if (typeof w.gtag === "function") {
    w.gtag("event", "generate_lead", safe);
    return true;
  }
  if (!Array.isArray(w.dataLayer)) w.dataLayer = [];
  const dataLayer = w.dataLayer;
  // 與 layout 的 `function gtag(){dataLayer.push(arguments)}` 相同，不另外安裝全域 gtag。
  // rest array 不是 Arguments，gtag.js 讀既有佇列時可能略過，所以這裡維持相同形狀。
  const stub: Gtag = function stub() {
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  };
  stub("event", "generate_lead", safe);
  return true;
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
    return handoffGenerateLead(safe);
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
