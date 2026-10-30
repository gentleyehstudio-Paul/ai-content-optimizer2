import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SERVICES: Record<string, string> = {
  agents: "AI 代理人開發",
  diagnose: "免費 AI 診斷",
  printscale: "PrintScale-AI 試用",
  training: "企業 AI 培訓",
  brand: "品牌視覺設計",
  consult: "免費諮詢",
  "ai-team": "AI 團隊診斷",
  other: "其他",
};

// 來源頁面白名單：key 是前端送來的值，value 是信件主旨顯示的文字。
// 沒送 source 時視為 /contact（向下相容）；不在白名單內則拒絕。
const SOURCES: Record<string, string> = {
  "/contact": "/contact",
  "/training": "/training",
  "/printscale": "/printscale",
  "/agents": "/agents",
  "/ai-team": "/ai-team",
  "/": "首頁",
};

// /ai-team 頁的版本選項（白名單）
const PLANS: Record<string, string> = {
  personal: "個人版",
  business: "企業版",
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

  const sourceKey =
    body.source === undefined || body.source === null || body.source === ""
      ? "/contact"
      : String(body.source);
  const source = SOURCES[sourceKey];
  if (!source) return err("invalid", 400);

  const email = oneLine(body.email, 200);
  // 只有 Email 的表單（首頁、/printscale、/agents）沒有姓名欄，用 Email 代替
  const name = oneLine(body.name, 100) || (sourceKey === "/contact" ? "" : email);
  const company = oneLine(body.company, 150);
  const phone = oneLine(body.phone, 50);
  const headcount = oneLine(body.headcount, 50);
  const imageLinks = String(body.imageLinks ?? "").trim().slice(0, 2000);
  const message = String(body.message ?? "").trim().slice(0, 4000);
  // 以下為 /ai-team 頁使用的選填欄位，其他頁不送就不會出現在信裡
  const plan = PLANS[String(body.plan ?? "")] ?? "";
  const timeslot = oneLine(body.timeslot, 200);
  const attribution = oneLine(body.attribution, 600);
  const extra: [string, string][] = [];
  if (plan) extra.push(["版本", plan]);
  if (timeslot) extra.push(["方便的時段", timeslot]);
  if (attribution) extra.push(["廣告參數", attribution]);
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

  const subject = `【官網詢價｜${source}】${service}｜${name}`;
  const text = [
    `來源頁面：${sourceKey}`,
    `服務項目：${service}`,
    `姓名：${name}`,
    `Email：${email}`,
    `公司：${company || "—"}`,
    `電話：${phone || "—"}`,
    ...(headcount ? [`預計人數：${headcount}`] : []),
    ...extra.map(([k, v]) => `${k}：${v}`),
    ...(imageLinks ? ["", "圖片連結：", imageLinks] : []),
    "",
    "需求說明：",
    message || "—",
  ].join("\n");
  const html = `<p><b>來源頁面：</b>${esc(sourceKey)}</p>
<p><b>服務項目：</b>${esc(service)}</p>
<p><b>姓名：</b>${esc(name)}</p>
<p><b>Email：</b>${esc(email)}</p>
<p><b>公司：</b>${esc(company) || "—"}</p>
<p><b>電話：</b>${esc(phone) || "—"}</p>
${headcount ? `<p><b>預計人數：</b>${esc(headcount)}</p>\n` : ""}${extra.map(([k, v]) => `<p><b>${esc(k)}：</b>${esc(v)}</p>\n`).join("")}${imageLinks ? `<p><b>圖片連結：</b><br>${esc(imageLinks).replace(/\n/g, "<br>")}</p>\n` : ""}<p><b>需求說明：</b><br>${esc(message).replace(/\n/g, "<br>") || "—"}</p>`;

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
