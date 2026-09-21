import { NextRequest, NextResponse } from "next/server";
import { resolveLocale } from "./lib/locale";

export function proxy(request: NextRequest) {
  const country =
    process.env.VERCEL === "1"
      ? request.headers.get("x-vercel-ip-country")
      : null;
  const locale = resolveLocale(
    request.cookies.get("irtc-locale")?.value,
    country,
    request.headers.get("accept-language") || "",
  );
  const response =
    locale === "pt-BR"
      ? NextResponse.next()
      : NextResponse.redirect(new URL(`/${locale}`, request.url));
  response.headers.set("Vary", "Accept-Language, Cookie");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = { matcher: ["/"] };
