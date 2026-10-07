import { NextRequest } from "next/server";
import { describe, expect, it, vi } from "vitest";
import { proxy } from "../proxy";

describe("locale routing", () => {
  it("keeps Portuguese on the root route", () => {
    const response = proxy(
      new NextRequest("https://irtc.com.br/", {
        headers: { "accept-language": "pt-BR" },
      }),
    );
    expect(response.headers.get("location")).toBeNull();
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    expect(response.headers.get("vary")).toContain("Cookie");
  });

  it("redirects browser languages to their localized route", () => {
    const response = proxy(
      new NextRequest("https://irtc.com.br/", {
        headers: { "accept-language": "es-AR, en;q=0.5" },
      }),
    );
    expect(response.headers.get("location")).toBe("https://irtc.com.br/es");
  });

  it("serves the pt-BR home to crawlers from any country", () => {
    vi.stubEnv("VERCEL", "1");
    for (const agent of [
      "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      "Mozilla/5.0 (compatible; Google-InspectionTool/1.0;)",
      "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
      "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)",
    ]) {
      const response = proxy(
        new NextRequest("https://irtc.com.br/", {
          headers: { "user-agent": agent, "x-vercel-ip-country": "US" },
        }),
      );
      expect(response.headers.get("location")).toBeNull();
    }
  });

  it("still redirects a visitor browsing from the US", () => {
    vi.stubEnv("VERCEL", "1");
    const response = proxy(
      new NextRequest("https://irtc.com.br/", {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
          "x-vercel-ip-country": "US",
        },
      }),
    );
    expect(response.headers.get("location")).toBe("https://irtc.com.br/en");
  });

  it("honors the saved preference over location", () => {
    vi.stubEnv("VERCEL", "1");
    const response = proxy(
      new NextRequest("https://irtc.com.br/", {
        headers: { cookie: "irtc-locale=en", "x-vercel-ip-country": "BR" },
      }),
    );
    expect(response.headers.get("location")).toBe("https://irtc.com.br/en");
  });

  it("uses country detection only on its trusted hosting provider", () => {
    const headers = { "x-vercel-ip-country": "BR", "accept-language": "en-US" };
    vi.stubEnv("VERCEL", "");
    expect(
      proxy(new NextRequest("https://irtc.com.br/", { headers })).headers.get(
        "location",
      ),
    ).toBe("https://irtc.com.br/en");

    vi.stubEnv("VERCEL", "1");
    expect(
      proxy(new NextRequest("https://irtc.com.br/", { headers })).headers.get(
        "location",
      ),
    ).toBeNull();
  });
});
