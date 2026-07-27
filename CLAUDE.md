# Elucya Talk — CLAUDE.md

> Arquivo de contexto e instruções operacionais para uso com Claude.
> Para descrição do projeto, veja README.md.
> Para milestones e status, veja Roadmap.md.

- **Repositório:** github.com/CabPiz/elucya-talk
- **Projeto Kanban:** Elucya Talk (owner: CabPiz)

---

## Labels

| Label | Descrição |
|---|---|
| `bug` | Algo que não funciona como esperado |
| `docs` | Criação ou atualização de documentação |
| `epic` | Agrupamento de features ou tarefas relacionadas |
| `feature` | Uma funcionalidade completa |
| `research` | Investigação ou escolha de tecnologia |
| `task` | Tarefa técnica ou de design |

---

## Como trabalhar com Claude neste projeto

- Sempre inicie o chat adicionando ao contexto o arquivo da issue que será trabalhada (`issues/issue-XX-nome.md`)
- Adicione também qualquer arquivo do projeto diretamente relacionado à issue
- Claude nunca deve criar arquivos ou pastas diretamente — deve fornecer o conteúdo e instruir o usuário a criá-los
- Ao trabalhar em uma issue, siga rigorosamente as tarefas listadas no arquivo da issue, na ordem definida
- Dúvidas sobre decisões de arquitetura ou stack devem ser registradas como novas issues antes de serem resolvidas

---

## Padrão da pasta `issues/`

A pasta `issues/` espelha as issues abertas do GitHub em arquivos `.md` individuais.

**Nomenclatura:** `issue-{número}-{slug-do-título}.md`

**Estrutura de cada arquivo:**

    # Título da issue

    - **Issue:** #número
    - **Label:** `label`
    - **Milestone:** MX — Nome do Milestone

    ## Objetivo
    ...

    ## Dependência (se houver)
    ...

    ## Tarefas
    - [ ] tarefa 1
    - [ ] tarefa 2

    ## Critério de conclusão (se houver)
    ...

**Como usar:**
- Ao abrir um novo chat para trabalhar em uma issue, adicione o arquivo correspondente ao contexto
- Ao concluir tarefas, marque com `[x]` no arquivo local e faça commit
- Ao criar uma nova issue no GitHub, crie também o arquivo `.md` correspondente em `issues/`

---

## Registro de Progresso

Ao detectar que o trabalho do chat foi concluído, Claude deve fornecer automaticamente o Diário de Progresso no formato abaixo, sem que o usuário precise pedir. O diário deve ser entregue dentro de um bloco de código markdown para fácil cópia.

**Formato:**

    ### DD/MM/AAAA — HH:MM:SS — Título: [o que foi resolvido]

    - bullet point do que foi feito
    - bullet point do que foi feito
    - bullet point do que foi feito

Antes do Diário de Progresso, Claude deve fornecer os comandos de versionamento completos:
- `git add` dos arquivos alterados
- `git commit` com mensagem semântica
- `git push`
- Fechamento da issue via `gh`
- Movimentação da issue de "In Progress" para "Done" no Kanban via `gh`

O usuário deve colar o diário gerado no arquivo de Diário de Progresso mantido fora do projeto.

---

## Diário de Progresso

<!-- Cole aqui os resumos gerados ao final de cada chat -->