import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "聯絡我們・詢價 — AI 代理人與品牌設計服務 | Gentleyehstudio",
  description:
    "聯絡 Gentleyehstudio：AI 代理人開發、PrintScale-AI 試用、企業 AI 培訓、品牌視覺設計。填寫表單，三個工作天內回覆報價與方案。",
};

export default function ContactPage() {
  return <ContactForm />;
}
