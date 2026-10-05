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
    role: "Founder & Principal Engineer",
    intro:
      "Iago Rodrigues é o fundador da IRTC e atua como Founder & Principal Engineer. Sua trajetória em desenvolvimento, arquitetura e liderança técnica participa do trabalho da empresa.",
    body: "A IRTC organiza o trabalho em Cloud Engineering, Software Engineering e AI Engineering.",
    location: "Em Belém, Pará, com atendimento remoto.",
    alt: "Retrato de Iago Rodrigues, fundador da IRTC",
    link: "Conheça a trajetória do Iago",
  },
  en: {
    label: "THE PERSON BEHIND IRTC",
    title: "Built with technology.",
    accent: "Led by people.",
    role: "Founder & Principal Engineer",
    intro:
      "Iago Rodrigues is the founder of IRTC and works as Founder & Principal Engineer. His background in development, architecture and technical leadership is part of the company's work.",
    body: "IRTC organizes its work in Cloud Engineering, Software Engineering and AI Engineering.",
    location: "Based in Belém, Pará, serving clients remotely.",
    alt: "Portrait of Iago Rodrigues, founder of IRTC",
    link: "Read Iago's story",
  },
  es: {
    label: "QUIÉN ESTÁ DETRÁS",
    title: "La tecnología empieza",
    accent: "con las personas.",
    role: "Founder & Principal Engineer",
    intro:
      "Iago Rodrigues es el fundador de IRTC y trabaja como Founder & Principal Engineer. Su trayectoria en desarrollo, arquitectura y liderazgo técnico forma parte del trabajo de la empresa.",
    body: "IRTC organiza su trabajo en Cloud Engineering, Software Engineering y AI Engineering.",
    location: "En Belém, Pará, con atención remota.",
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
