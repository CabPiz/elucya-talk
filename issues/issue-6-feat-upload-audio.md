# [FEAT] Implementar upload de áudio e envio para API

- **Issue:** #6
- **Label:** `feature`
- **Milestone:** M3 — Transcrição e Análise de Áudio

## Objetivo
Criar a funcionalidade de upload de arquivo de áudio pelo usuário
e envio para processamento pela API de transcrição.

## Dependência
Requer conclusão da Issue #5 (componentes integrados no projeto).

## Tarefas
- [ ] Implementar drag-and-drop de arquivo de áudio no componente Upload
- [ ] Validar formatos aceitos (mp3, wav, m4a) e tamanho máximo do arquivo
- [ ] Implementar barra de progresso de upload
- [ ] Criar rota de API em app/api/upload para receber o arquivo
- [ ] Enviar arquivo para a API de transcrição
- [ ] Tratar erros de upload e exibir mensagens ao usuário
- [ ] Implementar campo de identificação de participantes

## Critério de conclusão
Usuário consegue fazer upload de um arquivo de áudio e receber
confirmação de que foi enviado para processamento.