"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CSSProperties,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ChevronDown, Globe2, MessageCircle, SunMoon } from "lucide-react";
import type { Locale } from "@/lib/content";
import type { Page } from "@/lib/routes";
import { ServiceIcon } from "./service-icon";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const HOVER_CLOSE_DELAY = 200;

export type NavItem = {
  label: string;
  href: string;
  page?: Page;
  section?: string;
};

export type ServiceLink = {
  title: string;
  summary: string;
  icon: string;
  href: string;
};

export type ServicesMenu = {
  items: ServiceLink[];
  allHref: string;
  allLabel: string;
  toggleLabel: string;
};

export type HeaderLabels = {
  home: string;
  menu: string;
  close: string;
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
  // scrollIntoView re-targets continuously while it animates, which fights
  // the pinned scroll-story's own per-frame style updates right at its
  // boundary; a fixed target computed up front doesn't have that problem.
  const padding =
    parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) ||
    0;
  const top =
    destination.getBoundingClientRect().top + window.scrollY - padding;
  window.scrollTo({ top, behavior });
  destination.focus({ preventScroll: true });
}

function ServicesDropdown({
  item,
  current,
  onLabelClick,
  menu,
}: {
  item: NavItem;
  current: "page" | "location" | undefined;
  onLabelClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  menu: ServicesMenu;
}) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const wrapper = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLAnchorElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const openedByHover = useRef(false);
  const suppressFocus = useRef(false);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  function openNow() {
    clearTimeout(closeTimer.current);
    if (suppressFocus.current) {
      suppressFocus.current = false;
      return;
    }
    if (!open) openedByHover.current = true;
    setOpen(true);
  }

  function closeSoon() {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), HOVER_CLOSE_DELAY);
  }

  function closeNow() {
    clearTimeout(closeTimer.current);
    setOpen(false);
  }

  function onBlur(event: FocusEvent<HTMLDivElement>) {
    if (!wrapper.current?.contains(event.relatedTarget as Node | null))
      closeNow();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Escape" || !open) return;
    event.stopPropagation();
    closeNow();
    suppressFocus.current = true;
    trigger.current?.focus();
  }

  function toggle() {
    // A click is often preceded by a hover that already opened the panel
    // (real mice and touch taps both dispatch a mouseenter first), so a
    // fresh open from hover shouldn't be immediately toggled back closed.
    if (openedByHover.current) {
      openedByHover.current = false;
      return;
    }
    setOpen((value) => !value);
  }

  return (
    <div
      ref={wrapper}
      className="nav-services"
      data-open={open}
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    >
      <Link
        ref={trigger}
        href={item.href}
        prefetch={false}
        aria-current={current}
        onClick={onLabelClick}
        onFocus={openNow}
      >
        {item.label}
      </Link>
      <button
        type="button"
        className="services-toggle"
        aria-expanded={open}
        aria-controls="services-menu"
        onClick={toggle}
      >
        <span className="sr-only">{menu.toggleLabel}</span>
        <ChevronDown aria-hidden="true" />
      </button>
      <div className="services-menu" id="services-menu">
        <span
          key={highlighted}
          className="services-menu-icon"
          aria-hidden="true"
        >
          <ServiceIcon icon={menu.items[highlighted]?.icon ?? ""} />
        </span>
        <ul>
          {menu.items.map((service, index) => (
            <li key={service.href}>
              <Link
                href={service.href}
                prefetch={false}
                onMouseEnter={() => setHighlighted(index)}
                onFocus={() => setHighlighted(index)}
              >
                <span className="services-menu-title">{service.title}</span>
                <span className="services-menu-summary">{service.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={menu.allHref}
          prefetch={false}
          className="services-menu-all"
        >
          {menu.allLabel}
        </Link>
      </div>
    </div>
  );
}

function MenuIcon() {
  return (
    <span className="menu-icon" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

function MobileMenu({
  home,
  homeLabel,
  menuLabel,
  closeLabel,
  services,
  servicesMenu,
  links,
  contact,
  talk,
  contactCurrent,
}: {
  home: string;
  homeLabel: string;
  menuLabel: string;
  closeLabel: string;
  services?: {
    item: NavItem;
    current: "page" | "location" | undefined;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  };
  servicesMenu: ServicesMenu;
  links: (NavItem & {
    current: "page" | "location" | undefined;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  })[];
  contact: string;
  talk: string;
  contactCurrent: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const wide = window.matchMedia("(min-width: 1201px)");
    const onChange = () => wide.matches && closeMenu();
    wide.addEventListener("change", onChange);
    return () => wide.removeEventListener("change", onChange);
  }, [open]);

  function openMenu() {
    const panel = dialog.current;
    const button = toggle.current;
    if (!panel || !button) return;
    // The close button and the reveal circle start exactly where the
    // hamburger sits, whatever padding the header has at the moment.
    const box = button.getBoundingClientRect();
    panel.style.setProperty("--toggle-top", `${box.top}px`);
    panel.style.setProperty("--toggle-right", `${innerWidth - box.right}px`);
    panel.style.setProperty("--toggle-size", `${box.width}px`);
    panel.style.setProperty("--origin-x", `${box.left + box.width / 2}px`);
    panel.style.setProperty("--origin-y", `${box.top + box.height / 2}px`);
    panel.showModal();
    setOpen(true);
  }

  function closeMenu() {
    dialog.current?.close();
    setOpen(false);
    setServicesOpen(false);
  }

  function follow(onClick?: (event: MouseEvent<HTMLAnchorElement>) => void) {
    return (event: MouseEvent<HTMLAnchorElement>) => {
      closeMenu();
      onClick?.(event);
    };
  }

  let index = 0;
  const stagger = () => ({ "--i": index++ }) as CSSProperties;

  return (
    <div className="mobile-menu">
      <button
        ref={toggle}
        type="button"
        className="menu-toggle"
        aria-label={menuLabel}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        onClick={openMenu}
      >
        <MenuIcon />
      </button>
      <dialog
        ref={dialog}
        id="mobile-menu-panel"
        className="mobile-menu-panel"
        aria-label={menuLabel}
        onClose={() => {
          setOpen(false);
          setServicesOpen(false);
        }}
      >
        <div className="mobile-menu-top">
          <Link
            href={home}
            className="mobile-menu-brand"
            aria-label={homeLabel}
            onClick={closeMenu}
          >
            irtc
          </Link>
          <button
            type="button"
            className="menu-toggle menu-close"
            aria-label={closeLabel}
            onClick={closeMenu}
          >
            <MenuIcon />
          </button>
        </div>
        <nav aria-label={menuLabel}>
          {services && (
            <div
              className="mobile-services"
              data-open={servicesOpen}
              style={stagger()}
            >
              <div className="mobile-services-row">
                <Link
                  href={services.item.href}
                  prefetch={false}
                  aria-current={services.current}
                  onClick={follow(services.onClick)}
                >
                  {services.item.label}
                </Link>
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-controls="mobile-services-list"
                  onClick={() => setServicesOpen((value) => !value)}
                >
                  <span className="sr-only">{servicesMenu.toggleLabel}</span>
                  <ChevronDown aria-hidden="true" />
                </button>
              </div>
              <div id="mobile-services-list" className="mobile-services-list">
                <div>
                  <ul>
                    {servicesMenu.items.map((service) => (
                      <li key={service.href}>
                        <Link
                          href={service.href}
                          prefetch={false}
                          tabIndex={servicesOpen ? undefined : -1}
                          onClick={closeMenu}
                        >
                          <span>{service.title}</span>
                          <small>{service.summary}</small>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={servicesMenu.allHref}
                    prefetch={false}
                    tabIndex={servicesOpen ? undefined : -1}
                    onClick={closeMenu}
                  >
                    {servicesMenu.allLabel}
                  </Link>
                </div>
              </div>
            </div>
          )}
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={false}
              aria-current={link.current}
              onClick={follow(link.onClick)}
              style={stagger()}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href={contact}
          className="pill-link mobile-menu-cta"
          aria-current={contactCurrent ? "page" : undefined}
          onClick={closeMenu}
          style={stagger()}
        >
          {talk}
          <span>
            <MessageCircle aria-hidden="true" />
          </span>
        </Link>
      </dialog>
    </div>
  );
}

export function SiteHeader({
  locale,
  page,
  nav,
  languages,
  home,
  contact,
  servicesMenu,
  labels,
}: {
  locale: Locale;
  page: Page;
  nav: NavItem[];
  languages: Record<Locale, string>;
  home: string;
  contact: string;
  servicesMenu: ServicesMenu;
  labels: HeaderLabels;
}) {
  const router = useRouter();

  const [stuck, setStuck] = useState(false);
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [theme, setTheme] = useState("system");

  useIsomorphicLayoutEffect(() => {
    setTheme(document.documentElement.dataset.theme || "system");
  }, []);

  useEffect(() => {
    const ratios = new Map<string, number>();
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          ratios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          ),
        );
        const [current] = [...ratios.entries()]
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

    const introStory =
      page === "home"
        ? document.querySelector<HTMLElement>(".intro-story")
        : null;

    const computeVisible = (scrollY: number) => {
      if (page !== "home" || scrollY <= 24) return true;
      if (introStory?.dataset.enhanced !== "true") return true;
      const progress = Number(introStory.dataset.progress ?? 0);
      return progress >= 1 || introStory.getBoundingClientRect().bottom <= 0;
    };

    const onScroll = () => {
      const scrollY = window.scrollY;
      setStuck(scrollY > 24);
      setVisible(computeVisible(scrollY));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // The story's progress is written on its own requestAnimationFrame loop,
    // a frame behind the scroll event, so a single instant jump (anchor
    // links, scrollbar drags) needs its own signal to stay in sync.
    let storyObserver: MutationObserver | undefined;
    if (introStory) {
      storyObserver = new MutationObserver(() =>
        setVisible(computeVisible(window.scrollY)),
      );
      storyObserver.observe(introStory, {
        attributes: true,
        attributeFilter: ["data-progress", "data-enhanced"],
      });
    }

    return () => {
      spy.disconnect();
      window.removeEventListener("scroll", onScroll);
      storyObserver?.disconnect();
    };
  }, [page]);

  function changeTheme(value: string) {
    setTheme(value);
    document.documentElement.dataset.theme = value;
    try {
      localStorage.setItem("irtc-theme", value);
    } catch {}
  }

  function changeLanguage(value: Locale) {
    document.cookie = `irtc-locale=${value}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    const go = () => router.push(languages[value], { scroll: false });
    if (typeof document.startViewTransition === "function")
      document.startViewTransition(go);
    else go();
  }

  function current(item: NavItem) {
    if (item.page === page) return "page";
    if (page !== "home") return undefined;
    if (item.section && item.section === activeSection) return "location";
    if (item.page === "services" && activeSection === "servicos")
      return "location";
    return undefined;
  }

  function sectionClick(item: NavItem) {
    return item.section && page === "home"
      ? (event: MouseEvent<HTMLAnchorElement>) =>
          scrollToSection(event, item.section!)
      : undefined;
  }

  function navLink(item: NavItem) {
    return (
      <Link
        key={item.href}
        href={item.href}
        prefetch={false}
        aria-current={current(item)}
        onClick={sectionClick(item)}
      >
        {item.label}
      </Link>
    );
  }

  const servicesItem = nav.find((item) => item.page === "services");
  const restNav = nav.filter((item) => item.page !== "services");

  return (
    <header
      className="site-header"
      data-stuck={stuck || page !== "home"}
      data-visible={visible}
      onFocus={() => setVisible(true)}
    >
      <Link href={home} className="brand" aria-label={labels.home}>
        irtc
      </Link>
      <nav aria-label={labels.menu}>
        {servicesItem && (
          <ServicesDropdown
            item={servicesItem}
            current={current(servicesItem)}
            onLabelClick={sectionClick(servicesItem)}
            menu={servicesMenu}
          />
        )}
        {restNav.map(navLink)}
      </nav>
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
      <MobileMenu
        home={home}
        homeLabel={labels.home}
        menuLabel={labels.menu}
        closeLabel={labels.close}
        services={
          servicesItem && {
            item: servicesItem,
            current: current(servicesItem),
            onClick: sectionClick(servicesItem),
          }
        }
        servicesMenu={servicesMenu}
        links={restNav.map((item) => ({
          ...item,
          current: current(item),
          onClick: sectionClick(item),
        }))}
        contact={contact}
        talk={labels.talk}
        contactCurrent={page === "contact"}
      />
    </header>
  );
}
