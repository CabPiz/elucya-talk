# docs: adicionar seção Diário de Progresso e instrução de resumo ao CLAUDE.md

- **Issue:** #17
- **Label:** `docs`
- **Milestone:** M0 — Concepção e Planejamento

## Objetivo
Adicionar ao CLAUDE.md uma seção de Diário de Progresso e uma instrução
padrão que garanta o registro do que foi feito ao final de cada chat
de desenvolvimento.

## Contexto
Cada chat com o Claude é isolado — ele não lê conversas anteriores.
Para manter histórico de progresso e gerar posts de LinkedIn com o
resumo do dia, é necessário registrar manualmente o que foi feito
em cada sessão no CLAUDE.md.

## Tarefas
- [ ] Adicionar ao CLAUDE.md a seguinte instrução padrão:

"Ao final de cada chat de desenvolvimento, resuma o que foi feito
em bullet points concisos e forneça o texto para eu registrar no
Diário de Progresso do CLAUDE.md."

- [ ] Adicionar ao CLAUDE.md a seção:

## Diário de Progresso
<!-- formato: ### DD/MM/AAAA seguido dos bullet points do dia -->

- [ ] Documentar no CLAUDE.md como usar o diário para gerar
      posts de LinkedIn
- [ ] Commit e push do arquivo atualizado