import type { Locale } from "./content";
import { homeCopy } from "./copy/pages";
import { lastModified } from "./page-dates";
import { markdownPages } from "./page-markdown";
import { absoluteUrl, feedPath, pagePath } from "./routes";

function escape(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inline(text: string) {
  return escape(text).replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    (_match, label: string, href: string) => `<a href="${href}">${label}</a>`,
  );
}

// Covers only the Markdown that lib/page-markdown.ts writes: headings,
// paragraphs, quotes, links and flat bullet or numbered lists.
export function markdownToHtml(markdown: string) {
  return markdown
    .trim()
    .split(/\n{2,}/)
    .map((block) => {
      const heading = block.match(/^(#{1,6}) (.*)$/);
      if (heading)
        return `<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`;

      const lines = block.split("\n");
      if (lines.every((line) => line.startsWith("- ")))
        return `<ul>${lines.map((line) => `<li>${inline(line.slice(2))}</li>`).join("")}</ul>`;
      if (lines.every((line) => /^\d+\. /.test(line)))
        return `<ol>${lines.map((line) => `<li>${inline(line.replace(/^\d+\. /, ""))}</li>`).join("")}</ol>`;
      if (block.startsWith("> "))
        return `<blockquote><p>${inline(block.slice(2))}</p></blockquote>`;

      return `<p>${inline(block)}</p>`;
    })
    .join("\n");
}

function rfc822(date: string) {
  return new Date(`${date}T12:00:00Z`).toUTCString();
}

const channelTitle: Record<Locale, string> = {
  "pt-BR": "IRTC: páginas do site",
  en: "IRTC: site pages",
  es: "IRTC: páginas del sitio",
};

const language: Record<Locale, string> = {
  "pt-BR": "pt-BR",
  en: "en",
  es: "es",
};

export function buildFeed(locale: Locale) {
  const pages = markdownPages()
    .filter((page) => page.locale === locale)
    .map((page) => ({ ...page, date: lastModified(page.path) ?? "" }))
    .sort((a, b) => b.date.localeCompare(a.date));
  const newest = pages[0]?.date;

  const items = pages.map((page) => {
    const url = absoluteUrl(page.path);
    return [
      "<item>",
      `<title>${escape(page.title)}</title>`,
      `<link>${url}</link>`,
      `<guid isPermaLink="true">${url}</guid>`,
      page.date ? `<pubDate>${rfc822(page.date)}</pubDate>` : "",
      `<description>${escape(page.description)}</description>`,
      `<content:encoded><![CDATA[${markdownToHtml(page.markdown).replaceAll("]]>", "]]]]><![CDATA[>")}]]></content:encoded>`,
      "</item>",
    ]
      .filter(Boolean)
      .join("\n");
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">',
    "<channel>",
    `<title>${channelTitle[locale]}</title>`,
    `<link>${absoluteUrl(pagePath(locale, "home"))}</link>`,
    `<atom:link href="${absoluteUrl(feedPath(locale))}" rel="self" type="application/rss+xml" />`,
    `<description>${escape(homeCopy[locale].description)}</description>`,
    `<language>${language[locale]}</language>`,
    newest ? `<lastBuildDate>${rfc822(newest)}</lastBuildDate>` : "",
    ...items,
    "</channel>",
    "</rss>",
    "",
  ]
    .filter(Boolean)
    .join("\n");
}
