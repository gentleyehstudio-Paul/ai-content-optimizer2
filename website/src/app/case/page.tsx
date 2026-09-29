"use client";

import Image from "next/image";
import Link from "next/link";
import { BeforeAfter } from "@/components/BeforeAfter";

export default function CasePage() {
  return (
    <div
      className="bg-paper"
      style={{
        paddingTop: "clamp(100px, 12vw, 160px)",
        paddingBottom: "clamp(72px, 9vw, 128px)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-5">
        {/* Breadcrumb */}
        <nav className="text-[13px] text-text-secondary mb-6">
          <Link href="/" className="hover:text-red">
            首頁
          </Link>
          <span className="mx-2">/</span>
          <span>案例</span>
          <span className="mx-2">/</span>
          <span>半導體</span>
          <span className="mx-2">/</span>
          <span className="text-ink">Lulu</span>
        </nav>

        <h1
          className="font-bold text-ink mb-3"
          style={{
            fontSize: "clamp(28px, 3.6vw, 48px)",
            letterSpacing: "-.02em",
          }}
        >
          企業形象：識別卡改版，風格一致
        </h1>
        <p className="text-[13px] text-text-muted mb-12">
          每個區塊都是獨立畫框，可以直接截圖成社群貼文——案例內容為模板示意
        </p>

        {/* Case Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 01 / 客戶產業 */}
          <article
            className="rounded-[18px] p-8 flex flex-col justify-between"
            style={{
              background: "linear-gradient(160deg, #f7f6f2 0%, #eeede8 100%)",
              border: "1px solid #d8d9d1",
              aspectRatio: "4/5",
            }}
          >
            <div>
              <p className="text-red font-bold text-[14px] mb-1">
                01 / 客戶產業
              </p>
              <h2 className="text-[22px] font-bold text-ink mt-4">半導體</h2>
              <p className="text-[14px] text-text-secondary mt-2 leading-relaxed">
                設備製造商・國際展會主視覺與系列社群素材
              </p>
            </div>
            <div className="flex items-center justify-between mt-auto pt-8">
              <span className="text-[11px] font-bold tracking-tight text-ink">
                GENTLEYEHSTUDIO<sup className="text-[7px]">®</sup>
              </span>
              <span className="text-[10px] text-text-muted tracking-[.12em]">
                CASE 01 · 1/6
              </span>
            </div>
          </article>

          {/* 02 / 痛點 */}
          <article
            className="bg-dark text-white rounded-[18px] p-8 flex flex-col justify-between"
            style={{ aspectRatio: "4/5" }}
          >
            <div>
              <p className="text-red font-bold text-[14px] mb-1">02 / 痛點</p>
              <p className="text-[20px] font-medium text-white/80 mt-6 leading-relaxed">
                「AI
                生的展場主視覺很漂亮，但 Logo
                被改寫、整組風格對不起來」
              </p>
            </div>
            <div className="flex items-center justify-between mt-auto pt-8">
              <span className="text-[11px] font-bold tracking-tight text-white/60">
                GENTLEYEHSTUDIO<sup className="text-[7px]">®</sup>
              </span>
              <span className="text-[10px] text-white/40 tracking-[.12em]">
                CASE 01 · 2/6
              </span>
            </div>
          </article>

          {/* 03 / 流程 */}
          <article
            className="rounded-[18px] p-8 bg-white border border-hairline flex flex-col justify-between"
            style={{ aspectRatio: "4/5" }}
          >
            <div>
              <p className="text-red font-bold text-[14px] mb-6">03 / 流程</p>
              <div className="flex flex-col gap-4">
                {[
                  { step: "生成場景", tag: "AGENT" },
                  { step: "Logo 鎖定・去 AI 味", tag: "LULU" },
                  { step: "展板輸出・社群尺寸", tag: "MILES" },
                ].map((item) => (
                  <div
                    key={item.tag}
                    className="flex items-center justify-between py-3 border-b border-hairline"
                  >
                    <span className="text-[16px] font-medium text-ink">
                      {item.step}
                    </span>
                    <span className="text-[10px] tracking-[.14em] text-text-muted uppercase">
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between mt-auto pt-8">
              <span className="text-[11px] font-bold tracking-tight text-ink">
                GENTLEYEHSTUDIO<sup className="text-[7px]">®</sup>
              </span>
              <span className="text-[10px] text-text-muted tracking-[.12em]">
                CASE 01 · 3/6
              </span>
            </div>
          </article>

          {/* 04 / 成果 */}
          <article
            className="rounded-[18px] p-8 bg-white border border-hairline flex flex-col justify-between"
            style={{ aspectRatio: "4/5" }}
          >
            <div>
              <p className="text-red font-bold text-[14px] mb-6">04 / 成果</p>
              <BeforeAfter
                beforeSrc="/assets/idcard-before.jpg"
                afterSrc="/assets/idcard-after.jpg"
                ratio="4/3"
              />
            </div>
            <div className="flex items-center justify-between mt-auto pt-8">
              <span className="text-[11px] font-bold tracking-tight text-ink">
                GENTLEYEHSTUDIO<sup className="text-[7px]">®</sup>
              </span>
              <span className="text-[10px] text-text-muted tracking-[.12em]">
                CASE 01 · 4/6
              </span>
            </div>
          </article>

          {/* 05 / 數據 */}
          <article
            className="rounded-[18px] p-8 bg-white border border-hairline flex flex-col justify-between"
            style={{ aspectRatio: "4/5" }}
          >
            <div>
              <p className="text-red font-bold text-[14px] mb-6">05 / 數據</p>
              <div className="flex flex-col gap-8 mt-8">
                <div>
                  <p className="text-[11px] tracking-[.14em] text-text-secondary uppercase mb-2">
                    交期
                  </p>
                  <p
                    className="font-bold text-ink"
                    style={{ fontSize: "clamp(34px, 3.8vw, 48px)" }}
                  >
                    1–2 天
                  </p>
                </div>
                <div>
                  <p className="text-[11px] tracking-[.14em] text-text-secondary uppercase mb-2">
                    素材產量
                  </p>
                  <p
                    className="font-bold text-ink"
                    style={{ fontSize: "clamp(34px, 3.8vw, 48px)" }}
                  >
                    3,000+ 張
                  </p>
                </div>
              </div>
              <p className="text-[12px] text-text-muted mt-6">
                經客戶授權公開之實際數據
              </p>
            </div>
            <div className="flex items-center justify-between mt-auto pt-8">
              <span className="text-[11px] font-bold tracking-tight text-ink">
                GENTLEYEHSTUDIO<sup className="text-[7px]">®</sup>
              </span>
              <span className="text-[10px] text-text-muted tracking-[.12em]">
                CASE 01 · 5/6
              </span>
            </div>
          </article>

          {/* 06 / 相關服務 */}
          <article
            className="rounded-[18px] p-8 flex flex-col justify-between"
            style={{
              background: "linear-gradient(160deg, #f7f6f2 0%, #eeede8 100%)",
              border: "1px solid #d8d9d1",
              aspectRatio: "4/5",
            }}
          >
            <div>
              <p className="text-red font-bold text-[14px] mb-6">
                06 / 相關服務
              </p>
              <h2
                className="font-bold text-ink"
                style={{ fontSize: "clamp(40px, 4.6vw, 60px)" }}
              >
                Hire Lulu
              </h2>
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="px-3 py-1.5 border border-ink rounded-full text-[12px] font-medium">
                  Lulu · LogoLock
                </span>
                <span className="px-3 py-1.5 border border-ink rounded-full text-[12px] font-medium">
                  Miles · LastMile
                </span>
              </div>
              <Link
                href="/agents"
                className="inline-block mt-8 text-[14px] font-semibold text-ink hover:text-red transition-colors"
              >
                了解服務 →
              </Link>
            </div>
            <div className="flex items-center justify-between mt-auto pt-8">
              <span className="text-[11px] font-bold tracking-tight text-ink">
                GENTLEYEHSTUDIO<sup className="text-[7px]">®</sup>
              </span>
              <span className="text-[10px] text-text-muted tracking-[.12em]">
                CASE 01 · 6/6
              </span>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
