# Origem das imagens

| Imagem                   | Arquivo publicado                           | Origem                                                                            | Tratamento                                                              |
| ------------------------ | ------------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Produto LeafLink         | `apps/site/public/projects/leaflink.webp`   | captura pública fornecida em 22/09/2026                                           | 3600 × 2338 JPEG para 1000 × 649 WebP, qualidade 84                     |
| Produto Dasa             | `apps/site/public/projects/dasa.webp`       | captura pública fornecida em 22/09/2026                                           | 3600 × 2338 JPEG para 1000 × 649 WebP, qualidade 84                     |
| Produto Perfect Pay      | `apps/site/public/projects/perfectpay.webp` | captura pública fornecida em 22/09/2026                                           | 3600 × 2338 JPEG para 1000 × 649 WebP, qualidade 84                     |
| Logos de clientes        | `apps/site/public/brands/`                  | páginas institucionais públicas das marcas                                        | arquivos originais                                                      |
| Ícones de tecnologia     | `apps/site/public/technologies/`            | Simple Icons                                                                      | SVG original; AWS usa um ícone genérico de nuvem                        |
| Retrato do fundador      | `apps/site/public/founder.webp`             | foto do perfil público do LinkedIn, setembro de 2026                              | 640 × 640 WebP; a foto não é alterada, só enquadrada por CSS            |
| Fotos de equipes (Sobre) | `apps/site/public/about/*.webp`             | geradas por IA (OpenAI `gpt-image-1`) com `scripts/generate-about-images.mjs`     | 1200 × 800 WebP; sem pessoas reais, legenda indica que são ilustrativas |
| Objetos 3D               | `apps/site/public/studio/*.webp`            | renderizados a partir de `lib/studio-scene.ts` com `scripts/render-posters.mjs`   | WebP transparente na pose de repouso                                    |
| Mapa-múndi               | `apps/site/public/world-dots.svg`           | Natural Earth 110m (via `world-atlas`), gerado por `scripts/render-world-map.mjs` | grade de pontos em SVG                                                  |

As capturas de produto não são recompostas. O CSS só recorta a moldura do navegador dentro do cartão do projeto.
