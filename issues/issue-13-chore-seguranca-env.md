# chore: verificar e reforçar proteção de variáveis de ambiente

- **Issue:** #13
- **Label:** `task`
- **Milestone:** M0 — Concepção e Planejamento

## Objetivo
Garantir que nenhuma chave de API ou variável de ambiente sensível esteja
versionada no repositório público.

## Tarefas
- [ ] Confirmar que `.env*` está no `.gitignore` ✅ (já confirmado)
- [ ] Verificar se existe algum `.env` commitado no histórico do git
- [ ] Verificar se `next.config.ts` expõe alguma chave diretamente no código
- [ ] Verificar se os arquivos em `app/lib/` contêm chaves hardcoded
- [ ] Confirmar que `AGENTS.md` e `CLAUDE.md` não mencionam chaves reais