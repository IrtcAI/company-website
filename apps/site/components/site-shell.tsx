import Link from "next/link";
import { ReactNode } from "react";
import { ArrowUp, BriefcaseBusiness, Clock3, Mail, MapPin } from "lucide-react";
import { content, Locale } from "@/lib/content";
import { addressLines, company, openingHours } from "@/lib/company";
import { Page, pageAlternates, pagePath, sectionPath } from "@/lib/routes";
import { services } from "@/lib/services";
import { ConsentSettings } from "./analytics-consent";
import { SiteHeader } from "./site-header";
import { BackToTop, IrisButton, ShellProvider } from "./shell-provider";

export { IrisButton, useShell } from "./shell-provider";

export function SiteShell({
  locale,
  page,
  alternates,
  children,
}: {
  locale: Locale;
  page: Page;
  alternates?: Record<Locale, string>;
  children: ReactNode;
}) {
  const copy = content[locale];

  const home = pagePath(locale, "home");
  const contact = pagePath(locale, "contact");
  const servicesIndex = pagePath(locale, "services");
  const hours = openingHours(locale);
  const serviceLinks = services.map((service) => ({
    title: service.copy[locale].title,
    summary: service.copy[locale].summary,
    icon: service.icon,
    href: pagePath(locale, "services", service.copy[locale].slug),
  }));
  const companyLinks = [
    { label: copy.footer.links[0], href: pagePath(locale, "about") },
    { label: copy.footer.links[1], href: pagePath(locale, "founder") },
    { label: copy.footer.links[2], href: sectionPath(locale, "projetos") },
    { label: copy.footer.links[3], href: contact },
  ];

  return (
    <ShellProvider
      locale={locale}
      launcherLabel={copy.iris.launcher}
      consent={copy.footer.consent}
      toastLabels={copy.toast}
      accessibilityLabels={copy.accessibility}
    >
      <a href="#conteudo" className="skip-link">
        {copy.skip}
      </a>
      <SiteHeader
        locale={locale}
        page={page}
        home={home}
        contact={contact}
        languages={alternates ?? pageAlternates(page)}
        nav={[
          {
            label: copy.nav[0],
            href: sectionPath(locale, "servicos"),
            page: "services",
            section: "servicos",
          },
          {
            label: copy.nav[1],
            href: sectionPath(locale, "projetos"),
            section: "projetos",
          },
          {
            label: copy.nav[2],
            href: pagePath(locale, "about"),
            page: "about",
          },
        ]}
        servicesMenu={{
          items: serviceLinks,
          allHref: servicesIndex,
          allLabel: copy.solutions.allServices,
          toggleLabel: copy.navServicesToggle,
        }}
        labels={{
          home: copy.home,
          menu: copy.menu,
          language: copy.language,
          theme: copy.theme,
          themes: copy.themes,
          talk: copy.talk,
        }}
      />
      <main id="conteudo" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <Link href={contact} className="footer-invitation">
            {copy.footer.title}
            <br />
            <span>{copy.footer.accent}</span>
          </Link>
        </div>
        <div className="footer-columns">
          <nav className="footer-column" aria-labelledby="footer-services">
            <h2 id="footer-services">{copy.footer.services}</h2>
            <ul>
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={pagePath(
                      locale,
                      "services",
                      service.copy[locale].slug,
                    )}
                    prefetch={false}
                  >
                    {service.copy[locale].title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="footer-column" aria-labelledby="footer-company">
            <h2 id="footer-company">{copy.footer.company}</h2>
            <ul>
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} prefetch={false}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <IrisButton>{copy.footer.links[4]}</IrisButton>
              </li>
            </ul>
          </nav>
          <div className="footer-column">
            <h2>{copy.footer.contact}</h2>
            <ul className="footer-details">
              <li>
                <Mail aria-hidden="true" />
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
              <li>
                <MapPin aria-hidden="true" />
                <address>
                  <span className="sr-only">{copy.footer.address}: </span>
                  {addressLines(locale).map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
              </li>
              <li>
                <Clock3 aria-hidden="true" />
                <p>
                  <span className="sr-only">{copy.footer.hours}: </span>
                  <span>{hours.weekdays}</span>
                  <span>{hours.weekend}</span>
                </p>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h2>{copy.footer.socials}</h2>
            <ul className="footer-details">
              {company.socials.map((social) => (
                <li key={social.name}>
                  <BriefcaseBusiness aria-hidden="true" />
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.name}
                    <small>{social.handle}</small>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Link href={home} className="footer-wordmark" aria-label={copy.home}>
          irtc
        </Link>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} IRTC</span>
          <span>{copy.footer.signature}</span>
          <ConsentSettings>{copy.footer.cookies}</ConsentSettings>
          <BackToTop>
            {copy.footer.top}
            <ArrowUp aria-hidden="true" />
          </BackToTop>
        </div>
      </footer>
    </ShellProvider>
  );
}
