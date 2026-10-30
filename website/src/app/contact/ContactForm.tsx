"use client";

import { useState, type FormEvent } from "react";

const SERVICE_OPTIONS = [
  { value: "agents", label: "AI 代理人開發" },
  { value: "diagnose", label: "免費 AI 診斷" },
  { value: "printscale", label: "PrintScale-AI 試用" },
  { value: "training", label: "企業 AI 培訓" },
  { value: "brand", label: "品牌視覺設計" },
  { value: "other", label: "其他" },
];

const inputStyle = {
  background: "#252e26",
  border: "1px solid #4a554b",
  color: "#f2f2ed",
};

const LINE_URL = "https://line.me/R/ti/p/%40kij2619w";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [service, setService] = useState("");
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
          source: "/contact",
          service,
          name: fd.get("name"),
          email: fd.get("email"),
          company: fd.get("company"),
          phone: fd.get("phone"),
          message: fd.get("message"),
          website: fd.get("website"), // honeypot
        }),
      });
      // 只有伺服器明確回 2xx 才算成功
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="bg-paper"
        style={{
          paddingTop: "clamp(120px, 14vw, 200px)",
          paddingBottom: "clamp(48px, 6vw, 80px)",
        }}
      >
        <div className="max-w-[1080px] mx-auto px-5">
          <p className="text-[11px] tracking-[.16em] uppercase font-medium text-text-secondary mb-6">
            CONTACT / INQUIRY
          </p>
          <h1
            className="font-bold text-ink"
            style={{
              fontSize: "clamp(32px, 4.4vw, 60px)",
              lineHeight: 1.08,
              letterSpacing: "-.025em",
            }}
          >
            聯絡我們
          </h1>
          <p className="text-text-secondary text-[16px] mt-4 max-w-lg leading-relaxed">
            告訴我們你的需求，我們會在 1 個工作天內先回覆，再與你討論方案與報價
          </p>
        </div>
      </section>

      {/* ── Form ── */}
      <section
        className="bg-dark text-white"
        style={{
          paddingTop: "clamp(64px, 8vw, 112px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="max-w-[680px] mx-auto px-5">
          {status === "sent" ? (
            <div className="text-center py-16">
              <p
                className="font-bold"
                style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
              >
                感謝您的詢問
              </p>
              <p className="text-white/50 text-[15px] mt-4 leading-relaxed">
                我們已收到你的需求，會在 1 個工作天內先回覆你。
              </p>
            </div>
          ) : (
            <form
              className="flex flex-col gap-5"
              onSubmit={handleSubmit}
            >
              {/* Service type */}
              <div>
                <label className="block text-[12px] text-white/50 mb-2 tracking-wide">
                  服務項目
                </label>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        setService(service === opt.value ? "" : opt.value)
                      }
                      className="px-4 py-2 rounded-full text-[13px] font-medium transition-colors"
                      style={
                        service === opt.value
                          ? { background: "#a63328", color: "#fff" }
                          : {
                              background: "#252e26",
                              border: "1px solid #4a554b",
                              color: "#c4c8c0",
                            }
                      }
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  required
                  maxLength={100}
                  disabled={status === "sending"}
                  placeholder="姓名 / 聯絡人"
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
                  className="px-4 py-3.5 rounded-sm text-[15px] outline-none placeholder:text-white/30"
                  style={inputStyle}
                />
              </div>

              {/* Company + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="company"
                  maxLength={150}
                  disabled={status === "sending"}
                  placeholder="公司名稱（選填）"
                  className="px-4 py-3.5 rounded-sm text-[15px] outline-none placeholder:text-white/30"
                  style={inputStyle}
                />
                <input
                  type="tel"
                  name="phone"
                  maxLength={50}
                  disabled={status === "sending"}
                  placeholder="電話（選填）"
                  className="px-4 py-3.5 rounded-sm text-[15px] outline-none placeholder:text-white/30"
                  style={inputStyle}
                />
              </div>

              {/* Description */}
              <textarea
                name="message"
                maxLength={4000}
                disabled={status === "sending"}
                placeholder="需求說明（想解決什麼問題？預算範圍？時程？）"
                rows={4}
                className="px-4 py-3.5 rounded-sm text-[15px] outline-none resize-none placeholder:text-white/30"
                style={inputStyle}
              />

              {/* Honeypot：真人看不到也不會填 */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              {status === "error" && (
                <div
                  role="alert"
                  className="text-[14px] leading-relaxed px-4 py-3 rounded-sm"
                  style={{
                    background: "#3a2623",
                    border: "1px solid #a63328",
                    color: "#f2f2ed",
                  }}
                >
                  送出失敗，你的內容還在，請稍後再試一次。也可以改用{" "}
                  <a
                    href={LINE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    LINE @kij2619w
                  </a>{" "}
                  或 Email{" "}
                  <a
                    href="mailto:gentleyehstudio@gmail.com"
                    className="underline"
                  >
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
                {status === "sending" ? "送出中…" : "送出詢價"}
                <span>↗</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── Other contact methods ── */}
      <section
        className="bg-paper"
        style={{
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(48px, 6vw, 80px)",
        }}
      >
        <div className="max-w-[680px] mx-auto px-5 text-center">
          <p className="text-[11px] tracking-[.16em] uppercase font-medium text-text-secondary mb-4">
            OTHER WAYS TO REACH US
          </p>
          <p className="text-text-secondary text-[14px] leading-relaxed">
            也可以透過 LINE 官方帳號（居葉設計）聯繫我們，點擊連結或掃描 QR Code 加好友
          </p>
          <p className="mt-4">
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-semibold text-ink underline hover:text-red"
            >
              用 LINE 加好友（@kij2619w）
            </a>
          </p>
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block"
          >
            <img
              src="/assets/line-qrcode.png"
              alt="居葉設計 LINE 官方帳號 QR Code（@kij2619w）"
              width={140}
              height={140}
              className="rounded-lg"
            />
          </a>
        </div>
      </section>
    </>
  );
}
