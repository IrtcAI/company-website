import {
  BriefcaseBusiness,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { addressLines, company, openingHours } from "@/lib/company";
import { content, Locale } from "@/lib/content";
import { services } from "@/lib/services";
import { ContactForm } from "./contact-form";
import { IrisButton } from "./shell-provider";

export function ContactSection({ locale }: { locale: Locale }) {
  const copy = content[locale].contact;
  const hours = openingHours(locale);

  return (
    <section
      className="contact contact-page section-pad"
      id="contato"
      tabIndex={-1}
    >
      <div className="contact-intro">
        <p className="overline">{copy.label}</p>
        <h1>
          {copy.title}
          <br />
          <span>{copy.accent}</span>
        </h1>
        <p>{copy.intro}</p>
        <div className="contact-iris" aria-labelledby="contact-iris-title">
          <Sparkles className="contact-iris-spark" aria-hidden="true" />
          <h2 id="contact-iris-title">{copy.irisTitle}</h2>
          <p>{copy.irisText}</p>
          <IrisButton className="pill-link">
            {copy.irisAction}
            <span>
              <MessageCircle aria-hidden="true" />
            </span>
          </IrisButton>
        </div>
        <div className="contact-channels">
          <h2>{copy.channels}</h2>
          <ul>
            <li>
              <Mail aria-hidden="true" />
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
            <li>
              <MapPin aria-hidden="true" />
              <address>
                {addressLines(locale).map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </li>
            <li>
              <Clock3 aria-hidden="true" />
              <p>
                <span>{hours.weekdays}</span>
                <span>{hours.weekend}</span>
              </p>
            </li>
            {company.socials.map((social) => (
              <li key={social.name}>
                <BriefcaseBusiness aria-hidden="true" />
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.name} · {social.handle}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ContactForm
        copy={copy}
        topics={services.map((service) => ({
          id: service.id,
          title: service.copy[locale].title,
        }))}
      />
    </section>
  );
}
