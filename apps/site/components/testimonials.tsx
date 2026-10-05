"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import type { content, RecommendationAuthor } from "@/lib/content";

type Copy = (typeof content)["pt-BR"]["testimonials"];

export function Testimonials({
  copy: testimonials,
  authors,
}: {
  copy: Copy;
  authors: RecommendationAuthor[];
}) {
  const [recommendation, setRecommendation] = useState(0);

  if (authors.length === 0) return null;

  const author = authors[recommendation];

  return (
    <section
      className="testimonials section-pad"
      id="depoimentos"
      tabIndex={-1}
    >
      <div className="section-label">
        <span>{testimonials.label}</span>
      </div>
      <div className="testimonial-layout">
        <div>
          <h2 data-reveal>
            {testimonials.title}
            <br />
            <span>{testimonials.accent}</span>
          </h2>
          <p>{testimonials.intro}</p>
          <div className="testimonial-controls">
            <button
              aria-label={testimonials.previous}
              onClick={() =>
                setRecommendation(
                  (recommendation + authors.length - 1) % authors.length,
                )
              }
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <span>
              0{recommendation + 1} / 0{authors.length}
            </span>
            <button
              aria-label={testimonials.next}
              onClick={() =>
                setRecommendation((recommendation + 1) % authors.length)
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
              {testimonials.summaries[recommendation]}
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
  );
}
