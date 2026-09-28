import Image from "next/image";
import {
  Cloud,
  Code2,
  Component,
  Database,
  Server,
  Smartphone,
  Terminal,
  Zap,
  type LucideIcon,
} from "lucide-react";

const svgSlugs: Record<string, string> = {
  "Node.js": "nodedotjs",
  "Next.js": "nextdotjs",
  React: "react",
  PostgreSQL: "postgresql",
  Redis: "redis",
  GitHub: "github",
  NestJS: "nestjs",
};

const fallbackIcons: Record<string, LucideIcon> = {
  TypeScript: Code2,
  Python: Terminal,
  AWS: Cloud,
  "Vue.js": Component,
  Django: Server,
  "React Native": Smartphone,
  FastAPI: Zap,
  pgvector: Database,
};

export function ServiceTechTokens({
  technologies,
  label,
}: {
  technologies: string[];
  label: string;
}) {
  return (
    <ul className="service-tech-grid" role="list" aria-label={label}>
      {technologies.map((name) => {
        const slug = svgSlugs[name];
        const Fallback = fallbackIcons[name];
        return (
          <li key={name} className="service-tech-chip">
            {slug ? (
              <span className="service-tech-face">
                <Image
                  src={`/technologies/${slug}.svg`}
                  alt=""
                  width={26}
                  height={26}
                />
              </span>
            ) : Fallback ? (
              <span className="service-tech-face">
                <Fallback aria-hidden="true" />
              </span>
            ) : null}
            <span>{name}</span>
          </li>
        );
      })}
    </ul>
  );
}
