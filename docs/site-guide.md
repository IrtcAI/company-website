# Guia de produto e conteúdo do site

## Fonte de verdade

Antes de alterar linguagem, dados empresariais ou comportamento, consulte este guia, `architecture.md` e `apps/site/lib/content.ts`. A apresentação é institucional: não usar a identidade pessoal do fundador como argumento de venda.

| Fonte | Uso permitido | Limite |
| --- | --- | --- |
| Material institucional fornecido | capacidades, tecnologias e indicadores contextualizados | não transformar em promessa universal |
| Recomendações públicas do LinkedIn | sínteses de colaboração, qualidade e entregas | não reproduzir como citação literal nem inventar endossos |
| Páginas públicas de marcas | logo e imagem pública que ilustra o produto | não declarar autoria de toda a plataforma |
| `content.ts` | toda cópia exibida em PT-BR, EN e ES | manter as três versões equivalentes |

## Organização técnica

```text
apps/site
  app/                 rotas, SEO, sitemap e APIs
  app/[locale]/        páginas estáticas em inglês e espanhol
  components/          experiência institucional, hero 3D e Iris
  lib/                 conteúdo, localização, política da Iris e validação
  public/brands        logotipos de marcas públicas
  public/projects      imagens públicas dos produtos
  tests/               testes unitários, componentes e rotas
```

O monorepo usa pnpm workspaces. Novos produtos entram como apps independentes, sem placeholders nem dependências cruzadas.

## Experiência

O hero tem uma cena Three.js de objetos de trabalho: terminal, telefone, banco de dados e servidor. Ela carrega após o conteúdo principal e tem fallback visual para falha de WebGL. O botão de pausa e `prefers-reduced-motion` removem movimento não essencial.

Navegação interna mantém a URL limpa e transfere foco para a seção. Há skip link, landmarks, títulos, rótulos, estados de carregamento e confirmação de encerramento da Iris. O tema padrão segue o sistema; claro e escuro ficam salvos somente no navegador.

PT-BR é a base. EN e ES têm rotas indexáveis em `/en` e `/es`, com `hreflang`, sitemap e metadados próprios. Na raiz, a prioridade é preferência salva, país informado pelo host confiável e `Accept-Language`. O país é aceito apenas do cabeçalho da Vercel em produção; não há GPS nem consulta de IP de terceiros.

## Ativos e portfólio

Logos e imagens ficam locais para desempenho e previsibilidade. Cada cartão identifica a imagem como pública e ilustrativa, sem alegar autoria integral da plataforma.

| Marca | Origem |
| --- | --- |
| LeafLink | página institucional e mídia pública da LeafLink |
| Dasa | página institucional e mídia pública da Dasa |
| Perfect Pay | página institucional e mídia pública da Perfect Pay |
| Tecnologias | ícones oficiais distribuídos por Simple Icons; AWS usa símbolo genérico de cloud |

Revalidar permissões de marca antes de qualquer campanha paga ou uso além do portfólio.

## Iris e operações

Iris explica a IRTC ou elabora uma ideia inicial de MVP em no máximo três pontos e 250 caracteres. O corpus institucional fica no servidor. A rota ignora conhecimento entregue pelo cliente, limpa papéis de sistema no histórico, recusa execução de código e limita solicitações. Isso reduz exposição, mas não dispensa avaliação de segurança antes de ampliar o produto.

A evolução aprovada do corpus é PostgreSQL com pgvector: fontes aprovadas, embeddings por documento, até cinco trechos recuperados, metadados de origem e avaliação. Nunca indexar leads, conversas ou materiais privados no RAG público.

Formulário e aprovação de rascunho usam `/api/contact`, validação, honeypot, limite de requisições e Resend. Em múltiplas instâncias, mover o limite local para Redis/Upstash.

## Antes de lançar

1. Configurar domínio, HTTPS e variáveis de ambiente no deploy.
2. Verificar o domínio de envio no Resend.
3. Configurar OpenAI somente se a Iris for ativada.
4. Executar `pnpm test`, `pnpm lint`, `pnpm typecheck` e `pnpm build`.
5. Rodar Lighthouse e validar teclado, leitor de tela e os três idiomas.
