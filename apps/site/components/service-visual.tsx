import type { CSSProperties, ReactElement } from "react";
import type { ServiceAccent, ServiceId } from "@/lib/services";
import "@/styles/service-visuals.css";

const vars = (values: Record<string, string | number>) =>
  values as CSSProperties;

function CustomSoftware() {
  return (
    <>
      <rect
        className="sv-panel"
        x="24"
        y="56"
        width="150"
        height="208"
        rx="10"
      />
      <rect
        className="sv-accent-soft"
        x="24"
        y="56"
        width="150"
        height="30"
        rx="10"
      />
      {[110, 140, 170, 200, 230].map((y) => (
        <line key={y} className="sv-stroke" x1="24" x2="174" y1={y} y2={y} />
      ))}
      {[74, 124].map((x) => (
        <line key={x} className="sv-stroke" x1={x} x2={x} y1="56" y2="264" />
      ))}
      <rect className="sv-muted" x="30" y="116" width="38" height="18" rx="3" />
      <rect className="sv-muted" x="80" y="146" width="38" height="18" rx="3" />
      <rect
        className="sv-muted"
        x="130"
        y="176"
        width="38"
        height="18"
        rx="3"
      />
      <rect className="sv-muted" x="30" y="206" width="38" height="18" rx="3" />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          className="sv-accent sv-travel"
          cx="188"
          cy="160"
          r="5"
          style={vars({ "--dx": "70px", "--dy": "0px", "--d": `${i * 0.7}s` })}
        />
      ))}
      <line
        className="sv-stroke-accent"
        x1="182"
        x2="262"
        y1="160"
        y2="160"
        strokeDasharray="4 6"
      />
      {[36, 128, 220].map((y, i) => (
        <g key={y}>
          <rect
            className="sv-panel"
            x="270"
            y={y}
            width="180"
            height="64"
            rx="10"
          />
          <rect
            className="sv-accent-soft"
            x="270"
            y={y}
            width="180"
            height="16"
            rx="8"
          />
          <rect
            className="sv-muted"
            x="282"
            y={y + 28}
            width="90"
            height="7"
            rx="3.5"
          />
          <rect
            className="sv-muted"
            x="282"
            y={y + 42}
            width="60"
            height="7"
            rx="3.5"
          />
          <rect
            className="sv-accent sv-pulse"
            x="392"
            y={y + 36}
            width="46"
            height="18"
            rx="9"
            style={vars({ "--d": `${i * -0.8}s` })}
          />
        </g>
      ))}
      {[100, 192].map((y) => (
        <path
          key={y}
          className="sv-stroke-accent"
          d={`M360 ${y}v24m-5 -6l5 6l5 -6`}
        />
      ))}
    </>
  );
}

function WebPlatforms() {
  return (
    <>
      <rect
        className="sv-panel"
        x="40"
        y="32"
        width="400"
        height="256"
        rx="14"
      />
      <path
        className="sv-accent-soft"
        d="M40 46a14 14 0 0 1 14-14h372a14 14 0 0 1 14 14v22H40z"
      />
      {[60, 76, 92].map((x) => (
        <circle key={x} className="sv-muted" cx={x} cy="50" r="4.5" />
      ))}
      <rect
        className="sv-panel"
        x="120"
        y="42"
        width="240"
        height="16"
        rx="8"
      />
      <rect
        className="sv-accent-soft"
        x="60"
        y="84"
        width="360"
        height="72"
        rx="10"
      />
      <rect
        className="sv-ink-fill"
        x="76"
        y="102"
        width="150"
        height="9"
        rx="4.5"
      />
      <rect
        className="sv-muted"
        x="76"
        y="120"
        width="210"
        height="7"
        rx="3.5"
      />
      <rect
        className="sv-accent"
        x="76"
        y="134"
        width="64"
        height="12"
        rx="6"
      />
      {[60, 184, 308].map((x, i) => (
        <g key={x} className="sv-float" style={vars({ "--d": `${i * -0.9}s` })}>
          <rect
            className="sv-panel"
            x={x}
            y="172"
            width="112"
            height="96"
            rx="10"
          />
          <rect
            className="sv-accent-soft"
            x={x + 10}
            y="182"
            width="92"
            height="40"
            rx="6"
          />
          <rect
            className="sv-muted"
            x={x + 10}
            y="232"
            width="70"
            height="7"
            rx="3.5"
          />
          <rect
            className="sv-muted"
            x={x + 10}
            y="246"
            width="48"
            height="7"
            rx="3.5"
          />
        </g>
      ))}
      <g transform="translate(150 196)">
        <path
          className="sv-cursor sv-ink-fill"
          d="M0 0l0 20l5.5 -5l4 9l3.5 -1.6l-4 -8.6l7.5 -.4z"
        />
      </g>
    </>
  );
}

