import type { ServiceFaqItem } from "@/lib/services";

export function ServiceFaq({ items }: { items: ServiceFaqItem[] }) {
  return (
    <div className="service-faq-list">
      {items.map((item) => (
        <details key={item.question} className="service-faq-item">
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
