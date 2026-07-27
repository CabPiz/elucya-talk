# [FEAT] Analisar conflitos e gerar feedback psicológico por participante

- **Issue:** #9
- **Label:** `feature`
- **Milestone:** M4 — Feedback Psicológico por Participante

## Objetivo
Integrar o modelo de linguagem (LLM) para analisar as falas de cada
participante e gerar feedback psicológico personalizado, identificando
padrões de comportamento, conflitos e ameaças.

## Dependência
Requer conclusão da Issue #8 (falas separadas por participante).

## Tarefas
- [ ] Criar serviço em app/lib/analysis.ts para integração com LLM
- [ ] Elaborar prompt de sistema com instruções de análise psicológica:
      - Identificação de violência verbal e ameaças
      - Detecção de padrões (manipulação, agressão passiva, etc.)
      - Tom predominante por participante
      - Nível de agressividade e vulnerabilidade emocional
- [ ] Enviar falas de cada participante individualmente ao LLM
- [ ] Estruturar resposta do LLM em JSON com campos padronizados
- [ ] Gerar feedback empático e recomendações práticas por participante
- [ ] Calcular nível geral de conflito da conversa (0-100)
- [ ] Identificar trecho mais crítico da conversa
- [ ] Tratar erros de API e timeouts

## Critério de conclusão
Análise psicológica gerada para cada participante com feedback
empático, padrões identificados e nível de conflito calculado.