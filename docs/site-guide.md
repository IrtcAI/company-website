# Guia de conteúdo do site

Regras para textos, dados e imagens do site. Decisões técnicas ficam em `architecture.md`.

## Onde cada informação vive

| Informação                                                              | Arquivo                                                                         |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Textos da home, menu, rodapé, contato, Iris e aviso de cookies          | `apps/site/lib/content.ts`                                                      |
| Serviços: títulos, slugs, resumo, problemas, entregas, FAQ, tecnologias | `apps/site/lib/services.ts`                                                     |
| Páginas Serviços, Sobre e Fundador; títulos e descrições de SEO         | `apps/site/lib/copy/`                                                           |
| Endereço, horário, e-mail e redes sociais                               | `apps/site/lib/company.ts`                                                      |
| Números da faixa de estatísticas                                        | `apps/site/lib/stats.ts`                                                        |
| Fatos que a Iris pode usar                                              | `apps/site/lib/iris-policy.ts` (monta a partir de `company.ts` e `services.ts`) |

Sitemap, `llms.txt`, dados estruturados e o conhecimento da Iris leem esses arquivos. Mudou um dado? Mude na fonte, e o resto acompanha.

## Idiomas

Todo texto existe em pt-BR, en e es, com o mesmo sentido nas três versões. pt-BR é a base. Os slugs das páginas e dos serviços também são traduzidos.

## Tom de voz

- Linguagem simples, para donos de negócio sem formação técnica. Evite jargão como "SaaS", "RAG" ou "ETL" no texto visível; no `llms.txt` e nos dados estruturados esses termos podem aparecer.
- Frases diretas. Prefira o fato específico ao elogio genérico.
- Evite marcas de texto gerado por IA: "robusto", "fluido/seamless", "alavancar", "de ponta", "vibrante", "crucial", "chave" como adjetivo, "não apenas X, mas Y", listas de três por reflexo e travessões em série.

## Fatos e limites

- **Portfólio.** LeafLink, Dasa e Perfect Pay aparecem como contribuições de engenharia, não como autoria da plataforma inteira. Métricas de projeto dependem do contexto e não são promessa. As imagens são capturas públicas dos produtos, ilustrativas.
- **Recomendações.** São sínteses de recomendações públicas no LinkedIn, não citações literais. Não invente endossos.
- **Iris.** Não promete preço, prazo, disponibilidade nem contrato. O rascunho que ela gera é ponto de partida, não proposta comercial.

## Conteúdo provisório

Estes itens foram criados como marcadores e precisam de confirmação antes de serem tratados como fatos:

| Item                                                               | Onde                  | Estado                                                 |
| ------------------------------------------------------------------ | --------------------- | ------------------------------------------------------ |
| "+30 projetos entregues", "+1 mi pessoas", "4,9/5 avaliação média" | `lib/stats.ts`        | provisório; "+8 anos" é real                           |
| Detalhes pessoais do fundador (família, hobbies, trajetória)       | `lib/copy/founder.ts` | provisório, aguardando revisão do Iago                 |
| Fotos de equipes na página Sobre                                   | `public/about/`       | geradas por IA; a legenda informa que são ilustrativas |

Quando confirmar ou corrigir um item, atualize esta tabela e o comentário no arquivo correspondente.

## Imagens

Origem e tratamento de cada imagem publicada em `image-sources.md`. Logos e fotos ficam no próprio repositório, otimizados em WebP. Revalide o uso de marcas de clientes antes de qualquer campanha paga.

## Antes de publicar uma mudança de conteúdo

1. Atualize as três línguas.
2. Rode `pnpm test`. Ele confere se serviços e recomendações estão completos nos três idiomas; o restante dos textos precisa ser comparado à mão.
3. Confira `/llms.txt` e o `sitemap.xml` no build local se a mudança criou página ou serviço.
4. Se mudou um dado da empresa (endereço, e-mail, horário), confira rodapé, página de contato e respostas da Iris.
