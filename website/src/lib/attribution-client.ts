import {
  emptyLeadAttribution,
  rememberAttribution,
  type LeadAttribution,
  type StorageLike,
} from "./attribution";

function safeSessionStorage(): StorageLike | null {
  if (typeof window === "undefined") return null;
  try {
    const storage = window.sessionStorage;
    const probe = "__gy_attr_probe";
    storage.setItem(probe, "1");
    storage.removeItem(probe);
    return storage;
  } catch {
    return null;
  }
}

/** 瀏覽器裡讀取首次接觸歸因。伺服器上呼叫時回傳空物件，不丟例外。 */
export function readLeadAttribution(): LeadAttribution {
  if (typeof window === "undefined") return emptyLeadAttribution();
  return rememberAttribution({
    storage: safeSessionStorage(),
    search: window.location.search,
    pathname: window.location.pathname,
    referrer: typeof document === "undefined" ? "" : document.referrer,
    origin: window.location.origin,
  });
}
