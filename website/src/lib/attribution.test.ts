import { describe, expect, it, beforeEach } from "vitest";
import {
  ATTRIBUTION_SESSION_KEY,
  emptyLeadAttribution,
  leadAttributionEmailRows,
  rememberAttribution,
  resetAttributionMemoryForTests,
  sanitizeLandingPath,
  sanitizeReferrer,
  sanitizeUtmValue,
  type AttributionEnv,
  type StorageLike,
} from "./attribution";

function memoryStorage() {
  const data = new Map<string, string>();
  const storage: StorageLike = {
    getItem(key) {
      const value = data.get(key);
      return value === undefined ? null : value;
    },
    setItem(key, value) {
      data.set(key, value);
    },
  };
  return { data, storage };
}

function env(storage: StorageLike | null, overrides: Partial<AttributionEnv> = {}): AttributionEnv {
  return {
    storage,
    search: "",
    pathname: "/",
    referrer: "",
    origin: "https://www.gentleyehdesign.com",
    ...overrides,
  };
}

beforeEach(() => {
  resetAttributionMemoryForTests();
});

describe("sanitize attribution values", () => {
  it("keeps campaign labels and drops markup, emails, urls, and control characters", () => {
    expect(sanitizeUtmValue("春季活動")).toBe("春季活動");
    expect(sanitizeUtmValue("cpc")).toBe("cpc");
    expect(sanitizeUtmValue(`cpc\r\nBcc: evil@example.com`)).toBe("");
    expect(sanitizeUtmValue("<script>alert(1)</script>")).toBe("");
    expect(sanitizeUtmValue("lead@example.com")).toBe("");
    expect(sanitizeUtmValue("https://evil.example/phish?x=1")).toBe("");
    expect(sanitizeUtmValue("a&b=c")).toBe("");
    expect(sanitizeUtmValue("x".repeat(500))).toBe("x".repeat(100));
    expect(sanitizeUtmValue(123)).toBe("");
  });

  it("keeps a path and strips query, hash, and encoded markup", () => {
    expect(sanitizeLandingPath("/printscale?email=a@b.com#tok")).toBe("/printscale");
    expect(sanitizeLandingPath("/ai-team")).toBe("/ai-team");
    expect(sanitizeLandingPath("/resources/ai-upscale-print-guide")).toBe(
      "/resources/ai-upscale-print-guide",
    );
    expect(sanitizeLandingPath("https://evil.example/phish?x=1#h")).toBe("");
    expect(sanitizeLandingPath("/%3Cscript%3E")).toBe("");
    expect(sanitizeLandingPath("//evil.example")).toBe("");
    expect(sanitizeLandingPath("/a/../../b")).toBe("");
  });

  it("keeps an external origin and path, never the query or same-site referrer", () => {
    expect(sanitizeReferrer("https://news.example/a/b?q=secret#h", "https://www.gentleyehdesign.com")).toBe(
      "https://news.example/a/b",
    );
    expect(
      sanitizeReferrer("https://l.instagram.com/p/1?token=abc#h", "https://www.gentleyehdesign.com"),
    ).toBe("https://l.instagram.com/p/1");
    expect(
      sanitizeReferrer(
        "https://www.gentleyehdesign.com/ai-team?utm_source=ig&token=again#x",
        "https://www.gentleyehdesign.com",
      ),
    ).toBe("");
    expect(sanitizeReferrer("https://user:pass@evil.example/a?b=1#c")).toBe("");
    expect(sanitizeReferrer("javascript:alert(1)")).toBe("");
  });
});

