import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const body = Manrope({ subsets: ["latin"], variable: "--font-body" });

const title = "IRTC | Engenharia de software, IA e dados";
const description = "Fábrica de software em Belém, Pará. Sistemas SaaS, ERP, CRM, IA, RAG, integrações e produtos digitais confiáveis.";

export const metadata: Metadata = {
  metadataBase: new URL("https://irtc.com.br"),
  title,
  description,
  alternates: { canonical: "/", languages: { "pt-BR": "/" } },
  keywords: ["fábrica de software", "engenharia de IA", "desenvolvimento de software Belém", "SaaS", "ERP", "CRM", "RAG", "agentes de IA", "banco vetorial", "Node.js", "NestJS", "Next.js", "React", "PostgreSQL", "AWS", "ETL", "ELT", "integrações", "automação"],
  openGraph: { type: "website", locale: "pt_BR", url: "https://irtc.com.br", siteName: "IRTC", title, description },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={body.variable}><body>{children}</body></html>;
}
