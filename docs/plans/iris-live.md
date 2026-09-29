# Plano: Iris com voz, avatar e RAG

Status: proposta, nada implementado. Pesquisa feita em 29/09/2026.

Objetivo: a Iris conversar por voz (e, se possível, com o avatar do Gemini 3.8 Live), responder só com fatos da IRTC e executar três ações no site: buscar na base de conhecimento, levar o visitante a uma seção ou página e preparar um e-mail para a IRTC que o visitante aprova antes de enviar.

## Opinião curta

Vale fazer, mas em etapas e com o avatar por último.

- A melhoria que mais reduz alucinação é o RAG, e ela serve para a Iris de texto de hoje. Começa por ele.
- Voz sem avatar é barata (uns US$ 0,15 por conversa de 3 minutos) e o acesso é simples.
- O avatar custa US$ 0,37 por minuto em que ele fala, cerca de 20 vezes o áudio, foi lançado com endpoints só nos EUA e na Europa, e a documentação dele só mostra acesso pela Google Cloud (Agent Platform) com token OAuth. Primeiro um teste de acesso de meio dia, depois a decisão.
- Jev não é exagero no lugar certo. Ele classifica, não gera texto, custa US$ 0,042 por milhão de tokens de entrada e a saída é grátis. Serve para decidir "esses trechos respondem à pergunta?" antes de a Iris falar, e para etiquetar a base. O modelo barato da OpenAI entra só onde é preciso gerar texto: perguntas sintéticas para cada trecho, usadas na busca e na avaliação.

## O que a pesquisa encontrou

### Gemini 3.8 Live com Live Avatar

