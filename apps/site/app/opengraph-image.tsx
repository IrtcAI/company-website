import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "IRTC, fábrica de software em Belém, Pará";

const cream = "#f4efe7";
const terracotta = "#d98f6c";
const sage = "#86bca2";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 88px",
        background:
          "linear-gradient(165deg, #020b16 0%, #071a2a 48%, #003340 100%)",
        borderBottom: `12px solid ${sage}`,
        color: cream,
      }}
    >
      <span
        style={{
          fontSize: 220,
          fontWeight: 500,
          letterSpacing: "-0.07em",
          lineHeight: 1,
          color: terracotta,
        }}
      >
        irtc
      </span>
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
          Software, sites, apps e IA.
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 36,
            paddingTop: 28,
            borderTop: `2px solid ${cream}33`,
            fontSize: 28,
          }}
        >
          <span>Da Amazônia para o seu próximo projeto.</span>
          <span>irtc.com.br</span>
        </div>
      </div>
    </div>,
    size,
  );
}
