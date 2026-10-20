import { SITE_URL } from "./routes";

export const CONTENT_SIGNAL = "search=yes, ai-input=yes, ai-train=no";

// Grouped by what each operator says the crawler is for, so one purpose can
// change without touching the others.
export const crawlerGroups: {
  purpose: string;
  agents: string[];
  allowed: boolean;
}[] = [
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
    allowed: true,
  },
  {
    purpose: "Fetches a person triggers from an AI assistant",
    agents: ["ChatGPT-User", "Claude-User", "Perplexity-User"],
    allowed: true,
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
    allowed: false,
  },
];

function group(agents: string[], allowed = true) {
  return [
    ...agents.map((agent) => `User-Agent: ${agent}`),
    `Content-Signal: ${CONTENT_SIGNAL}`,
    ...(allowed ? ["Allow: /", "Disallow: /api/"] : ["Disallow: /"]),
  ].join("\n");
}

export function buildRobotsTxt() {
  return [
    "# Content signals: https://blog.cloudflare.com/content-signals-policy/",
    "# search = search index, links and snippets; ai-input = grounding AI answers;",
    "# ai-train = training or fine-tuning AI models.",
    "",
    group(["*"]),
    ...crawlerGroups.flatMap(({ purpose, agents, allowed }) => [
      "",
      `# ${purpose}`,
      group(agents, allowed),
    ]),
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");
}
