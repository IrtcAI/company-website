import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/development-story.css";
import "@/styles/studio-objects.css";
import "@/styles/project-showcase.css";
import "@/styles/accessibility-toolbar.css";
import "@/styles/origin-map.css";
import "@/styles/footer.css";
import "@/styles/contact-cta.css";
import "@/styles/services.css";
import "@/styles/contact.css";
import "@/styles/consent.css";
import "@/styles/splash.css";
import "@/styles/about.css";

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "optional",
});

const title = "IRTC | Software, sites, apps e IA em Belém";
const description =
  "Fábrica de software em Belém, Pará. Criamos software sob medida, sites, aplicativos, integrações e inteligência artificial para empresas de todos os tamanhos.";

export const metadata: Metadata = {
  metadataBase: new URL("https://irtc.com.br"),
  title,
  description,
  alternates: {
    canonical: "/",
    languages: { "pt-BR": "/", en: "/en", es: "/es", "x-default": "/" },
  },
  keywords: [
    "fábrica de software",
    "software sob medida",
    "desenvolvimento de sites",
    "sites e plataformas web",
    "aplicativos para celular",
    "desenvolvimento de aplicativos mobile",
    "inteligência artificial",
    "integrações de sistemas",
    "automação de processos",
    "modernização de sistemas",
    "desenvolvimento de software em Belém",
    "desenvolvimento de software no Pará",
    "Node.js",
    "React",
    "Next.js",
    "PostgreSQL",
    "AWS",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://irtc.com.br",
    siteName: "IRTC",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const preferences = `try{var t=localStorage.getItem('irtc-theme');document.documentElement.dataset.theme=['light','dark'].includes(t)?t:'system'}catch(e){document.documentElement.dataset.theme='system'}var p=location.pathname.split('/')[1];document.documentElement.lang=p==='en'||p==='es'?p:'pt-BR'`;
  // Hides the splash once fonts, images and hydration-critical scripts have loaded, capped so a slow asset never blocks the page.
  const splash = `(function(){var s=document.getElementById('splash');if(!s)return;var d=0;function done(){if(d)return;d=1;s.dataset.done='';setTimeout(function(){s.hidden=true},450)}setTimeout(done,2200);var l=new Promise(function(r){document.readyState==='complete'?r():addEventListener('load',r,{once:true})});Promise.all([l,document.fonts?document.fonts.ready:0]).then(function(){requestAnimationFrame(function(){requestAnimationFrame(done)})})})()`;
  return (
    <html lang="pt-BR" className={body.variable} suppressHydrationWarning>
      <head>
        <link
          rel="describedby"
          href="/llms.txt"
          type="text/plain"
          title="IRTC company guide for AI assistants"
        />
        <script dangerouslySetInnerHTML={{ __html: preferences }} />
      </head>
      <body>
        <div
          id="splash"
          className="splash"
          aria-hidden="true"
          suppressHydrationWarning
        >
          <span className="splash-mark">
            irtc<span>✳</span>
          </span>
          <span className="splash-bar" />
        </div>
        <noscript>
          <style>{".splash{display:none}"}</style>
        </noscript>
        <script dangerouslySetInnerHTML={{ __html: splash }} />
        {children}
      </body>
    </html>
  );
}
