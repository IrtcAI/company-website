import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/en", "/es"].map((path) => ({
    url: `https://irtc.com.br${path}`,
    changeFrequency: "monthly",
    priority: path ? 0.8 : 1,
    alternates: {
      languages: {
        "pt-BR": "https://irtc.com.br",
        en: "https://irtc.com.br/en",
        es: "https://irtc.com.br/es",
      },
    },
  }));
}
