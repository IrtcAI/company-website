"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FormEvent,
  MouseEvent,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowDown,
  ArrowUp,
  BriefcaseBusiness,
  Camera,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Cloud,
  Code2,
  CodeXml,
  Database,
  ExternalLink,
  Globe2,
  Layers3,
  Mail,
  Menu,
  MessageCircle,
  Monitor,
  Network,
  Pause,
  Play,
  Plus,
  Send,
  Sparkles,
  SunMoon,
} from "lucide-react";
import {
  content,
  Locale,
  projectBrands,
  recommendationAuthors,
} from "@/lib/content";
import { HeroWorld } from "./hero-world";
import { ScrollStory } from "./scroll-story";
import { Founder } from "./founder";
import { AccessibilityToolbar } from "./accessibility-toolbar";
import { DevelopmentWorld } from "./development-world";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;
const Iris = dynamic(() => import("./iris"));
const sectionIds = ["manifesto", "solucoes", "projetos", "depoimentos"];
const techNames = [
  "Node.js",
  "Next.js",
  "React",
  "PostgreSQL",
  "Redis",
  "AWS",
  "GitHub",
  "NestJS",
];
const techSlugs = [
  "nodedotjs",
  "nextdotjs",
  "react",
  "postgresql",
  "redis",
  "amazonwebservices",
  "github",
  "nestjs",
];
const serviceIcons = [Layers3, Network, Sparkles, Database];
const footerSocials = [
  { name: "LinkedIn", Icon: BriefcaseBusiness },
  { name: "Instagram", Icon: Camera },
  { name: "GitHub", Icon: CodeXml },
];

function SectionLink({
  target,
  children,
  className,
  label,
}: {
  target: string;
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  function navigate(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const destination = document.getElementById(target);
    if (!destination) return;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "instant"
      : "smooth";
    const story = destination.hasAttribute("data-scroll-stage")
      ? destination.closest<HTMLElement>('.intro-story[data-enhanced="true"]')
      : null;
    if (story)
      window.scrollTo({
        top: story.offsetTop + story.offsetHeight - window.innerHeight,
        behavior,
      });
    else destination.scrollIntoView({ behavior });
    destination.focus({ preventScroll: true });
    event.currentTarget.closest("details")?.removeAttribute("open");
  }
  return (
    <Link
      href="/"
      prefetch={false}
      onClick={navigate}
      className={className}
      aria-label={label}
    >
      {children}
    </Link>
  );
}

function TypedHeadline({
  paused,
  words,
}: {
  paused: boolean;
  words: string[];
}) {
  const [word, setWord] = useState(words[0]);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let index = 0;
    let length = words[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (paused || reduced.matches) return;
      const current = words[index];
      length += deleting ? -1 : 1;
      setWord(current.slice(0, length));
      let delay = deleting ? 32 : 85;
      if (length === 0) {
        index = (index + 1) % words.length;
        deleting = false;
        delay = 220;
      } else if (length === current.length) {
        deleting = true;
        delay = 2300;
      }
      timer = setTimeout(tick, delay);
    };
    const restart = () => {
      clearTimeout(timer);
      timer = setTimeout(tick, 6000);
    };
    restart();
    reduced.addEventListener("change", restart);
    return () => {
      clearTimeout(timer);
      reduced.removeEventListener("change", restart);
    };
  }, [paused, words]);
  return (
    <span className="typed-line" aria-hidden="true">
      {word}
      <span className="typing-caret" />
    </span>
  );
}

