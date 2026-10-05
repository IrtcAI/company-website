import { SiteExperience } from "@/components/site-experience";
import { SiteShell } from "@/components/site-shell";
import { founderJobTitle, homeCopy } from "@/lib/copy/pages";
import { SITE_URL } from "@/lib/routes";
import {
  founder,
  graph,
  jsonLd,
  organization,
  ORGANIZATION_ID,
} from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          graph(
            organization("pt-BR", homeCopy["pt-BR"].organization),
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: SITE_URL,
              name: "IRTC",
              inLanguage: "pt-BR",
              publisher: { "@id": ORGANIZATION_ID },
            },
            founder("pt-BR", founderJobTitle),
          ),
        )}
      />
      <SiteShell locale="pt-BR" page="home">
        <SiteExperience />
      </SiteShell>
    </>
  );
}
