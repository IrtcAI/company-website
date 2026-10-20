import { buildRobotsTxt } from "@/lib/robots";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildRobotsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
