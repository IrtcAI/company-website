import { createHash } from "node:crypto";
import dates from "./page-dates.json";

export type PageDate = { hash: string; lastModified: string };

export function markdownHash(markdown: string): string {
  return createHash("sha256").update(markdown).digest("hex").slice(0, 16);
}

export function lastModified(path: string): string | undefined {
  return (dates as Record<string, PageDate>)[path]?.lastModified;
}
