# [DESIGN] Integrar componentes do v0.dev no projeto

- **Issue:** #5
- **Label:** `task`
- **Milestone:** M1 — Design e Prototipação (v0.dev)

## Objetivo
Importar os componentes exportados do v0.dev para o projeto Next.js,
organizando cada um na pasta correta.

## Dependência
Requer conclusão da Issue #2 (componentes criados no v0.dev).

## Tarefas
- [ ] Copiar componentes exportados para design-exports/
- [ ] Mover cada componente para sua pasta em app/components/:
  - [ ] Upload → components/Upload/
  - [ ] Dashboard → components/Dashboard/
  - [ ] Feedback → components/Feedback/
  - [ ] Transcription → components/Transcription/
- [ ] Ajustar imports e dependências de cada componente
- [ ] Validar renderização de cada componente no navegador
- [ ] Garantir consistência visual entre os componentes

## Critério de conclusão
Todos os componentes renderizando corretamente no navegador
sem erros de console.