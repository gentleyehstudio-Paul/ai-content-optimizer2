import { readLeadAttribution } from "@/lib/attribution-client";
import { UTM_KEYS, type UtmKey } from "@/lib/attribution";
import { ATTR_STORE } from "./tracking";

// /ai-team 既有的廣告參數字串。信件裡仍以「廣告參數」呈現。
// 五個 UTM 若當下網址沒有，改從共用的 session 歸因補上，換頁才不會掉。
// oai_* 與 oppref 只在當下網址出現時附上，維持原本的範圍，不送進 GA4。
const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "oai_cid",
  "oai_agid",
  "oai_adid",
  "oppref",
] as const;

const UTM_SET = new Set<string>(UTM_KEYS);
const FIRST_STORE = "gy_ai_team_first"; // 第一次帶參數進站（保留 90 天）
const FIRST_TTL = 90 * 24 * 60 * 60 * 1000;

function clip(value: string): string {
  return value.replace(/[\u0000-\u001F\u007F\u2028\u2029]/g, "").trim().slice(0, 120);
}

function paramsFromUrl(): string {
  const params = new URLSearchParams(window.location.search);
  const stored = readLeadAttribution();
  const parts: string[] = [];
  for (const key of ATTRIBUTION_KEYS) {
    const fromUrl = params.get(key);
    const value = fromUrl
      ? clip(fromUrl)
      : UTM_SET.has(key)
        ? clip(stored[key as UtmKey] ?? "")
        : "";
    if (value) parts.push(`${key}=${value}`);
  }
  return parts.join("&");
}

function readFirstTouch(fromUrl: string): string {
  try {
    const raw = localStorage.getItem(FIRST_STORE);
    if (raw) {
      const saved = JSON.parse(raw) as { v: string; t: number };
      if (typeof saved.v === "string" && Date.now() - saved.t < FIRST_TTL) return saved.v;
    }
    if (fromUrl) {
      const v = `${fromUrl}&lp=${window.location.pathname}&d=${new Date().toISOString().slice(0, 10)}`;
      localStorage.setItem(FIRST_STORE, JSON.stringify({ v, t: Date.now() }));
      return v;
    }
  } catch {
    // localStorage 不可用時略過，不影響這次 session 的參數
  }
  return "";
}

/**
 * 寄給工作室的「廣告參數」字串。
 * last = 這次 session 最後一次看得到的允許參數；first = 90 天內第一次（含 lp 與日期）。
 * sessionStorage / localStorage 失敗時回空字串，表單仍可送出。
 */
export function readAiTeamAttribution(): string {
  if (typeof window === "undefined") return "";
  try {
    const fromUrl = paramsFromUrl();
    if (fromUrl) sessionStorage.setItem(ATTR_STORE, fromUrl);
    const last = fromUrl || sessionStorage.getItem(ATTR_STORE) || "";
    const first = readFirstTouch(fromUrl);
    const parts: string[] = [];
    if (last) parts.push(`last: ${last}`);
    if (first && !first.startsWith(`${last}&lp=`)) parts.push(`first: ${first}`);
    else if (first) parts.push(first.slice(last.length + 1));
    return parts.join(" | ");
  } catch {
    return "";
  }
}
