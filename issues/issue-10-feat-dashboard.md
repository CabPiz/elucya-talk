# [FEAT] Construir dashboard de resultados

- **Issue:** #10
- **Label:** `feature`
- **Milestone:** M4 — Feedback Psicológico por Participante

## Objetivo
Construir a tela de dashboard que exibe o resumo geral da análise
e os cards de feedback psicológico por participante.

## Dependência
Requer conclusão da Issue #9 (análise psicológica gerada).

## Tarefas
- [ ] Integrar componente Dashboard com dados reais da análise
- [ ] Implementar medidor de nível de conflito (gauge 0-100)
      com gradiente verde > amarelo > vermelho
- [ ] Exibir tags de padrões detectados como badges coloridos
- [ ] Exibir trecho mais crítico da conversa em destaque
- [ ] Integrar componente Feedback com dados reais por participante:
      - Avatar com inicial e cor identificadora
      - Tom predominante
      - Barras de agressividade e vulnerabilidade emocional
      - Lista de padrões identificados
      - Texto de feedback psicológico
      - Recomendações práticas
- [ ] Implementar navegação entre abas:
      Resumo | Análise por Participante | Transcrição
- [ ] Garantir responsividade do dashboard

## Critério de conclusão
Dashboard exibindo todos os dados reais da análise com
navegação entre abas funcionando corretamente.