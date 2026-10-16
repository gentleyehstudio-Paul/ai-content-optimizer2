"use client";

import { useState } from "react";

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

export function ContactForm() {
  const [service, setService] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
            告訴我們你的需求，三個工作天內回覆方案與報價
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
          {submitted ? (
            <div className="text-center py-16">
              <p
                className="font-bold"
                style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
              >
                感謝您的詢問
              </p>
              <p className="text-white/50 text-[15px] mt-4 leading-relaxed">
                我們已收到你的需求，將於三個工作天內回覆。
              </p>
            </div>
          ) : (
            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
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
                  required
                  placeholder="姓名 / 聯絡人"
                  className="px-4 py-3.5 rounded-sm text-[15px] outline-none placeholder:text-white/30"
                  style={inputStyle}
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  className="px-4 py-3.5 rounded-sm text-[15px] outline-none placeholder:text-white/30"
                  style={inputStyle}
                />
              </div>

              {/* Company + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="公司名稱（選填）"
                  className="px-4 py-3.5 rounded-sm text-[15px] outline-none placeholder:text-white/30"
                  style={inputStyle}
                />
                <input
                  type="tel"
                  placeholder="電話（選填）"
                  className="px-4 py-3.5 rounded-sm text-[15px] outline-none placeholder:text-white/30"
                  style={inputStyle}
                />
              </div>

              {/* Description */}
              <textarea
                placeholder="需求說明（想解決什麼問題？預算範圍？時程？）"
                rows={4}
                className="px-4 py-3.5 rounded-sm text-[15px] outline-none resize-none placeholder:text-white/30"
                style={inputStyle}
              />

              <button
                type="submit"
                className="self-start px-8 py-3.5 bg-white text-ink font-semibold text-[14px] rounded-sm hover:bg-red hover:text-white transition-colors flex items-center gap-4"
              >
                送出詢價
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
            也可以直接透過 LINE 官方帳號聯繫我們，回覆更即時
          </p>
          <a
            href="https://lin.ee/gentleyehstudio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-8 py-3.5 bg-ink text-white font-semibold text-[15px] rounded-full hover:bg-red transition-colors"
          >
            LINE 官方帳號
          </a>
        </div>
      </section>
    </>
  );
}
