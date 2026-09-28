"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createContext,
  MouseEvent,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowUp,
  BriefcaseBusiness,
  Clock3,
  Globe2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Sparkles,
  SunMoon,
} from "lucide-react";
import { content, Locale } from "@/lib/content";
import { addressLines, company, openingHours } from "@/lib/company";
import { Page, pageAlternates, pagePath, sectionPath } from "@/lib/routes";
import { services } from "@/lib/services";
import { AccessibilityToolbar } from "./accessibility-toolbar";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const Iris = dynamic(() => import("./iris"));

type Shell = {
  locale: Locale;
  paused: boolean;
  setPaused: (paused: boolean) => void;
  openIris: (event: MouseEvent<HTMLElement>) => void;
};

const ShellContext = createContext<Shell>({
  locale: "pt-BR",
  paused: false,
  setPaused: () => {},
  openIris: () => {},
});

export function useShell() {
  return useContext(ShellContext);
}

export function IrisButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { openIris } = useShell();
  return (
    <button type="button" className={className} onClick={openIris}>
      {children}
    </button>
  );
}

function backToTop(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "instant"
    : "smooth";
  window.scrollTo({ top: 0, behavior });
  document.getElementById("conteudo")?.focus({ preventScroll: true });
}

function scrollToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
  const destination = document.getElementById(id);
  if (!destination) return;

  event.preventDefault();
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "instant"
    : "smooth";
  destination.scrollIntoView({ behavior });
  destination.focus({ preventScroll: true });
  event.currentTarget.closest("details")?.removeAttribute("open");
}

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
  const router = useRouter();

  const [paused, setPaused] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [theme, setTheme] = useState("system");
  const [chatOpen, setChatOpen] = useState(false);

  const launcher = useRef<HTMLButtonElement>(null);
  const chatTrigger = useRef<HTMLElement | null>(null);

  const languages = alternates ?? pageAlternates(page);
  const nav = [
    {
      label: copy.nav[0],
      href: pagePath(locale, "services"),
      page: "services",
    },
    {
      label: copy.nav[1],
      href: sectionPath(locale, "projetos"),
      section: "projetos",
    },
    { label: copy.nav[2], href: pagePath(locale, "about"), page: "about" },
  ];

  useIsomorphicLayoutEffect(() => {
    setTheme(document.documentElement.dataset.theme || "system");
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;

    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            reveal.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => reveal.observe(element));

    const visible = new Map<string, number>();
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          visible.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          ),
        );
        const [current] = [...visible.entries()]
          .filter(([, ratio]) => ratio > 0)
          .sort((first, second) => second[1] - first[1]);
        setActiveSection(current?.[0] ?? null);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.01, 1] },
    );
    ["servicos", "projetos"].forEach((id) => {
      const section = document.getElementById(id);
      if (section) spy.observe(section);
    });

    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      reveal.disconnect();
      spy.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [locale]);

  function changeTheme(value: string) {
    setTheme(value);
    document.documentElement.dataset.theme = value;
    try {
      localStorage.setItem("irtc-theme", value);
    } catch {}
  }

  function changeLanguage(value: Locale) {
    document.cookie = `irtc-locale=${value}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    router.push(languages[value], { scroll: false });
  }

  function openIris(event: MouseEvent<HTMLElement>) {
    chatTrigger.current = event.currentTarget;
    setChatOpen(true);
  }

  function current(item: (typeof nav)[number]) {
    if (item.page === page) return "page";
    if (page === "home" && item.section === activeSection) return "location";
    if (
      page === "home" &&
      item.page === "services" &&
      activeSection === "servicos"
    )
      return "location";
    return undefined;
  }

  function navLink(item: (typeof nav)[number]) {
    return (
      <Link
        key={item.href}
        href={item.href}
        prefetch={false}
        aria-current={current(item)}
        onClick={
          item.section && page === "home"
            ? (event) => scrollToSection(event, item.section!)
            : undefined
        }
      >
        {item.label}
      </Link>
    );
  }

  const home = pagePath(locale, "home");
  const contact = pagePath(locale, "contact");
  const hours = openingHours(locale);
  const companyLinks = [
    { label: copy.footer.links[0], href: pagePath(locale, "about") },
    { label: copy.footer.links[1], href: pagePath(locale, "founder") },
    { label: copy.footer.links[2], href: sectionPath(locale, "projetos") },
    { label: copy.footer.links[3], href: contact },
  ];

  return (
    <ShellContext.Provider value={{ locale, paused, setPaused, openIris }}>
      <div className={paused ? "site motion-paused" : "site"}>
        <a href="#conteudo" className="skip-link">
          {copy.skip}
        </a>
        <header className="site-header" data-stuck={stuck || page !== "home"}>
          <Link href={home} className="brand" aria-label={copy.home}>
            irtc<span aria-hidden="true">✳</span>
          </Link>
          <nav aria-label={copy.menu}>{nav.map(navLink)}</nav>
          <div className="site-preferences">
            <label className="preference">
              <Globe2 aria-hidden="true" />
              <span className="sr-only">{copy.language}</span>
              <select
                value={locale}
                onChange={(event) =>
                  changeLanguage(event.target.value as Locale)
                }
              >
                <option value="pt-BR">PT-BR</option>
                <option value="en">EN</option>
                <option value="es">ES</option>
              </select>
            </label>
            <label className="preference">
              <SunMoon aria-hidden="true" />
              <span className="sr-only">{copy.theme}</span>
              <select
                value={theme}
                onChange={(event) => changeTheme(event.target.value)}
              >
                {["system", "light", "dark"].map((value, index) => (
                  <option key={value} value={value}>
                    {copy.themes[index]}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <Link
            href={contact}
            className="pill-link header-cta"
            aria-current={page === "contact" ? "page" : undefined}
          >
            {copy.talk}
            <span>
              <MessageCircle aria-hidden="true" />
            </span>
          </Link>
          <details className="mobile-menu">
            <summary aria-label={copy.menu}>
              <Menu aria-hidden="true" />
            </summary>
            <nav aria-label={copy.menu}>
              {nav.map(navLink)}
              <Link
                href={contact}
                aria-current={page === "contact" ? "page" : undefined}
              >
                {copy.talk}
              </Link>
            </nav>
          </details>
        </header>
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
                  <button type="button" onClick={openIris}>
                    {copy.footer.links[4]}
                  </button>
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
            <span className="footer-asterisk" aria-hidden="true">
              ✳
            </span>
          </Link>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} IRTC</span>
            <span>{copy.footer.signature}</span>
            <a href="#conteudo" onClick={backToTop}>
              {copy.footer.top}
              <ArrowUp aria-hidden="true" />
            </a>
          </div>
        </footer>
        <AccessibilityToolbar
          locale={locale}
          paused={paused}
          onPausedChange={setPaused}
        />
        <button
          ref={launcher}
          className="iris-launcher"
          onClick={openIris}
          aria-haspopup="dialog"
          aria-expanded={chatOpen}
        >
          <Sparkles className="iris-spark" aria-hidden="true" />
          <span>{copy.iris.launcher}</span>
          <MessageCircle aria-hidden="true" />
        </button>
        {chatOpen ? (
          <Iris
            locale={locale}
            onClose={() => {
              setChatOpen(false);
              (chatTrigger.current || launcher.current)?.focus();
            }}
          />
        ) : null}
      </div>
    </ShellContext.Provider>
  );
}
