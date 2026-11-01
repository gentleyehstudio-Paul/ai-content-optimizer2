import localFont from "next/font/local";
import { getImageProps } from "next/image";
import { preload } from "react-dom";
import { HERO_A3 } from "./heroA3.config";
import styles from "./HeroA3.module.css";

// /ai-team 首屏 A3（Lulu 藍色版）。規格：流量變現顧問 handoff-A3（2026-11-01），Gentle 11/01 核准 A3 視覺。
// 圖層只有圖、沒有字；巨字、卡片、副標、H1、徽章全部是 HTML 文字（搜尋引擎與螢幕閱讀器都讀得到）。
// 待 Gentle 確認的 H1（3A/3B）、圖層（L2/L1）、Header（H-B/H-A）在 heroA3.config.ts 切換。

// 子集字型（Noto Sans TC，SIL OFL 1.1）：900 只含巨字、800 含副標／卡片角色名／徽章。改文案有新字就要重做子集。
const heroFont = localFont({
  src: [
    { path: "./fonts/NotoSansTC-900-ai-team-hero.woff2", weight: "900", style: "normal" },
    { path: "./fonts/NotoSansTC-800-ai-team-hero.woff2", weight: "800", style: "normal" },
  ],
  display: "swap",
  preload: true,
  adjustFontFallback: false,
  variable: "--font-ai-hero",
  fallback: ["PingFang TC", "Noto Sans TC", "Microsoft JhengHei", "sans-serif"],
});

const BASE = "/assets/ai-team/hero-a3";
const MOBILE_MEDIA = "(max-width: 767px)";
const DESKTOP_MEDIA = "(min-width: 768px)";
const MOBILE_SIZES = "100vw";
const DESKTOP_SIZES = "(min-width: 2560px) 2560px, 100vw";
const WIDTHS = { mobile: [750, 1080], desktop: [1280, 1920, 2560] } as const;

type Device = keyof typeof WIDTHS;
type Layer = "bg" | "fg" | "art";
type Format = "avif" | "webp";

function file(device: Device, layer: Layer, w: number, fmt: Format) {
  return `${BASE}/hero-a3-${device}-${layer}-${w}.${fmt}`;
}

function srcSet(device: Device, layer: Layer, fmt: Format) {
  return WIDTHS[device].map((w) => `${file(device, layer, w, fmt)} ${w}w`).join(", ");
}

const LULU_ALT = "居葉設計的品牌角色 Lulu，身旁有白色方塊和籃球";

// 圖檔已經壓好（AVIF→WebP），用 next/image 的 getImageProps（unoptimized，避免重複壓縮）＋ <picture> 做手機／桌機兩種構圖。
function HeroLayer({ layer, alt, lcp }: { layer: Layer; alt: string; lcp?: boolean }) {
  const { props } = getImageProps({
    src: file("desktop", layer, 1920, "webp"),
    width: 1920,
    height: 900,
    alt,
    unoptimized: true,
    loading: "eager",
    fetchPriority: lcp ? "high" : "auto",
    sizes: DESKTOP_SIZES,
  });
  return (
    <picture className={styles.layer} data-layer={layer}>
      <source media={MOBILE_MEDIA} type="image/avif" srcSet={srcSet("mobile", layer, "avif")} sizes={MOBILE_SIZES} width={1080} height={1920} />
      <source media={MOBILE_MEDIA} type="image/webp" srcSet={srcSet("mobile", layer, "webp")} sizes={MOBILE_SIZES} width={1080} height={1920} />
      <source type="image/avif" srcSet={srcSet("desktop", layer, "avif")} sizes={DESKTOP_SIZES} />
      <source type="image/webp" srcSet={srcSet("desktop", layer, "webp")} sizes={DESKTOP_SIZES} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt 由 getImageProps 帶入 */}
      <img {...props} aria-hidden={alt === "" ? true : undefined} />
    </picture>
  );
}

const CARDS = [
  { no: "01", role: "秘書", desc: "先擬好草稿" },
  { no: "02", role: "研究", desc: "整理資料" },
  { no: "03", role: "客服", desc: "擬回覆草稿" },
] as const;

const BADGE_TEXT = "預約免費 30 分鐘 AI 團隊診斷・預約免費 30 分鐘 AI 團隊診斷・";
const BADGE_R = 116;
const BADGE_RING = `M150,150 m-${BADGE_R},0 a${BADGE_R},${BADGE_R} 0 1,1 ${BADGE_R * 2},0 a${BADGE_R},${BADGE_R} 0 1,1 -${BADGE_R * 2},0`;

