"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

let navigated = false;

export default function Template({ children }: { children: ReactNode }) {
  const [transition] = useState(() => navigated);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    navigated = true;

    const main = root.current?.querySelector<HTMLElement>("main");
    if (!main) return;

    const headings = [
      ...main.querySelectorAll<HTMLElement>(":is(h2, h3):not([data-reveal])"),
    ].filter(
      (heading) => heading.getBoundingClientRect().top > window.innerHeight,
    );
    headings.forEach((heading) => heading.setAttribute("data-reveal", ""));

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
    headings.forEach((heading) => reveal.observe(heading));

    return () => reveal.disconnect();
  }, []);

  return (
    <div ref={root} className={transition ? "route-transition" : undefined}>
      {children}
    </div>
  );
}
