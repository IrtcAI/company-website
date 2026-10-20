import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { markdownHash, type PageDate } from "../lib/page-dates";
import { markdownPages } from "../lib/page-markdown";

const site = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const datesPath = join(site, "lib/page-dates.json");

// --rehash refreshes hashes without moving dates, for changes to the Markdown
// format that leave the page content as it was.
const rehash = process.argv.includes("--rehash");
const today = new Date().toISOString().slice(0, 10);

const existing = JSON.parse(readFileSync(datesPath, "utf8")) as Record<
  string,
  PageDate
>;

const changed: string[] = [];
const next = Object.fromEntries(
  markdownPages().map(({ path, markdown }) => {
    const hash = markdownHash(markdown);
    const previous = existing[path];
    if (previous?.hash === hash) return [path, previous];

    if (!rehash || !previous) changed.push(path);
    const date = rehash && previous ? previous.lastModified : today;
    return [path, { hash, lastModified: date }];
  }),
);

writeFileSync(datesPath, `${JSON.stringify(next, null, 2)}\n`);

const removed = Object.keys(existing).filter((path) => !(path in next));
console.log(
  `${changed.length} page(s) dated ${today}${changed.length ? `: ${changed.join(", ")}` : ""}.`,
);
if (removed.length) console.log(`Removed: ${removed.join(", ")}.`);
