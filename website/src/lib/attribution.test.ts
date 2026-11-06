import { describe, expect, it, beforeEach } from "vitest";
import {
  ATTRIBUTION_SESSION_KEY,
  NO_EXTERNAL_REFERRER,
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

  it("keeps only an external origin, never the path, query, or same-site referrer", () => {
    expect(
      sanitizeReferrer(
        "https://news.example/account/jane.doe/orders/9981?email=secret@x.com#h",
        "https://www.gentleyehdesign.com",
      ),
    ).toBe("https://news.example");
    expect(
      sanitizeReferrer("https://l.instagram.com/p/1?token=abc#h", "https://www.gentleyehdesign.com"),
    ).toBe("https://l.instagram.com");
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
  it("retains the first landing, referrer origin, and the first utm set across navigation", () => {
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
      referrer: "https://l.instagram.com",
      landing: "/ai-team",
    });
    expect(second.utm_source).toBe("ig");
    expect(second.utm_campaign).toBe("spring");
    expect(second.landing).toBe("/ai-team");
    expect(second.referrer).toBe("https://l.instagram.com");

    const raw = data.get(ATTRIBUTION_SESSION_KEY) ?? "";
    const stored = JSON.parse(raw) as Record<string, string>;
    expect(Object.keys(stored).sort()).toEqual(
      ["landing", "referrer", "utm_campaign", "utm_content", "utm_medium", "utm_source", "utm_term"].sort(),
    );
    expect(raw).not.toContain("secret@");
    expect(raw).not.toContain("gclid");
    expect(raw).not.toContain("token");
    expect(raw).not.toContain("/p/1");
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

  it("adopts the first complete utm set after an untagged landing, then refuses a later campaign", () => {
    const { storage } = memoryStorage();
    rememberAttribution(
      env(storage, {
        pathname: "/",
        referrer: "https://news.example/account/jane.doe?token=abc",
      }),
    );
    const tagged = rememberAttribution(
      env(storage, {
        search: "?utm_source=campaign-a&utm_campaign=spring",
        pathname: "/printscale",
        referrer: "https://other.example/path",
      }),
    );
    const other = rememberAttribution(
      env(storage, {
        search: "?utm_source=campaign-b&utm_medium=cpc&utm_campaign=winter&utm_term=logo&utm_content=ad",
        pathname: "/contact",
      }),
    );
    expect(tagged).toMatchObject({
      utm_source: "campaign-a",
      utm_medium: "",
      utm_campaign: "spring",
      utm_term: "",
      utm_content: "",
      referrer: "https://news.example",
      landing: "/",
    });
    expect(other).toEqual(tagged);
    expect(JSON.stringify(other)).not.toContain("jane");
    expect(JSON.stringify(other)).not.toContain("campaign-b");
    expect(JSON.stringify(other)).not.toContain("winter");
  });

  it("does not fill empty fields of the first utm set from a second campaign", () => {
    const { storage } = memoryStorage();
    rememberAttribution(env(storage, { search: "?utm_source=campaign-a", pathname: "/ai-team" }));
    const next = rememberAttribution(
      env(storage, {
        search: "?utm_source=campaign-b&utm_medium=cpc&utm_campaign=winter",
        pathname: "/printscale",
      }),
    );
    expect(next.utm_source).toBe("campaign-a");
    expect(next.utm_medium).toBe("");
    expect(next.utm_campaign).toBe("");
    expect(next.landing).toBe("/ai-team");
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
    expect(first.referrer).toBe("https://news.example");
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
      ["初次造訪來源", NO_EXTERNAL_REFERRER],
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
    expect(rows).toContainEqual(["初次造訪來源", "https://evil.example"]);
    expect(rows).toContainEqual(["初次落地頁", "/printscale"]);
    expect(text).not.toContain("onerror");
    expect(text).not.toContain("/land");
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
