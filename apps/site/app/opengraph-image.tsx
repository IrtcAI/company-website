import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "IRTC, fábrica de software em Belém, Pará";

const ink = "#2a1712";
const cream = "#fff4e9";

function Asterisk({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      {[0, 45, 90, 135].map((angle) => (
        <line
          key={angle}
          x1="50"
          y1="8"
          x2="50"
          y2="92"
          stroke={color}
          strokeWidth="13"
          strokeLinecap="round"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
    </svg>
  );
}

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
        background: "#ef7e6c",
        color: ink,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <span
          style={{
            fontSize: 220,
            fontWeight: 700,
            letterSpacing: "-0.07em",
            lineHeight: 1,
          }}
        >
          irtc
        </span>
        <div style={{ display: "flex", marginLeft: 14, marginTop: 18 }}>
          <Asterisk size={92} color={cream} />
        </div>
      </div>
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
            borderTop: `2px solid ${ink}33`,
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