Anunciado em 24/09/2026 como GA ([blog do Google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-with-live-avatar/), [blog do Google Cloud](https://cloud.google.com/blog/products/ai-machine-learning/gemini-3-8-live-with-live-avatar-is-now-generally-available)).

Confirmado em documentação oficial:

- Modelo `gemini-3.8-live`, pela Live API (`BidiGenerateContent`, WebSocket). O avatar é ativado com `avatar_config` e `response_modalities: ["VIDEO"]`.
- O navegador conecta direto no Google com um token efêmero criado pelo nosso servidor ([ephemeral tokens](https://ai.google.dev/gemini-api/docs/live-api/ephemeral-tokens)). O token tem `uses`, `expireTime` (padrão 30 min), `newSessionExpireTime` (padrão 1 min) e `liveConnectConstraints`, que trava modelo, instruções e ferramentas. Sem isso, quem tem o token poderia trocar as instruções da Iris.
- Function calling durante a sessão, com modo `NON_BLOCKING` e agendamento `SILENT`, `WHEN_IDLE` ou `INTERRUPTED` ([capabilities](https://ai.google.dev/gemini-api/docs/live-api/capabilities)).
- Limites de sessão sem compressão de contexto: 15 min só áudio, 2 min áudio com vídeo. Com `ContextWindowCompressionConfig` a sessão não tem limite. A conexão WebSocket dura cerca de 10 min e precisa de retomada de sessão ([start-manage-session](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/start-manage-session)).
- Áudio: entrada PCM 16 bits 16 kHz mono, saída PCM 24 kHz. VAD automático com interrupção pela fala do visitante. Transcrição dos dois lados disponível.
- Preço do áudio ([pricing](https://ai.google.dev/gemini-api/docs/pricing)): entrada US$ 3/1M tokens (cerca de US$ 0,005/min), saída US$ 12/1M (cerca de US$ 0,018/min).
- Preço na Agent Platform ([pricing](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing)): saída de vídeo do avatar a US$ 1/1M tokens, a 6.192 tokens por segundo de vídeo, ou seja, US$ 0,37 por minuto. Só cobra enquanto o avatar fala. Texto de entrada US$ 0,75/1M, texto de saída US$ 4,50/1M.
- Cobrança por turno: todo o contexto acumulado da sessão (instruções, trechos do RAG, áudio anterior a 25 tokens/s) é cobrado de novo a cada turno, até o limite da janela. Conversas longas ficam mais caras por minuto; compressão de contexto e instruções curtas reduzem isso.
- Avatares prontos (por exemplo `avatar_name: "Ben"`) estão disponíveis para todos. Avatares personalizados a partir de uma foto são só para clientes selecionados, via time de conta do Google Cloud ([configure live avatars](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/configure-live-avatars)).
- Google Workspace não dá acesso à API. O Gemini do Workspace é outro produto, com outra cobrança.
- No plano gratuito da API o Google pode usar entradas e saídas para melhorar produtos, com revisão humana ([termos](https://ai.google.dev/gemini-api/terms)). Com a Iris recebendo nome, e-mail e ideia de projeto de visitantes brasileiros, só usar chave com faturamento ativo (plano pago).
- File Search do Gemini não funciona na Live API. O RAG tem que ser nosso, exposto como ferramenta.

Não confirmado (fontes secundárias ou conflitantes):

- Se `avatar_config` funciona com chave do AI Studio. A documentação do avatar só mostra o endpoint regional da Agent Platform com token OAuth, e não fala de token efêmero para o navegador. Se não houver, a sessão precisa de um relay nosso (Cloud Run, por exemplo), porque a Vercel não segura WebSocket longo.
- Disponibilidade do avatar no Brasil. O anúncio fala em endpoints nos EUA e na Europa; o modelo de áudio aparece em `southamerica-east1`.
- Formato do vídeo (MP4 fragmentado, H.264 + AAC, segundo uma issue no GitHub), latência e resolução.
- Limite de sessões simultâneas por tier.

### Jev (TypeSafe)

Confirmado na [documentação](https://docs.typesafe.ai/llms.txt):

- `POST https://api.typesafe.ai/v1/systemone`, `Authorization: Bearer`, modelo `jev-latest` (hoje `jev-1.13.0`). SDK `@typesafe-ai/sdk`, Node 20+, lê `TYPESAFE_API_KEY`.
- US$ 0,042 por 1M tokens de entrada, saída grátis. 1.200 requisições/min. Estado até 32k tokens.
- Três tipos de pergunta: `choice`, `noul` (probabilidade de sim) e `score`. Várias perguntas sobre o mesmo estado rodam em paralelo numa chamada.
- O cookbook [classifying_rag_passages](https://docs.typesafe.ai/cookbooks/classifying_rag_passages.md) é quase o que precisamos: perguntas `is_relevant` e `contains_answer_evidence` por trecho, com roteamento por limiar.

Não confirmado: latência em milissegundos (não publicada) e precisão em português e espanhol (a documentação só diz que inglês é o melhor). Os dois precisam ser medidos aqui antes de colocar o Jev no caminho da voz.

### OpenAI e embeddings

- `text-embedding-3-small`: US$ 0,02/1M tokens. A base inteira (cerca de 300 trechos de 300 tokens) custa US$ 0,002 por geração.
- `gpt-5-nano`: US$ 0,05/0,40 por 1M (entrada/saída). `gpt-6-luna`, lançado em 22/09/2026: US$ 0,10/0,50. Qualquer um serve para gerar perguntas sintéticas; a diferença de custo aqui é de centavos.
- `gemini-embedding-2`: US$ 0,20/1M. Tiraria uma dependência, mas a Iris de texto já usa OpenAI. Proposta: `text-embedding-3-small`.

### Onde guardar os vetores

A base tem poucas centenas de trechos. Um JSON gerado por script, com os vetores, e busca por cosseno em memória resolve sem banco, sem custo e sem cold start. Upstash Vector ou pgvector só se a base passar de alguns milhares de trechos ou precisar mudar sem deploy.

## Custos estimados

Preços oficiais da Agent Platform. Premissa de uma conversa de 3 minutos: visitante fala 1 min, Iris fala 1,5 min, 10 turnos, uns 3 mil tokens de instruções e trechos do RAG.

| Item                                                | Por conversa de 3 min  | 100 conversas/mês | 500 conversas/mês |
| --------------------------------------------------- | ---------------------- | ----------------- | ----------------- |
| Voz (áudio de saída + contexto recobrado por turno) | ~US$ 0,15              | ~US$ 15           | ~US$ 75           |
| Avatar (90 s falando × US$ 0,37/min)                | ~US$ 0,56 a mais       | ~US$ 56 a mais    | ~US$ 280 a mais   |
| Jev no portão de resposta (5 trechos por pergunta)  | < US$ 0,001            | < US$ 0,10        | < US$ 0,50        |
| Embeddings e curadoria da base                      | por deploy, < US$ 0,01 | < US$ 1           | < US$ 1           |

O avatar é quase 80% do custo. Uma conversa longa (10 min, com a Iris falando metade) passa de US$ 2 com avatar. Se o avatar entrar, precisa de teto diário global e de queda para só voz quando o teto chegar.

## Arquitetura proposta

```
Navegador (ilha carregada só ao abrir a Iris)
  │ 1. POST /api/iris/live-token  → token efêmero (uses: 1, expira em 10 min,
  │                                  modelo, instruções e ferramentas travados)
  │ 2. WebSocket direto com o Gemini Live (áudio, e vídeo se houver avatar)
  │ 3. Gemini pede uma ferramenta → o navegador executa:
  │      search_company_knowledge(query) → POST /api/iris/knowledge
  │      navigate_to(target)             → só destinos de uma lista fixa
  │      propose_contact_email(...)      → mostra rascunho; visitante aprova;
  │                                        envio pelo /api/contact que já existe
  ▼
/api/iris/knowledge
  embedding da pergunta → top 8 por cosseno no JSON (filtrado por idioma)
  → Jev: is_relevant + contains_answer_evidence por trecho, em paralelo
  → devolve até 4 trechos, ou { evidence: "none" } e a Iris diz que não sabe
```

Decisões e motivos:

- Ferramentas executadas no navegador, não no servidor. A Live API conversa com o navegador; o servidor não fica no meio da sessão (Vercel serverless não segura WebSocket longo). Por isso toda ferramenta que tem efeito chama uma rota nossa que valida tudo de novo, como o `/api/contact` já faz.
- A Iris nunca envia e-mail sozinha. Ela propõe, o visitante vê o texto e confirma. Mesmo fluxo do rascunho de escopo atual.
- `navigate_to` aceita só IDs de uma lista gerada de `lib/routes.ts` e das seções da página (`servicos`, `projetos`, `depoimentos`, `contato`...). Qualquer outro valor é ignorado.
- O token expira em 10 minutos, o que limita o tamanho de uma conversa e o custo de um token vazado. `uses: 1`.
- A base de conhecimento só tem conteúdo publicado do próprio site (`lib/company.ts`, `lib/services.ts`, `lib/copy/*`, `lib/content.ts`). Nunca leads, conversas ou material privado, como já diz `docs/architecture.md`. Os itens da tabela "Conteúdo provisório" de `docs/site-guide.md` ficam fora até serem confirmados.
- A Iris de texto continua existindo e passa a usar a mesma busca. Ela é o caminho para quem não quer ou não pode usar microfone, e o fallback quando a voz falha ou o teto de custo chega.
- Sem avatar do Google, a alternativa é voz do Gemini com um avatar nosso animado pela amplitude do áudio: Three.js no desktop (regra do projeto) e SVG/CSS no celular.

Riscos conhecidos:

- `lib/rate-limit.ts` guarda contadores em memória, por instância da Vercel. Serve contra abuso de um IP, mas não é um teto de custo confiável. Para o teto global do Live, usar Upstash Redis (plano gratuito) ou o limite de gasto do próprio projeto no Google.
- Latência do Jev dentro da conversa por voz. Se passar de uns 800 ms, o portão cai para limiar de cosseno e o Jev fica só na curadoria offline e na avaliação.
- Safari no iOS tem regras próprias para microfone e áudio. Testar em aparelho real.
- O site não tem página de privacidade. Gravar voz de visitante pede aviso claro antes de ligar o microfone e, idealmente, uma política publicada. O texto dessa política precisa vir da IRTC.

## Tarefas

Cada tarefa é pequena, tem arquivos definidos e critério de pronto. A coluna "Modelo" sugere quem executa: Haiku para trabalho mecânico, Sonnet para lógica moderada, Opus para segurança e revisão. Toda tarefa termina com as cinco checagens do CLAUDE.md passando.

### Fase 0: acesso e prova de conceito

| #   | Tarefa                                                                                                                                                                                                                                                             | Modelo | Pronto quando                                             |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ | --------------------------------------------------------- |
| 0.1 | Contas e chaves (passo a passo no fim deste documento)                                                                                                                                                                                                             | você   | chaves no `.env` local e na Vercel                        |
| 0.2 | Script `scripts/spike-live.mjs` (fora do build): abre sessão Live com `GEMINI_API_KEY`, manda um áudio de teste em pt-BR, registra tempo até o primeiro áudio. Repete com `avatar_config` e registra se aceita, o formato do vídeo e o tempo até o primeiro quadro | Sonnet | relatório com "funciona / erro exato" para áudio e avatar |
| 0.3 | Se o avatar falhar com a chave do AI Studio, repetir pela Vertex AI (projeto Google Cloud)                                                                                                                                                                         | Sonnet | idem                                                      |
| 0.4 | Medir latência do Jev: 20 chamadas com 5 trechos em pt-BR, p50 e p95                                                                                                                                                                                               | Haiku  | números anotados neste documento                          |
| 0.5 | Decisão: A) avatar pela chave do AI Studio, B) avatar só pela Google Cloud, C) voz + avatar próprio                                                                                                                                                                | você   | caminho escolhido anotado aqui                            |

### Fase 1: base de conhecimento (melhora a Iris de texto já)

| #   | Tarefa                                                                                                                                                                                                                           | Modelo | Pronto quando                                                                                                                  |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------ |
| 1.0 | Correção à parte: `components/iris.tsx` é cliente e importa `content` como valor, o que manda os três idiomas ao navegador (regra do CLAUDE.md). Passar os textos como props                                                     | Haiku  | `import type` apenas; commit separado                                                                                          |
| 1.1 | `lib/knowledge/sources.ts`: transforma `company.ts`, `services.ts`, `copy/*` e o FAQ em trechos `{ id, locale, source, href, text }`. Função pura                                                                                | Haiku  | teste: todo serviço tem trecho nos três idiomas; nenhum trecho passa de ~400 tokens                                            |
| 1.2 | Excluir os itens de "Conteúdo provisório" de `docs/site-guide.md`                                                                                                                                                                | Haiku  | teste falha se um trecho contém um número provisório de `lib/stats.ts` ou detalhe de `copy/founder.ts` marcado como provisório |
| 1.3 | `scripts/build-knowledge.mjs`: gera embeddings (`text-embedding-3-small`) e grava `lib/knowledge/index.json` com hash do texto de cada trecho                                                                                    | Sonnet | JSON versionado; rodar duas vezes sem mudança não altera o arquivo                                                             |
| 1.4 | Teste que compara os hashes de `sources.ts` com o `index.json` e falha pedindo para rodar o script. O CI não precisa de chave                                                                                                    | Haiku  | teste falha ao editar um serviço sem regenerar                                                                                 |
| 1.5 | No mesmo script: Jev etiqueta cada trecho (`service` com os IDs reais de `lib/services.ts` + `none`; `is_verifiable_fact` como noul) e o modelo barato da OpenAI gera 3 perguntas prováveis por trecho no idioma do trecho       | Sonnet | etiquetas e perguntas no JSON; custo da execução anotado                                                                       |
| 1.6 | `lib/knowledge/search.ts`: cosseno, top-k, filtro por idioma com fallback para pt-BR, perguntas sintéticas entram na pontuação                                                                                                   | Haiku  | testes com vetores falsos                                                                                                      |
| 1.7 | `lib/knowledge/gate.ts`: Jev com `is_relevant` e `contains_answer_evidence` por trecho, em paralelo, timeout de 1,5 s com fallback para limiar de cosseno                                                                        | Sonnet | testes com `fetch` simulado cobrindo sucesso, "nenhuma evidência", timeout e 429                                               |
| 1.8 | Conjunto de avaliação `tests/fixtures/iris-eval.json`: 30 perguntas por idioma, com o trecho esperado, perguntas que a base não responde e tentativas de injeção. Script `scripts/eval-iris.mjs` (precisa de chaves, fora do CI) | Sonnet | relatório de acerto de busca e de recusa; limiares do 1.7 calibrados com ele                                                   |
| 1.9 | Iris de texto usa busca + portão no lugar do bloco fixo `companyKnowledge`, mantendo toda a política de `lib/iris-policy.ts`                                                                                                     | Opus   | `tests/iris-security.test.ts` verde sem afrouxar nada; avaliação igual ou melhor que antes                                     |

### Fase 2: Iris por voz (sem avatar)

| #    | Tarefa                                                                                                                                                                                                                                              | Modelo | Pronto quando                                                                                   |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------- |
| 2.1  | `lib/iris-live-tools.ts`: declarações das ferramentas (`search_company_knowledge`, `navigate_to` com enum de destinos, `propose_contact_email`, `end_conversation`) e validação dos argumentos                                                      | Sonnet | testes: destino fora da lista é rejeitado; e-mail inválido é rejeitado                          |
| 2.2  | `app/api/iris/live-token/route.ts`: cria o token efêmero com `uses: 1`, expiração de 10 min e `liveConnectConstraints` (modelo, instruções da Iris, ferramentas, modalidades). Limite por IP, teto diário global, `IRIS_LIVE_ENABLED` para desligar | Opus   | testes cobrindo limite, teto, chave ausente e flag desligada; instruções nunca vêm do navegador |
| 2.3  | `app/api/iris/knowledge/route.ts`: valida a pergunta (mesma normalização da Iris de texto), limita por IP, chama busca + portão                                                                                                                     | Haiku  | testes de entrada inválida, limite e resposta sem evidência                                     |
| 2.4  | Instruções da Iris por voz em `lib/iris-policy.ts`: sempre chamar `search_company_knowledge` antes de afirmar fato; sem evidência, dizer que não sabe e oferecer contato; respostas curtas faladas                                                  | Opus   | casos de voz adicionados aos testes de segurança                                                |
| 2.5  | `lib/audio/`: captura do microfone em PCM 16 kHz com `AudioWorklet` e reprodução em 24 kHz, com interrupção                                                                                                                                         | Sonnet | teste manual no Chrome e no Safari do macOS                                                     |
| 2.6  | `components/iris-live.tsx`: tela de consentimento (aviso de IA e de microfone), conectar, legenda ao vivo com a transcrição, mudo, encerrar, retomada de sessão ao receber `goAway`, volta para o texto em qualquer erro                            | Sonnet | funciona com teclado e leitor de tela; `.motion-paused` e movimento reduzido respeitados        |
| 2.7  | Handler de `navigate_to`: `scrollIntoView` para seções, `router.push` para páginas, destaque breve na seção                                                                                                                                         | Haiku  | teste com lista de destinos                                                                     |
| 2.8  | Handler de `propose_contact_email`: mostra o rascunho no mesmo componente do rascunho de escopo e só envia depois do clique do visitante                                                                                                            | Haiku  | teste: sem clique, nenhum `fetch` para `/api/contact`                                           |
| 2.9  | Textos novos em `lib/content.ts` nos três idiomas                                                                                                                                                                                                   | Haiku  | comparação manual pt-BR/en/es                                                                   |
| 2.10 | `next.config.ts`: `wss://generativelanguage.googleapis.com` em `connect-src` e `microphone=(self)` em `Permissions-Policy`                                                                                                                          | Haiku  | teste de cabeçalhos                                                                             |
| 2.11 | Tudo da voz carregado só ao clicar em "Falar com a Iris". Usar o protocolo WebSocket direto ou importar `@google/genai` dinamicamente                                                                                                               | Sonnet | Lighthouse mobile acima de 95 nas quatro categorias                                             |
| 2.12 | Eventos no GA4 via `lib/analytics.ts`: início de voz, ferramenta usada, e-mail proposto e aprovado, queda para texto. Sem conteúdo da conversa                                                                                                      | Haiku  | eventos aparecem no modo debug do GTM                                                           |
| 2.13 | Teste em iPhone e Android reais                                                                                                                                                                                                                     | você   | microfone, áudio e retomada funcionando                                                         |

### Fase 3: avatar

Caminho A ou B da decisão 0.5:

| #   | Tarefa                                                                                                                             | Modelo | Pronto quando                               |
| --- | ---------------------------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------- |
| 3.1 | `avatar_config` nas restrições do token; vídeo tocado num `<video>` via Media Source Extensions no formato que o 0.2 encontrou     | Sonnet | avatar fala com lábios sincronizados        |
| 3.2 | Compressão de contexto e reconexão a cada ~10 min com o handle de retomada, sem corte perceptível                                  | Sonnet | conversa de 6 minutos sem o visitante notar |
| 3.3 | Pôster estático enquanto conecta; queda para só voz se o vídeo falhar ou o teto diário do avatar chegar                            | Haiku  | teste com teto zerado                       |
| 3.4 | Caminho B: autenticação da Vercel no Google Cloud por OIDC (Workload Identity Federation), sem arquivo de chave de service account | Opus   | token criado em produção sem chave estática |

Caminho C: avatar próprio.

| #   | Tarefa                                                                                           | Modelo | Pronto quando                                          |
| --- | ------------------------------------------------------------------------------------------------ | ------ | ------------------------------------------------------ |
| 3.5 | Avatar SVG/CSS animado pela amplitude do áudio de saída, para celular e desktop                  | Sonnet | anima só enquanto a Iris fala; movimento reduzido para |
| 3.6 | Versão Three.js no desktop, carregada ociosa, reaproveitando o pipeline de `lib/studio-scene.ts` | Sonnet | Lighthouse desktop sem regressão                       |

### Fase 4: documentação e operação

| #   | Tarefa                                                                                       | Modelo | Pronto quando                      |
| --- | -------------------------------------------------------------------------------------------- | ------ | ---------------------------------- |
| 4.1 | Atualizar `docs/architecture.md` (Iris), `README.md` e `.env.example` com as variáveis novas | Haiku  | revisado                           |
| 4.2 | Alertas de orçamento no Google Cloud, OpenAI e TypeSafe                                      | você   | e-mail de alerta de teste recebido |
| 4.3 | Política de privacidade com o uso de voz e dos provedores (texto da IRTC)                    | você   | página publicada                   |
| 4.4 | Revisão de segurança de toda a Fase 2 e 3 (OWASP LLM01, LLM06, LLM07, LLM10)                 | Opus   | achados corrigidos                 |

## Variáveis de ambiente novas

```
GEMINI_API_KEY=            # servidor apenas; nunca NEXT_PUBLIC_
GEMINI_LIVE_MODEL=gemini-3.8-live
IRIS_LIVE_ENABLED=false
IRIS_LIVE_AVATAR=false
TYPESAFE_API_KEY=
```

`OPENAI_API_KEY` já existe e passa a gerar embeddings também. Se ela for uma chave restrita, liberar o endpoint de embeddings.

## Passo a passo: contas e chaves

### 1. Google Cloud (para o Gemini)

1. Entre em https://console.cloud.google.com com a conta do Workspace da IRTC. Se aparecer um aviso de organização, é o Workspace criando a organização `irtc.com.br` no Google Cloud; aceite.
2. Crie um projeto, por exemplo `irtc-iris`.
3. Em Faturamento, crie uma conta de faturamento com o cartão da empresa e vincule ao projeto. Sem faturamento a chave fica no plano gratuito, em que o Google pode usar as conversas para treinar modelos. Não use chave sem faturamento em produção.
4. Em Faturamento > Orçamentos e alertas, crie um orçamento mensal (sugestão: US$ 50 enquanto não houver avatar) com alertas em 50%, 90% e 100%.
5. Se o console bloquear alguma etapa por política da organização (por exemplo `iam.disableServiceAccountKeyCreation`), anote a mensagem exata e me mande. A tarefa 3.4 evita chaves de service account justamente por isso.

### 2. Chave do Gemini (AI Studio)

1. Abra https://aistudio.google.com com a mesma conta.
2. Get API key > Create API key > escolha o projeto `irtc-iris` (o que tem faturamento).
3. No console do Google Cloud, em APIs e serviços > Credenciais, abra a chave e restrinja a "Generative Language API".
4. Cole em `apps/site/.env.local` como `GEMINI_API_KEY=`. Não cole a chave no chat.
5. Confira no AI Studio que o projeto aparece com o nível pago (Tier 1).

### 3. Avatar

1. Depois da tarefa 0.2, se o avatar não funcionar pela chave, habilite a "Vertex AI API" no projeto e me avise; eu rodo o 0.3.
2. Se nenhum dos dois funcionar, a liberação é pelo time de vendas do Google Cloud (formulário de contato em https://cloud.google.com/contact). Peça acesso ao Live Avatar do Gemini 3.8 Live para o projeto `irtc-iris`, região mais próxima do Brasil disponível. Avatares personalizados com foto também passam por esse contato.

### 4. TypeSafe (Jev)

1. Na conta TypeSafe que você já tem, gere uma chave de API.
2. Cole em `apps/site/.env.local` como `TYPESAFE_API_KEY=`.
3. Confira se há limite de gasto ou alerta disponível na conta e ative.

### 5. OpenAI

1. A `OPENAI_API_KEY` atual serve. Em https://platform.openai.com > API keys, se ela tiver permissões restritas, libere "Embeddings" e "Responses".
2. Em Limits, confirme o limite mensal de gasto do projeto.

### 6. Vercel

1. Em Settings > Environment Variables do projeto, adicione `GEMINI_API_KEY`, `TYPESAFE_API_KEY`, `GEMINI_LIVE_MODEL`, `IRIS_LIVE_ENABLED=false` e `IRIS_LIVE_AVATAR=false` para Production e Preview.
2. As flags ficam `false` em produção até a Fase 2 passar no teste em aparelhos reais. Em Preview podem ser `true`.

## Pendências de verificação

Nada abaixo foi confirmado em fonte oficial durante a pesquisa. A Fase 0 existe para resolver os primeiros itens antes de qualquer código no site.

- Acesso ao avatar por chave do AI Studio ou só pela Google Cloud.
- Avatar disponível para visitantes no Brasil e a latência a partir daqui.
- Formato do stream de vídeo, resolução e latência do avatar.
- Limite de sessões Live simultâneas no Tier 1.
- Latência do Jev e precisão em pt-BR e espanhol.
- Tamanho do `@google/genai` no bundle.
