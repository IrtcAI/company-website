# Guia de produto e conteúdo do site

## Fonte de verdade

Antes de alterar linguagem, dados empresariais ou comportamento, consulte este guia, `architecture.md` e `apps/site/lib/content.ts`. A apresentação é institucional. A seção de fundador foi solicitada explicitamente em setembro de 2026: nome, foto e breve apresentação ficam restritos a essa seção, sem transformar o restante do site em currículo.

| Fonte | Uso permitido | Limite |
| --- | --- | --- |
| Material institucional fornecido | capacidades, tecnologias e indicadores contextualizados | não transformar em promessa universal |
| Recomendações públicas do LinkedIn | sínteses de colaboração, qualidade e entregas | não reproduzir como citação literal nem inventar endossos |
| Páginas públicas de marcas | logo e imagem pública que ilustra o produto | não declarar autoria de toda a plataforma |
| `content.ts` e `components/founder.tsx` | cópia exibida em PT-BR, EN e ES | manter as três versões equivalentes |

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

O hero tem uma cena Three.js de objetos de trabalho: telefone, banco de dados, código e servidor. Ela carrega após o conteúdo principal, apenas em desktop, enquanto visível, e tem fallback CSS. Ao reduzir a janela para mobile ou ativar movimento reduzido, o canvas é liberado. O botão de pausa e `prefers-reduced-motion` removem movimento não essencial.

Na branch experimental `codex/scroll-story-founder`, `ScrollStory` transforma uma tela CSS 3D do hero na seção Nosso jeito. O scroll é nativo: uma etapa sticky usa transforms, sem re-renderizar React a cada frame. O conteúdo existe uma única vez em HTML. A cena fixada só funciona em telas de pelo menos 1024 × 760 CSS pixels, com espaço vertical para todo o texto. Mobile, pausa, movimento reduzido e ausência de JavaScript mantêm o conteúdo em fluxo normal. Mobile recebe uma breve abertura CSS quando o navegador suporta scroll timelines. Links internos calculam o destino da tela expandida sem adicionar fragmentos à URL.

Navegação interna mantém a URL limpa e transfere foco para a seção. Há skip link, landmarks, títulos, rótulos, estados de carregamento e confirmação de encerramento da Iris. O tema padrão segue o sistema; claro e escuro ficam salvos somente no navegador.

A sequência atual é hero → Nosso jeito (01) → O que construímos (02) → marcas → projetos (03) → recomendações (04) → origem → fundador → contato. `DevelopmentWorld` cria um símbolo </> com geometria extrudada e montagem/rotação ligadas ao progresso da seção 02. O canvas decorativo fica sticky no fundo; não contém informação exclusiva nem captura eventos. Só inicializa perto da seção, a partir de 1024px e sem movimento reduzido. A renderização ocorre apenas por scroll, resize ou mudança de estado, com liberação explícita de recursos. A pausa congela a pose.

A barra lateral de acessibilidade abre por ponteiro, botão ou teclado, fecha com Escape e devolve o foco ao acionador. Controles fechados ficam inertes. Tamanho de texto, alto contraste e pausa usam preferências locais; a pausa é compartilhada com as cenas, e o alto contraste oculta o fundo 3D. A barra fica à esquerda, separada da Iris.

PT-BR é a base. EN e ES têm rotas indexáveis em `/en` e `/es`, com `hreflang`, sitemap e metadados próprios. Na raiz, a prioridade é preferência salva, país informado pelo host confiável e `Accept-Language`. O país é aceito apenas do cabeçalho da Vercel em produção; não há GPS nem consulta de IP de terceiros.

## Ativos e portfólio

Logos e imagens ficam locais para desempenho e previsibilidade. Cada cartão identifica a imagem como pública e ilustrativa, sem alegar autoria integral da plataforma.

Os três projetos usam as capturas reais fornecidas em 22/09/2026, convertidas para WebP; ver `project-image-sources.md`. A apresentação recorta a interface do navegador e mantém superfícies pastel associadas a cada marca. O retrato do fundador usa uma composição de desenho técnico em camadas, sem alterar a fotografia.

| Marca | Origem |
| --- | --- |
| LeafLink | página institucional e mídia pública da LeafLink |
| Dasa | página institucional e mídia pública da Dasa |
| Perfect Pay | página institucional e mídia pública da Perfect Pay |
| Tecnologias | ícones oficiais distribuídos por Simple Icons; AWS usa símbolo genérico de cloud |
| Fundador | foto e resumo profissional do perfil público https://www.linkedin.com/in/iago-rodrigues/, consultado em setembro de 2026; retrato local `public/founder.webp`, 640 × 640, aproximadamente 51 KB, carregamento lazy |

Revalidar permissões de marca antes de qualquer campanha paga ou uso além do portfólio.

## Descoberta por LLMs

`public/llm.txt` é o guia factual público solicitado pelo usuário. `/llms.txt` serve o mesmo conteúdo por rewrite, seguindo o nome proposto em https://llmstxt.org/, sem duplicar a fonte. O HTML declara o guia com `rel="describedby"`. O arquivo explica capacidades, tecnologias, visão, fundador, contato, limites dos cases e como encontrar as seções nos três idiomas. Não publicar segredos, dados de leads, rotas internas ou promessas de ranking. Atualizar o guia junto de alterações materiais no conteúdo institucional; validar os dois endpoints depois de cada mudança na configuração de rotas.

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
