import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "optional",
});

const title = "IRTC | Engenharia de software, IA e dados";
const description =
  "Fábrica de software em Belém, Pará. Sistemas SaaS, ERP, CRM, IA, RAG, integrações e produtos digitais confiáveis.";

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
    "engenharia de IA",
    "desenvolvimento de software Belém",
    "SaaS",
    "ERP",
    "CRM",
    "RAG",
    "agentes de IA",
    "banco vetorial",
    "Node.js",
    "NestJS",
    "Next.js",
    "React",
    "PostgreSQL",
    "AWS",
    "ETL",
    "ELT",
    "integrações",
    "automação",
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
  const preferences = `try{var t=localStorage.getItem('irtc-theme');document.documentElement.dataset.theme=['light','dark'].includes(t)?t:'system'}catch(e){document.documentElement.dataset.theme='system'}document.documentElement.lang=location.pathname==='/en'?'en':location.pathname==='/es'?'es':'pt-BR'`;
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
      <body>{children}</body>
    </html>
  );
}