export function HeroA3() {
  const l2 = HERO_A3.layers === "L2";

  // 首屏圖層 preload：手機、桌機各一條，用 media 互斥，一個視窗每層只下載一張。
  // L2 的背景層只有 2–5 KB，但面積最大，Lighthouse 會把它當 LCP 元素，所以也一起 preload。
  const preloadLayers: Layer[] = l2 ? ["fg", "bg"] : ["art"];
  for (const layer of preloadLayers) {
    preload(file("mobile", layer, 1080, "avif"), {
      as: "image",
      type: "image/avif",
      imageSrcSet: srcSet("mobile", layer, "avif"),
      imageSizes: MOBILE_SIZES,
      media: MOBILE_MEDIA,
      fetchPriority: "high",
    });
    preload(file("desktop", layer, 1920, "avif"), {
      as: "image",
      type: "image/avif",
      imageSrcSet: srcSet("desktop", layer, "avif"),
      imageSizes: DESKTOP_SIZES,
      media: DESKTOP_MEDIA,
      fetchPriority: "high",
    });
  }

  // 3A：H1 是「任何對外訊息…」，巨字是 <p>；3B：對調標籤，版面不變。
  const DisplayTag = HERO_A3.h1 === "3B" ? "h1" : "p";
  const SentenceTag = HERO_A3.h1 === "3B" ? "p" : "h1";

  return (
    <section
      className={`${styles.hero} ${heroFont.variable}`}
      data-layers={HERO_A3.layers}
      aria-label="AI 小團隊"
    >
      <div className={styles.headerSafe}>
        <div className={styles.canvas}>
          {l2 ? <HeroLayer layer="bg" alt="" lcp /> : <HeroLayer layer="art" alt={LULU_ALT} lcp />}

          <p className={styles.eyebrow}>AI TEAM ・ 居葉設計</p>
          <DisplayTag className={styles.display}>
            <span className={styles.line1}>一人公司</span>{" "}
            <span className={styles.line2}>AI 小團隊</span>
          </DisplayTag>

          {l2 && <HeroLayer layer="fg" alt={LULU_ALT} lcp />}

          <ul className={styles.cards} aria-label="AI 小團隊成員">
            {CARDS.map((c) => (
              <li key={c.no} className={styles.card} data-card={c.no}>
                <div className={styles.cardInner}>
                  <div className={styles.cardTop}>
                    <span className={styles.cardNo}>AI {c.no}</span>
                    <span className={styles.cardStatus}>● 隨時待命</span>
                  </div>
                  <p className={styles.cardRole}>{c.role}</p>
                  <p className={styles.cardDesc}>{c.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* 「他們 24 小時在幫我工作。」後面一定緊接「任何對外訊息，都先經你同意。」 */}
          <p className={styles.sub}>
            他們 24 小時<br className={styles.mobileBreak} />在幫我工作。
          </p>
          <SentenceTag className={styles.sentence}>
            任何對外訊息，<br className={styles.mobileBreak} />都先經你同意。
          </SentenceTag>

          {/* 可存取名稱用 sr-only 文字（等同 aria-label），避免「標籤與可見文字不符」：繞圈文字重複兩次且 aria-hidden */}
          <a href="#book" className={styles.badge}>
            <span className="sr-only">預約免費 30 分鐘 AI 團隊診斷</span>
            <span className={styles.badgeSpin}>
              <span className={styles.badgeSpinHover}>
                <svg viewBox="0 0 300 300" aria-hidden="true" focusable="false">
                  <defs>
                    <path id="ai-hero-badge-ring" d={BADGE_RING} />
                  </defs>
                  <circle cx="150" cy="150" r="150" fill="#D4FF3A" />
                  <text fill="#10131A" fontSize="21" fontWeight="800" className={styles.badgeText}>
                    <textPath href="#ai-hero-badge-ring" textLength={Math.round(2 * Math.PI * BADGE_R)} lengthAdjust="spacing">
                      {BADGE_TEXT}
                    </textPath>
                  </text>
                </svg>
              </span>
            </span>
            {/* 中間的手繪感波浪箭頭（對照設計稿；原稿筆觸尚無 SVG 版，先用單一路徑描繪）；不跟著轉 */}
            <svg className={styles.badgeArrow} viewBox="0 0 300 300" aria-hidden="true" focusable="false">
              <path
                d="M72 168 C 92 186, 112 192, 128 172 S 150 128, 172 150 S 196 178, 214 150 L 228 124 M 202 126 L 229 121 L 230 148"
                fill="none"
                stroke="#10131A"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
