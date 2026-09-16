# IRTC Platform

Monorepo `pnpm` da IRTC. Hoje abriga o site institucional em `apps/site`; novos apps entram somente quando houver escopo real.

## Rodar localmente

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

## Configuração de produção

- `OPENAI_API_KEY` ativa Iris com a API Responses da OpenAI.
- `RESEND_API_KEY`, `CONTACT_FROM` e `CONTACT_TO` ativam e-mails de contato e aprovação de escopo.
- Sem a chave da OpenAI, Iris usa respostas locais restritas ao escopo. Sem Resend, o formulário informa o e-mail direto.

## Verificação

```bash
pnpm typecheck
pnpm lint
pnpm build
```
