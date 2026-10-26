import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { GET as feedGet } from "@/app/rss.xml/route";
import { GET as localizedFeedGet } from "@/app/[locale]/rss.xml/route";
import { GET as markdownGet } from "@/app/md/[...path]/route";
import sitemap from "@/app/sitemap";
import { markdownToHtml } from "@/lib/feed";
import dates from "@/lib/page-dates.json";
import { markdownHash } from "@/lib/page-dates";
import {
  markdownPages,
  markdownRewrites,
  sitePages,
} from "@/lib/page-markdown";
import { absoluteUrl, markdownPath, SITE_URL } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/lib/services";
import { pageCopy } from "@/lib/copy/pages";
import {
  changedPaths,
  INDEXNOW_KEY,
  payload,
  SITE_URL as INDEXNOW_SITE_URL,
} from "@/scripts/indexnow.mjs";

const rerun = "Run `pnpm page-dates` to update lib/page-dates.json.";
const pageDates = dates as Record<
  string,
  { hash: string; lastModified: string }
>;

describe("page dates", () => {
  it("has a current hash for every page", () => {
    for (const page of markdownPages()) {
      const entry = pageDates[page.path];
      expect(entry, `missing ${page.path}. ${rerun}`).toBeDefined();
      expect(entry.hash, `stale ${page.path}. ${rerun}`).toBe(
        markdownHash(page.markdown),
      );
      expect(entry.lastModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("has no entries for removed pages", () => {
    const paths = new Set(sitePages().map((page) => page.path));
    expect(Object.keys(pageDates).filter((path) => !paths.has(path))).toEqual(
      [],
    );
  });

  it("gives every sitemap entry its content date", () => {
    for (const entry of sitemap()) expect(entry.lastModified).toBeDefined();
  });
});

describe("markdown copies", () => {
  it("covers every page with a heading and no missing copy", () => {
    const pages = markdownPages();
    expect(pages).toHaveLength(3 * (8 + services.length));
    for (const page of pages) {
      expect(page.markdown).toMatch(/^# \S/);
      expect(page.markdown).not.toMatch(/undefined|\[object Object\]/);
    }
  });

  it("serves Markdown with noindex, a canonical link and Vary: Accept", async () => {
    const response = await markdownGet(new Request(`${SITE_URL}/md/servicos`), {
      params: Promise.resolve({ path: ["servicos"] }),
    });
    expect(response.headers.get("Content-Type")).toBe(
      "text/markdown; charset=utf-8",
    );
    expect(response.headers.get("X-Robots-Tag")).toBe("noindex");
    expect(response.headers.get("Link")).toBe(
      `<${SITE_URL}/servicos>; rel="canonical"`,
    );
    expect(response.headers.get("Content-Location")).toBe("/servicos.md");
    expect(response.headers.get("Vary")).toBe("Accept");
    expect(await response.text()).toContain(
      `# ${pageCopy.services["pt-BR"].heading}`,
    );
  });

  it("maps the home page to /index.md", async () => {
    const response = await markdownGet(new Request(`${SITE_URL}/md/index`), {
      params: Promise.resolve({ path: ["index"] }),
    });
    expect(response.headers.get("Content-Location")).toBe("/index.md");
  });

  it("rewrites .md paths and Accept: text/markdown requests for every page", () => {
    const rewrites = markdownRewrites();
    for (const { path } of sitePages()) {
      expect(rewrites).toContainEqual(
        expect.objectContaining({ source: markdownPath(path) }),
      );
      expect(rewrites).toContainEqual(
        expect.objectContaining({
          source: path,
          has: [expect.objectContaining({ key: "accept" })],
        }),
      );
    }
  });

  it("links the Markdown copy and the feed from each page head", () => {
    const metadata = pageMetadata({
      locale: "en",
      page: "about",
      title: "About",
      description: "About",
    });
    expect(metadata.alternates?.types).toEqual({
      "text/markdown": "/en/about.md",
      "application/rss+xml": "/en/rss.xml",
    });
  });
});

describe("feeds", () => {
  it("publishes every pt-BR page with its full text", async () => {
    const xml = await feedGet().text();
    const pages = sitePages().filter((page) => page.locale === "pt-BR");
    expect(xml.match(/<item>/g)).toHaveLength(pages.length);
    expect(xml).toContain("<content:encoded><![CDATA[<h1>");
    expect(xml).toContain(`<link>${absoluteUrl("/servicos")}</link>`);
  });

  it("publishes the en and es feeds", async () => {
    for (const locale of ["en", "es"]) {
      const response = await localizedFeedGet(
        new Request(`${SITE_URL}/${locale}/rss.xml`),
        { params: Promise.resolve({ locale }) },
      );
      expect(response.headers.get("Content-Type")).toBe(
        "application/rss+xml; charset=utf-8",
      );
      expect(await response.text()).toContain(`<language>${locale}</language>`);
    }
  });

  it("converts the page Markdown to HTML", () => {
    expect(
      markdownToHtml("# A & B\n\nText [link](https://x.y)\n\n- one\n- two"),
    ).toBe(
      '<h1>A &amp; B</h1>\n<p>Text <a href="https://x.y">link</a></p>\n<ul><li>one</li><li>two</li></ul>',
    );
  });
});

describe("IndexNow", () => {
  it("serves the key file at the site root", () => {
    const file = join(process.cwd(), "public", `${INDEXNOW_KEY}.txt`);
    expect(readFileSync(file, "utf8")).toBe(INDEXNOW_KEY);
    expect(INDEXNOW_SITE_URL).toBe(SITE_URL);
  });

  it("sends only pages whose content hash changed, added or removed", () => {
    const before = {
      "/": { hash: "a" },
      "/sobre": { hash: "b" },
      "/old": { hash: "c" },
    };
    const after = {
      "/": { hash: "a" },
      "/sobre": { hash: "x" },
      "/new": { hash: "d" },
    };
    expect(changedPaths(before, after).sort()).toEqual([
      "/new",
      "/old",
      "/sobre",
    ]);
    expect(payload(["/", "/sobre"])).toEqual({
      host: "irtc.com.br",
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: [SITE_URL, `${SITE_URL}/sobre`],
    });
  });
});
