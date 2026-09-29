# Arquitetura do site

Decisões técnicas do site institucional em `apps/site`. Para regras de conteúdo e tom, veja `site-guide.md`. Para comandos e variáveis, veja o `README.md` da raiz.

## Stack

Next.js 16 (App Router, Turbopack), React 19 e TypeScript. CSS nativo, sem framework de estilos. Three.js só para os objetos 3D. Testes com Vitest e Testing Library. Hospedagem na Vercel (plano Pro), com o domínio registrado na GoDaddy.

## Renderização

Todas as páginas são geradas estaticamente no build (`generateStaticParams`). As únicas rotas dinâmicas são as APIs `/api/chat` e `/api/contact`.

A estrutura segue "servidor por padrão, ilhas no cliente":

- `SiteShell` (`components/site-shell.tsx`) é um componente de servidor. Ele renderiza o rodapé inteiro e passa só os textos necessários para as ilhas cliente: `SiteHeader` (menu, idioma, tema) e `ShellProvider` (estado de pausa, Iris, aviso de cookies, barra de acessibilidade).
- A home (`components/site-experience.tsx`) também é de servidor. Hero, carrossel de projetos, recomendações, contadores e objetos 3D são ilhas.
- Componentes cliente nunca importam `lib/content.ts` ou `lib/services.ts` como valor. Esses arquivos têm o texto dos três idiomas e as FAQs de todos os serviços; importá-los no cliente coloca tudo no bundle. Use `import type` e receba os dados por props.

Cada área tem seu arquivo de CSS em `styles/`, importado em `layout/main.tsx`. O Next junta tudo num arquivo cacheado entre páginas. `experimental.inlineCss` foi testado e descartado: no Next 16.3 ele repete o CSS três vezes no HTML (no `<style>` e duas vezes no payload RSC), o que levou a home de 120 KB para 380 KB e piorou o LCP.

Uma splash com a marca cobre a página até o evento `load` e as fontes, com limite de 2,2 s. Ela é renderizada no servidor, escondida por um script inline e desativada sem JavaScript.

## Rotas e idiomas

pt-BR é o idioma base, na raiz. en e es ficam em `/en` e `/es`. As páginas internas usam segmentos traduzidos (`/servicos`, `/en/services`, `/es/servicios`), que `next.config.ts` reescreve para `app/[locale]/<página>`. Os endereços internos (`/pt-BR/services`) redirecionam para os públicos. A fonte da verdade é `lib/routes.ts`.

`proxy.ts` só atua na raiz: escolhe o idioma pela preferência salva em cookie, pelo país (cabeçalho da Vercel) ou pelo `Accept-Language`. Não há consulta de IP a terceiros.

Todas as páginas têm `canonical`, `hreflang` e Open Graph por idioma, gerados por `lib/seo.ts`.

## Objetos 3D

Cinco objetos formam a identidade visual: terminal (CSS), navegador, banco de dados, servidor e celular (Three.js, em `lib/studio-scene.ts`).

- O primeiro paint mostra imagens WebP pré-renderizadas de cada objeto na pose de repouso (`public/studio`). O canvas WebGL substitui a imagem sem salto visível.
- O Three.js (cerca de 140 KB gzip) só carrega em desktop, quando o navegador fica ocioso, e nunca com movimento reduzido. No celular, as imagens flutuam com animações CSS, pausadas fora da tela.
- Um único canvas por cena desenha em várias "slots" do DOM com scissor. O loop para quando a aba está oculta, quando o usuário pausa ou quando a cena sai da tela.
- Depois de mudar um modelo, regenere a imagem: `node apps/site/scripts/render-posters.mjs <tipo>`.

A seção 2 da home usa `ScrollStory`: o terminal do hero cresce até virar o painel "Nosso jeito", com scroll nativo e `position: sticky`. Só é ativado em telas de pelo menos 1024 × 760 e sem movimento reduzido. O cabeçalho aparece no topo da página, some enquanto o terminal cresce e volta fixo quando a animação termina.

## SEO, AEO e descoberta por IA

Tudo é derivado dos dados em `lib/`, para não ficar desatualizado:

- `app/sitemap.ts`: todas as páginas nos três idiomas, com `hreflang`.
- `app/robots.ts`: libera tudo exceto `/api/` e nomeia os principais robôs de busca e de IA.
- `app/llms.txt`, `app/llm.txt` e `app/llms-full.txt`: guia em texto para assistentes de IA, gerado por `lib/llms-txt.ts`.
- JSON-LD (`lib/structured-data.ts`): Organization e ProfessionalService com endereço e horário, WebSite, Person (fundador), Service, FAQPage, BreadcrumbList, AboutPage, ProfilePage e ContactPage.
- `app/opengraph-image.tsx`: imagem de compartilhamento padrão.

## Analytics e desempenho real

- **Google Tag Manager** (`@next/third-parties`) é o único analytics. Ele só carrega depois que o visitante aceita o aviso de cookies (`components/analytics-consent.tsx`). A escolha fica no `localStorage`, é enviada como atualização do Consent Mode e pode ser mudada no rodapé. O código envia ao `dataLayer` os eventos `iris_open`, `contact_submit` e `web_vitals`; o GA4 e as conversões são configurados no painel do GTM.
- **Vercel Speed Insights** coleta Core Web Vitals reais. Não conta visitas, não usa cookies e carrega do mesmo domínio em produção.
- A CSP em `next.config.ts` libera `googletagmanager.com` e os domínios de coleta do Google Analytics. Qualquer tag de HTML personalizado no GTM que carregue script de outro domínio precisa ser adicionada ali. Só em desenvolvimento a CSP inclui `'unsafe-eval'`, que o React usa para montar as pilhas de erro do servidor.

