/** @vitest-environment jsdom */

import { beforeEach, describe, expect, it, vi } from "vitest";
import { createLeadAttempt, resetLeadAnalyticsForTests, trackGenerateLead } from "./lead-analytics";
import { sendAiTeamEvent } from "../app/ai-team/tracking";

type Gtag = ReturnType<typeof vi.fn>;

function installGtag(): Gtag {
  const gtag = vi.fn();
  (window as unknown as { gtag: Gtag }).gtag = gtag;
  return gtag;
}

beforeEach(() => {
  resetLeadAnalyticsForTests();
  sessionStorage.clear();
  window.history.pushState({}, "", "/ai-team");
  delete (window as unknown as { gtag?: Gtag }).gtag;
  delete (window as unknown as { dataLayer?: unknown }).dataLayer;
});

describe("trackGenerateLead", () => {
  it("sends one generate_lead and strips contact fields", () => {
    const gtag = installGtag();
    const params = {
      form: "contact",
      service: "agents",
      email: "lead@example.com",
      name: "王小明",
      phone: "0912345678",
      company: "示例公司",
      message: "請回電",
      utm_source: "ig",
      utm_medium: "social",
    };
    expect(trackGenerateLead(params, "attempt-1")).toBe(true);
    expect(trackGenerateLead(params, "attempt-1")).toBe(false);
    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag).toHaveBeenCalledWith("event", "generate_lead", {
      form: "contact",
      service: "agents",
      utm_source: "ig",
      utm_medium: "social",
    });
    expect(JSON.stringify(gtag.mock.calls)).not.toContain("lead@example.com");
    expect(JSON.stringify(gtag.mock.calls)).not.toContain("0912345678");
    expect(JSON.stringify(gtag.mock.calls)).not.toContain("王小明");
  });

  it("queues once on the existing dataLayer when gtag is not loaded, without retrying", () => {
    const existing: unknown[] = [["js", new Date()]];
    (window as unknown as { dataLayer: unknown[] }).dataLayer = existing;
    expect(trackGenerateLead({ form: "printscale", email: "a@b.com" }, "missing")).toBe(true);
    expect(existing).toHaveLength(2);
    const queued = existing[1] as { 0: string; 1: string; 2: Record<string, string> };
    expect(queued[0]).toBe("event");
    expect(queued[1]).toBe("generate_lead");
    expect(queued[2]).toEqual({ form: "printscale" });
    expect(JSON.stringify(queued[2])).not.toContain("a@b.com");
    expect((window as unknown as { gtag?: Gtag }).gtag).toBeUndefined();

    expect(trackGenerateLead({ form: "printscale" }, "missing")).toBe(false);
    expect(existing).toHaveLength(2);

    const gtag = installGtag();
    expect(trackGenerateLead({ form: "printscale" }, "missing")).toBe(false);
    expect(gtag).not.toHaveBeenCalled();
  });

  it("drops an email-shaped utm and still sends the rest", () => {
    const gtag = installGtag();
    trackGenerateLead({ form: "home", utm_source: "a@b.com", utm_campaign: "春季" }, "utm");
    expect(gtag.mock.calls[0][2]).toEqual({ form: "home", utm_campaign: "春季" });
  });

  it("lets a second successful lead use a new key", () => {
    const gtag = installGtag();
    expect(trackGenerateLead({ form: "printscale" }, "one")).toBe(true);
    expect(trackGenerateLead({ form: "contact" }, "two")).toBe(true);
    expect(gtag).toHaveBeenCalledTimes(2);
  });

  it("does not throw when gtag throws", () => {
    (window as unknown as { gtag: () => void }).gtag = () => {
      throw new Error("ga down");
    };
    expect(() => trackGenerateLead({ form: "training" }, "boom")).not.toThrow();
  });
});

describe("createLeadAttempt", () => {
  it("blocks a second in-flight submit, allows retry after failure, and tracks success once", () => {
    const attempt = createLeadAttempt("k");
    expect(attempt.start()).toBe(true);
    expect(attempt.start()).toBe(false);
    attempt.release();
    expect(attempt.start()).toBe(true);
    expect(attempt.shouldTrack(false)).toBe(true);
    attempt.release();
    expect(attempt.start()).toBe(false);
    expect(attempt.shouldTrack(false)).toBe(false);
  });

  it("does not track a honeypot submission", () => {
    const attempt = createLeadAttempt("bot");
    expect(attempt.start()).toBe(true);
    expect(attempt.shouldTrack(true)).toBe(false);
    expect(attempt.shouldTrack(false)).toBe(false);
  });

  it("lets a later mount record another success without reusing the first key", () => {
    const gtag = installGtag();
    const first = createLeadAttempt("mount-a");
    expect(first.start()).toBe(true);
    expect(first.shouldTrack(false)).toBe(true);
    expect(trackGenerateLead({ form: "printscale" }, first.dedupKey)).toBe(true);
    expect(trackGenerateLead({ form: "printscale" }, first.dedupKey)).toBe(false);
    expect(first.start()).toBe(false);

    const second = createLeadAttempt("mount-b");
    expect(second.dedupKey).not.toBe(first.dedupKey);
    expect(second.start()).toBe(true);
    expect(second.shouldTrack(false)).toBe(true);
    expect(trackGenerateLead({ form: "contact" }, second.dedupKey)).toBe(true);
    expect(gtag).toHaveBeenCalledTimes(2);
    expect(gtag.mock.calls[1][2]).toMatchObject({ form: "contact" });
  });
});

describe("sendAiTeamEvent", () => {
  it("keeps a single generate_lead and still allows repeated line clicks", () => {
    const gtag = installGtag();
    window.history.pushState({}, "", "/ai-team?utm_source=ig&utm_term=logo&utm_medium=paid");
    sendAiTeamEvent("generate_lead", { form: "ai-team", plan: "未選" }, "same");
    sendAiTeamEvent("generate_lead", { form: "ai-team", plan: "未選" }, "same");
    sendAiTeamEvent("line_click", { form: "ai-team", link_location: "footer" });
    sendAiTeamEvent("line_click", { form: "ai-team", link_location: "page" });

    const leadCalls = gtag.mock.calls.filter((call) => call[1] === "generate_lead");
    const lineCalls = gtag.mock.calls.filter((call) => call[1] === "line_click");
    expect(leadCalls).toHaveLength(1);
    expect(leadCalls[0][2]).toMatchObject({
      form: "ai-team",
      plan: "未選",
      utm_source: "ig",
      utm_term: "logo",
      utm_medium: "paid",
    });
    expect(lineCalls).toHaveLength(2);
    expect(JSON.stringify(gtag.mock.calls)).not.toContain("oai_");
  });

  it("does not send a stored email-like utm to GA4", () => {
    const gtag = installGtag();
    window.history.pushState({}, "", "/ai-team");
    sessionStorage.setItem("gy_ai_team_attr", "utm_source=a@b.com&utm_medium=cpc&utm_term=logo");
    sendAiTeamEvent("generate_lead", { form: "ai-team", plan: "個人版" }, "stored");
    expect(gtag.mock.calls[0][2]).toEqual({
      form: "ai-team",
      plan: "個人版",
      utm_medium: "cpc",
      utm_term: "logo",
    });
  });
});
