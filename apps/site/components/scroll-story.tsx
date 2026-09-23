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
    const update = () => {
      frame = 0;
      if (!active) return;
      const bounds = element.getBoundingClientRect();
      const distance = Math.max(1, element.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -bounds.top / distance));
      const eased = progress * progress * (3 - 2 * progress);
      element.style.setProperty("--screen-scale", String(0.22 + eased * 0.78));
      element.style.setProperty("--screen-x", `${-34 * (1 - eased)}vw`);
      element.style.setProperty("--screen-y", `${-23 * (1 - eased)}svh`);
      element.style.setProperty("--screen-rotate", `${-14 * (1 - eased)}deg`);
      element.style.setProperty("--screen-tilt", `${18 * (1 - eased)}deg`);
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
      const screen = element.querySelector<HTMLElement>(".story-screen");
      active =
        media.matches &&
        !paused &&
        (screen?.offsetHeight ?? 0) + 80 <= window.innerHeight;
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
    media.addEventListener("change", configure);
    window.addEventListener("resize", configure, { passive: true });
    configure();
    return () => {
      cancelAnimationFrame(frame);
      visibility.disconnect();
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
            <i />
            <i />
            <i />
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