export function SiteExperience({ locale = "pt-BR" }: { locale?: Locale }) {
  const copy = content[locale];
  const router = useRouter();
  const [paused, setPaused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("system");
  const [chatOpen, setChatOpen] = useState(false);
  const [recommendation, setRecommendation] = useState(0);
  const [project, setProject] = useState(0);
  const [technology, setTechnology] = useState(0);
  const [openSolution, setOpenSolution] = useState<number | null>(null);
  const [contactState, setContactState] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const launcher = useRef<HTMLButtonElement>(null);
  const chatTrigger = useRef<HTMLElement | null>(null);
  const currentProject = {
    ...projectBrands[project],
    ...copy.projects.cases[project],
  };
  const author = recommendationAuthors[recommendation];

  useIsomorphicLayoutEffect(() => {
    setTheme(document.documentElement.dataset.theme || "system");
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => observer.observe(element));
    const top = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting),
    );
    const start = document.getElementById("inicio");
    if (start) top.observe(start);
    return () => {
      observer.disconnect();
      top.disconnect();
    };
  }, [locale]);

  function changeTheme(value: string) {
    setTheme(value);
    document.documentElement.dataset.theme = value;
    try {
      localStorage.setItem("irtc-theme", value);
    } catch {}
  }
  function changeLanguage(value: string) {
    document.cookie = `irtc-locale=${value}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    router.push(value === "pt-BR" ? "/" : `/${value}`, { scroll: false });
  }
  function openChat(event: MouseEvent<HTMLButtonElement>) {
    chatTrigger.current = event.currentTarget;
    setChatOpen(true);
  }
  async function sendContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setContactState("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw new Error();
      setContactState("sent");
      form.reset();
    } catch {
      setContactState("error");
    }
  }

  return (
    <div className={paused ? "site motion-paused" : "site"}>
      <SectionLink target="conteudo" className="skip-link">
        {copy.skip}
      </SectionLink>
      <header className="site-header">
        <SectionLink target="inicio" className="brand" label={copy.home}>
          irtc<span aria-hidden="true">✳</span>
        </SectionLink>
        <nav aria-label={copy.menu}>
          {sectionIds.map((id, index) => (
            <SectionLink key={id} target={id}>
              {copy.nav[index]}
            </SectionLink>
          ))}
        </nav>
        <div className="site-preferences">
          <label className="preference">
            <Globe2 aria-hidden="true" />
            <span className="sr-only">{copy.language}</span>
            <select
              value={locale}
              onChange={(event) => changeLanguage(event.target.value)}
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
        <SectionLink target="contato" className="pill-link header-cta">
          {copy.talk}
          <span>
            <MessageCircle aria-hidden="true" />
          </span>
        </SectionLink>
        <details className="mobile-menu">
          <summary aria-label={copy.menu}>
            <Menu aria-hidden="true" />
          </summary>
          <nav aria-label={copy.menu}>
            {sectionIds.map((id, index) => (
              <SectionLink key={id} target={id}>
                {copy.nav[index]}
              </SectionLink>
            ))}
            <SectionLink target="contato">{copy.talk}</SectionLink>
          </nav>
        </details>
      </header>
      <main id="conteudo" tabIndex={-1}>
        <ScrollStory locale={locale} paused={paused}>
          <section
            className="hero"
            id="inicio"
            tabIndex={-1}
            aria-labelledby="hero-title"
          >
            <HeroWorld paused={paused} />
            <div className="hero-content">
              <p className="eyebrow">
                <span />
                {copy.hero.eyebrow}
              </p>
              <h1 id="hero-title">
                <span>{copy.hero.title}</span>
                <TypedHeadline
                  key={locale}
                  paused={paused}
                  words={copy.hero.words}
                />
                <span className="sr-only">{copy.hero.words.join(" ")}</span>
              </h1>
              <p className="hero-description">{copy.hero.description}</p>
              <SectionLink target="contato" className="hero-start">
                {copy.hero.cta}
                <span>
                  <MessageCircle aria-hidden="true" />
                </span>
              </SectionLink>
            </div>
            <div className="hero-bottom">
              <span>{copy.hero.label}</span>
              <SectionLink
                target="manifesto"
                className="scroll-cue"
                label={copy.hero.explore}
              >
                <ArrowDown aria-hidden="true" />
              </SectionLink>
              <button
                className="motion-toggle"
                aria-pressed={paused}
                onClick={() => setPaused(!paused)}
              >
                {paused ? (
                  <Play aria-hidden="true" />
                ) : (
                  <Pause aria-hidden="true" />
                )}
                {paused ? copy.hero.play : copy.hero.pause}
              </button>
            </div>
          </section>
        </ScrollStory>
        <section className="solutions section-pad" id="solucoes" tabIndex={-1}>
          <DevelopmentWorld paused={paused} />
          <div className="section-label">
            <span>{copy.solutions.label}</span>
            <span>{copy.solutions.aside}</span>
          </div>
          <div className="solution-heading">
            <h2 data-reveal>
              {copy.solutions.title}
              <br />
              <span>{copy.solutions.accent}</span>
            </h2>
          </div>
          <div className="solution-list">
            {copy.solutions.items.map((item, index) => {
              const Icon = serviceIcons[index];
              return (
                <article
                  key={item.title}
                  className="solution-item"
                  data-open={openSolution === index}
                >
                  <button
                    className="solution-trigger"
                    aria-expanded={openSolution === index}
                    aria-controls={`solution-panel-${index}`}
                    id={`solution-trigger-${index}`}
                    onClick={() =>
                      setOpenSolution(openSolution === index ? null : index)
                    }
                  >
                    <span
                      className={`solution-icon ${["product", "systems", "ai", "data"][index]}`}
                    >
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="solution-text">
                      <span className="solution-name">{item.title}</span>
                      <span>{item.tags}</span>
                      <span className="solution-intro">{item.intro}</span>
                    </span>
                    <Plus className="solution-expand" aria-hidden="true" />
                  </button>
                  <div
                    className="solution-panel"
                    data-open={openSolution === index}
                    id={`solution-panel-${index}`}
                    role="region"
                    aria-labelledby={`solution-trigger-${index}`}
                    aria-hidden={openSolution !== index}
                  >
                    <div className="solution-expanded">
                      <p>{item.text}</p>
                      <ul>
                        {item.deliverables.map((deliverable) => (
                          <li key={deliverable}>
                            <CircleCheck aria-hidden="true" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="tech-playground">
            <div>
              <h3>{copy.solutions.techTitle}</h3>
              <p>{copy.solutions.techIntro}</p>
            </div>
            <div
              className="tech-tokens"
              role="group"
              aria-label={copy.solutions.techHint}
            >
              {techNames.map((name, index) => (
                <button
                  key={name}
                  className={`tech-token token-${index}`}
                  aria-pressed={technology === index}
                  onClick={() => setTechnology(index)}
                >
                  <span className="tech-token-face">
                    {index === 5 ? (
                      <Cloud aria-hidden="true" />
                    ) : (
                      <Image
                        src={`/technologies/${techSlugs[index]}.svg`}
                        alt=""
                        width={40}
                        height={40}
                      />
                    )}
                  </span>
                  <span>{name}</span>
                </button>
              ))}
            </div>
            <div className="tech-explainer" aria-live="polite">
              <Code2 aria-hidden="true" />
              <p>
                <strong>{techNames[technology]}</strong>
                {copy.solutions.techDescriptions[technology]}
              </p>
            </div>
            <p className="tech-extra">
              TypeScript · Python · Django · React Native
              / ELT
            </p>
          </div>
        </section>
        <section className="client-strip" aria-label={copy.clients}>
          <p>{copy.clients}</p>
          <div className="client-names">
            {projectBrands.map((brand) => (
              <a
                key={brand.name}
                href={brand.url}
                target="_blank"
                rel="noreferrer"
                className={`brand-logo ${brand.theme}`}
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={180}
                  height={52}
                />
              </a>
            ))}
          </div>
        </section>
        <div className="object-run">
          <DevelopmentWorld paused={paused} kind="database" />
          <section className="projects section-pad" id="projetos" tabIndex={-1}>
            <div className="section-label">
              <span>{copy.projects.label}</span>
              <span>{copy.projects.aside}</span>
            </div>
            <div className="section-title-row" data-reveal>
              <h2>
                {copy.projects.title}
                <br />
                <span>{copy.projects.accent}</span>
              </h2>
              <p>{copy.projects.intro}</p>
            </div>
            <div
              className="project-selector"
              role="group"
              aria-label={copy.projects.choose}
            >
              {projectBrands.map((item, index) => (
                <button
                  key={item.name}
                  aria-pressed={project === index}
                  onClick={() => setProject(index)}
                >
                  <span>0{index + 1}</span>
                  {item.name}
                  <span className="selected-indicator">
                    {project === index ? (
                      <CircleCheck aria-hidden="true" />
                    ) : (
                      <Plus aria-hidden="true" />
                    )}
                  </span>
                </button>
              ))}
            </div>
            <article className="project-feature" key={currentProject.name}>
              <div className={`project-visual ${currentProject.theme}`}>
                <div className="project-orb" aria-hidden="true" />
                <a
                  className="product-window real-product"
                  href={currentProject.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${copy.projects.visit}: ${currentProject.name} (${new URL(currentProject.url).hostname})`}
                >
                  <div className="window-bar" aria-hidden="true">
                    <span className="window-dots">● ● ●</span>
                    <span>{new URL(currentProject.url).hostname}</span>
                    <ExternalLink />
                  </div>
                  <div className="real-product-content">
                    <Image
                      src={currentProject.image}
                      alt={`${currentProject.name} — ${currentProject.category}`}
                      width={900}
                      height={620}
                      sizes="(max-width: 760px) 90vw, 48vw"
                    />
                  </div>
                </a>
              </div>
              <div className="project-info">
                <p className="overline">{currentProject.category}</p>
                <h3>{currentProject.title}</h3>
                <p>{currentProject.description}</p>
                <div className="project-result">
                  <strong>{currentProject.metric}</strong>
                  <span>{currentProject.result}</span>
                </div>
                <p className="project-stack">{currentProject.stack}</p>
                <details className="project-details">
                  <summary>
                    {copy.projects.details}
                    <Plus aria-hidden="true" />
                  </summary>
                  <p>{currentProject.detail}</p>
                  <a href={currentProject.url} target="_blank" rel="noreferrer">
                    {copy.projects.visit}
                    <ExternalLink aria-hidden="true" />
                  </a>
                </details>
              </div>
            </article>
            <p className="project-source">{copy.projects.source}</p>
          </section>
          <section
            className="testimonials section-pad"
            id="depoimentos"
            tabIndex={-1}
          >
            <div className="section-label">
              <span>{copy.testimonials.label}</span>
            </div>
            <div className="testimonial-layout">
              <div>
                <h2 data-reveal>
                  {copy.testimonials.title}
                  <br />
                  <span>{copy.testimonials.accent}</span>
                </h2>
                <p>{copy.testimonials.intro}</p>
                <div className="testimonial-controls">
                  <button
                    aria-label={copy.testimonials.previous}
                    onClick={() =>
                      setRecommendation(
                        (recommendation + recommendationAuthors.length - 1) %
                          recommendationAuthors.length,
                      )
                    }
                  >
                    <ChevronLeft aria-hidden="true" />
                  </button>
                  <span>
                    0{recommendation + 1} / 0{recommendationAuthors.length}
                  </span>
                  <button
                    aria-label={copy.testimonials.next}
                    onClick={() =>
                      setRecommendation(
                        (recommendation + 1) % recommendationAuthors.length,
                      )
                    }
                  >
                    <ChevronRight aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div aria-live="polite" aria-atomic="true">
                <figure
                  className={`quote-card ${recommendation % 2 ? "peach" : "mint"}`}
                  key={author.name}
                >
                  <MessageCircle className="quote-symbol" aria-hidden="true" />
                  <p className="recommendation-summary">
                    {copy.testimonials.summaries[recommendation]}
                  </p>
                  <figcaption>
                    <span className="quote-avatar" aria-hidden="true">
                      {author.initials}
                    </span>
                    <span>
                      <strong>{author.name}</strong>
                      <span>{author.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>
        </div>
        <section className="origin section-pad">
          <DevelopmentWorld paused={paused} kind="server" />
          <figure
            className="origin-figure"
            aria-labelledby="origin-map-title"
            aria-describedby="origin-map-description"
          >
            <div className="origin-network" aria-hidden="true">
              <svg viewBox="0 0 600 500">
                <defs>
                  <pattern
                    id="map-grid"
                    width="36"
                    height="36"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="1" cy="1" r="1" fill="#5e7e69" opacity=".35" />
                  </pattern>
                </defs>
                <rect width="600" height="500" fill="url(#map-grid)" />
                <path
                  className="network-route route-one"
                  d="M180 330Q180 90 440 140"
                />
                <path
                  className="network-route route-two"
                  d="M180 330Q370 410 460 300"
                />
                <path
                  className="network-route route-three"
                  d="M180 330Q55 190 170 105"
                />
                <circle className="network-pulse" cx="180" cy="330" r="28" />
                <circle className="network-hub" cx="180" cy="330" r="10" />
                <circle cx="440" cy="140" r="7" />
                <circle cx="460" cy="300" r="7" />
                <circle cx="170" cy="105" r="7" />
              </svg>
              <span className="network-coordinates">01°27′ S · 48°30′ W</span>
              <span className="network-belem">
                Belém<span>Pará, Brasil</span>
              </span>
              <span className="network-endpoint endpoint-one">
                <Monitor aria-hidden="true" />
                {copy.origin.node}
              </span>
              <span className="network-endpoint endpoint-two">
                <Network aria-hidden="true" />
                API / CLOUD
              </span>
              <span className="network-endpoint endpoint-three">
                <Code2 aria-hidden="true" />
                IRTC
              </span>
              <span className="network-status">
                <span />
                {copy.origin.link}
              </span>
            </div>
            <figcaption className="network-caption">
              <strong id="origin-map-title">{copy.origin.mapTitle}</strong>
              <span id="origin-map-description">
                {copy.origin.mapDescription}
              </span>
            </figcaption>
          </figure>
          <div data-reveal>
            <p className="overline">{copy.origin.label}</p>
            <h2>
              {copy.origin.title}
              <br />
              <span>{copy.origin.accent}</span>
            </h2>
            <p>{copy.origin.body}</p>
            <p>{copy.origin.vision}</p>
            <SectionLink target="contato" className="inline-link">
              {copy.origin.cta}
              <MessageCircle aria-hidden="true" />
            </SectionLink>
          </div>
        </section>
        <Founder locale={locale} />
        <section className="contact section-pad" id="contato" tabIndex={-1}>
          <div>
            <p className="overline">{copy.contact.label}</p>
            <h2>
              {copy.contact.title}
              <br />
              <span>{copy.contact.accent}</span>
            </h2>
            <p>{copy.contact.intro}</p>
            <button className="iris-inline" onClick={openChat}>
              <Sparkles aria-hidden="true" />
              {copy.contact.iris}
              <MessageCircle aria-hidden="true" />
            </button>
          </div>
          <form onSubmit={sendContact}>
            <div className="field-row">
              <label>
                {copy.contact.name}
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  placeholder={copy.contact.nameHint}
                />
              </label>
              <label>
                {copy.contact.email}
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={160}
                  placeholder="voce@empresa.com"
                />
              </label>
            </div>
            <label>
              {copy.contact.company}
              <span className="optional"> ({copy.contact.optional})</span>
              <input
                name="company"
                autoComplete="organization"
                maxLength={120}
                placeholder={copy.contact.companyHint}
              />
            </label>
            <label>
              {copy.contact.message}
              <textarea
                name="message"
                required
                rows={3}
                maxLength={1800}
                placeholder={copy.contact.messageHint}
              />
            </label>
            <label hidden>
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
            <button
              className="pill-link form-submit"
              disabled={contactState === "sending"}
            >
              {contactState === "sending"
                ? copy.contact.sending
                : copy.contact.submit}
              <span>
                <Send aria-hidden="true" />
              </span>
            </button>
            <p className="form-status" role="status">
              {contactState === "sent"
                ? copy.contact.sent
                : contactState === "error"
                  ? copy.contact.error
                  : copy.contact.privacy}
            </p>
          </form>
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <SectionLink target="contato" className="footer-invitation">
            {copy.footer.title}
            <br />
            <span>{copy.footer.accent}</span>
          </SectionLink>
          <div className="footer-contact">
            <p>{copy.footer.location}</p>
            <div className="footer-channels" aria-label={copy.footer.socials}>
              <a className="footer-channel" href="mailto:iago@irtc.com.br">
                <span className="footer-channel-icon">
                  <Mail aria-hidden="true" />
                </span>
                <span>
                  E-mail
                  <small>iago@irtc.com.br</small>
                </span>
              </a>
              {footerSocials.map(({ name, Icon }) => (
                <span className="footer-channel" key={name}>
                  <span className="footer-channel-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <span>
                    {name}
                    <small>{copy.footer.soon}</small>
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
        <SectionLink
          target="inicio"
          className="footer-wordmark"
          label={copy.home}
        >
          irtc
          <span className="footer-asterisk" aria-hidden="true">
            ✳
          </span>
        </SectionLink>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} IRTC</span>
          <span>{copy.footer.signature}</span>
          <SectionLink target="inicio">
            {copy.footer.top}
            <ArrowUp aria-hidden="true" />
          </SectionLink>
        </div>
      </footer>
      <AccessibilityToolbar
        locale={locale}
        paused={paused}
        onPausedChange={setPaused}
      />
      <div className="back-to-top" data-visible={scrolled}>
        <SectionLink target="conteudo" label={copy.footer.top}>
          <ArrowUp aria-hidden="true" />
        </SectionLink>
      </div>
      <button
        ref={launcher}
        className="iris-launcher"
        onClick={openChat}
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
  );
}
