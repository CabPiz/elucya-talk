# [FEAT] Exibir transcrição anotada com badges de classificação

- **Issue:** #11
- **Label:** `feature`
- **Milestone:** M4 — Feedback Psicológico por Participante

## Objetivo
Construir a aba de transcrição anotada que exibe todas as falas
em ordem cronológica com classificação visual de cada trecho.

## Dependência
Requer conclusão da Issue #10 (dashboard construído).

## Tarefas
- [ ] Integrar componente Transcription com dados reais da transcrição
- [ ] Exibir falas em ordem cronológica com:
      - Avatar e nome do participante
      - Timestamp de cada fala
      - Texto da fala
      - Badge de classificação (Neutro, Ameaça, Agressão,
        Vulnerabilidade) com cores correspondentes
- [ ] Destacar falas de alto risco com fundo avermelhado
- [ ] Implementar filtro: "Todas as falas" | "Apenas alertas"
- [ ] Adicionar tooltip com explicação da classificação de cada fala
- [ ] Implementar botão "Ver falas deste participante"
      nos cards de feedback linkando para a transcrição filtrada

## Critério de conclusão
Transcrição anotada exibindo todas as falas classificadas,
filtros funcionando e tooltips explicativos visíveis.