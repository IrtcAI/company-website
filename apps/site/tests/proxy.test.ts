import { NextRequest } from "next/server";
import { describe, expect, it, vi } from "vitest";
import { proxy } from "../proxy";

describe("locale routing", () => {
  it("keeps Portuguese on the root route", () => {
    const response = proxy(new NextRequest("https://irtc.com.br/", { headers: { "accept-language": "pt-BR" } }));
    expect(response.headers.get("location")).toBeNull();
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    expect(response.headers.get("vary")).toContain("Cookie");
  });
  it("redirects browser languages to their localized route", () => {
    const response = proxy(new NextRequest("https://irtc.com.br/", { headers: { "accept-language": "es-AR, en;q=0.5" } }));
    expect(response.headers.get("location")).toBe("https://irtc.com.br/es");
  });
  it("honors the saved preference over location", () => {
    vi.stubEnv("VERCEL", "1");
    const response = proxy(new NextRequest("https://irtc.com.br/", { headers: { cookie: "irtc-locale=en", "x-vercel-ip-country": "BR" } }));
    expect(response.headers.get("location")).toBe("https://irtc.com.br/en");
  });
  it("uses country detection only on its trusted hosting provider", () => {
    const headers = { "x-vercel-ip-country": "BR", "accept-language": "en-US" };
    vi.stubEnv("VERCEL", "");
    expect(proxy(new NextRequest("https://irtc.com.br/", { headers })).headers.get("location")).toBe("https://irtc.com.br/en");
    vi.stubEnv("VERCEL", "1");
    expect(proxy(new NextRequest("https://irtc.com.br/", { headers })).headers.get("location")).toBeNull();
  });
});
