# chore: criar pasta issues/ com arquivos .md para cada issue do projeto

- **Issue:** #18
- **Label:** `task`
- **Milestone:** M0 — Concepção e Planejamento

## Objetivo
Criar uma estrutura de arquivos markdown que espelhe as issues do GitHub,
permitindo adicionar o contexto de uma issue específica ao chat do Claude
via integração com o repositório.

## Contexto
A integração do GitHub com Claude não suporta leitura de issues — apenas
arquivos. Como workaround, cada issue será documentada em um arquivo .md
individual dentro da pasta issues/, podendo ser adicionada ao contexto
do chat conforme necessário.

## Tarefas
- [ ] Criar pasta `issues/` na raiz do repositório
- [x] Criar um arquivo .md para cada issue aberta, com título,
      descrição, label e milestone
- [ ] Adicionar pasta `issues/` ao projeto no Claude via integração GitHub
- [ ] Documentar este padrão no CLAUDE.md