import type { Metadata } from "next";
import Link from "next/link";
import { TrainingContent } from "./TrainingContent";

export const metadata: Metadata = {
  title: "企業 AI 培訓課程 — Gentleyehstudio",
  description:
    "為中小企業設計的 AI 視覺應用培訓：從 AI 圖片生成、品牌安全應用到印刷輸出。實戰導向，設計師授課，讓團隊即學即用。",
  openGraph: {
    title: "企業 AI 培訓課程 — Gentleyehstudio",
    description:
      "為中小企業設計的 AI 視覺應用培訓：從 AI 圖片生成、品牌安全應用到印刷輸出。",
  },
};

export default function TrainingPage() {
  return <TrainingContent />;
}
