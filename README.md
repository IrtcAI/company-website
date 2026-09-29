# IRTC

Monorepo `pnpm` da IRTC. Hoje contém só o site institucional, em `apps/site` (Next.js 16, React 19 e TypeScript). Novos apps só entram aqui quando houver escopo real.

## Rodar localmente

```bash
pnpm install
cp .env.example .env
pnpm dev
```

O `next.config.ts` lê o `.env` da raiz do monorepo. Variáveis definidas em `apps/site/.env.local` têm prioridade.

## Variáveis de ambiente

| Variável                         | Para que serve                                                            | Sem ela                                              |
| -------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------- |
| `OPENAI_API_KEY`                 | Iris usa a API Responses da OpenAI; também assina o histórico da conversa | Iris responde com textos locais, restritos ao escopo |
| `OPENAI_MODEL`                   | modelo usado pela Iris                                                    | usa `gpt-5-mini`                                     |
| `RESEND_API_KEY`, `CONTACT_FROM` | envio do formulário de contato e dos rascunhos aprovados na Iris          | o formulário avisa que o envio não está configurado  |
| `CONTACT_TO`                     | caixa que recebe os contatos                                              | `contato@irtc.com.br`                                |
| `NEXT_PUBLIC_GTM_ID`             | Google Tag Manager, carregado só depois do aceite de cookies              | nenhum analytics e nenhum aviso de cookies           |

Na hospedagem, cadastre as mesmas variáveis no painel do provedor. `NEXT_PUBLIC_GTM_ID` entra no bundle durante o build.

## Comandos

Rode na raiz; todos repassam para `apps/site`.

```bash
pnpm dev         # servidor de desenvolvimento
pnpm build       # build de produção
pnpm start       # serve o build
pnpm test        # Vitest
pnpm lint        # ESLint e Prettier (checagem)
pnpm typecheck   # TypeScript
pnpm format      # Prettier (escrita)
pnpm knowledge   # regenera o índice de conhecimento da Iris após mudanças de conteúdo (precisa OPENAI_API_KEY)
```

Antes de abrir um PR: `pnpm format && pnpm lint && pnpm typecheck && pnpm test && pnpm build`.

Para avaliar a qualidade das respostas da Iris: `pnpm --filter @irtc/site eval:iris` (precisa `OPENAI_API_KEY`, não roda em CI, escreve em `apps/site/eval-results/`).

## Estrutura

```text
apps/site
  app/            rotas: home (pt-BR em /, en e es em /en e /es), [locale]/services, about,
                  founder, contact, APIs (/api/chat, /api/contact), sitemap, robots, llms.txt
  layout/         layout raiz (metadados globais, splash, fontes)
  components/     componentes; os de servidor montam a página e ilhas "use client" cuidam da interação
  lib/            dados e regras: conteúdo, serviços, empresa, rotas, SEO, Iris, validação
  styles/         CSS global e por área, importado em layout/main.tsx
  public/         imagens, posters dos objetos 3D (studio/), mapa (world-dots.svg), fotos
  scripts/        geradores de posters 3D, do mapa e das fotos da página Sobre
  tests/          testes de componentes, rotas e segurança da Iris
docs/             arquitetura, guia de conteúdo e origem das imagens
```

### Rotas localizadas

As URLs públicas são traduzidas e reescritas para `app/[locale]/<página>` (veja `lib/routes.ts`):

| Página   | pt-BR              | en                    | es                     |
| -------- | ------------------ | --------------------- | ---------------------- |
| Serviços | `/servicos`        | `/en/services`        | `/es/servicios`        |
| Serviço  | `/servicos/<slug>` | `/en/services/<slug>` | `/es/servicios/<slug>` |
| Sobre    | `/sobre`           | `/en/about`           | `/es/nosotros`         |
| Fundador | `/fundador`        | `/en/founder`         | `/es/fundador`         |
| Contato  | `/contato`         | `/en/contact`         | `/es/contacto`         |

`proxy.ts` redireciona a raiz `/` para `/en` ou `/es` conforme cookie, país (na Vercel) ou idioma do navegador.

## Onde editar

| O quê                                        | Arquivo                                                      |
| -------------------------------------------- | ------------------------------------------------------------ |
| Textos da home, menu, rodapé, contato e Iris | `lib/content.ts`                                             |
| Serviços (títulos, slugs, FAQ, entregas)     | `lib/services.ts`                                            |
| Páginas Sobre, Fundador e títulos de SEO     | `lib/copy/`                                                  |
| Endereço, horário, e-mail e redes            | `lib/company.ts`                                             |
| Números da seção de estatísticas             | `lib/stats.ts` (há valores provisórios, marcados no arquivo) |
| Conhecimento e regras da Iris                | `lib/iris-policy.ts`                                         |

Toda cópia existe em pt-BR, en e es. Mantenha as três versões equivalentes.

## SEO, AEO e analytics

`sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt` e os dados estruturados (schema.org) são gerados a partir de `lib/routes.ts`, `lib/services.ts` e `lib/company.ts`. Uma página ou serviço novo aparece em todos eles sem edição extra.

O analytics é o Google Tag Manager (`@next/third-parties`). Ele só carrega depois que o visitante aceita o aviso de cookies; a escolha fica salva no navegador e pode ser alterada pelo rodapé. O código envia ao `dataLayer` os eventos `iris_open`, `contact_submit` e `web_vitals`. O restante (GA4, conversões) é configurado no painel do GTM. Scripts de outros domínios em tags de HTML personalizado precisam ser liberados na CSP, em `next.config.ts`.

O Vercel Speed Insights mede os Core Web Vitals de visitantes reais. Ele não conta visitas nem usa cookies, então não depende do aviso.

## Performance

A meta é Lighthouse mobile acima de 95 em todas as categorias.

- Header, rodapé e seções estáticas são componentes de servidor. Não importe `lib/content.ts` ou `lib/services.ts` em componentes `"use client"`; passe só os textos necessários por props.
- O CSS sai num arquivo próprio, cacheado entre páginas. Não ative `experimental.inlineCss`: no Next 16.3 ele repete o CSS três vezes no HTML e piora o LCP.
- Os objetos 3D aparecem primeiro como imagens WebP (`public/studio`). O Three.js só carrega em desktop, depois que a página fica ociosa, e nunca com movimento reduzido.
- Para regenerar os posters depois de mudar um modelo em `lib/studio-scene.ts`: `node apps/site/scripts/render-posters.mjs <tipo>`.

## Hospedagem

O site precisa de um servidor Node (a Iris e o formulário são rotas de API). Está publicado na Vercel (plano Pro, exigido para uso comercial), que faz deploy do `main`. O Firebase App Hosting também serviria. Hospedagem compartilhada, como o cPanel da GoDaddy, não roda Next.js.

O domínio `irtc.com.br` pode continuar registrado na GoDaddy: aponte o registro `A` da raiz e o `CNAME` de `www` para o provedor. Não altere os registros `MX` e `TXT` do Google Workspace.
