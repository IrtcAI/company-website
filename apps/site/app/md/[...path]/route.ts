import { notFound } from "next/navigation";
import { markdownPage, markdownPages } from "@/lib/page-markdown";
import { absoluteUrl, markdownPath } from "@/lib/routes";

type Params = { params: Promise<{ path: string[] }> };

export const dynamic = "force-static";
export const dynamicParams = false;

function segments(path: string) {
  return path === "/" ? ["index"] : path.slice(1).split("/");
}

export function generateStaticParams() {
  return markdownPages().map(({ path }) => ({ path: segments(path) }));
}

export async function GET(_request: Request, { params }: Params) {
  const joined = (await params).path.join("/");
  const page = markdownPage(joined === "index" ? "/" : `/${joined}`);
  if (!page) notFound();

  return new Response(page.markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Location": markdownPath(page.path),
      Link: `<${absoluteUrl(page.path)}>; rel="canonical"`,
      "X-Robots-Tag": "noindex",
      Vary: "Accept",
    },
  });
}
