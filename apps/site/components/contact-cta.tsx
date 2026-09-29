import Link from "next/link";
import { MessageCircle, Sparkles } from "lucide-react";
import { content, Locale } from "@/lib/content";
import { pagePath } from "@/lib/routes";
import { IrisButton } from "./site-shell";

const ctaCopy: Record<Locale, { title: string; text: string }> = {
  "pt-BR": {
    title: "Tem um projeto em mente?",
    text: "Conte o que você precisa. Respondemos com os próximos passos, sem compromisso.",
  },
  en: {
    title: "Have a project in mind?",
    text: "Tell us what you need. We'll reply with next steps, no strings attached.",
  },
  es: {
    title: "¿Tienes un proyecto en mente?",
    text: "Cuéntanos lo que necesitas. Te respondemos con los próximos pasos, sin compromiso.",
  },
};

export function ContactCta({
  locale,
  title,
  text,
  service,
}: {
  locale: Locale;
  title?: string;
  text?: string;
  service?: string;
}) {
  const copy = content[locale];
  return (
    <section className="contact-cta section-pad" aria-labelledby="contact-cta">
      <div>
        <h2 id="contact-cta">{title ?? ctaCopy[locale].title}</h2>
        <p>{text ?? ctaCopy[locale].text}</p>
      </div>
      <div className="contact-cta-actions">
        <Link
          href={`${pagePath(locale, "contact")}${service ? `?servico=${service}` : ""}`}
          className="pill-link"
        >
          {copy.talk}
          <span>
            <MessageCircle aria-hidden="true" />
          </span>
        </Link>
        <IrisButton className="iris-inline">
          <Sparkles aria-hidden="true" />
          {copy.contact.iris}
        </IrisButton>
      </div>
    </section>
  );
}
