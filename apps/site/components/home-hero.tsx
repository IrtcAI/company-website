"use client";

import Link from "next/link";
import { MouseEvent, ReactNode } from "react";
import { ArrowDown, MessageCircle, Pause, Play } from "lucide-react";
import type { content } from "@/lib/content";
import { HeroWorld } from "./hero-world";
import { ScrollStory } from "./scroll-story";
import { useShell } from "./shell-provider";

type Copy = (typeof content)["pt-BR"];

function SectionLink({
  target,
  children,
  className,
  label,
  current,
}: {
  target: string;
  children: ReactNode;
  className?: string;
  label?: string;
  current?: boolean;
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
      aria-current={current ? "location" : undefined}
    >
      {children}
    </Link>
  );
}

export function HomeHero({
  copy,
  contact,
  services,
}: {
  copy: Pick<Copy, "hero" | "manifesto">;
  contact: string;
  services: string;
}) {
  const { paused, setPaused } = useShell();

  return (
    <ScrollStory copy={copy.manifesto}>
      <section
        className="hero"
        id="inicio"
        tabIndex={-1}
        aria-labelledby="hero-title"
      >
        <HeroWorld />
        <div className="hero-content">
          <p className="eyebrow">
            <span />
            {copy.hero.eyebrow}
          </p>
          <h1 id="hero-title" className="hero-slogan">
            <span>{copy.hero.title}</span>
          </h1>
          <p className="hero-description">{copy.hero.description}</p>
          <div className="hero-actions">
            <Link href={contact} className="hero-start">
              {copy.hero.cta}
              <span>
                <MessageCircle aria-hidden="true" />
              </span>
            </Link>
            <Link href={services} className="hero-secondary">
              {copy.hero.secondaryCta}
            </Link>
          </div>
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
  );
}
