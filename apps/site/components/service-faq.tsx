import type { ServiceFaqItem } from "@/lib/services";

export function ServiceFaq({
  title,
  items,
}: {
  title: string;
  items: ServiceFaqItem[];
}) {
  return (
    <section className="sp-section sp-faq section-pad" data-reveal>
      <h2>{title}</h2>
      <div className="service-faq-list">
        {items.map((item) => (
          <details key={item.question} className="service-faq-item">
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
