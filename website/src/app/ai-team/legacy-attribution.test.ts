/** @vitest-environment jsdom */

import { beforeEach, describe, expect, it, vi } from "vitest";
import { resetAttributionMemoryForTests } from "@/lib/attribution";
import { readLeadAttribution } from "@/lib/attribution-client";
import { readAiTeamAttribution } from "./legacy-attribution";

beforeEach(() => {
  sessionStorage.clear();
  localStorage.clear();
  resetAttributionMemoryForTests();
  window.history.pushState({}, "", "/ai-team");
});

describe("readAiTeamAttribution", () => {
  it("keeps the existing last/first string and now includes utm_term", () => {
    window.history.pushState(
      {},
      "",
      "/ai-team?utm_source=ig&utm_medium=paid&utm_campaign=spring&utm_term=logo&utm_content=vid&oai_cid=abc&oppref=zz",
    );
    const value = readAiTeamAttribution();
    expect(value).toMatch(
      /^last: utm_source=ig&utm_medium=paid&utm_campaign=spring&utm_term=logo&utm_content=vid&oai_cid=abc&oppref=zz \| lp=\/ai-team&d=\d{4}-\d{2}-\d{2}$/,
    );
    const saved = JSON.parse(localStorage.getItem("gy_ai_team_first") ?? "{}") as { v: string };
    expect(saved.v).toContain("oai_cid=abc");
    expect(saved.v).toContain("utm_term=logo");
  });

  it("preserves a stored first touch instead of replacing it", () => {
    localStorage.setItem(
      "gy_ai_team_first",
      JSON.stringify({ v: "utm_source=old&lp=/ai-team&d=2026-01-01", t: Date.now() }),
    );
    window.history.pushState({}, "", "/ai-team?utm_source=new&oai_cid=abc");
    const value = readAiTeamAttribution();
    expect(value).toContain("last: utm_source=new&oai_cid=abc");
    expect(value).toContain("first: utm_source=old&lp=/ai-team&d=2026-01-01");
  });

  it("uses session attribution when the form page no longer has the utm query", () => {
    window.history.pushState({}, "", "/?utm_source=ig&utm_medium=social&utm_term=logo");
    readAiTeamAttribution();
    window.history.pushState({}, "", "/ai-team");
    const value = readAiTeamAttribution();
    expect(value).toContain("utm_source=ig");
    expect(value).toContain("utm_medium=social");
    expect(value).toContain("utm_term=logo");
    // 第一次帶參數的頁面是 /，90 天 first touch 的 lp 維持那一頁，不改成後來的表單頁。
    expect(value).toContain("lp=/&d=");
    expect(value).not.toContain("lp=/ai-team");
  });

  it("uses the frozen session set without writing the 90-day record", () => {
    window.history.pushState({}, "", "/?utm_source=ig&utm_campaign=spring");
    readLeadAttribution();
    window.history.pushState({}, "", "/ai-team");
    const value = readAiTeamAttribution();
    expect(value).toContain("utm_source=ig");
    expect(value).toContain("utm_campaign=spring");
    expect(localStorage.getItem("gy_ai_team_first")).toBeNull();
  });

  it("does not mix a later partial url into the first campaign", () => {
    window.history.pushState({}, "", "/?utm_source=campaign-a&utm_campaign=spring");
    readLeadAttribution();
    window.history.pushState({}, "", "/ai-team?utm_source=campaign-b");
    const value = readAiTeamAttribution();
    expect(value).toContain("last: utm_source=campaign-b");
    expect(value).not.toContain("spring");
    expect(value).not.toContain("campaign-a");
  });

  it("returns an empty string when storage throws", () => {
    window.history.pushState({}, "", "/ai-team?utm_source=ig&oai_cid=abc");
    const setItem = Storage.prototype.setItem;
    Storage.prototype.setItem = () => {
      throw new Error("blocked");
    };
    try {
      expect(readAiTeamAttribution()).toBe("");
    } finally {
      Storage.prototype.setItem = setItem;
    }
  });

  it("strips newlines from legacy values", () => {
    window.history.pushState({}, "", "/ai-team");
    const params = new URLSearchParams();
    params.set("utm_source", "ig\r\nBcc: x");
    params.set("oai_cid", "abc");
    window.history.pushState({}, "", `/ai-team?${params.toString()}`);
    const value = readAiTeamAttribution();
    expect(value).not.toMatch(/[\r\n]/);
    expect(value).toContain("utm_source=igBcc: x");
    expect(value).toContain("oai_cid=abc");
  });

  it("replaces an expired first touch", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-06T00:00:00.000Z"));
    localStorage.setItem(
      "gy_ai_team_first",
      JSON.stringify({
        v: "utm_source=stale",
        t: Date.now() - 91 * 24 * 60 * 60 * 1000,
      }),
    );
    window.history.pushState({}, "", "/ai-team?utm_source=fresh");
    const value = readAiTeamAttribution();
    expect(value).toContain("last: utm_source=fresh");
    expect(value).toContain("lp=/ai-team&d=2026-11-06");
    expect(value).not.toContain("stale");
    vi.useRealTimers();
  });
});
