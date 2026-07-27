# [FEAT] Integrar transcrição de áudio com Whisper/AssemblyAI

- **Issue:** #7
- **Label:** `feature`
- **Milestone:** M3 — Transcrição e Análise de Áudio

## Objetivo
Integrar a API de transcrição de áudio escolhida para converter
o arquivo enviado em texto, identificando os participantes da conversa.

## Dependência
Requer conclusão da Issue #4 (APIs escolhidas e configuradas)
e Issue #6 (upload funcionando).

## Tarefas
- [ ] Configurar chave de API no .env.local
- [ ] Criar serviço de transcrição em app/lib/transcription.ts
- [ ] Enviar áudio para a API e receber transcrição em texto
- [ ] Habilitar diarização (identificação de quem fala cada trecho)
- [ ] Mapear falas aos nomes de participantes definidos pelo usuário
- [ ] Armazenar resultado da transcrição em estrutura de dados organizada
- [ ] Exibir tela de processamento com stepper durante a transcrição
- [ ] Tratar erros de transcrição e exibir mensagens ao usuário

## Critério de conclusão
Áudio transcrito com falas separadas por participante,
resultado armazenado e pronto para análise.