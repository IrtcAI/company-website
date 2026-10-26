import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function ServiceBreadcrumb({
  items,
  label,
}: {
  items: { label: string; href?: string }[];
  label: string;
}) {
  return (
    <nav className="service-breadcrumb" aria-label={label}>
      <ol>
        {items.map((item, index) => (
          <li key={item.label}>
            {item.href ? (
              <Link href={item.href} prefetch={false}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
            {index < items.length - 1 ? (
              <ChevronRight aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
