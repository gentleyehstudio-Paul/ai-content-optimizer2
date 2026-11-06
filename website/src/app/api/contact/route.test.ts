import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

type Mail = {
  from: string;
  to: string[];
  reply_to: string;
  subject: string;
  text: string;
  html: string;
};

function post(body: unknown, raw?: string) {
  return POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: raw ?? JSON.stringify(body),
    }),
  );
}

function installFetch() {
  const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
    if (url !== "https://api.resend.com/emails") throw new Error(`unexpected url ${url}`);
    void init;
    return new Response("{}", { status: 200 });
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function sentMail(fetchMock: ReturnType<typeof installFetch>): Mail {
  const init = fetchMock.mock.calls[0][1] as RequestInit;
  return JSON.parse(String(init.body)) as Mail;
}

beforeEach(() => {
  process.env.RESEND_API_KEY = "test-resend-key";
  process.env.CONTACT_FROM_EMAIL = "forms@example.com";
  process.env.CONTACT_TO_EMAIL = "inbox@example.com";
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => {
      throw new Error("fetch was not mocked");
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/contact attribution", () => {
  it("includes safe attribution in the existing email and keeps the subject free of it", async () => {
    const fetchMock = installFetch();
    const res = await post({
      source: "/printscale",
      service: "printscale",
      email: "lead@example.com",
      company: "A&B <co>",
      phone: "0912000000",
      message: "<script>alert(1)</script>\n第二行",
      leadAttribution: {
        utm_source: "<img src=x onerror=alert(1)>",
        utm_medium: "cpc",
        utm_campaign: "春".repeat(150),
        utm_term: "logo",
        utm_content: "hero",
        referrer: "https://evil.example/land?token=super-secret#hash",
        landing: "/printscale?email=hidden@x.com#top",
        email: "secret@x.com",
        gclid: "should-not-appear",
      },
    });

    expect(res.status).toBe(200);
    const mail = sentMail(fetchMock);
    const headers = (fetchMock.mock.calls[0][1] as RequestInit).headers as Record<string, string>;
    expect(headers.Authorization).toBe("Bearer test-resend-key");
    expect(mail.from).toBe("forms@example.com");
    expect(mail.to).toEqual(["inbox@example.com"]);
    expect(mail.reply_to).toBe("lead@example.com");
    expect(mail.subject).toBe("【官網詢價｜/printscale】PrintScale-AI 試用｜lead@example.com");
    expect(mail.subject).not.toMatch(/[\r\n]/);
    expect(mail.subject).not.toContain("utm_");
    expect(mail.text).toContain("utm_medium：cpc");
    expect(mail.text).toContain(`utm_campaign：${"春".repeat(100)}`);
    expect(mail.text).not.toContain("春".repeat(101));
    expect(mail.text).toContain("utm_term：logo");
    expect(mail.text).toContain("初次造訪來源：https://evil.example");
    expect(mail.text).not.toContain("/land");
    expect(mail.text).toContain("初次落地頁：/printscale");
    expect(mail.text).toContain("公司：A&B <co>");
    expect(mail.text).toContain("電話：0912000000");
    expect(mail.html).toContain("A&amp;B &lt;co&gt;");
    expect(mail.html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;<br>第二行");
    expect(mail.html).not.toContain("<script>");
    expect(mail.html).not.toContain("onerror");
    expect(mail.html).not.toContain("<img");
    expect(mail.text).not.toContain("super-secret");
    expect(mail.html).not.toContain("super-secret");
    expect(mail.text).not.toContain("hidden@");
    expect(mail.text).not.toContain("secret@");
    expect(mail.text).not.toContain("should-not-appear");
    expect(mail.text).not.toContain("utm_source");
  });

  it("preserves the ai-team attribution string, plan, and timeslot", async () => {
    const fetchMock = installFetch();
    const res = await post({
      source: "/ai-team",
      service: "ai-team",
      name: "王小明",
      email: "lead@example.com",
      plan: "business",
      timeslot: "平日下午",
      message: "想先看報價",
      attribution: 'last: utm_source=ig&oai_cid=abc&oppref=zz | lp=/ai-team&d=2026-01-01 <script>alert(1)</script>',
      leadAttribution: {
        utm_source: "ig",
        utm_medium: "paid",
        utm_term: "logo",
        referrer: "",
        landing: "/ai-team",
      },
    });
    expect(res.status).toBe(200);
    const mail = sentMail(fetchMock);
    expect(mail.subject).toBe("【官網詢價｜/ai-team】AI 團隊診斷｜王小明");
    expect(mail.text).toContain("版本：企業版");
    expect(mail.text).toContain("方便的時段：平日下午");
    expect(mail.text).toContain("廣告參數：last: utm_source=ig&oai_cid=abc&oppref=zz");
    expect(mail.text).toContain("utm_source：ig");
    expect(mail.text).toContain("utm_term：logo");
    expect(mail.text).toContain("初次造訪來源：無可用外部來源（可能直接造訪或來源未傳遞）");
    expect(mail.text).toContain("初次落地頁：/ai-team");
    expect(mail.html).toContain("&lt;script&gt;");
    expect(mail.html).not.toContain("<script>");
  });

  it("rejects a bad email before calling the mail API", async () => {
    const fetchMock = installFetch();
    const res = await post({
      source: "/contact",
      service: "agents",
      name: "Ann\r\nBcc: evil@example.com",
      email: "not-an-email",
      leadAttribution: { utm_source: "ig", landing: "/contact" },
    });
    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects an unknown source and an oversized body", async () => {
    const fetchMock = installFetch();
    expect((await post({ source: "/nope", email: "lead@example.com", name: "Ann" })).status).toBe(400);
    const huge = JSON.stringify({
      source: "/contact",
      name: "Ann",
      email: "lead@example.com",
      message: "x".repeat(20_000),
    });
    expect((await post(null, huge)).status).toBe(413);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("does not send mail for the honeypot and ignores a non-object attribution", async () => {
    const fetchMock = installFetch();
    const honeypot = await post({
      source: "/contact",
      name: "Ann",
      email: "lead@example.com",
      website: "https://spam.example",
      leadAttribution: { utm_source: "ig", landing: "/contact" },
    });
    expect(honeypot.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();

    const ok = await post({
      source: "/contact",
      name: "Ann",
      email: "lead@example.com",
      service: "agents",
      company: "示例",
      phone: "02",
      message: "需求",
      leadAttribution: "utm_source=evil&email=secret@x.com",
    });
    expect(ok.status).toBe(200);
    const mail = sentMail(fetchMock);
    expect(mail.text).toContain("姓名：Ann");
    expect(mail.text).toContain("公司：示例");
    expect(mail.text).toContain("電話：02");
    expect(mail.text).toContain("需求說明：\n需求");
    expect(mail.text).not.toContain("初次落地頁");
    expect(mail.text).not.toContain("utm_source=evil");
    expect(mail.text).not.toContain("secret@");
  });

  it("flattens header-like newlines in the name and does not claim success without mail config", async () => {
    const fetchMock = installFetch();
    const res = await post({
      source: "/contact",
      name: "Ann\r\nBcc: evil@example.com",
      email: "lead@example.com",
      service: "other",
    });
    expect(res.status).toBe(200);
    const mail = sentMail(fetchMock);
    expect(mail.subject).not.toMatch(/[\r\n]/);
    expect(mail.subject).toContain("Ann Bcc: evil@example.com");

    delete process.env.RESEND_API_KEY;
    vi.spyOn(console, "error").mockImplementation(() => {});
    const blocked = await post({
      source: "/contact",
      name: "Ann",
      email: "lead@example.com",
    });
    expect(blocked.status).toBe(500);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("returns 502 when the mail API fails and does not throw", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("upstream", { status: 500 })),
    );
    const res = await post({
      source: "/agents",
      service: "diagnose",
      email: "lead@example.com",
      message: "看圖",
      leadAttribution: { landing: "/agents", referrer: "" },
    });
    expect(res.status).toBe(502);
    await expect(res.json()).resolves.toEqual({ ok: false, error: "send_failed" });
  });
});
