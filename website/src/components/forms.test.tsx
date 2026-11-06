/** @vitest-environment jsdom */

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { resetAttributionMemoryForTests } from "@/lib/attribution";
import { resetLeadAnalyticsForTests } from "@/lib/lead-analytics";
import { LeadForm } from "./LeadForm";
import { ContactForm } from "../app/contact/ContactForm";
import { AiTeamForm } from "../app/ai-team/AiTeamForm";

type Gtag = ReturnType<typeof vi.fn>;

function installGtag(): Gtag {
  const gtag = vi.fn();
  (window as unknown as { gtag: Gtag }).gtag = gtag;
  return gtag;
}

function jsonBody(fetchMock: ReturnType<typeof vi.fn>, call = 0): Record<string, unknown> {
  const init = fetchMock.mock.calls[call][1] as RequestInit;
  return JSON.parse(String(init.body)) as Record<string, unknown>;
}

function leadCalls(gtag: Gtag) {
  return gtag.mock.calls.filter((call) => call[1] === "generate_lead");
}

beforeEach(() => {
  sessionStorage.clear();
  localStorage.clear();
  resetAttributionMemoryForTests();
  resetLeadAnalyticsForTests();
  window.history.pushState({}, "", "/");
  delete (window as unknown as { gtag?: Gtag }).gtag;
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("LeadForm", () => {
  function renderPrintscale() {
    window.history.pushState(
      {},
      "",
      "/printscale?utm_source=newsletter&utm_medium=email&utm_campaign=may&utm_term=print&utm_content=hero&email=hidden@x.com&gclid=secret",
    );
    render(
      <LeadForm source="/printscale" service="printscale" successMessage="已收到">
        {() => (
          <>
            <input name="name" defaultValue="姓名" />
            <input name="email" defaultValue="lead@example.com" />
            <input name="company" defaultValue="公司" />
            <input name="phone" defaultValue="0912345678" />
            <input name="headcount" defaultValue="12" />
            <textarea name="message" defaultValue="需求" />
            <textarea name="imageLinks" defaultValue="https://example.com/a" />
            <button type="submit">送出</button>
          </>
        )}
      </LeadForm>,
    );
    return document.querySelector("form");
  }

  it("posts attribution once and emits one generate_lead without contact fields", async () => {
    const gtag = installGtag();
    const fetchMock = vi.fn(async (url: string) => {
      expect(url).toBe("/api/contact");
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    });
    vi.stubGlobal("fetch", fetchMock);
    const form = renderPrintscale();
    fireEvent.submit(form!);
    fireEvent.submit(form!);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const body = jsonBody(fetchMock);
    expect(body).toMatchObject({
      source: "/printscale",
      service: "printscale",
      name: "姓名",
      email: "lead@example.com",
      company: "公司",
      phone: "0912345678",
      headcount: "12",
      message: "需求",
      imageLinks: "https://example.com/a",
    });
    expect(body.leadAttribution).toMatchObject({
      utm_source: "newsletter",
      utm_medium: "email",
      utm_campaign: "may",
      utm_term: "print",
      utm_content: "hero",
      landing: "/printscale",
      referrer: "",
    });
    expect(JSON.stringify(body.leadAttribution)).not.toContain("hidden@");
    expect(JSON.stringify(body.leadAttribution)).not.toContain("gclid");

    expect((await screen.findByRole("status")).textContent).toContain("已收到");
    expect(leadCalls(gtag)).toHaveLength(1);
    expect(leadCalls(gtag)[0][2]).toMatchObject({
      form: "printscale",
      service: "printscale",
      utm_source: "newsletter",
      utm_term: "print",
    });
    const tracked = JSON.stringify(leadCalls(gtag));
    expect(tracked).not.toContain("lead@example.com");
    expect(tracked).not.toContain("0912345678");
    expect(tracked).not.toContain("姓名");
    expect(tracked).not.toContain("https://example.com/a");
  });

  it("does not emit generate_lead when the request fails, then emits once on retry", async () => {
    const gtag = installGtag();
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response("no", { status: 502 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const form = renderPrintscale();
    fireEvent.submit(form!);
    expect((await screen.findByRole("alert")).textContent).toContain("送出失敗");
    expect(leadCalls(gtag)).toHaveLength(0);

    fireEvent.submit(form!);
    expect(await screen.findByRole("status")).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(leadCalls(gtag)).toHaveLength(1);
  });

  it("does not emit when the network fails", async () => {
    const gtag = installGtag();
    vi.stubGlobal("fetch", vi.fn(async () => Promise.reject(new Error("offline"))));
    const form = renderPrintscale();
    fireEvent.submit(form!);
    expect(await screen.findByRole("alert")).toBeTruthy();
    expect(leadCalls(gtag)).toHaveLength(0);
  });

  it("does not emit for a honeypot submission", async () => {
    const gtag = installGtag();
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    window.history.pushState({}, "", "/");
    render(
      <LeadForm source="/" service="consult" successMessage="已收到首頁">
        {() => (
          <>
            <input name="email" defaultValue="lead@example.com" />
            <input name="website" defaultValue="https://spam.example" />
            <button type="submit">送出</button>
          </>
        )}
      </LeadForm>,
    );
    fireEvent.submit(document.querySelector("form")!);
    expect((await screen.findByRole("status")).textContent).toContain("已收到首頁");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(jsonBody(fetchMock).leadAttribution).toMatchObject({ landing: "/" });
    expect(leadCalls(gtag)).toHaveLength(0);
  });

  it("posts a direct visit on the home form as form=home", async () => {
    const gtag = installGtag();
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    window.history.pushState({}, "", "/");
    render(
      <LeadForm source="/" service="consult" successMessage="已收到首頁">
        {() => (
          <>
            <input name="email" defaultValue="lead@example.com" />
            <button type="submit">送出</button>
          </>
        )}
      </LeadForm>,
    );
    fireEvent.submit(document.querySelector("form")!);
    expect(await screen.findByRole("status")).toBeTruthy();
    expect(jsonBody(fetchMock)).toMatchObject({
      source: "/",
      service: "consult",
      email: "lead@example.com",
      leadAttribution: {
        utm_source: "",
        utm_medium: "",
        utm_campaign: "",
        utm_term: "",
        utm_content: "",
        referrer: "",
        landing: "/",
      },
    });
    expect(leadCalls(gtag)).toHaveLength(1);
    expect(leadCalls(gtag)[0][2]).toEqual({ form: "home", service: "consult" });
  });
});

describe("ContactForm", () => {
  it("sends the existing fields and one generate_lead only after success", async () => {
    const gtag = installGtag();
    window.history.pushState({}, "", "/contact?utm_source=ig&utm_term=logo");
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response("no", { status: 500 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<ContactForm />);
    fireEvent.click(screen.getByRole("button", { name: "企業 AI 培訓" }));
    fireEvent.change(screen.getByPlaceholderText("姓名 / 聯絡人"), { target: { value: "王小明" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "lead@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("公司名稱（選填）"), { target: { value: "示例公司" } });
    fireEvent.change(screen.getByPlaceholderText("電話（選填）"), { target: { value: "0223456789" } });
    fireEvent.change(screen.getByPlaceholderText("需求說明（想解決什麼問題？預算範圍？時程？）"), {
      target: { value: "想上課" },
    });
    const form = document.querySelector("form")!;
    fireEvent.submit(form);
    expect(await screen.findByRole("alert")).toBeTruthy();
    expect(leadCalls(gtag)).toHaveLength(0);

    fireEvent.submit(form);
    expect(await screen.findByText("感謝您的詢問")).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledTimes(2);
    const body = jsonBody(fetchMock, 1);
    expect(body).toMatchObject({
      source: "/contact",
      service: "training",
      name: "王小明",
      email: "lead@example.com",
      company: "示例公司",
      phone: "0223456789",
      message: "想上課",
    });
    expect(body.leadAttribution).toMatchObject({
      utm_source: "ig",
      utm_term: "logo",
      landing: "/contact",
    });
    expect(leadCalls(gtag)).toHaveLength(1);
    expect(leadCalls(gtag)[0][2]).toMatchObject({ form: "contact", service: "training", utm_source: "ig" });
    expect(JSON.stringify(leadCalls(gtag))).not.toContain("lead@example.com");
    expect(JSON.stringify(leadCalls(gtag))).not.toContain("0223456789");
  });
});

describe("AiTeamForm", () => {
  async function fill() {
    fireEvent.click(screen.getByRole("button", { name: "個人版" }));
    fireEvent.change(screen.getByLabelText("稱呼"), { target: { value: "王小明" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "lead@example.com" } });
    fireEvent.change(screen.getByLabelText("想先交給 AI 的工作"), { target: { value: "報價單" } });
    fireEvent.change(screen.getByLabelText("方便的時段"), { target: { value: "平日下午" } });
  }

  it("keeps the legacy attribution string, adds leadAttribution, and fires generate_lead once", async () => {
    const gtag = installGtag();
    window.history.pushState(
      {},
      "",
      "/ai-team?utm_source=ig&utm_medium=paid&utm_campaign=spring&utm_term=logo&utm_content=vid&oai_cid=abc&oppref=zz",
    );
    const fetchMock = vi.fn(async (url: string) => {
      expect(url).toBe("/api/contact");
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    });
    vi.stubGlobal("fetch", fetchMock);
    render(<AiTeamForm />);
    await fill();
    const form = document.querySelector("form")!;
    fireEvent.submit(form);
    fireEvent.submit(form);
    expect(await screen.findByText("已收到你的預約")).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const body = jsonBody(fetchMock);
    expect(body).toMatchObject({
      source: "/ai-team",
      service: "ai-team",
      plan: "personal",
      name: "王小明",
      email: "lead@example.com",
      timeslot: "平日下午",
      message: "報價單",
    });
    expect(String(body.attribution)).toContain("utm_source=ig");
    expect(String(body.attribution)).toContain("utm_term=logo");
    expect(String(body.attribution)).toContain("oai_cid=abc");
    expect(String(body.attribution)).toContain("oppref=zz");
    expect(String(body.attribution)).toContain("lp=/ai-team");
    expect(body.leadAttribution).toMatchObject({
      utm_source: "ig",
      utm_term: "logo",
      landing: "/ai-team",
    });
    expect(leadCalls(gtag)).toHaveLength(1);
    expect(leadCalls(gtag)[0][2]).toMatchObject({
      form: "ai-team",
      plan: "personal",
      utm_source: "ig",
      utm_term: "logo",
    });
    const tracked = JSON.stringify(gtag.mock.calls);
    expect(tracked).not.toContain("lead@example.com");
    expect(tracked).not.toContain("oai_cid");
    expect(tracked).not.toContain("王小明");
    expect(gtag.mock.calls.filter((call) => call[1] === "line_click")).toHaveLength(0);
  });

  it("does not emit generate_lead on failure", async () => {
    const gtag = installGtag();
    window.history.pushState({}, "", "/ai-team?utm_source=ig");
    vi.stubGlobal("fetch", vi.fn(async () => new Response("no", { status: 502 })));
    render(<AiTeamForm />);
    await fill();
    fireEvent.submit(document.querySelector("form")!);
    expect(await screen.findByRole("alert")).toBeTruthy();
    expect(leadCalls(gtag)).toHaveLength(0);
  });
});
