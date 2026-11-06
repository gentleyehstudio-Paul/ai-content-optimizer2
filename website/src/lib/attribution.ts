/**
 * 詢價表單的流量歸因（同一個分頁的首次接觸）。
 *
 * 目的：訪客從帶有 UTM 的網址進站後，改走到 /printscale、/contact 等表單頁時，
 * POST /api/contact 仍然帶得上當初的來源。這裡只留行銷歸因，不用來辨識個人。
 *
 * 存在哪裡：sessionStorage 鍵 `gy_lead_attr_v1`。關掉分頁就消失。
 * 不寫 Cookie、不新增 localStorage、不改變既有的同意流程或隱私權政策。
 * /ai-team 原本的 90 天 localStorage（`gy_ai_team_first`）與 session 鍵
 * （`gy_ai_team_attr`）維持原樣，由該頁自己的邏輯另外處理。
 *
 * 語意：
 * - 初次落地頁：這個分頁第一次記下歸因時的 pathname，之後換頁不覆寫。
 *   只留路徑，去掉 `?query` 與 `#hash`。
 * - 初次造訪來源：第一次記下時的 document.referrer。只留 origin + pathname，
 *   去掉帳密、query、hash。同站（gentleyehdesign.com、www、目前頁面的 host、
 *   localhost）視為站內導覽，記成空字串；信件因此顯示「直接造訪」。
 *   不從 referrer 的 query 回推 UTM，避免把權杖或其他敏感參數存下來。
 * - UTM：只讀 utm_source、utm_medium、utm_campaign、utm_term、utm_content。
 *   每個欄位採「第一個非空值」：換頁不會遺失，同一次瀏覽稍後出現的不同值也不覆蓋。
 *   其他 query（gclid、fbclid、email、token 等）不讀、不存。
 * - 長度與字元：UTM 最長 100，referrer 最長 300，落地頁最長 200。
 *   去掉控制字元。UTM 若含換行、`<` `>`、引號、`@`、`?`、`#`、`://` 就整段丟棄。
 *   允許文字、數字、空格與 `.` `_` `-` `+` `/` `|` `~`，所以中文活動名稱可以留下。
 *
 * sessionStorage 不可用（存取被擋下或丟出例外）時：
 * - 例外不往上丟，表單仍可送出。
 * - 改放在這份 JavaScript 記憶體。同一個文件裡的客戶端換頁還留得住。
 * - 整頁重新載入後記憶體清空，只能看到當下這一頁的網址與 referrer。
 * - 這是安全的降級，不是錯誤。
 */

export const ATTRIBUTION_SESSION_KEY = "gy_lead_attr_v1";

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];

export type LeadAttribution = Record<UtmKey, string> & {
  referrer: string;
  landing: string;
};

const UTM_MAX = 100;
const REFERRER_MAX = 300;
const LANDING_MAX = 200;

export type StorageLike = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

export type AttributionEnv = {
  storage: StorageLike | null;
  search: string;
  pathname: string;
  referrer: string;
  origin: string;
};

let memoryAttribution: LeadAttribution | null = null;

export function resetAttributionMemoryForTests(): void {
  memoryAttribution = null;
}

export function emptyLeadAttribution(): LeadAttribution {
  return {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
    referrer: "",
    landing: "",
  };
}