function MobileApps() {
  return (
    <>
      <rect
        className="sv-panel sv-stroke-strong"
        x="172"
        y="20"
        width="136"
        height="280"
        rx="26"
      />
      <rect className="sv-muted" x="226" y="30" width="28" height="6" rx="3" />
      {[58, 106, 154, 202].map((y, i) => (
        <g key={y}>
          <rect
            className="sv-accent-soft"
            x="184"
            y={y}
            width="112"
            height="40"
            rx="8"
          />
          <circle
            className={i === 2 ? "sv-accent sv-pulse" : "sv-accent"}
            cx="204"
            cy={y + 20}
            r="8"
          />
          <rect
            className="sv-muted"
            x="220"
            y={y + 12}
            width="64"
            height="6"
            rx="3"
          />
          <rect
            className="sv-muted"
            x="220"
            y={y + 24}
            width="40"
            height="6"
            rx="3"
          />
        </g>
      ))}
      <rect
        className="sv-accent"
        x="196"
        y="252"
        width="88"
        height="22"
        rx="11"
      />
      <rect
        className="sv-panel"
        x="20"
        y="132"
        width="116"
        height="56"
        rx="28"
      />
      <circle className="sv-accent-soft sv-pulse" cx="48" cy="160" r="16" />
      <g className="sv-stroke-strong" fill="none">
        <path d="M38 156a14 14 0 0 1 20 0M42 161a8 8 0 0 1 12 0" />
        <path className="sv-stroke-accent" d="M36 172l24 -24" />
      </g>
      <rect
        className="sv-muted"
        x="74"
        y="152"
        width="48"
        height="7"
        rx="3.5"
      />
      <rect
        className="sv-muted"
        x="74"
        y="166"
        width="32"
        height="7"
        rx="3.5"
      />
      <line
        className="sv-stroke-accent"
        x1="316"
        x2="388"
        y1="160"
        y2="160"
        strokeDasharray="4 6"
      />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          className="sv-accent sv-travel"
          cx="318"
          cy="160"
          r="5"
          style={vars({ "--dx": "64px", "--dy": "0px", "--d": `${i * 0.8}s` })}
        />
      ))}
      <path
        className="sv-panel"
        d="M404 196h40a20 20 0 0 0 2 -40a28 28 0 0 0 -54 -6a24 24 0 0 0 12 46z"
      />
    </>
  );
}

function Integrations() {
  const nodes = [
    { x: 56, y: 40 },
    { x: 368, y: 40 },
    { x: 56, y: 224 },
    { x: 368, y: 224 },
  ];
  return (
    <>
      {nodes.map((n, i) => (
        <line
          key={i}
          className="sv-stroke-accent"
          x1={n.x + 28}
          y1={n.y + 28}
          x2="240"
          y2="160"
          strokeDasharray="3 6"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <rect
            className="sv-panel"
            x={n.x}
            y={n.y}
            width="56"
            height="56"
            rx="14"
          />
          <rect
            className="sv-muted"
            x={n.x + 12}
            y={n.y + 16}
            width="32"
            height="7"
            rx="3.5"
          />
          <rect
            className="sv-muted"
            x={n.x + 12}
            y={n.y + 29}
            width="22"
            height="7"
            rx="3.5"
          />
          <circle className="sv-accent" cx={n.x + 44} cy={n.y + 12} r="4" />
          <circle
            className="sv-accent sv-travel"
            cx={n.x + 28}
            cy={n.y + 28}
            r="5"
            style={vars({
              "--dx": `${240 - (n.x + 28)}px`,
              "--dy": `${160 - (n.y + 28)}px`,
              "--d": `${i * 0.6}s`,
            })}
          />
        </g>
      ))}
      <circle className="sv-accent-soft sv-pulse" cx="240" cy="160" r="46" />
      <circle className="sv-panel sv-stroke-accent" cx="240" cy="160" r="32" />
      <path className="sv-stroke-accent" d="M226 160h28M240 146v28" />
      <circle className="sv-accent" cx="240" cy="160" r="6" />
    </>
  );
}

