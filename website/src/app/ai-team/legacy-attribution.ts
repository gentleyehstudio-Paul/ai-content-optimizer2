import { readLeadAttribution } from "@/lib/attribution-client";
import { UTM_KEYS, type UtmKey } from "@/lib/attribution";
import { ATTR_STORE } from "./tracking";

// /ai-team 既有的廣告參數字串。信件裡仍以「廣告參數」呈現。
// 當下網址有任何允許的參數時，只用網址上的那一組，不拿 session snapshot 補空欄，
// 避免活動 A 的 source 接上活動 B 的 campaign。網址完全沒有這些參數時，
// 才整組改用 session 裡的第一組 UTM。oai_* 與 oppref 仍只出現在當下網址，不送進 GA4。
// 90 天的 gy_ai_team_first 只在「當下網址自己帶參數」時寫入，不因 snapshot 擴張。
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

function paramsFromSearch(): string {
  const params = new URLSearchParams(window.location.search);
  const parts: string[] = [];
  for (const key of ATTRIBUTION_KEYS) {
    const fromUrl = params.get(key);
    if (!fromUrl) continue;
    const value = clip(fromUrl);
    if (value) parts.push(`${key}=${value}`);
  }
  return parts.join("&");
}

function snapshotUtmParams(): string {
  const stored = readLeadAttribution();
  const parts: string[] = [];
  for (const key of UTM_KEYS) {
    if (!UTM_SET.has(key)) continue;
    const value = clip(stored[key as UtmKey] ?? "");
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
 * last：當下網址的整組參數；網址沒有時用這個分頁先前存下的字串；都沒有才用 session 的第一組 UTM。
 * first：90 天內、且只在當下網址自己帶參數時寫入的第一次（含 lp 與日期）。
 * storage 失敗時回空字串，表單仍可送出。
 */
export function readAiTeamAttribution(): string {
  if (typeof window === "undefined") return "";
  try {
    const fromUrl = paramsFromSearch();
    if (fromUrl) sessionStorage.setItem(ATTR_STORE, fromUrl);
    // 90 天紀錄只吃當下網址。last 在網址沒參數時才退回先前的 session 字串或整組 snapshot。
    const last = fromUrl || sessionStorage.getItem(ATTR_STORE) || snapshotUtmParams();
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
