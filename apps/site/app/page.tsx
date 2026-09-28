import { SiteExperience } from "@/components/site-experience";
import { SiteShell } from "@/components/site-shell";

export default function Home() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://irtc.com.br/#organization",
    name: "IRTC",
    url: "https://irtc.com.br",
    email: "contato@irtc.com.br",
    description:
      "Engenharia de software, produtos digitais, integrações, dados e inteligência artificial em Belém do Pará.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Belém",
      addressRegion: "PA",
      addressCountry: "BR",
    },
    knowsAbout: [
      "SaaS",
      "ERP",
      "CRM",
      "Node.js",
      "React",
      "PostgreSQL",
      "AWS",
      "RAG",
      "Agentes de IA",
      "ETL",
      "Integrações",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
        }}
      />
      <SiteShell locale="pt-BR" page="home">
        <SiteExperience />
      </SiteShell>
    </>
  );
}