function Modernization() {
  const stages = [
    { x: 30, modern: 1 },
    { x: 180, modern: 3 },
    { x: 330, modern: 4 },
  ];
  return (
    <>
      {stages.map((stage, s) => (
        <g key={stage.x}>
          <rect
            className="sv-panel"
            x={stage.x}
            y="86"
            width="120"
            height="124"
            rx="12"
          />
          {[0, 1, 2, 3].map((i) => {
            const modern = i < stage.modern;
            return (
              <rect
                key={i}
                className={
                  modern
                    ? "sv-accent-soft sv-stroke-accent"
                    : "sv-muted sv-dashed"
                }
                x={stage.x + 12 + (i % 2) * 52}
                y={98 + Math.floor(i / 2) * 56}
                width="44"
                height="48"
                rx="8"
              />
            );
          })}
          <circle
            className="sv-panel sv-stroke-strong"
            cx={stage.x + 60}
            cy="256"
            r="10"
          />
          <text
            className="sv-label"
            x={stage.x + 60}
            y="260"
            textAnchor="middle"
          >
            {s + 1}
          </text>
        </g>
      ))}
      <line
        className="sv-stroke-strong"
        x1="90"
        x2="390"
        y1="256"
        y2="256"
        strokeDasharray="2 6"
      />
      <circle className="sv-accent sv-stage-marker" cx="90" cy="256" r="6" />
      <path
        className="sv-stroke-accent sv-pulse"
        d="M390 70c-40 -30 -110 -30 -150 0m10 -10l-10 10l14 4"
        strokeDasharray="5 5"
      />
    </>
  );
}

