import { SiteExperience } from "@/components/site-experience";
import { SiteShell } from "@/components/site-shell";
import { SITE_URL } from "@/lib/routes";
import {
  founder,
  graph,
  jsonLd,
  organization,
  ORGANIZATION_ID,
} from "@/lib/structured-data";

const description =
  "Fábrica de software em Belém, Pará. Criamos software sob medida, sites, aplicativos, integrações e inteligência artificial para empresas de todos os tamanhos.";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          graph(
            organization("pt-BR", description),
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: SITE_URL,
              name: "IRTC",
              inLanguage: "pt-BR",
              publisher: { "@id": ORGANIZATION_ID },
            },
            founder("pt-BR", "Fundador"),
          ),
        )}
      />
      <SiteShell locale="pt-BR" page="home">
        <SiteExperience />
      </SiteShell>
    </>
  );
}
