import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "IRTC, Cloud, Software & AI Engineering";

const deepTeal = "#002C32";
const offWhite = "#F5F4EF";
const coral = "#F58F69";

const artWidth = 517;
const artHeight = 260;
const wordmarkHeight = 219;
const scale = 0.84;

export default async function Image() {
  const wordmark = await readFile(
    join(process.cwd(), "public/brand/irtc-wordmark-offwhite.svg"),
  );
  const wordmarkSrc = `data:image/svg+xml;base64,${wordmark.toString("base64")}`;

  // Platforms that crop the card to a wide strip keep only the middle
  // ~260 px, so everything that identifies the brand sits inside that band.
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: deepTeal,
        borderBottom: `12px solid ${coral}`,
        color: offWhite,
      }}
    >
      <div
        style={{
          display: "flex",
          width: artWidth * scale,
          height: wordmarkHeight * scale,
          overflow: "hidden",
        }}
      >
        <img
          src={wordmarkSrc}
          width={artWidth * scale}
          height={artHeight * scale}
          alt=""
        />
      </div>
      <div
        style={{
          display: "flex",
          width: 2,
          height: 148,
          margin: "0 44px 0 28px",
          background: `${offWhite}40`,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
          }}
        >
          Cloud, Software
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
          }}
        >
          & AI Engineering
        </div>
        <div
          style={{ display: "flex", marginTop: 22, fontSize: 32, color: coral }}
        >
          irtc.com.br
        </div>
      </div>
    </div>,
    size,
  );
}
