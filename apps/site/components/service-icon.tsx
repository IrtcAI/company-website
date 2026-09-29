import {
  Cloud,
  Database,
  Globe2,
  Layers3,
  Network,
  RefreshCw,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Layers3,
  Globe2,
  Smartphone,
  Network,
  RefreshCw,
  Sparkles,
  Database,
  Cloud,
};

export function ServiceIcon({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) {
  const Icon = icons[icon] ?? Layers3;
  return <Icon aria-hidden="true" className={className} />;
}
