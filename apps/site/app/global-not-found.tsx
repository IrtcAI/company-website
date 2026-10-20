import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { SITE_URL } from "@/lib/routes";
import "@/styles/globals.css";

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "404 | IRTC",
};

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={body.variable}>
      <body>
        <style>{"main a{text-decoration:underline}"}</style>
        <main
          style={{
            display: "grid",
            placeContent: "center",
            gap: 12,
            minHeight: "100vh",
            padding: 16,
            textAlign: "center",
          }}
        >
          <h1>404</h1>
          <p>
            Página não encontrada. <Link href="/">Voltar ao início</Link>
          </p>
          <p lang="en">
            Page not found. <Link href="/en">Back to the home page</Link>
          </p>
          <p lang="es">
            Página no encontrada. <Link href="/es">Volver al inicio</Link>
          </p>
        </main>
      </body>
    </html>
  );
}
