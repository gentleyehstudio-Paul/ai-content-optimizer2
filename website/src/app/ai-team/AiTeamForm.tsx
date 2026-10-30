"use client";

import { useState, type FormEvent } from "react";

const PLAN_OPTIONS = [
  { value: "personal", label: "個人版" },
  { value: "business", label: "企業版" },
];

// 廣告參數：只讀網址上的這些鍵，連同表單一起寄出（不送進任何追蹤事件）
const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "oai_cid",
  "oai_agid",
  "oai_adid",
  "oppref",
];
const ATTR_STORE = "gy_ai_team_attr";

function readAttribution(): string {
  try {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = ATTRIBUTION_KEYS.filter((k) => params.get(k))
      .map((k) => `${k}=${params.get(k)!.slice(0, 120)}`)
      .join("&");
    if (fromUrl) {
      sessionStorage.setItem(ATTR_STORE, fromUrl);
      return fromUrl;
    }
    return sessionStorage.getItem(ATTR_STORE) ?? "";
  } catch {
    return "";
  }
}

const inputStyle = {
  background: "#252e26",
  border: "1px solid #4a554b",
  color: "#f2f2ed",
};

const LINE_URL = "https://line.me/R/ti/p/%40kij2619w";

type Status = "idle" | "sending" | "sent" | "error";

export function AiTeamForm() {
  const [plan, setPlan] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: "ai-team",
          source: "/ai-team",
          plan,
          name: fd.get("name"),
          email: fd.get("email"),
          timeslot: fd.get("timeslot"),
          message: fd.get("message"),
          attribution: readAttribution(),
          website: fd.get("website"), // honeypot
        }),
      });
      // 只有伺服器明確回 2xx 才算成功
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="py-12">
        <p className="font-bold" style={{ fontSize: "clamp(24px, 3vw, 40px)" }}>
          已收到你的預約
        </p>
        <p className="text-white/50 text-[15px] mt-4 leading-relaxed">
          我們會在 1 個工作天內先回覆，再用 Email 和你約 30 分鐘的時間。
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div>
        <p className="block text-[12px] text-white/50 mb-2 tracking-wide">版本</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="版本">
          {PLAN_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              aria-pressed={plan === opt.value}
              onClick={() => setPlan(plan === opt.value ? "" : opt.value)}
              className="px-4 py-2 rounded-sm text-[13px] font-medium transition-colors"
              style={
                plan === opt.value
                  ? { background: "#f2f2ed", color: "#191a18", border: "1px solid #f2f2ed" }
                  : { background: "transparent", border: "1px solid #4a554b", color: "#c4c8c0" }
              }
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          required
          maxLength={100}
          disabled={status === "sending"}
          placeholder="稱呼"
          aria-label="稱呼"
          className="px-4 py-3.5 rounded-sm text-[15px] outline-none placeholder:text-white/30"
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          required
          maxLength={200}
          disabled={status === "sending"}
          placeholder="Email"
          aria-label="Email"
          className="px-4 py-3.5 rounded-sm text-[15px] outline-none placeholder:text-white/30"
          style={inputStyle}
        />
      </div>

      <textarea
        name="message"
        maxLength={4000}
        disabled={status === "sending"}
        placeholder="想先交給 AI 的工作"
        aria-label="想先交給 AI 的工作"
        rows={4}
        className="px-4 py-3.5 rounded-sm text-[15px] outline-none resize-none placeholder:text-white/30"
        style={inputStyle}
      />

      <input
        type="text"
        name="timeslot"
        maxLength={200}
        disabled={status === "sending"}
        placeholder="方便的時段（例如：平日下午）"
        aria-label="方便的時段"
        className="px-4 py-3.5 rounded-sm text-[15px] outline-none placeholder:text-white/30"
        style={inputStyle}
      />

      {/* Honeypot：真人看不到也不會填 */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <p className="text-[12px] text-white/50 leading-relaxed">
        請勿填寫客戶名單、報價、圖面或個人資料。
      </p>

      {status === "error" && (
        <div
          role="alert"
          className="text-[14px] leading-relaxed px-4 py-3 rounded-sm"
          style={{ background: "#3a2522", border: "1px solid #a63328", color: "#f2f2ed" }}
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

      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start px-8 py-3.5 bg-white text-ink font-semibold text-[14px] rounded-sm hover:bg-red hover:text-white transition-colors flex items-center gap-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "送出中…" : "預約免費 30 分鐘 AI 團隊診斷"}
        <span>↗</span>
      </button>
    </form>
  );
}
