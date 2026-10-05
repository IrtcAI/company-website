import Link from "next/link";
import { ArrowUpRight, Cloud, Code2, RefreshCw, Sparkles } from "lucide-react";
import type { content } from "@/lib/content";

type Solutions = (typeof content)["pt-BR"]["solutions"];

const icons = [Cloud, Code2, Sparkles];

export function HomePillars({ copy, href }: { copy: Solutions; href: string }) {
  return (
    <div className="pillars">
      <div className="pillars-grid">
        {copy.pillars.map((pillar, index) => {
          const Icon = icons[index];
          return (
            <article className="pillar-card" key={pillar.name} data-reveal>
              <span className="pillar-icon">
                <Icon aria-hidden="true" />
              </span>
              <h3>{pillar.name}</h3>
              <p>{pillar.text}</p>
            </article>
          );
        })}
      </div>
      <article className="pillar-card pillar-continuity" data-reveal>
        <span className="pillar-icon">
          <RefreshCw aria-hidden="true" />
        </span>
        <div>
          <p className="pillar-kicker">{copy.continuity.label}</p>
          <h3>{copy.continuity.name}</h3>
          <p>{copy.continuity.text}</p>
        </div>
      </article>
      <Link href={href} className="inline-link services-all-link">
        {copy.allServices}
        <ArrowUpRight aria-hidden="true" />
      </Link>
    </div>
  );
}
