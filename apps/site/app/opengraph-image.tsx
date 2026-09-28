import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "IRTC, fábrica de software em Belém, Pará";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#ef7e6c",
        color: "#191b1b",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 168,
          fontWeight: 700,
        }}
      >
        <span>irtc</span>
        <span style={{ marginLeft: 16 }}>✳</span>
      </div>
      <div style={{ display: "flex", fontSize: 38, marginTop: 28 }}>
        Software, sites, apps e IA em Belém
      </div>
    </div>,
    size,
  );
}
