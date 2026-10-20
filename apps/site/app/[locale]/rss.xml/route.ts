import { notFound } from "next/navigation";
import { buildFeed } from "@/lib/feed";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "es") notFound();

  return new Response(buildFeed(locale), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
