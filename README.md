# Elucya Talk

> Análise comportamental de linguagem por inteligência artificial.

**Elucya Talk** é uma plataforma que analisa conversas em áudio ou texto e identifica padrões de comunicação nociva **e** saudável por participante — gerando relatórios com Índice de Conflito, Índice de Positividade e feedback personalizado em CNV (Comunicação Não-Violenta).

Diferente de ferramentas que apenas detectam toxicidade, a Elucya Talk vai além: identifica o que funciona (escuta ativa, empatia, assertividade) e o que não funciona (violência verbal, manipulação, gaslighting, preconceito velado) — com diarização individual por locutor.

🌐 [English](./README.en.md) · [Español](./README.es.md)

---

## O que faz

- Faz upload de áudio → transcrição com identificação de quem falou o quê
- Analisa padrões nocivos: violência verbal, manipulação, discurso de ódio, preconceito contextual
- Analisa padrões saudáveis: escuta ativa, empatia, validação emocional, assertividade
- Gera relatório por participante com Índice de Conflito (0–100) e Índice de Positividade
- Oferece feedback de CNV personalizado por locutor
- Exporta relatório em PDF
- Privacy-first: sem armazenamento de áudio após a análise

---

## Público-alvo

| Segmento | Persona |
|---|---|
| B2C | Indivíduos em conflito relacional que buscam visão neutra |
| B2B | Psicólogos, mediadores e profissionais de RH |
| Marketplace (V2) | Profissionais credenciados que validam laudos com responsabilidade |

---

## Status

| Milestone | Descrição | Status |
|---|---|---|
| M0 | Concepção e Planejamento | 🟡 Em progresso |
| M1 | Design e Prototipação | ⬜ Pendente |
| M2 | Estrutura Local e Setup Técnico | ⬜ Pendente |
| M3 | Funcionalidades Core | ⬜ Pendente |
| M4 | Lançamento | ⬜ Pendente |

---

## Stack planejada

| Camada | Tecnologia |
|---|---|
| Framework | Next.js (App Router) · TypeScript |
| Styling | Tailwind CSS |
| Backend | Supabase (PostgreSQL · Auth · RLS) |
| STT | Whisper API (transcrição + diarização) |
| IA | Anthropic Claude API (análise comportamental) |
| Infra | Vercel · GitHub Actions |

---

## Roadmap

Veja [Roadmap.md](./Roadmap.md) para o detalhamento de cada milestone.

---

## Avisos importantes

- Esta ferramenta **não é um laudo psicológico** e não substitui acompanhamento profissional
- O relatório gerado é uma **perspectiva analítica**, não uma verdade absoluta — a IA pode errar
- A ferramenta **não toma partido** — analisa padrões de comportamento, não julga culpados
- **Não é indicada** para uso como prova jurídica sem validação de um profissional habilitado

---

## Contato

Sugestões e parcerias via site oficial da Kairos Labs:
**[kairos-labs-lake.vercel.app/pt](https://kairos-labs-lake.vercel.app/pt)**

---

## Licença

**Todos os direitos reservados** — Cesar Antonio Brito Pizarro / Elucya Talk

Veja [LICENSE](./LICENSE) · [LICENSE.en](./LICENSE.en) · [LICENSE.es](./LICENSE.es)
