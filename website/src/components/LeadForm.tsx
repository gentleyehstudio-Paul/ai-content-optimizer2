"use client";

import { useState, type CSSProperties, type FormEvent, type ReactNode } from "react";

export const LINE_URL = "https://line.me/R/ti/p/%40kij2619w";

// 這些欄位名稱會原樣送到 /api/contact（伺服器端另有白名單與長度限制）
const FIELDS = [
  "name",
  "email",
  "company",
  "phone",
  "message",
  "headcount",
  "imageLinks",
] as const;

export type LeadSource = "/contact" | "/training" | "/printscale" | "/agents" | "/";

type Status = "idle" | "sending" | "sent" | "error";

type Props = {
  /** 來源頁面，會出現在信件主旨 */
  source: LeadSource;
  /** /api/contact 的服務代碼 */
  service: string;
  /** 成功後顯示的文字 */
  successMessage: string;
  /** dark：深色區塊；light：淺色區塊 */
  theme?: "dark" | "light";
  className?: string;
  style?: CSSProperties;
  /** 表單欄位與送出鈕；sending 為 true 時代表送出中 */
  children: (sending: boolean) => ReactNode;
};

/**
 * 共用表單：送到 /api/contact，含隱藏防機器人欄位、送出中／成功／失敗狀態，
 * 失敗時提供 LINE 與 Email 備援。外觀（欄位、按鈕）由各頁自己決定。
 */
export function LeadForm({
  source,
  service,
  successMessage,
  theme = "dark",
  className,
  style,
  children,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const sending = status === "sending";
  const dark = theme === "dark";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const fd = new FormData(e.currentTarget);
    setStatus("sending");
    const payload: Record<string, unknown> = {
      source,
      service,
      website: fd.get("website"), // honeypot
    };
    for (const k of FIELDS) {
      const v = fd.get(k);
      if (typeof v === "string" && v.trim() !== "") payload[k] = v;
    }
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      // 只有伺服器明確回 2xx 才算成功
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="mt-8 text-[16px] font-semibold leading-relaxed px-5 py-4 rounded-sm"
        style={
          dark
            ? { background: "#252e26", border: "1px solid #4a554b", color: "#f2f2ed" }
            : { background: "#fff", border: "1px solid #bec3b8", color: "#191a18" }
        }
      >
        {successMessage}
      </div>
    );
  }

  return (
    <div>
      <form className={className} style={style} onSubmit={handleSubmit}>
        {/* display: contents 讓 fieldset 不影響原本的排版 */}
        <fieldset disabled={sending} style={{ display: "contents" }}>
          {children(sending)}
        </fieldset>
        {/* Honeypot：真人看不到也不會填 */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
          style={{ display: "none" }}
        />
      </form>
      {status === "error" && (
        <div
          role="alert"
          className="mt-4 text-[14px] leading-relaxed px-4 py-3 rounded-sm text-left"
          style={
            dark
              ? { background: "#3a2623", border: "1px solid #a63328", color: "#f2f2ed" }
              : { background: "#fbeeec", border: "1px solid #a63328", color: "#191a18" }
          }
        >
          送出失敗，你的內容還在，請稍後再試一次。也可以改用{" "}
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="underline">
            LINE @kij2619w
          </a>{" "}
          或 Email{" "}
          <a href="mailto:gentleyehstudio@gmail.com" className="underline">
            gentleyehstudio@gmail.com
          </a>
          。
        </div>
      )}
    </div>
  );
}