function AppliedAi() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${24 + i * 10} ${64 + i * 12})`}>
          <rect className="sv-panel" width="104" height="132" rx="8" />
          <rect
            className="sv-muted"
            x="12"
            y="16"
            width="60"
            height="7"
            rx="3.5"
          />
          <rect
            className="sv-muted"
            x="12"
            y="32"
            width="80"
            height="6"
            rx="3"
          />
          <rect
            className="sv-muted"
            x="12"
            y="46"
            width="70"
            height="6"
            rx="3"
          />
          <rect
            className="sv-muted"
            x="12"
            y="60"
            width="78"
            height="6"
            rx="3"
          />
        </g>
      ))}
      <rect
        className="sv-accent sv-scan"
        x="34"
        y="70"
        width="104"
        height="3"
        rx="1.5"
      />
      <line
        className="sv-stroke-accent"
        x1="150"
        x2="206"
        y1="160"
        y2="160"
        strokeDasharray="4 6"
      />
      <circle className="sv-accent-soft sv-pulse" cx="250" cy="160" r="48" />
      <circle className="sv-panel sv-stroke-accent" cx="250" cy="160" r="34" />
      <path
        className="sv-accent"
        d="M250 140c1 10 6 15 16 16c-10 1 -15 6 -16 16c-1 -10 -6 -15 -16 -16c10 -1 15 -6 16 -16z"
      />
      <line
        className="sv-stroke-accent"
        x1="296"
        x2="334"
        y1="160"
        y2="160"
        strokeDasharray="4 6"
      />
      {[0, 1].map((i) => (
        <circle
          key={i}
          className="sv-accent sv-travel"
          cx="298"
          cy="160"
          r="5"
          style={vars({ "--dx": "34px", "--dy": "0px", "--d": `${i * 1.1}s` })}
        />
      ))}
      <rect
        className="sv-panel"
        x="340"
        y="64"
        width="116"
        height="96"
        rx="10"
      />
      <rect
        className="sv-ink-fill"
        x="352"
        y="78"
        width="72"
        height="8"
        rx="4"
      />
      <rect className="sv-muted" x="352" y="96" width="92" height="6" rx="3" />
      <rect className="sv-muted" x="352" y="110" width="80" height="6" rx="3" />
      <rect
        className="sv-accent-soft"
        x="352"
        y="128"
        width="54"
        height="16"
        rx="8"
      />
      <circle className="sv-panel sv-stroke-strong" cx="376" cy="226" r="28" />
      <circle className="sv-muted" cx="376" cy="218" r="8" />
      <path className="sv-muted" d="M360 244a16 14 0 0 1 32 0z" />
      <circle className="sv-accent sv-pulse" cx="402" cy="246" r="12" />
      <path className="sv-stroke-check" d="M396 246l4 4l8 -8" />
      <line
        className="sv-stroke-accent"
        x1="398"
        x2="398"
        y1="160"
        y2="190"
        strokeDasharray="3 5"
      />
    </>
  );
}

function Data() {
  const chips = [
    { x: 24, y: 40, w: 54 },
    { x: 92, y: 74, w: 40 },
    { x: 30, y: 116, w: 66 },
    { x: 112, y: 150, w: 44 },
    { x: 22, y: 190, w: 48 },
    { x: 88, y: 226, w: 58 },
    { x: 30, y: 262, w: 40 },
  ];
  return (
    <>
      {chips.map((c, i) => (
        <g key={i} className="sv-drift" style={vars({ "--d": `${i * -0.7}s` })}>
          <rect
            className="sv-panel"
            x={c.x}
            y={c.y}
            width={c.w}
            height="24"
            rx="6"
          />
          <rect
            className="sv-muted"
            x={c.x + 8}
            y={c.y + 9}
            width={c.w - 16}
            height="6"
            rx="3"
          />
        </g>
      ))}
      <line
        className="sv-stroke-accent"
        x1="170"
        x2="238"
        y1="160"
        y2="160"
        strokeDasharray="4 6"
      />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          className="sv-accent sv-travel"
          cx="170"
          cy="160"
          r="5"
          style={vars({ "--dx": "68px", "--dy": "0px", "--d": `${i * 0.8}s` })}
        />
      ))}
      <rect
        className="sv-panel"
        x="246"
        y="36"
        width="214"
        height="248"
        rx="14"
      />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            className="sv-accent-soft"
            x={260 + i * 66}
            y="52"
            width="58"
            height="40"
            rx="8"
          />
          <rect
            className="sv-accent"
            x={268 + i * 66}
            y="62"
            width="26"
            height="6"
            rx="3"
          />
          <rect
            className="sv-muted"
            x={268 + i * 66}
            y="74"
            width="40"
            height="5"
            rx="2.5"
          />
        </g>
      ))}
      {[0, 1, 2, 3, 4].map((i) => {
        const h = [60, 90, 70, 110, 84][i];
        return (
          <rect
            key={i}
            className="sv-accent sv-bar"
            x={266 + i * 36}
            y={264 - h}
            width="22"
            height={h}
            rx="4"
            style={vars({ "--d": `${i * -0.6}s` })}
          />
        );
      })}
      <line className="sv-stroke-strong" x1="260" x2="446" y1="266" y2="266" />
    </>
  );
}

function Cloud() {
  const slabs = [188, 142, 96, 50];
  return (
    <>
      {slabs.map((y, i) => (
        <g key={y} className="sv-wave" style={vars({ "--d": `${i * 0.35}s` })}>
          <polygon
            className="sv-muted"
            points={`40,${y + 28} 150,${y + 56} 150,${y + 74} 40,${y + 46}`}
          />
          <polygon
            className="sv-panel"
            points={`260,${y + 28} 150,${y + 56} 150,${y + 74} 260,${y + 46}`}
          />
          <polygon
            className={i === 3 ? "sv-accent-soft sv-stroke-accent" : "sv-panel"}
            points={`150,${y} 260,${y + 28} 150,${y + 56} 40,${y + 28}`}
          />
          <circle className="sv-accent" cx="150" cy={y + 28} r="4" />
        </g>
      ))}
      {[
        {
          y: 84,
          icon: "M0 -10l10 4v8c0 6 -4 10 -10 12c-6 -2 -10 -6 -10 -12v-8z",
        },
        { y: 160, icon: "M-8 -6h16m-16 6h16m-16 6h16" },
        { y: 236, icon: "M-10 -4l10 -6l10 6l-10 6zM-10 4l10 6l10 -6" },
      ].map((m, i) => (
        <g key={m.y} transform={`translate(0 ${m.y})`}>
          <circle
            className="sv-panel sv-stroke-strong"
            cx="324"
            cy="0"
            r="18"
          />
          <path
            className="sv-stroke-accent"
            d={m.icon}
            transform="translate(324 0)"
          />
          <rect
            className="sv-muted"
            x="352"
            y="-4"
            width="100"
            height="8"
            rx="4"
          />
          <circle
            className="sv-accent sv-slide"
            cx="360"
            cy="0"
            r="8"
            style={vars({ "--d": `${i * -1.4}s` })}
          />
        </g>
      ))}
    </>
  );
}

const scenes: Record<ServiceId, () => ReactElement> = {
  "custom-software": CustomSoftware,
  "web-platforms": WebPlatforms,
  "mobile-apps": MobileApps,
  integrations: Integrations,
  modernization: Modernization,
  "applied-ai": AppliedAi,
  data: Data,
  cloud: Cloud,
};

export function ServiceVisual({
  id,
  accent,
  className,
}: {
  id: ServiceId;
  accent: ServiceAccent;
  className?: string;
}) {
  const Scene = scenes[id];
  return (
    <div
      className={className ? `sv ${className}` : "sv"}
      data-accent={accent}
      data-scene={id}
      aria-hidden="true"
    >
      <svg viewBox="0 0 480 320" focusable="false">
        <Scene />
      </svg>
    </div>
  );
}
