import { buildLlmsTxt } from "@/lib/llms-txt";

export const dynamic = "force-static";

// Old URL, kept serving the same content as /llms.txt for crawlers still requesting it.
export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
