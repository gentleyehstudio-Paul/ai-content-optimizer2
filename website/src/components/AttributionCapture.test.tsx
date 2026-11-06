/** @vitest-environment jsdom */

import { render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ATTRIBUTION_SESSION_KEY, resetAttributionMemoryForTests } from "@/lib/attribution";
import { AttributionCapture } from "./AttributionCapture";

vi.mock("next/navigation", () => ({
  usePathname: () => "/start",
}));

beforeEach(() => {
  sessionStorage.clear();
  resetAttributionMemoryForTests();
});

describe("AttributionCapture", () => {
  it("stores the current landing attribution when the page mounts", async () => {
    window.history.pushState({}, "", "/start?utm_source=ig&email=nope@x.com");
    render(<AttributionCapture />);
    await waitFor(() => {
      expect(sessionStorage.getItem(ATTRIBUTION_SESSION_KEY)).toBeTruthy();
    });
    const stored = JSON.parse(sessionStorage.getItem(ATTRIBUTION_SESSION_KEY) ?? "{}") as {
      utm_source: string;
      landing: string;
    };
    expect(stored.utm_source).toBe("ig");
    expect(stored.landing).toBe("/start");
    expect(JSON.stringify(stored)).not.toContain("nope@");
  });
});