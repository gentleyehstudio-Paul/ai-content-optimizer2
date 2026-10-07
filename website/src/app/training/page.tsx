import type { Metadata } from "next";
import Link from "next/link";
import { TrainingContent } from "./TrainingContent";

export const metadata: Metadata = {
  title: "企業 AI 課程・AI 培訓 — AI 圖片生成到品牌應用 | Gentleyehstudio",
  description:
    "企業 AI 課程推薦：從 AI 圖片生成、Midjourney 教學、品牌安全應用到印刷輸出。實戰導向、設計師授課，3～6 小時讓團隊即學即用的 AI 培訓方案。",
  openGraph: {
    title: "企業 AI 課程・AI 培訓 — Gentleyehstudio",
    description:
      "企業 AI 課程：從 AI 圖片生成、品牌安全應用到印刷輸出，設計師授課、實戰導向。",
  },
};

export default function TrainingPage() {
  return <TrainingContent />;
}
