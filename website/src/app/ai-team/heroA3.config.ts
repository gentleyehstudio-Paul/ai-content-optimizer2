// /ai-team 首屏 A3（Lulu 藍色版）三個待 Gentle 確認的選項。
// 規格：流量變現顧問 handoff-A3（2026-11-01）。目前全部採建議值，Gentle 拍板後改這裡即可切換。
//
// h1:
//   "3A"（建議）H1 維持「任何對外訊息，都先經你同意。」，巨字「一人公司／AI 小團隊」是視覺 <p>
//   "3B"        H1 改成巨字「一人公司 AI 小團隊」，「任何對外訊息…」改為 <p>（版面不變，只對調標籤）
// layers:
//   "L2"（建議）背景層 → HTML 巨字 → 透明前景層（Lulu 手臂壓住「隊」）→ 卡片／副標／H1／徽章
//   "L1"        單張藝術層，所有 HTML 文字都疊在上面（巨字縮小，第二行右緣留在 Lulu 左側）
// header:
//   "H-B"（建議）只有 /ai-team 且捲動 ≤ 10px 時 Header 透明、白字；捲動後恢復米白。其他頁不變
//   "H-A"        Header 完全不變（米白半透明條蓋在藍色首屏上）
export type HeroA3Options = {
  h1: "3A" | "3B";
  layers: "L2" | "L1";
  header: "H-B" | "H-A";
};

export const HERO_A3: HeroA3Options = {
  h1: "3A",
  layers: "L2",
  header: "H-B",
};
