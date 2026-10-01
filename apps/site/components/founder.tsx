import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Locale } from "@/lib/content";
import { pagePath } from "@/lib/routes";

const founderCopy = {
  "pt-BR": {
    label: "QUEM ESTÁ POR TRÁS",
    title: "Tecnologia se faz",
    accent: "com gente.",
    role: "Fundador · Engenharia de software",
    intro:
      "Iago Rodrigues une arquitetura de software, desenvolvimento de produtos e liderança técnica para transformar problemas complexos em soluções que fazem sentido no dia a dia.",
    body: "Sua atuação em plataformas web, aplicativos, integrações e engenharia de IA orienta o trabalho da IRTC: entender o negócio, construir com qualidade e acompanhar o que foi entregue.",
    location: "De Belém, Pará, para trabalhar junto com você.",
    alt: "Retrato de Iago Rodrigues, fundador da IRTC",
    link: "Conheça a trajetória do Iago",
  },
  en: {
    label: "THE PERSON BEHIND IRTC",
    title: "Built with technology.",
    accent: "Led by people.",
    role: "Founder · Software engineering",
    intro:
      "Iago Rodrigues brings together software architecture, product development and technical leadership to turn complex problems into practical solutions.",
    body: "His work across web platforms, mobile apps, integrations and AI engineering shapes IRTC’s approach: understand the business, build with care and stay involved after delivery.",
    location: "Based in Belém, Pará. Ready to work alongside you.",
    alt: "Portrait of Iago Rodrigues, founder of IRTC",
    link: "Read Iago's story",
  },
  es: {
    label: "QUIÉN ESTÁ DETRÁS",
    title: "La tecnología empieza",
    accent: "con las personas.",
    role: "Fundador · Ingeniería de software",
    intro:
      "Iago Rodrigues combina arquitectura de software, desarrollo de productos y liderazgo técnico para convertir problemas complejos en soluciones prácticas.",
    body: "Su trabajo en plataformas web, aplicaciones, integraciones e ingeniería de IA guía a IRTC: entender el negocio, construir con calidad y seguir acompañando después de la entrega.",
    location: "Desde Belém, Pará, para trabajar contigo.",
    alt: "Retrato de Iago Rodrigues, fundador de IRTC",
    link: "Conoce la trayectoria de Iago",
  },
};

export function Founder({ locale }: { locale: Locale }) {
  const copy = founderCopy[locale];
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
        <Link href={pagePath(locale, "founder")} className="inline-link">
          {copy.link}
          <ArrowRight aria-hidden="true" />
        </Link>
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
