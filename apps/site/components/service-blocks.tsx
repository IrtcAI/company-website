import Image from "next/image";
import {
  Check,
  CircleAlert,
  ClipboardCheck,
  Cloud,
  Gauge,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";
import type { StackId } from "@/lib/services";
import "@/styles/service-visuals.css";
import "@/styles/service-page.css";

const gaugeIcons: LucideIcon[] = [Target, Gauge, ClipboardCheck];

export function ServiceSymptoms({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <section className="sp-section section-pad" data-reveal>
      <h2>{title}</h2>
      <ul className="sp-symptoms">
        {items.map((item) => (
          <li key={item} className="sp-symptom">
            <span className="sp-symptom-mark">
              <CircleAlert aria-hidden="true" />
            </span>
            <p>{item}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ServiceDeliverables({
  title,
  items,
  layout,
}: {
  title: string;
  items: string[];
  layout: "timeline" | "checklist";
}) {
  return (
    <section className="sp-section sp-band section-pad" data-reveal>
      <h2>{title}</h2>
      {layout === "timeline" ? (
        <ol className="sp-timeline">
          {items.map((item, index) => (
            <li key={item} className="sp-step">
              <span className="sp-step-num" aria-hidden="true">
                {index + 1}
              </span>
              <p>{item}</p>
            </li>
          ))}
        </ol>
      ) : (
        <ul className="sp-checklist">
          {items.map((item) => (
            <li key={item} className="sp-check">
              <span className="sp-check-mark">
                <Check aria-hidden="true" />
              </span>
              <p>{item}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function ServiceMeasure({
  title,
  items,
  note,
  from,
  to,
}: {
  title: string;
  items: string[];
  note: string;
  from: string;
  to: string;
}) {
  return (
    <section className="sp-section section-pad" data-reveal>
      <h2>{title}</h2>
      <ul className="sp-gauges">
        {items.map((item, index) => {
          const Icon = gaugeIcons[index % gaugeIcons.length];
          return (
            <li key={item} className="sp-gauge">
              <span className="sp-gauge-icon">
                <Icon aria-hidden="true" />
              </span>
              <p>{item}</p>
              <div className="sp-track" aria-hidden="true">
                <span className="sp-track-line">
                  <i />
                </span>
                <span className="sp-track-labels">
                  <span>{from}</span>
                  <span>{to}</span>
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="service-measure-note">{note}</p>
    </section>
  );
}

const stackFaces: Record<StackId, () => React.ReactNode> = {
  aws: () => <Cloud aria-hidden="true" />,
  bedrock: () => <Sparkles aria-hidden="true" />,
  mcp: () => (
    <Image
      src="/technologies/modelcontextprotocol.svg"
      alt=""
      width={28}
      height={28}
    />
  ),
};

export function ServiceStack({
  title,
  ids,
  labels,
  note,
}: {
  title: string;
  ids: StackId[];
  labels: Record<StackId, { name: string; role: string }>;
  note: string;
}) {
  return (
    <section className="sp-section section-pad" data-reveal>
      <h2>{title}</h2>
      <ul className="sp-stack">
        {ids.map((id) => (
          <li key={id} className="sp-stack-card">
            <span className="sp-stack-face">{stackFaces[id]()}</span>
            <div>
              <h3>{labels[id].name}</h3>
              <p>{labels[id].role}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="sp-stack-note">{note}</p>
    </section>
  );
}

export function ServiceHow({
  title,
  points,
}: {
  title: string;
  points: { title: string; text: string }[];
}) {
  return (
    <section className="sp-section sp-band section-pad" data-reveal>
      <h2>{title}</h2>
      <ol className="sp-how">
        {points.map((point, index) => (
          <li key={point.title}>
            <span className="sp-how-num" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{point.title}</h3>
            <p>{point.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
