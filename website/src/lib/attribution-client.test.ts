/** @vitest-environment jsdom */

import { beforeEach, describe, expect, it } from "vitest";
import { ATTRIBUTION_SESSION_KEY, resetAttributionMemoryForTests } from "./attribution";
import { readLeadAttribution } from "./attribution-client";

beforeEach(() => {
  sessionStorage.clear();
  resetAttributionMemoryForTests();
  window.history.pushState({}, "", "/");
});

describe("readLeadAttribution in the browser", () => {
  it("keeps the first visit across a client navigation and ignores other query keys", () => {
    window.history.pushState(
      {},
      "",
      "/?utm_source=newsletter&utm_medium=email&utm_campaign=may&utm_term=print&utm_content=hero&email=hidden@x.com&gclid=secret",
    );
    const first = readLeadAttribution();
    window.history.pushState({}, "", "/printscale");
    const second = readLeadAttribution();

    expect(first.landing).toBe("/");
    expect(second).toMatchObject({
      utm_source: "newsletter",
      utm_medium: "email",
      utm_campaign: "may",
      utm_term: "print",
      utm_content: "hero",
      landing: "/",
      referrer: "",
    });
    const raw = sessionStorage.getItem(ATTRIBUTION_SESSION_KEY) ?? "";
    expect(raw).toContain("newsletter");
    expect(raw).not.toContain("hidden@");
    expect(raw).not.toContain("gclid");
    expect(raw).not.toContain("#");
  });

  it("still returns the current page when sessionStorage is blocked", () => {
    const setItem = Storage.prototype.setItem;
    const getItem = Storage.prototype.getItem;
    Storage.prototype.setItem = () => {
      throw new Error("blocked");
    };
    Storage.prototype.getItem = () => {
      throw new Error("blocked");
    };
    try {
      window.history.pushState({}, "", "/printscale?utm_source=ig");
      expect(readLeadAttribution()).toMatchObject({ utm_source: "ig", landing: "/printscale" });
      window.history.pushState({}, "", "/contact");
      expect(readLeadAttribution()).toMatchObject({ utm_source: "ig", landing: "/printscale" });
    } finally {
      Storage.prototype.setItem = setItem;
      Storage.prototype.getItem = getItem;
    }
  });
});
