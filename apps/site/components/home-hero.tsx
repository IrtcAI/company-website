"use client";

import Link from "next/link";
import { MouseEvent, ReactNode, useEffect, useState } from "react";
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

export function HomeHero({
  copy,
  contact,
}: {
  copy: Pick<Copy, "hero" | "manifesto">;
  contact: string;
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
          <h1 id="hero-title">
            <span>{copy.hero.title}</span>
            <TypedHeadline
              key={copy.hero.words[0]}
              paused={paused}
              words={copy.hero.words}
            />
            <span className="sr-only">{copy.hero.words.join(" ")}</span>
          </h1>
          <p className="hero-description">{copy.hero.description}</p>
          <Link href={contact} className="hero-start">
            {copy.hero.cta}
            <span>
              <MessageCircle aria-hidden="true" />
            </span>
          </Link>
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
