# [FEAT] Identificar participantes e separar falas por speaker

- **Issue:** #8
- **Label:** `feature`
- **Milestone:** M3 — Transcrição e Análise de Áudio

## Objetivo
Processar o resultado da transcrição para organizar as falas
por participante, criando a estrutura de dados que alimentará
a análise psicológica.

## Dependência
Requer conclusão da Issue #7 (transcrição funcionando).

## Tarefas
- [ ] Mapear identificadores de speaker da API (Speaker A, Speaker B)
      aos nomes definidos pelo usuário no upload
- [ ] Criar estrutura de dados por participante:
      nome, falas, timestamps
- [ ] Agrupar falas consecutivas do mesmo participante
- [ ] Calcular métricas básicas por participante:
      total de falas, tempo de fala, frequência de interrupções
- [ ] Criar serviço em app/lib/speakers.ts para essa lógica
- [ ] Validar estrutura com diferentes números de participantes

## Critério de conclusão
Estrutura de dados por participante gerada corretamente,
pronta para ser enviada ao modelo de análise psicológica.