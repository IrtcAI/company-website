# Immersive sequence v2

## Scope and source of truth

User feedback dated 22 September 2026. Work only on experimental branches; never merge into or modify main. Preserve the existing pastel palette, typography, generous spacing, authentic portrait and accessible HTML. No code comments. No new dependencies unless essential.

## Narrative and order

1. Hero: compact square terminal containing only >_, with unclipped development glyph.
2. Nosso jeito (01): that terminal expands into the existing content panel.
3. O que construímos (02): an assembling, scroll-responsive development glyph connects engineering to services. Decoration must never replace readable content.
4. Client logos, followed by projects (03).
5. Recommendations (04), Pará roots, founder, contact and footer.

Desktop motion uses transforms and visibility-gated updates. Mobile, paused motion and reduced-motion keep the entire narrative readable without sticky choreography or WebGL. Founder art direction: a software studio's layered architectural drawing, not an isolated decorative arch.

## Ownership and parallel work

### Parent: codex/scroll-story-founder

Owns integration, section order, content numbering, hero renderer, scroll story, founder, shared CSS, layout imports, documentation and final validation.

### Portfolio: codex/project-brand-refresh

Owns only public/projects assets, app/project-showcase.css and docs/project-image-sources.md. Use supplied actual screenshots of LeafLink, Dasa and PerfectPay, not synthesized products. Preserve pixels; optimize to WebP and use presentation cropping to avoid OS/browser chrome. Pastel brand surfaces: icy teal/purple LeafLink, pale blue/navy Dasa, seafoam/deep teal PerfectPay. Existing project markup/classes remain the integration contract. Do not edit shared components, globals, layout or package manifests. Commit owned files and report SHA plus integration instructions.

Source screenshots under /Users/iago/Desktop: Screenshot 2026-09-22 at 22.12.30.jpeg (Dasa), 22.13.34.jpeg (PerfectPay), 22.14.20.jpeg (LeafLink).

### Accessibility: codex/accessibility-dock

Owns components/accessibility-toolbar.tsx, app/accessibility-toolbar.css, tests/accessibility-toolbar.test.tsx. Export AccessibilityToolbar with props locale: Locale, paused: boolean, onPausedChange: (paused: boolean) => void. Parent adds imports and component instance. Do not edit shared files or manifests.

The left-side dock must leave a visible 44px target; expand on hover, keyboard focus and touch/click. Escape closes and restores focus. Include functional text size, contrast and motion controls with PT-BR/EN/ES labels and local preferences; avoid external accessibility overlays. Text scaling must affect real page copy, not merely the root font when existing styles use px. No fake search feature, global shortcut interception, inaccessible hover-only controls, focus trapping or overlap with Iris. Reduced-motion must use the parent paused state. Commit owned files and report SHA.

## Acceptance and verification

- Correct DOM and visual section order, matching navigation and numbering.
- Square terminal at entry; readable expanded content at completion.
- Development glyph fully framed, decorative and hidden from assistive technology.
- Authentic optimized project images and appropriately contrasting pastel brand surfaces.
- Toolbar usable by keyboard, pointer and touch; motion and preferences work.
- No horizontal overflow at 320, 390, 768, 1024 and 1440px; inspect both themes.
- Reduced-motion and paused states retain all content and functionality.
- Unit tests, lint, typecheck and production build pass.
- Repeat Lighthouse against the production server; aim >95 mobile performance, report actual measurements without guaranteeing field results.
- Preserve llm.txt and llms.txt alias; guide contains only verified company facts.
- Update validation notes and commit integrated work without publishing or touching main.