## Iris

Iris é uma assistente de descoberta: explica a IRTC ou esboça um MVP em até três pontos e 250 caracteres. Não é uma assistente geral.

- As instruções do modelo ficam em inglês em `lib/iris-policy.ts`; a resposta sai no idioma do visitante. A rota ignora qualquer conhecimento enviado pelo navegador.
- O conhecimento vem de RAG. `lib/knowledge/sources.ts` monta trechos a partir do conteúdo publicado em `lib/` (empresa, serviços e FAQ, Sobre, especialidades do fundador, projetos, anos de experiência), sem depoimentos e sem o conteúdo provisório de `site-guide.md`. `pnpm knowledge` gera os embeddings (`text-embedding-3-small`, 512 dimensões, int8) em `lib/knowledge/index.json` e só recalcula trechos cujo texto mudou. `tests/knowledge-index.test.ts` falha quando o conteúdo muda sem regenerar o índice.
- A cada mensagem, `lib/knowledge/search.ts` busca no idioma da página os quatro trechos mais próximos das duas últimas mensagens do visitante, acima de um limiar de similaridade, mais o trecho de contato. Eles vão ao modelo numa mensagem `developer` separada (`<company_facts>`), fora das instruções. Se a busca falhar, a rota usa o bloco fixo `companyKnowledge`.
- A resposta traz `intent` (`answer`, `idea` ou `refuse`) e `sources`, os IDs dos trechos usados. Uma resposta factual sem fonte, ou com fonte que não foi enviada, vira o texto fixo `iris.unknown`. Ideias de MVP não precisam de fonte.
- A mensagem do visitante vai delimitada e normalizada (NFKC, sem caracteres invisíveis). Entradas codificadas são recusadas. A saída segue um schema JSON estrito e passa por checagem de links, e-mails e de um canário contra vazamento das instruções.
- Só as respostas assinadas por HMAC (chave derivada de `OPENAI_API_KEY`) voltam ao histórico, o que impede que o navegador forje falas da assistente.
- Entrada e saída passam pela moderação `omni-moderation-latest` em paralelo. Limites: 10 mensagens por minuto e 100 por dia por IP, 3.000 por dia no total, corpo de até 16 KB, timeout de 20 s e `store: false` na OpenAI.
- A base segue OWASP LLM01, LLM07 e LLM10. `tests/iris-security.test.ts` cobre os ataques conhecidos nos três idiomas.

O índice em JSON serve enquanto a base tiver poucas centenas de trechos e mudar só com deploy. Com milhares de trechos, ou conteúdo editado fora do código, o caminho é PostgreSQL com pgvector. Nunca indexar leads, conversas ou material privado.

## Contato

`/api/contact` recebe o formulário e os rascunhos aprovados na Iris. Valida e normaliza os campos, aceita só assuntos da lista de serviços, tem honeypot e limite de 4 envios a cada 15 minutos por IP. O e-mail sai pelo Resend para `CONTACT_TO`, com o visitante em `reply_to`.

Falhas de HTTP no formulário e na Iris disparam um aviso (`reportHttpError` em `lib/toast.ts`), mostrado por `components/toaster.tsx` no idioma da página. O aviso usa `popover` para ficar acima do diálogo da Iris. Quando o Resend recusa o envio, a rota registra o status e a resposta dele no log da Vercel.

Os limites de requisição ficam em memória (`lib/rate-limit.ts`). Na Vercel cada instância tem o seu; se o tráfego crescer, mover para uma store compartilhada, como Upstash Redis.

## Acessibilidade

HTML semântico com landmarks, skip link, um `h1` por página e foco visível (sublinhado nos campos de formulário). O item do menu da seção visível recebe `aria-current`. No celular e no tablet o menu abre em tela cheia num `<dialog>` modal, que prende o foco, trava a rolagem da página e fecha com Esc. A barra de acessibilidade abre por clique e pode ser arrastada para qualquer borda da tela (ou movida com Alt e as setas). Ela oferece cinco tamanhos de texto, alto contraste e pausa das animações, salvos no navegador. O tamanho de texto (`lib/text-scale.ts`) só altera textos de até 24 px, para não quebrar os títulos, e é reaplicado quando a página muda. O alto contraste leva os tokens de cor ao preto e branco do tema atual e aplica um filtro de contraste nas áreas com cores fixas da marca. Os textos da barra ficam em `lib/content.ts`. Todas as animações respeitam `prefers-reduced-motion`, e o conteúdo aparece sem JavaScript.

## Metas de qualidade

- Lighthouse mobile acima de 95 em performance, acessibilidade, boas práticas e SEO em todas as páginas. Meça com build de produção (`pnpm build && pnpm start`), não com o servidor de desenvolvimento.
- Contraste AA nos temas claro e escuro.
- `pnpm format`, `pnpm lint`, `pnpm typecheck`, `pnpm test` e `pnpm build` passando antes de cada merge.