describe("rememberAttribution", () => {
  it("retains the first landing, referrer, and first non-empty utm across navigation", () => {
    const { data, storage } = memoryStorage();
    const first = rememberAttribution(
      env(storage, {
        search:
          "?utm_source=ig&utm_medium=social&utm_campaign=spring&utm_term=logo&utm_content=bio&email=secret@x.com&gclid=abc#hash",
        pathname: "/ai-team",
        referrer: "https://l.instagram.com/p/1?token=abc#h",
      }),
    );
    const second = rememberAttribution(
      env(storage, {
        search: "?utm_source=later",
        pathname: "/printscale",
        referrer: "https://www.gentleyehdesign.com/ai-team?utm_source=ig&token=again#x",
      }),
    );

    expect(first).toMatchObject({
      utm_source: "ig",
      utm_medium: "social",
      utm_campaign: "spring",
      utm_term: "logo",
      utm_content: "bio",
      referrer: "https://l.instagram.com/p/1",
      landing: "/ai-team",
    });
    expect(second.utm_source).toBe("ig");
    expect(second.landing).toBe("/ai-team");
    expect(second.referrer).toBe("https://l.instagram.com/p/1");

    const raw = data.get(ATTRIBUTION_SESSION_KEY) ?? "";
    const stored = JSON.parse(raw) as Record<string, string>;
    expect(Object.keys(stored).sort()).toEqual(
      ["landing", "referrer", "utm_campaign", "utm_content", "utm_medium", "utm_source", "utm_term"].sort(),
    );
    expect(raw).not.toContain("secret@");
    expect(raw).not.toContain("gclid");
    expect(raw).not.toContain("token");
    expect(raw).not.toContain("#");
    expect(raw).not.toContain("?");
  });

  it("records a direct visit without inventing a referrer", () => {
    const { storage } = memoryStorage();
    const attr = rememberAttribution(env(storage, { pathname: "/printscale" }));
    expect(attr).toEqual({
      ...emptyLeadAttribution(),
      landing: "/printscale",
    });
  });

  it("fills an empty utm later, but does not replace the first landing page", () => {
    const { storage } = memoryStorage();
    rememberAttribution(env(storage, { pathname: "/" }));
    const next = rememberAttribution(
      env(storage, { search: "?utm_source=newsletter", pathname: "/contact" }),
    );
    expect(next.utm_source).toBe("newsletter");
    expect(next.landing).toBe("/");
    expect(next.referrer).toBe("");
  });

  it("keeps working from memory when storage throws, and loses it after a new document", () => {
    const throwing: StorageLike = {
      getItem() {
        throw new Error("get blocked");
      },
      setItem() {
        throw new Error("set blocked");
      },
    };
    const first = rememberAttribution(
      env(throwing, {
        search: "?utm_source=ig&utm_medium=social",
        pathname: "/",
        referrer: "https://news.example/a?q=1",
      }),
    );
    const second = rememberAttribution(env(throwing, { pathname: "/printscale" }));
    expect(first.utm_source).toBe("ig");
    expect(first.referrer).toBe("https://news.example/a");
    expect(second.utm_source).toBe("ig");
    expect(second.landing).toBe("/");

    resetAttributionMemoryForTests();
    const reloaded = rememberAttribution(env(throwing, { pathname: "/contact" }));
    expect(reloaded.utm_source).toBe("");
    expect(reloaded.landing).toBe("/contact");
  });

  it("ignores corrupt storage and captures the current page", () => {
    const { storage } = memoryStorage();
    storage.setItem(ATTRIBUTION_SESSION_KEY, "{not-json");
    const attr = rememberAttribution(env(storage, { pathname: "/training", search: "?utm_source=ig" }));
    expect(attr.utm_source).toBe("ig");
    expect(attr.landing).toBe("/training");
  });
});

describe("leadAttributionEmailRows", () => {
  it("labels a direct visit and omits empty utm keys", () => {
    expect(
      leadAttributionEmailRows({
        utm_source: "",
        referrer: "",
        landing: "/printscale",
        email: "secret@x.com",
        gclid: "abc",
      }),
    ).toEqual([
      ["初次造訪來源", "直接造訪"],
      ["初次落地頁", "/printscale"],
    ]);
  });

  it("drops malicious fields instead of echoing them", () => {
    const rows = leadAttributionEmailRows({
      utm_source: "<img src=x onerror=alert(1)>",
      utm_medium: "cpc",
      utm_campaign: "春季活動",
      referrer: "https://evil.example/land?token=super-secret#hash",
      landing: "/printscale?email=hidden@x.com#top",
    });
    const text = JSON.stringify(rows);
    expect(rows).toContainEqual(["utm_medium", "cpc"]);
    expect(rows).toContainEqual(["utm_campaign", "春季活動"]);
    expect(rows).toContainEqual(["初次造訪來源", "https://evil.example/land"]);
    expect(rows).toContainEqual(["初次落地頁", "/printscale"]);
    expect(text).not.toContain("onerror");
    expect(text).not.toContain("super-secret");
    expect(text).not.toContain("hidden@");
    expect(text).not.toContain("#");
  });

  it("ignores non-objects", () => {
    expect(leadAttributionEmailRows("utm_source=evil")).toBeNull();
    expect(leadAttributionEmailRows(["utm_source"])).toBeNull();
    expect(leadAttributionEmailRows(null)).toBeNull();
  });
});
