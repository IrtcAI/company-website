import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { company } from "@/lib/company";
import { Locale } from "@/lib/content";
import { founderSectionCopy } from "@/lib/copy/founder";
import { pagePath } from "@/lib/routes";

export function Founder({ locale }: { locale: Locale }) {
  const copy = founderSectionCopy[locale];
  return (
    <section className="founder section-pad" aria-labelledby="founder-title">
      <div className="founder-copy">
        <p className="overline">{copy.label}</p>
        <h2 id="founder-title">
          {copy.title}
          <br />
          <span>{copy.accent}</span>
        </h2>
        <p className="founder-intro">{copy.intro}</p>
        <p>{copy.body}</p>
        <p className="founder-location">
          <span aria-hidden="true">✳</span>
          {copy.location}
        </p>
        <div className="founder-links">
          <Link href={pagePath(locale, "founder")} className="inline-link">
            {copy.link}
            <ArrowRight aria-hidden="true" />
          </Link>
          <a
            href={company.founder.linkedin}
            className="inline-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {copy.linkedin}
            <ExternalLink aria-hidden="true" />
            <span className="sr-only"> ({copy.newTab})</span>
          </a>
        </div>
      </div>
      <figure className="founder-portrait">
        <div className="founder-blueprint" aria-hidden="true">
          <span className="founder-blueprint-code">&lt;/&gt;</span>
          <span className="founder-blueprint-coordinate">
            01°27′ S · 48°30′ W
          </span>
          <span className="founder-blueprint-node" />
        </div>
        <div className="founder-photo">
          <Image
            src="/founder.webp"
            alt={copy.alt}
            width={640}
            height={640}
            sizes="(max-width: 767px) 90vw, 480px"
            loading="lazy"
          />
          <span className="founder-stamp" aria-hidden="true">
            irtc
          </span>
        </div>
        <figcaption>
          <strong>Iago Rodrigues</strong>
          <span>{copy.role}</span>
        </figcaption>
      </figure>
    </section>
  );
}