export function sanitizeUtmValue(raw: unknown): string {
  if (typeof raw !== "string") return "";
  const stripped = raw.replace(/[\u0000-\u001F\u007F\u2028\u2029]/g, "").trim();
  if (!stripped) return "";
  const v = stripped.length > UTM_MAX ? stripped.slice(0, UTM_MAX).trim() : stripped;
  if (!v) return "";
  if (/[<>"'`\\@?#&=]/.test(v) || v.includes("://")) return "";
  if (!/^[\p{L}\p{N} ._+\-/|~]+$/u.test(v)) return "";
  if (!/[\p{L}\p{N}]/u.test(v)) return "";
  return v;
}

export function sanitizeLandingPath(raw: unknown): string {
  if (typeof raw !== "string") return "";
  let v = raw.trim();
  if (!v || v.length > 500) return "";
  if (/[\u0000-\u001F\u007F\u2028\u2029]/.test(v)) return "";
  if (/^[a-z][a-z0-9+.-]*:/i.test(v) || v.startsWith("//")) return "";
  const hash = v.indexOf("#");
  if (hash >= 0) v = v.slice(0, hash);
  const query = v.indexOf("?");
  if (query >= 0) v = v.slice(0, query);
  if (!v.startsWith("/") || v.startsWith("//")) return "";
  let decoded: string;
  try {
    decoded = decodeURIComponent(v);
  } catch {
    return "";
  }
  if (!decoded || decoded.length > LANDING_MAX) return "";
  if (/[?#<>"'\\@\s]/.test(decoded) || decoded.includes("://") || decoded.includes("..")) {
    return "";
  }
  if (!decoded.startsWith("/")) return "";
  const parts = decoded.split("/");
  for (let i = 1; i < parts.length; i++) {
    const seg = parts[i];
    if (seg === "" && i === parts.length - 1) continue;
    if (!seg || seg === "." || seg === "..") return "";
    if (!/^[\p{L}\p{N}._~-]+$/u.test(seg)) return "";
  }
  return decoded;
}

function isFirstPartyHost(hostname: string, pageOrigin?: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  if (host === "localhost" || host === "127.0.0.1" || host === "::1") return true;
  if (host === "gentleyehdesign.com" || host === "www.gentleyehdesign.com") return true;
  if (!pageOrigin) return false;
  try {
    return new URL(pageOrigin).hostname.toLowerCase() === host;
  } catch {
    return false;
  }
}

/** 只留外部網站的 origin + pathname。同站、帶帳密、或不是 http(s) 都回空字串。 */
export function sanitizeReferrer(raw: unknown, pageOrigin?: string): string {
  if (typeof raw !== "string") return "";
  const trimmed = raw.trim();
  if (!trimmed || trimmed.length > 2000) return "";
  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return "";
  }
  if (url.username || url.password) return "";
  if (url.protocol !== "http:" && url.protocol !== "https:") return "";
  if (isFirstPartyHost(url.hostname, pageOrigin)) return "";
  const safePath = sanitizeLandingPath(url.pathname);
  if (!safePath) return "";
  const suffix = safePath === "/" ? "" : safePath;
  const rebuilt = `${url.protocol}//${url.host}${suffix}`;
  if (rebuilt.length > REFERRER_MAX) return "";
  if (rebuilt.includes("?") || rebuilt.includes("#")) return "";
  return rebuilt;
}

export function parseLeadAttribution(raw: unknown): LeadAttribution | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const record = raw as Record<string, unknown>;
  const attr = emptyLeadAttribution();
  for (const key of UTM_KEYS) attr[key] = sanitizeUtmValue(record[key]);
  attr.referrer = sanitizeReferrer(record.referrer);
  attr.landing = sanitizeLandingPath(record.landing);
  return attr;
}

export function utmParamsFromAttribution(attr: LeadAttribution): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    if (attr[key]) out[key] = attr[key];
  }
  return out;
}

/** 信件用的固定列。空的 UTM 不列；有送物件時，來源與落地頁一定會出現。 */
export function leadAttributionEmailRows(raw: unknown): [string, string][] | null {
  const attr = parseLeadAttribution(raw);
  if (!attr) return null;
  const rows: [string, string][] = [];
  for (const key of UTM_KEYS) {
    if (attr[key]) rows.push([key, attr[key]]);
  }
  rows.push(["初次造訪來源", attr.referrer || "直接造訪"]);
  rows.push(["初次落地頁", attr.landing || "—"]);
  return rows;
}

function attributionFromLocation(env: AttributionEnv): LeadAttribution {
  const query = env.search.startsWith("?") ? env.search.slice(1) : env.search;
  const params = new URLSearchParams(query);
  const attr = emptyLeadAttribution();
  for (const key of UTM_KEYS) attr[key] = sanitizeUtmValue(params.get(key) ?? "");
  attr.referrer = sanitizeReferrer(env.referrer, env.origin);
  attr.landing = sanitizeLandingPath(env.pathname);
  return attr;
}

function readStored(storage: StorageLike): LeadAttribution | null {
  const raw = storage.getItem(ATTRIBUTION_SESSION_KEY);
  if (!raw) return null;
  return parseLeadAttribution(JSON.parse(raw) as unknown);
}

function mergeFirstTouch(prev: LeadAttribution, fresh: LeadAttribution): LeadAttribution {
  const next = { ...prev };
  for (const key of UTM_KEYS) {
    if (!next[key] && fresh[key]) next[key] = fresh[key];
  }
  if (!next.landing && fresh.landing) next.landing = fresh.landing;
  return next;
}

/**
 * 讀取並補上目前這一頁的歸因。已記下的落地頁、referrer、非空 UTM 不會被覆蓋。
 * storage 丟例外時改用記憶體，自己也不丟例外。
 */
export function rememberAttribution(env: AttributionEnv): LeadAttribution {
  const fresh = attributionFromLocation(env);
  let stored: LeadAttribution | null = null;
  if (env.storage) {
    try {
      stored = readStored(env.storage);
    } catch {
      stored = null;
    }
  }
  const base = stored ?? memoryAttribution;
  const merged = base ? mergeFirstTouch(base, fresh) : fresh;
  memoryAttribution = { ...merged };
  if (env.storage) {
    try {
      env.storage.setItem(ATTRIBUTION_SESSION_KEY, JSON.stringify(memoryAttribution));
    } catch {
      // 記憶體已更新。這個文件裡的換頁仍讀得到；重新載入後只剩當下網址。
    }
  }
  return { ...merged };
}
