import { SITE_URL } from "./routes";

export const CONTENT_SIGNAL = "search=yes, ai-input=yes, ai-train=yes";

// Grouped by what each operator says the crawler is for. Every group gets the
// same rules today; the split exists so one purpose can change on its own.
export const crawlerGroups: { purpose: string; agents: string[] }[] = [
  {
    purpose: "Search indexes, including the ones AI answers cite",
    agents: [
      "Googlebot",
      "Bingbot",
      "Applebot",
      "OAI-SearchBot",
      "Claude-SearchBot",
      "PerplexityBot",
    ],
  },
  {
    purpose: "Fetches a person triggers from an AI assistant",
    agents: ["ChatGPT-User", "Claude-User", "Perplexity-User"],
  },
  {
    purpose: "AI model training",
    agents: [
      "GPTBot",
      "ClaudeBot",
      "Google-Extended",
      "Applebot-Extended",
      "Amazonbot",
      "Meta-ExternalAgent",
      "CCBot",
    ],
  },
];

function group(agents: string[]) {
  return [
    ...agents.map((agent) => `User-Agent: ${agent}`),
    `Content-Signal: ${CONTENT_SIGNAL}`,
    "Allow: /",
    "Disallow: /api/",
  ].join("\n");
}

export function buildRobotsTxt() {
  return [
    "# Content signals: https://blog.cloudflare.com/content-signals-policy/",
    "# search = search index, links and snippets; ai-input = grounding AI answers;",
    "# ai-train = training or fine-tuning AI models.",
    "",
    group(["*"]),
    ...crawlerGroups.flatMap(({ purpose, agents }) => [
      "",
      `# ${purpose}`,
      group(agents),
    ]),
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");
}
