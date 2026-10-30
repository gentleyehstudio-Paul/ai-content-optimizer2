import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SERVICES: Record<string, string> = {
  agents: "AI 代理人開發",
  diagnose: "免費 AI 診斷",
  printscale: "PrintScale-AI 試用",
  training: "企業 AI 培訓",
  brand: "品牌視覺設計",
  other: "其他",
};

const MAX_BODY_BYTES = 20_000;
const DEFAULT_TO = "gentleyehstudio@gmail.com";

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ] as string,
  );

// 轉成單行（避免標頭注入）並限制長度
const oneLine = (v: unknown, max: number) =>
  String(v ?? "")
    .replace(/[\r\n\t]+/g, " ")
    .trim()
    .slice(0, max);

const err = (error: string, status: number) =>
  NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return err("bad_request", 400);
  }
  if (raw.length > MAX_BODY_BYTES) return err("too_large", 413);

  let body: Record<string, unknown>;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return err("bad_request", 400);
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return err("bad_request", 400);
  }

  // Honeypot：真人不會填。對機器人假裝成功，但不寄信。
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = oneLine(body.name, 100);
  const email = oneLine(body.email, 200);
  const company = oneLine(body.company, 150);
  const phone = oneLine(body.phone, 50);
  const message = String(body.message ?? "").trim().slice(0, 4000);
  const service = SERVICES[String(body.service ?? "")] ?? "未選擇";

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return err("invalid", 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_TO;
  if (!apiKey || !from) {
    // 沒設定寄信服務時，絕不回成功
    console.error("contact: missing RESEND_API_KEY or CONTACT_FROM_EMAIL");
    return err("server_config", 500);
  }

  const subject = `【官網詢價】${service}｜${name}`;
  const text = [
    `服務項目：${service}`,
    `姓名：${name}`,
    `Email：${email}`,
    `公司：${company || "—"}`,
    `電話：${phone || "—"}`,
    "",
    "需求說明：",
    message || "—",
  ].join("\n");
  const html = `<p><b>服務項目：</b>${esc(service)}</p>
<p><b>姓名：</b>${esc(name)}</p>
<p><b>Email：</b>${esc(email)}</p>
<p><b>公司：</b>${esc(company) || "—"}</p>
<p><b>電話：</b>${esc(phone) || "—"}</p>
<p><b>需求說明：</b><br>${esc(message).replace(/\n/g, "<br>") || "—"}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });
    if (!res.ok) {
      // 只記狀態與錯誤訊息，不記 API 金鑰或使用者內容
      const detail = (await res.text().catch(() => "")).slice(0, 300);
      console.error("contact: resend failed", res.status, detail);
      return err("send_failed", 502);
    }
  } catch (e) {
    console.error("contact: resend request error", e instanceof Error ? e.message : e);
    return err("send_failed", 502);
  }

  return NextResponse.json({ ok: true });
}
