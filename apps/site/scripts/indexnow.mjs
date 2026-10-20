// Sends IndexNow the pages whose content changed since a given commit, using
// the hashes in lib/page-dates.json. Run by .github/workflows/indexnow.yml
// after each production deploy: node apps/site/scripts/indexnow.mjs [--since <sha>] [--dry-run]
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const SITE_URL = "https://irtc.com.br";
export const INDEXNOW_KEY = "798037baabcf02054502d61edc0438d8";
export const ENDPOINT = "https://api.indexnow.org/indexnow";

const site = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const datesPath = join(site, "lib/page-dates.json");

export function changedPaths(before, after) {
  const paths = new Set([...Object.keys(before), ...Object.keys(after)]);
  return [...paths].filter((path) => before[path]?.hash !== after[path]?.hash);
}

export function payload(paths) {
  const { host } = new URL(SITE_URL);
  return {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: paths.map((path) => (path === "/" ? SITE_URL : SITE_URL + path)),
  };
}

function datesAt(sha) {
  const root = execFileSync("git", ["rev-parse", "--show-toplevel"], {
    cwd: site,
    encoding: "utf8",
  }).trim();
  try {
    const file = relative(root, datesPath);
    return JSON.parse(
      execFileSync("git", ["show", `${sha}:${file}`], {
        cwd: root,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }),
    );
  } catch {
    return {};
  }
}

async function main() {
  const args = process.argv.slice(2);
  const since = args.includes("--since")
    ? args[args.indexOf("--since") + 1]
    : undefined;
  const dryRun = args.includes("--dry-run");

  const after = JSON.parse(readFileSync(datesPath, "utf8"));
  const before = since ? datesAt(since) : {};
  const paths = changedPaths(before, after);

  if (paths.length === 0) {
    console.log("No page content changed; nothing to send.");
    return;
  }

  const body = payload(paths);
  console.log(`${paths.length} URL(s):\n${body.urlList.join("\n")}`);
  if (dryRun) return;

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  console.log(`IndexNow answered ${response.status}.`);
  if (response.status !== 200 && response.status !== 202) process.exit(1);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await main();
