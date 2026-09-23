# Scroll story, founder and LLM discovery

## Scope

Work is isolated in branch `codex/scroll-story-founder`, based on `e3623d3`. The main checkout and its pre-existing local changes remain untouched. No deployment or merge is included.

The Superlist reference was inspected in the browser, including the transition from a floating object into a large dark reading surface. IRTC uses an original CSS 3D terminal that expands into the existing Nosso jeito section. It keeps native scrolling, real HTML text and a single accessible copy of the content. No animation library was added.

The founder section uses the supplied LinkedIn profile's real portrait and public professional summary. It is localized in PT-BR, EN and ES. The image is a local, lazy-loaded 640 × 640 WebP of 51,872 bytes.

## Performance measurements

Production build, localhost, Lighthouse mobile simulated throttling, Portuguese Accept-Language. Measurements are local lab results, not a guarantee of production field performance. The reported external score of 85 was not reproduced: the starting local build scored 96.

| Build / run | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Baseline mobile | 96 | 100 | 100 | 100 | 2.6 s | 70 ms | 0 |
| Updated mobile 1 | 98 | 100 | 100 | 100 | 2.44 s | 14 ms | 0 |
| Updated mobile 2 | 98 | 100 | 100 | 100 | 2.46 s | 10 ms | 0 |
| Updated mobile 3 | 98 | 100 | 100 | 100 | 2.46 s | 5 ms | 0 |
| Updated desktop | 100 | 100 | 100 | 100 | 0.52 s | 0 ms | 0.008 |
| Mobile after LLM guide | 98 | 100 | 100 | 100 | 2.43 s | 12 ms | 0 |

The three consecutive mobile runs have a performance median of 98. Offscreen sections use content visibility, the portrait loads lazily, and WebGL is disabled and disposed below 1024px or with reduced motion. Resizing desktop to mobile was verified in the browser: canvas count changes from one to zero. Testimonial entry animations retain full text opacity to preserve contrast while moving.

## Verification

- Production build, lint, TypeScript and 48 automated tests pass.
- Tests cover the static story fallback, pause, a single manifesto, the lazy founder portrait, delayed WebGL loading and renderer disposal after a viewport change, alongside existing form, Iris, localization and API tests.
- Browser checks at 320, 390, 768, 1024 and 1440 pixels found no horizontal page overflow. Spanish expanded content fits within 1024 × 768. Light and dark founder layouts were inspected.
- The manifesto navigation reaches the expanded screen, transfers focus to `manifesto`, and leaves the URL without a fragment.
- Mobile uses normal document flow; a small CSS scroll animation is progressive enhancement. Reduced motion, pause, short viewports and insufficient content space disable the pinned scene.
- `/llm.txt` and `/llms.txt` return HTTP 200 with identical UTF-8 plain text. The plural path rewrites to the single maintained file. HTML contains a `rel="describedby"` discovery link.
- English, Spanish, robots and sitemap endpoints return HTTP 200.

## Reproduce

Run `pnpm build`, then `pnpm start --port 3400`. Audit with:

```sh
pnpm dlx lighthouse@13.5.0 http://localhost:3400/ --output=json --output-path=/tmp/irtc-mobile.json --chrome-flags='--headless --no-sandbox' --extra-headers='{"Accept-Language":"pt-BR"}' --quiet
```

Use `--preset=desktop` for the desktop comparison. Do not compare a development server to these production-build scores. Recheck deployed performance after configuring hosting, caching, compression and the real domain.
