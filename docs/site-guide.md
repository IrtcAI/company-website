# Guia de conteúdo do site

Regras para textos, dados e imagens do site. Decisões técnicas ficam em `architecture.md`.

## Onde cada informação vive

| Informação                                                              | Arquivo                                                                         |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Textos da home, menu, rodapé, contato, Iris e aviso de cookies          | `apps/site/lib/content.ts`                                                      |
| Serviços: títulos, slugs, resumo, problemas, entregas, FAQ, tecnologias | `apps/site/lib/services.ts`                                                     |
| Páginas Serviços, Sobre e Fundador; títulos e descrições de SEO         | `apps/site/lib/copy/`                                                           |
| Endereço, horário, e-mail e redes sociais                               | `apps/site/lib/company.ts`                                                      |
| Números da faixa de estatísticas (vazia até haver evidência aprovada)   | `apps/site/lib/stats.ts`                                                        |
| Fatos que a Iris pode usar                                              | `apps/site/lib/iris-policy.ts` (monta a partir de `company.ts` e `services.ts`) |

Sitemap, `llms.txt`, dados estruturados, as cópias em Markdown, os feeds e o conhecimento da Iris leem esses arquivos. Mudou um dado? Mude na fonte, e o resto acompanha.

## Idiomas

Todo texto existe em pt-BR, en e es, com o mesmo sentido nas três versões. pt-BR é a base. Os slugs das páginas e dos serviços também são traduzidos.

## Tom de voz

- Linguagem simples, para donos de negócio sem formação técnica. Evite jargão como "SaaS", "RAG" ou "ETL" no texto visível; no `llms.txt` e nos dados estruturados esses termos podem aparecer.
- Frases diretas. Prefira o fato específico ao elogio genérico.
- Evite marcas de texto gerado por IA: "robusto", "fluido/seamless", "alavancar", "de ponta", "vibrante", "crucial", "chave" como adjetivo, "não apenas X, mas Y", listas de três por reflexo e travessões em série.

## Fatos e limites

- **Identidade.** Marca IRTC, descritor "Cloud, Software & AI Engineering", slogan "We engineer what moves your business forward." e assinatura "Da Amazônia para o seu próximo desafio." seguem o Brand Book 1.2; descritor, slogan e nomes dos pilares ficam em inglês nos três idiomas.
- **Evidências.** Cases, clientes, logos, números, depoimentos, certificações e parcerias só entram com evidência, atribuição e autorização registradas (decisão D10 do Company Blueprint). Os componentes `Stats`, `ProjectShowcase` e `Testimonials` não renderizam nada enquanto as listas estiverem vazias.
- **Serviços.** Os oito serviços pertencem a um pilar (Cloud Engineering, Software Engineering ou AI Engineering) e podem ter pilares de apoio. Critérios de resultado são objetivos do projeto, não resultado garantido. As ofertas do Service Catalog em validação não aparecem como produtos, nem com preço ou prazo.
- **Fundador.** Fatos autorizados por Iago: Founder & Principal Engineer, formado em Sistemas de Informação, vive em Belém; hobbies: videogame, filmes e séries com a família e as gatas Juliette e Luna. A página descreve responsabilidades de projeto e mantém os hobbies confirmados; Experiência em LeafLink, Dasa e Perfect Pay é trabalho pessoal de Iago como contractor, autorizado por ele em 26/10/2026, e aparece apenas com essa atribuição. Essas empresas não são clientes nem cases da IRTC. Não acrescente outros fatos sem evidência. O LinkedIn pessoal aparece só no bloco e na página do fundador; o resto do site usa o LinkedIn da empresa.
- **Cultura, Missão e Visão.** As páginas usam as definições oficiais do Brand Book. Os textos explicam práticas, avaliação de resultado e direção de crescimento. Não usar cenas fictícias como evidência.
- **Endereço.** O site mostra só Belém · PA · Brasil e atendimento remoto. Não publique rua nem o endereço fiscal.
- **Iris.** Não promete preço, prazo, disponibilidade nem contrato. O rascunho que ela gera é ponto de partida, não proposta comercial.

## Conteúdo provisório

Estes itens foram criados como marcadores e precisam de confirmação antes de serem tratados como fatos:

| Item                    | Onde                                 | Estado                                                   |
| ----------------------- | ------------------------------------ | -------------------------------------------------------- |
| Fotos geradas de equipe | `public/about/`, `lib/copy/about.ts` | preservadas no repositório, sem exibição na página Sobre |

Quando confirmar ou corrigir um item, atualize esta tabela e o comentário no arquivo correspondente.

## Imagens

Origem e tratamento de cada imagem publicada em `image-sources.md`. Logos e fotos ficam no próprio repositório, otimizados em WebP. Revalide o uso de marcas de clientes antes de qualquer campanha paga.

O favicon (`apps/site/app/icon.svg`) é o símbolo i oficial, cópia de `irtc/assets/03-icone-i.svg`. Os logos ficam em `apps/site/public/brand/`.

## Posicionamento B2B

A comunicação parte do problema de operação, descreve o escopo e informa como avaliar a entrega. `lib/copy/engagement.ts` reúne possíveis escopos iniciais para a conversa comercial; sua presença no site não altera a prontidão das ofertas do catálogo interno. Capacidade, preço e prazo dependem de avaliação e proposta.

A operação atual é conduzida por Iago Rodrigues. Ferramentas de IA e a Iris não constituem uma equipe contratada. Tracejandos é um pequeno projeto de site; não publicar alegações de tração, receita ou resultado comercial.

As opções de escopo aparecem em HTML, Markdown e na base da Iris a partir da mesma fonte. A experiência pessoal do fundador permanece na página dele, com contexto completo e sem logos de empresas.

## Antes de publicar uma mudança de conteúdo

1. Atualize as três línguas.
2. Rode `pnpm test`. Ele confere se serviços e recomendações estão completos nos três idiomas; o restante dos textos precisa ser comparado à mão.
3. Rode `pnpm page-dates` para atualizar a data de modificação das páginas que mudaram (sitemap, feeds e IndexNow usam essa data).
4. Se criou uma página ou uma seção nova, inclua o texto no construtor da página em `apps/site/lib/page-markdown.ts` e confira `/llms.txt`, o `sitemap.xml` e a cópia `.md` da página no build local.
5. Se mudou um dado da empresa (endereço, e-mail, horário), confira rodapé, página de contato e respostas da Iris.
