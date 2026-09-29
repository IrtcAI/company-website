export const textSizes = [
  "default",
  "small",
  "medium",
  "large",
  "extra",
] as const;

export type TextSize = (typeof textSizes)[number];

export const textScale: Record<TextSize, number> = {
  default: 1,
  small: 0.9,
  medium: 1.12,
  large: 1.25,
  extra: 1.4,
};

// Headlines are already large and sized to fit their layout; scaling them
// breaks lines and pushes the 3D scenes around, so only body-sized text grows.
const SMALL_TEXT_LIMIT = 24;
const FIELDS = "input, textarea, select";
const SKIP = "svg, script, style, noscript, .splash, .accessibility-toolbar";

type Scaled = HTMLElement & {
  dataset: { a11yFont?: string; a11yLine?: string };
};

function restore(root: ParentNode) {
  root.querySelectorAll<Scaled>("[data-a11y-font]").forEach((element) => {
    element.style.fontSize = element.dataset.a11yFont ?? "";
    element.style.lineHeight = element.dataset.a11yLine ?? "";
    delete element.dataset.a11yFont;
    delete element.dataset.a11yLine;
  });
}

function textElements(root: HTMLElement) {
  const found = new Set<HTMLElement>();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const parent = node.parentElement;
    if (parent && node.textContent?.trim() && !parent.closest(SKIP))
      found.add(parent);
  }
  root.querySelectorAll<HTMLElement>(FIELDS).forEach((field) => {
    if (!field.closest(SKIP)) found.add(field);
  });
  return [...found];
}

export function applyTextScale(root: HTMLElement, scale: number) {
  restore(root);
  if (scale === 1) return;

  // Read every size before writing any, so a parent that was just resized
  // can't leak into the computed size of a child that inherits from it.
  const measured = textElements(root).map((element) => {
    const style = getComputedStyle(element);
    return {
      element: element as Scaled,
      size: parseFloat(style.fontSize),
      line: parseFloat(style.lineHeight),
    };
  });

  for (const { element, size, line } of measured) {
    if (!size || size > SMALL_TEXT_LIMIT) continue;
    const next = Math.round(size * scale * 10) / 10;
    element.dataset.a11yFont = element.style.fontSize;
    element.dataset.a11yLine = element.style.lineHeight;
    element.style.fontSize = `${next}px`;
    if (line)
      element.style.lineHeight = String(Math.round((line / size) * 100) / 100);
  }
}
