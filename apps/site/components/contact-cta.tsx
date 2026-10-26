import Link from "next/link";
import { MessageCircle, Sparkles } from "lucide-react";
import { content, Locale } from "@/lib/content";
import { pagePath } from "@/lib/routes";
import { IrisButton } from "./site-shell";

export function ContactCta({
  locale,
  title,
  text,
  action,
  irisLabel,
  service,
}: {
  locale: Locale;
  title?: string;
  text?: string;
  action?: string;
  irisLabel?: string;
  service?: string;
}) {
  const copy = content[locale];
  return (
    <section className="contact-cta section-pad" aria-labelledby="contact-cta">
      <div>
        <h2 id="contact-cta">{title ?? copy.solutions.cta.title}</h2>
        <p>{text ?? copy.solutions.cta.text}</p>
      </div>
      <div className="contact-cta-actions">
        <Link
          href={`${pagePath(locale, "contact")}${service ? `?servico=${service}` : ""}`}
          className="pill-link"
        >
          {action ?? copy.talk}
          <span>
            <MessageCircle aria-hidden="true" />
          </span>
        </Link>
        <IrisButton className="iris-inline">
          <Sparkles aria-hidden="true" />
          {irisLabel ?? copy.contact.iris}
        </IrisButton>
      </div>
    </section>
  );
}
