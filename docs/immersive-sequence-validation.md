# Validação da sequência imersiva — 25/09/2026

Branch: `codex/scroll-story-founder`. Build local de produção em `http://localhost:3401/`. Nenhum deploy, merge ou alteração na main.

## Entrega

- Hero com terminal quadrado flutuante, moldura espessa e símbolo `>_`; transição para o terminal HTML expandido da seção 01.
- Seção 02 antes de marcas/projetos, com símbolo `</>` extrudado em Three.js, montagem e rotação vinculadas ao scroll da seção inteira. Máscara lateral protege a leitura; sem faixas cortando o objeto.
- Imagens reais de LeafLink, Dasa e Perfect Pay com superfícies pastel, integradas do trabalho de portfólio.
- Barra lateral de acessibilidade com texto maior, alto contraste, pausa compartilhada, preferências locais e operação por teclado/toque.
- Retrato do fundador com composição de desenho técnico em camadas.
- Guia factual `/llm.txt` atualizado e alias `/llms.txt` com conteúdo idêntico, ambos respondendo HTTP 200.

## Evidência visual e funcional

A referência Superlist foi inspecionada no navegador, incluindo a passagem de notebook para peças separadas, montagem do cubo e rotação enquanto o texto avança. A implementação adapta esse comportamento à linguagem de desenvolvimento da IRTC, sem copiar seus ativos.

No desktop de 1440 × 900, o objeto da seção 02 foi observado em posições diferentes durante a rolagem, com progresso registrado de 0,314 para 0,477. A pausa pelo controle acessível manteve o progresso em 0,157 mesmo após nova rolagem. Escape fechou o painel; as preferências foram restauradas após o teste. A cena usa renderização por demanda e libera recursos quando o viewport deixa de ser elegível.

No mobile de 390 × 844, largura do documento e viewport foram ambas 390px, sem canvas de fundo carregado. A validação anterior desta integração também cobriu 320, 768, 1024 e 1440px. A cena permanece decorativa, fora da árvore acessível; conteúdo e controles seguem em HTML. O viewport temporário de teste foi restaurado.

## Verificações automatizadas

- 57 testes em 10 arquivos: aprovados, incluindo carregamento sob demanda, dispositivos inelegíveis, pausa e descarte da cena.
- Lint, TypeScript, build de produção e verificação de whitespace: aprovados.
- Aviso não bloqueante do build: metadados de `baseline-browser-mapping` desatualizados. Dependências não foram alteradas nesta rodada.

## Lighthouse 13.5.0

Execuções sequenciais, Chrome headless, build de produção local, idioma PT-BR e perfil mobile padrão; desktop com preset próprio.

| Perfil | Performance | Acessibilidade | Boas práticas | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Mobile 1 | 97 | 100 | 100 | 100 | 2.538 ms | 4 ms | 0 |
| Mobile 2 | 97 | 100 | 100 | 100 | 2.532 ms | 1,5 ms | 0 |
| Desktop | 100 | 100 | 100 | 100 | 539 ms | 0 ms | 0 |

Relatórios temporários: `/tmp/irtc-v3-mobile.json`, `/tmp/irtc-v3-mobile-repeat.json`, `/tmp/irtc-v3-desktop.json`. Esses resultados são de laboratório local, não garantia de desempenho em produção nem substituto de auditoria manual completa com leitores de tela. Envio real de e-mail e chamada à LLM não foram exercitados nesta rodada visual.
