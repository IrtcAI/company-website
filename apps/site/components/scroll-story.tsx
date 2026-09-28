"use client";

import { ReactNode, useEffect, useRef } from "react";
import { MessageCircle, ShieldCheck, Zap } from "lucide-react";
import { content, Locale } from "@/lib/content";

export function ScrollStory({
  children,
  locale,
  paused,
}: {
  children: ReactNode;
  locale: Locale;
  paused: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const copy = content[locale].manifesto;

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    const media = window.matchMedia(
      "(min-width: 1024px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    let active = false;
    let terminalSize = 220;
    let expandedWidth = 1200;
    let expandedHeight = 700;
    let headerOffset = 0;

    const update = () => {
      frame = 0;
      if (!active) return;
      const bounds = element.getBoundingClientRect();
      const distance = Math.max(1, element.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -bounds.top / distance));
      const eased = progress * progress * (3 - 2 * progress);
      element.dataset.progress = String(progress);
      const width = terminalSize + eased * (expandedWidth - terminalSize);
      element.style.setProperty("--screen-width", `${width}px`);
      element.style.setProperty(
        "--content-scale",
        String(width / expandedWidth),
      );
      element.style.setProperty(
        "--screen-height",
        `${terminalSize + eased * (expandedHeight - terminalSize)}px`,
      );
      element.style.setProperty(
        "--float-strength",
        String(Math.max(0, 1 - progress * 5)),
      );
      element.style.setProperty("--screen-x", `${-31 * (1 - eased)}vw`);
      element.style.setProperty(
        "--screen-y",
        `calc(${-25 * (1 - eased)}svh + ${(eased * headerOffset) / 2}px)`,
      );
      element.style.setProperty("--screen-rotate", `${-14 * (1 - eased)}deg`);
      element.style.setProperty(
        "--hero-opacity",
        String(Math.max(0, 1 - progress * 2)),
      );
      element.style.setProperty(
        "--story-opacity",
        String(Math.max(0, Math.min(1, (progress - 0.48) / 0.26))),
      );
      element.style.setProperty(
        "--preview-opacity",
        String(Math.max(0, 1 - progress * 2.2)),
      );
      const hero = element.querySelector<HTMLElement>(".hero");
      if (hero) hero.inert = progress > 0.5;
    };

    const schedule = () => {
      if (!frame && active) frame = requestAnimationFrame(update);
    };

    const configure = () => {
      const content = element.querySelector<HTMLElement>(".screen-content");
      terminalSize = Math.max(150, Math.min(220, window.innerWidth * 0.15));
      expandedWidth = Math.min(1480, window.innerWidth - 96);
      element.style.setProperty("--content-width", `${expandedWidth - 20}px`);
      expandedHeight = (content?.offsetHeight ?? 0) + 72;
      headerOffset =
        document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0;
      active =
        media.matches &&
        !paused &&
        expandedHeight + 80 + headerOffset <= window.innerHeight;
      element.dataset.enhanced = String(active);
      if (active) schedule();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
        const hero = element.querySelector<HTMLElement>(".hero");
        if (hero) hero.inert = false;
      }
    };

    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting)
        window.addEventListener("scroll", schedule, { passive: true });
      else window.removeEventListener("scroll", schedule);
      schedule();
    });
    visibility.observe(element);

    const size = new ResizeObserver(configure);
    const content = element.querySelector<HTMLElement>(".screen-content");
    if (content) size.observe(content);

    media.addEventListener("change", configure);
    window.addEventListener("resize", configure, { passive: true });
    configure();

    return () => {
      cancelAnimationFrame(frame);
      visibility.disconnect();
      size.disconnect();
      media.removeEventListener("change", configure);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", configure);
    };
  }, [paused, locale]);

  return (
    <div className="intro-story" ref={root}>
      <div className="intro-stage">
        {children}
        <section
          className="story-screen"
          id="manifesto"
          tabIndex={-1}
          aria-labelledby="story-title"
          data-scroll-stage
        >
          <div className="screen-chrome" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>irtc / studio</span>
            <span>✳</span>
          </div>
          <div className="screen-preview" aria-hidden="true">
            <span>&gt;_</span>
          </div>
          <div className="screen-content">
            <div className="section-label">
              <span>{copy.label}</span>
              <span>{copy.aside}</span>
            </div>
            <div className="screen-introduction">
              <h2 id="story-title">
                {copy.title}
                <br />
                <span>{copy.accent}</span>
              </h2>
              <p>{copy.foot}</p>
            </div>
            <div className="screen-principles">
              {copy.points.map((point, index) => {
                const Icon = [Zap, ShieldCheck, MessageCircle][index];
                return (
                  <article key={point.title}>
                    <Icon aria-hidden="true" />
                    <h3>{point.title}</h3>
                    <p>{point.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
