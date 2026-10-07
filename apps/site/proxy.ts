import { NextRequest, NextResponse } from "next/server";
import { resolveLocale } from "./lib/locale";

// Search engines crawl from the US without a language preference; redirecting
// them would hide the pt-BR home behind /en. Hreflang already lists every locale.
const crawler =
  /bot\b|bot\/|crawler|spider|slurp|google-inspectiontool|googleother|lighthouse/i;

export function proxy(request: NextRequest) {
  const agent = request.headers.get("user-agent") || "";
  const country =
    process.env.VERCEL === "1"
      ? request.headers.get("x-vercel-ip-country")
      : null;
  const locale = crawler.test(agent)
    ? "pt-BR"
    : resolveLocale(
        request.cookies.get("irtc-locale")?.value,
        country,
        request.headers.get("accept-language") || "",
      );
  const response =
    locale === "pt-BR"
      ? NextResponse.next()
      : NextResponse.redirect(new URL(`/${locale}`, request.url));

  response.headers.set("Vary", "Accept-Language, Cookie, User-Agent");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = { matcher: ["/"] };
