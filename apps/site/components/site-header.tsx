"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useLayoutEffect, useState } from "react";
import { Globe2, Menu, MessageCircle, SunMoon } from "lucide-react";
import type { Locale } from "@/lib/content";
import type { Page } from "@/lib/routes";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export type NavItem = {
  label: string;
  href: string;
  page?: Page;
  section?: string;
};

export type HeaderLabels = {
  home: string;
  menu: string;
  language: string;
  theme: string;
  themes: string[];
  talk: string;
};

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

export function SiteHeader({
  locale,
  page,
  nav,
  languages,
  home,
  contact,
  labels,
}: {
  locale: Locale;
  page: Page;
  nav: NavItem[];
  languages: Record<Locale, string>;
  home: string;
  contact: string;
  labels: HeaderLabels;
}) {
  const router = useRouter();

  const [stuck, setStuck] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [theme, setTheme] = useState("system");

  useIsomorphicLayoutEffect(() => {
    setTheme(document.documentElement.dataset.theme || "system");
  }, []);

  useEffect(() => {
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
      spy.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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

  function current(item: NavItem) {
    if (item.page === page) return "page";
    if (page !== "home") return undefined;
    if (item.section && item.section === activeSection) return "location";
    if (item.page === "services" && activeSection === "servicos")
      return "location";
    return undefined;
  }

  function navLink(item: NavItem) {
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

  return (
    <header className="site-header" data-stuck={stuck || page !== "home"}>
      <Link href={home} className="brand" aria-label={labels.home}>
        irtc<span aria-hidden="true">✳</span>
      </Link>
      <nav aria-label={labels.menu}>{nav.map(navLink)}</nav>
      <div className="site-preferences">
        <label className="preference">
          <Globe2 aria-hidden="true" />
          <span className="sr-only">{labels.language}</span>
          <select
            value={locale}
            onChange={(event) => changeLanguage(event.target.value as Locale)}
          >
            <option value="pt-BR">PT-BR</option>
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>
        </label>
        <label className="preference">
          <SunMoon aria-hidden="true" />
          <span className="sr-only">{labels.theme}</span>
          <select
            value={theme}
            onChange={(event) => changeTheme(event.target.value)}
          >
            {["system", "light", "dark"].map((value, index) => (
              <option key={value} value={value}>
                {labels.themes[index]}
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
        {labels.talk}
        <span>
          <MessageCircle aria-hidden="true" />
        </span>
      </Link>
      <details className="mobile-menu">
        <summary aria-label={labels.menu}>
          <Menu aria-hidden="true" />
        </summary>
        <nav aria-label={labels.menu}>
          {nav.map(navLink)}
          <Link
            href={contact}
            aria-current={page === "contact" ? "page" : undefined}
          >
            {labels.talk}
          </Link>
        </nav>
      </details>
    </header>
  );
}
