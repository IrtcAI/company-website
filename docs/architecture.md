# Arquitetura da IRTC e do site

## Propósito

A IRTC é uma fábrica de software de Belém do Pará. O foco é converter problemas de negócio em produtos, sistemas de operação, dados e IA aplicada com entrega rápida, qualidade sustentável e suporte próximo.

## Capacidades empresariais

| Frente | Entregas típicas | Medida de qualidade |
| --- | --- | --- |
| Produtos digitais | SaaS, portais B2B, apps e plataformas | adoção, tempo para valor, disponibilidade |
| Sistemas de negócio | ERP, CRM, marketplace e financeiro | confiabilidade do fluxo, dados corretos, produtividade |
| IA aplicada | RAG, agentes, busca semântica e avaliação | utilidade, segurança, custo por tarefa |
| Integração e dados | APIs, ETL, ELT, eventos e observabilidade | latência, rastreabilidade, recuperação |

## Site atual

```text
apps/site
  app/                 páginas, metadados, sitemap e rotas HTTP
  components/          experiência institucional e Iris
  lib/                 validação e limite de requisições
docs/architecture.md   fonte de verdade de decisões e limites
```

O site usa Next.js com React, renderização estática do conteúdo institucional e JavaScript apenas para o typing do hero, formulário e Iris. CSS nativo mantém o custo de entrega baixo e respeita `prefers-reduced-motion`.

## Integrações

| Serviço | Responsabilidade | Variáveis |
| --- | --- | --- |
| OpenAI Responses API | resposta curta da Iris | `OPENAI_API_KEY`, `OPENAI_MODEL` |
| Resend | e-mail de contato e escopo aprovado | `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO` |

As chaves nunca entram no código ou no Git. A configuração está exemplificada em `.env.example`.

## Iris: limites de produto e segurança

Iris é uma assistente de descoberta, não uma assistente geral. Ela só pode explicar a IRTC ou produzir um esboço de MVP com até três pontos e 250 caracteres. O backend valida tamanho, aplica rate limit, recusa tentativas de mudança de papel ou execução de código e instrui o modelo a responder fora de escopo com uma recusa fixa.

O conhecimento atual é um corpus pequeno e versionado no cliente, adequado ao conteúdo institucional. Quando o conteúdo crescer, a evolução aprovada é Postgres + pgvector: ingestão de fontes aprovadas, embeddings por documento, recuperação limitada aos cinco trechos mais relevantes, metadados de origem e avaliação de respostas antes da publicação. Não indexar dados de leads ou conteúdo privado no RAG.

## E-mail e lead

O formulário e a aprovação de rascunho chamam a rota `/api/contact`. A rota valida campos, contém um honeypot e envia e-mail por Resend para `CONTACT_TO`. Para produção multi-instância, trocar o rate limiter em memória por uma store compartilhada, como Upstash Redis, antes de ampliar tráfego.

## Acessibilidade, SEO e performance

- HTML semântico, landmarks, skip link, labels, mensagens de status e foco visível.
- Contraste alto, layout fluido, alvos de toque adequados e redução de movimento respeitada.
- `metadata`, canonical, `robots.txt`, sitemap, Open Graph e JSON-LD de Organization, ProfessionalService e FAQ.
- Sem bibliotecas visuais pesadas, sem imagens de herói e sem scripts de terceiros no carregamento inicial.

## Operação antes do lançamento

1. Configurar DNS/hosting do domínio para a plataforma de deploy escolhida.
2. Verificar domínio de envio no Resend e definir `CONTACT_FROM` com remetente autorizado.
3. Adicionar chaves de OpenAI e Resend no ambiente do deploy.
4. Substituir o rate limit local por armazenamento distribuído caso o site tenha múltiplas instâncias.
5. Rodar Lighthouse mobile e desktop, teclado/VoiceOver e testes de formulários antes de publicar.
