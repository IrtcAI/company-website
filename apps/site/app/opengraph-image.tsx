import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SLOGAN } from "@/lib/structured-data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "IRTC, Cloud, Software & AI Engineering";

const deepTeal = "#002C32";
const offWhite = "#F5F4EF";
const coral = "#F58F69";

export default async function Image() {
  const wordmark = await readFile(
    join(process.cwd(), "public/brand/irtc-wordmark-offwhite.svg"),
  );
  const wordmarkSrc = `data:image/svg+xml;base64,${wordmark.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 88px",
        background: deepTeal,
        borderBottom: `12px solid ${coral}`,
        color: offWhite,
      }}
    >
      <img src={wordmarkSrc} width={414} height={208} alt="" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          {SLOGAN}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 36,
            paddingTop: 28,
            borderTop: `2px solid ${offWhite}33`,
            fontSize: 28,
          }}
        >
          <span>Da Amazônia para o seu próximo desafio.</span>
          <span style={{ color: coral }}>irtc.com.br</span>
        </div>
      </div>
    </div>,
    size,
  );
}
