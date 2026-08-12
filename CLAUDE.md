# CLAUDE.md — Elucya Talk

Arquivo de contexto lido automaticamente pelo Claude Code a cada sessão.
Repositório: `CabPiz/elucya-talk` | Owner: `CabPiz` | Project Board: nº 2

---

## ⚙️ PERMISSÕES DO CLAUDE CODE NESTA SESSÃO

### ✅ PERMITIDO — execução autônoma pelo Claude Code
- Ler qualquer arquivo do repositório
- Criar e editar arquivos de código-fonte diretamente no disco
- Criar e editar arquivos de documentação (`.md`) diretamente no disco
- Rodar `npm run build` para validar o build
- Rodar `npm test` para rodar a suite de testes
- Rodar `npm run test:e2e 2>&1 | tee saida.log` para rodar os testes E2E
- Rodar `npm run lint` para verificar conformidade ESLint
- Ler issues do GitHub com `gh issue view [NUMERO]` e `gh issue list`
- Ler o arquivo `saida.log` na raiz do projeto para analisar resultados de comandos
- Rodar `gh pr checks [N] --watch` para acompanhar CI
- Executar o bloco de merge da FASE 4: `gh pr merge --squash --delete-branch`, `git checkout main`, `git pull origin main`, `gh issue view [N]`
- Executar commits atômicos da FASE 3: `git add`, `git commit`
- Executar push da branch: `git push origin [branch]`
- Abrir PR: `gh pr create`
- Adicionar issues ao board: `gh project item-add 2 --owner CabPiz --url [url]`
- Consultar labels reais com `gh label list` antes de criar issues
- Consultar milestones reais com `gh api repos/CabPiz/elucya-talk/milestones --jq '.[].title'` antes de criar issues
- Executar `gh issue edit` (labels, assignees)
- Executar `gh project item-edit` (movimento de card no Board)
- Executar queries `gh api graphql`
- Postar comentários em issues: `gh issue comment [NUMERO] --body "[texto]"`

### 📋 PADRÃO DE SAÍDA DE COMANDOS — tee para saida.log

Todo comando executado pelo Claude Code cujo resultado precise ser analisado deve usar `tee saida.log`:

```bash
comando 2>&1 | tee saida.log
```

O arquivo `saida.log` é sobrescrito a cada execução (sem acumulação).

---

## 📋 PROTOCOLO DE SESSÃO — FLUXO OBRIGATÓRIO

### Abertura da sessão
O usuário inicia sempre com:
> "issue #[número]"

Ao receber isso, o Claude Code executa **imediatamente e de forma autônoma**, nesta ordem:
```bash
gh issue view [NUMERO]
```
para ler o escopo completo da issue. Em seguida, **obrigatoriamente**, lê o arquivo `BUILD_ERRORS.md` na raiz do projeto.

**Verificação de milestone:** ainda na abertura, o Claude Code verifica se a issue é a última do seu milestone, consultando a sequência definida no `Roadmap.md`. Se for a última, o Claude Code já inclui a atualização do `Roadmap.md` no escopo da sessão — e comunica isso ao usuário na FASE 1.

---

### FASE 0 — Versionamento Imediato (executado ANTES de propor qualquer solução)

**Obrigatória para TODAS as issues, sem exceção. Executada de forma autônoma assim que o usuário indica a issue.**

> **Motivo:** detalhar uma solução já é trabalhar na issue — a issue já saiu do backlog no momento em que começa a ser analisada. O card deve refletir isso imediatamente.

O Claude Code executa diretamente, nesta ordem:

```bash
# 1. Atualizar a main e criar branch
git checkout main
git pull origin main
git checkout -b tipo/[NUMERO]-descricao-curta
```

**Passo 2 — Atribuir e marcar como In Progress (depende do ambiente):**

**Ambiente local** (`gh` CLI disponível — sessão desktop):
```bash
gh issue edit [NUMERO] --add-assignee "@me"
gh issue edit [NUMERO] --add-label "status: in progress"
gh project item-add 2 --owner CabPiz --url [url-da-issue]
# mover card para "In Progress" via gh project item-edit (ver FASE 3 para IDs)
```

**Ambiente remoto** (`gh` indisponível — sessão web/celular):
- Usar `mcp__github__issue_write` com `assignees: ["CabPiz"]` e `labels: [..., "status: in progress"]`
- Movimentação de card no board: **não disponível** — o label `status: in progress` é o mecanismo de rastreio
- **Done é aplicado automaticamente pelo GitHub Projects na FASE 4 (merge do PR)** — esse é o estado mais importante

> **Regra de ouro do board em sessão remota:** In Progress = label `status: in progress` (visível na issue). Done = automação do GitHub Projects no merge. In Review = label `status: ready for review` (aplicado na FASE 3).

---

### FASE 1 — Entendimento e Proposta Técnica (PAUSA OBRIGATÓRIA)

**Executada após a FASE 0, com o card já em "In Progress".**

1. **Leitura e Confirmação de Escopo**
   - Ler os requisitos da issue, identificar dependências, fronteiras com outras issues e ambiguidades.
   - Apresentar resumo do entendimento e fazer perguntas de clarificação necessárias.

2. **Auditoria Interna de Boas Práticas (executada pelo Claude Code antes de propor qualquer solução)**

   > **PROIBIDO apresentar a proposta técnica ao usuário antes de concluir esta auditoria.** A solução só é exibida após passar por todos os critérios abaixo.

   O Claude Code avalia internamente a solução candidata contra os seguintes eixos, **nesta ordem**:

   | # | Eixo | Critério mínimo |
   |---|---|---|
   | 1 | **Reutilização de componentes** | Verificar se já existe componente, hook, action ou utilitário que atende parcial ou totalmente o requisito. Reusar antes de criar. |
   | 2 | **Padrões Sonar** | Checar toda a solução candidata contra cada regra da seção `🔍 PADRÕES SONAR` deste arquivo. |
   | 3 | **Dependências entre camadas** | Confirmar que `lib/` não importa de `components/` ou `app/`; `components/` não importa de `app/`; Client Components não importam de `supabase-server` ou `server-only`. |
   | 4 | **Segurança Supabase** | Writes usam `createServerAdminClient()`; reads usam SSR client + RPC com `SECURITY DEFINER`. Cast `as any` onde necessário. |
   | 5 | **Cobertura de testes** | A proposta DEVE listar explicitamente cada teste unitário que será criado ou atualizado para cobrir 100% das linhas novas/modificadas. Spec E2E obrigatória para todo fluxo com submit ou autenticação. Toda nova spec Playwright (`*.spec.ts`) criada na FASE 2 deve ser adicionada a `sonar.coverage.exclusions` em `sonar-project.properties`. **Antes de propor os testes, ler `COVERAGE_GAPS.md` e verificar o checklist de prevenção.** |
   | 6 | **Consistência de estilo** | Tailwind para valores estáticos; `style={{}}` apenas para valores dinâmicos de runtime. Novos componentes seguem o padrão visual existente. |
   | 7 | **Convenções de código** | Conventional Commits em português, branch no padrão correto, sem comentários desnecessários, sem abstrações prematuras. |
   | 8 | **Performance** | A solução introduz queries extras, N+1, re-renders desnecessários ou aumento relevante de bundle? Se sim, propor alternativa mais eficiente ou documentar o trade-off explicitamente na justificativa. |

   Se qualquer eixo reprovar, o Claude Code ajusta a solução candidata internamente até aprovação em todos os eixos. **O usuário nunca vê uma proposta que não passou pela auditoria.**

3. **Proposta Técnica Detalhada** (exibida somente após auditoria interna aprovada)
   - Propor solução completa: arquivos a criar/modificar, arquitetura, decisões de design e justificativas.
   - Apresentar alternativas quando houver trade-offs relevantes.
   - Incluir obrigatoriamente ao final a seção **"✅ Justificativa de Boas Práticas"** — ver formato abaixo.
   - Encerrar sempre com: *"A proposta técnica está alinhada com o esperado para prosseguirmos com a implementação?"* — e **PARAR**.

4. **Registro na Issue (executado após aprovação explícita do usuário, antes de iniciar a FASE 2)**

   O Claude Code posta **dois comentários na issue**, nesta ordem obrigatória:

   **Comentário 1 — Proposta Técnica** (resumo do que foi apresentado ao usuário):
   ```bash
   gh issue comment [NUMERO] --body "$(cat <<'EOF'
   ## 📋 Proposta Técnica — [título curto]

   [resumo dos arquivos a criar/modificar, decisões de design e justificativas apresentadas ao usuário]

   *Proposta apresentada e aprovada pelo fundador — CLAUDE.md v[X]*
   EOF
   )"
   ```

   **Comentário 2 — Auditoria de Boas Práticas**:
   ```bash
   gh issue comment [NUMERO] --body "$(cat <<'EOF'
   ## ✅ Auditoria de Boas Práticas — Proposta Aprovada

   [conteúdo da seção Justificativa de Boas Práticas]

   *Auditoria executada pelo Claude Code antes da implementação — CLAUDE.md v[X]*
   EOF
   )"
   ```

   > **Ordem obrigatória:** a proposta técnica sempre precede a auditoria. O histórico da issue deve refletir o fluxo real: primeiro o que foi proposto, depois a checagem de boas práticas que validou a proposta.

   Esses dois comentários são a evidência de que a solução foi apresentada, aprovada e auditada antes de qualquer linha de código ser escrita.

#### Formato da seção "✅ Justificativa de Boas Práticas"

Incluir ao final de toda proposta técnica, com uma linha por eixo auditado:

```markdown
## ✅ Justificativa de Boas Práticas

| Eixo | Decisão adotada | Por quê atende a melhor prática |
|---|---|---|
| Reutilização | [componente/padrão reusado ou motivo de criação nova] | [justificativa] |
| Sonar | [conformidades garantidas] | [quais regras foram verificadas] |
| Camadas | [ausência de violações de dependência] | [estrutura respeitada] |
| Segurança Supabase | [client usado para cada operação] | [alinhamento com padrão do projeto] |
| Testes | [unitários + E2E previstos] | [cobertura dos fluxos críticos] |
| Estilo | [Tailwind vs inline styles] | [critério de uso de cada abordagem] |
| Convenções | [commits, branch, comentários] | [conformidade com o padrão estabelecido] |
| Performance | [impacto em queries, re-renders, bundle] | [ausência de N+1, re-renders ou trade-off documentado] |
```

> **ATENÇÃO:** Respostas do usuário que fornecem dados solicitados (links, e-mails, nomes) **não constituem aprovação**. A aprovação explícita é obrigatória — palavras como "sim", "pode ir", "aprovado", "prossiga". Enquanto não houver aprovação explícita, o Claude Code permanece em FASE 1.

---

### FASE 2 — Código-Fonte (Claude Code edita os arquivos diretamente)

#### Regra de Desvio da Solução Proposta

Durante a implementação, pode surgir a necessidade de ajustar a solução proposta na FASE 1. **Sempre que a implementação real divergir da solução aprovada na FASE 1**, o Claude Code deve:

1. Identificar exatamente o que mudou e por quê (causa raiz, não sintoma).
2. Aplicar a correção nos arquivos.
3. Postar um comentário na issue documentando o desvio:

```bash
gh issue comment [NUMERO] --body "$(cat <<'EOF'
## 🔄 Desvio de Implementação — [título curto do ajuste]

**O que foi proposto:** [descrição da abordagem original aprovada]

**O que foi implementado:** [descrição da abordagem real]

**Motivo do desvio:** [causa raiz — bug, incompatibilidade de tipos, CI, refinamento técnico]

**Impacto:** [nenhum impacto funcional / comportamento ajustado / trade-off aceito]

*Registrado pelo Claude Code durante a FASE 2 — CLAUDE.md v1.0*
EOF
)"
```

- O Claude Code edita os arquivos diretamente no disco.
- **Antes de editar qualquer arquivo**, o Claude Code aplica proativamente todas as regras da seção `🔍 PADRÕES SONAR` deste arquivo.
- **Para issues que envolvem qualquer artefato que o usuário precise validar** (UI/UX, documentos `.md`, conteúdo gerado): apresentar o que foi criado/modificado e encerrar com *"Você validou o resultado? Pode prosseguir?"* — e **PARAR até receber validação explícita**.

---

#### Regra de Varredura de Impacto em Testes (obrigatória a cada edição de arquivo)

**Gatilho:** sempre que a FASE 2 editar qualquer arquivo de código-fonte, o Claude Code executa a varredura correspondente nos diretórios `__tests__/` e `e2e/` **antes de avançar para o próximo arquivo ou para os commits**:

| O que foi alterado no arquivo | O que grep nos testes |
|---|---|
| `role="X"` trocado por `role="Y"` | `getByRole("X"` — atualizar para o novo papel |
| `aria-label` ou texto visível alterado | `getByRole(..., {name:})`, `getByText(`, `getByLabelText(` com o texto antigo |
| Rota ou `href` alterado | `goto(`, `toHaveURL(`, `navigate(` com a URL antiga |
| Props renomeadas ou removidas | Todos os locais onde o componente é instanciado nos testes |
| Função exportada renomeada ou removida | Todos os `import` e chamadas nos testes |

---

### FASE 2.5 — Validação Local Obrigatória (usuário executa)

**Passo 1 — Build do projeto**

O Claude Code instrui o usuário a rodar:

```bash
npm run build
```

```bash
npm test 2>&1 | tee saida.log
```

O Claude Code lê o `saida.log` e confirma que **todos os test suites passaram** antes de avançar.

**Verificação de cobertura local (executada pelo Claude Code imediatamente após `npm test`):**

```bash
node scripts/check-coverage.mjs 2>&1 | tee saida.log
```

**Passo 2 — Testes manuais (após build verde)**

O Claude Code descreve objetivamente o que deve ser testado, incluindo:
- O fluxo principal (caminho feliz) a validar.
- Os casos de borda relevantes para a issue.
- Critérios claros de sucesso para cada cenário.

O usuário executa os testes e **envia prints que comprovem os resultados**. O Claude Code aguarda esses prints antes de prosseguir.

**Passo 3 — Testes E2E com Playwright (quando aplicável)**

```bash
npm run test:e2e 2>&1 | tee saida.log
```

**Passo 4 — Testes Visuais Mobile (obrigatório para issues com componentes de UI)**

Para qualquer issue que crie ou modifique componentes visíveis na interface, o Claude Code executa diretamente o script de screenshots mobile antes de iniciar a FASE 3:

```bash
node --experimental-vm-modules scripts/take-mobile-screenshots.mjs 2>&1 | tee saida.log
```

Viewports padrão:

| Dispositivo | Largura | Altura |
|---|---|---|
| iPhone SE | 375px | 667px |
| iPhone 14 Pro Max | 430px | 932px |
| Pixel 8 | 412px | 915px |
| iPad Mini | 768px | 1024px |
| Surface Pro 7 | 912px | 1368px |

---

### FASE 3 — Commits Atômicos (Claude Code executa diretamente)

**Regra:** cada commit cobre UMA mudança lógica. Commits intermediários usam `Ref #[NUMERO]`. Apenas o último usa `Closes #[NUMERO]`.

```bash
git add .
git commit -m "feat(escopo): descrição curta no imperativo em português

Corpo explicando o porquê da mudança.

Ref #[NUMERO]"

git add .
git commit -m "feat(escopo): descrição do último commit

Corpo explicando o porquê.

Closes #[NUMERO]"
```

Após os commits, o Claude Code executa diretamente o bloco de abertura de PR:

```bash
# Enviar branch
git push origin tipo/[NUMERO]-descricao

# Atualizar labels
gh issue edit [NUMERO] --add-label "status: ready for review"
gh issue edit [NUMERO] --remove-label "status: in progress"

# Abrir PR
gh pr create \
  --title "tipo(escopo): descrição curta em português" \
  --body "## O que foi feito
[descrição em português]

## Por que foi feito
[justificativa em português]

Closes #[NUMERO]" \
  --base main \
  --head tipo/[NUMERO]-descricao \
  --label "type: [tipo]"

# Verificar PR e aguardar CI
gh pr diff
gh pr checks [N] --watch 2>&1 | tee saida.log
```

Após `gh pr checks --watch` retornar com todos os checks verdes, o Claude Code prossegue **automaticamente** para a FASE 4 sem aguardar instrução do usuário.

---

### FASE 4 — Resolução de Issues do Sonar na PR

- **PROIBIDO fazer merge** enquanto houver issues do Sonar abertas.
- O Claude Code consulta as issues **de forma autônoma** via CLI:

```bash
./scripts/sonar-check.sh gate [NUMERO_PR] 2>&1 | tee saida.log
./scripts/sonar-check.sh issues [NUMERO_PR] 2>&1 | tee saida.log
```

### Regra de Documentação para Qualquer Falha de CI

**Antes de executar o merge**, o Claude Code verifica: houve algum check de CI que falhou e exigiu correção nesta sessão?

| Tipo de falha | Onde documentar |
|---|---|
| Nova regra Sonar detectada | `🔍 PADRÕES SONAR` no CLAUDE.md |
| Erro de build TypeScript / ESLint bloqueado no CI | `BUILD_ERRORS.md` |
| Gap de cobertura detectado pelo CI | `COVERAGE_GAPS.md` |
| Step de GitHub Actions falhou | `BUILD_ERRORS.md` — seção `## CI Workflow Failures` |
| Secret ausente no repositório | `docs/setup.md` → seção `CI/CD` + `BUILD_ERRORS.md` |
| Playwright passou localmente mas falhou em CI | `BUILD_ERRORS.md` — seção `## CI Workflow Failures` |
| Vercel build falhou por variável de ambiente ausente | `docs/setup.md` → seção `Variáveis de Ambiente` + `BUILD_ERRORS.md` |

**PROIBIDO executar o bloco de merge enquanto qualquer falha de CI da sessão não estiver documentada.**

Após Quality Gate verde e documentação de falhas concluída, o Claude Code posta um **comentário de certificação de qualidade** na issue antes de executar o merge:

```bash
gh issue comment [NUMERO] --body "$(cat <<'EOF'
## 🏆 Certificação de Qualidade — Pronto para Merge

[conteúdo conforme template — testes unitários, E2E, CI, Sonar, deploy]

*Certificação gerada pelo Claude Code — CLAUDE.md v1.0*
EOF
)"
```

Após Quality Gate verde, o Claude Code executa o merge **autonomamente**:

```bash
gh pr merge --squash --delete-branch
git checkout main
git pull origin main
gh issue view [NUMERO]
```

---

### FASE 4.5 — Controle de Dívida Técnica (executada ao fechar cada Milestone)

Esta fase é executada **uma vez por milestone**, após o merge da última issue do milestone.

**1. Code Review Ultra (multi-agente)**
```bash
/code-review ultra
```

**2. Auditoria de dependências entre camadas**
```bash
grep -rE "from.*@/(components|app)" lib/ --include="*.ts" --include="*.tsx" -l
grep -r "from.*@/app" components/ --include="*.ts" --include="*.tsx" -l
grep -rl '"use client"' components/ --include="*.tsx" | xargs grep -l "supabase-server\|server-only" 2>/dev/null
```

**3. Auditoria de consistência de estilo**
```bash
grep -rc "style={{" app/ components/ --include="*.tsx" | sort -t: -k2 -rn | head -15
```

**4. Auditoria de cobertura de testes por camada**
```bash
for f in $(find app components lib -name "*.tsx" -o -name "*.ts" | grep -v "node_modules\|\.test\.\|__tests__\|__mocks__\|\.d\.ts\|types\.ts\|page\.tsx\|layout\.tsx\|route\.ts\|loading\.tsx\|error\.tsx\|not-found\.tsx\|template\.tsx\|default\.tsx"); do
  name=$(basename "$f" .tsx); name=$(basename "$name" .ts)
  if ! find __tests__ -name "${name}.test.*" 2>/dev/null | grep -q .; then
    echo "SEM TESTE: $f"
  fi
done
```

---

### FASE 4.6 — Melhoria Contínua do Workflow (responsabilidade permanente do Claude Code)

O Claude Code **deve** sinalizar e propor melhoria do workflow sempre que perceber:

- Um padrão novo de problema que se repetiria em issues futuras
- Um eixo de auditoria da FASE 1 que não cobriria o problema encontrado
- Uma etapa do protocolo que, se executada de forma diferente, teria evitado retrabalho
- Uma decisão de design que deveria ser registrada em `docs/architecture.md`
- Qualquer acumulação silenciosa de dívida técnica

A sinalização é proativa. Após aprovação do usuário, o Claude Code edita o CLAUDE.md diretamente.

---

### FASE 4.7 — Autocrítica de Execução (executada após cada merge, antes do Diário)

| # | Pergunta | Quem responde |
|---|---|---|
| 1 | Houve algum passo do protocolo que precisou ser tentado mais de uma vez? | Claude Code |
| 2 | Houve sequências de comandos que falharam antes do correto? | Claude Code |
| 3 | O texto do CLAUDE.md cobria o que foi feito de forma precisa? | Claude Code |
| 4 | Algum passo poderia ter sido eliminado ou paralelizado? | Claude Code |
| 5 | Surgiu algum padrão novo ainda não documentado? | Claude Code |
| 6 | *"Você observou algo no fluxo desta sessão que poderia ser melhorado?"* | Usuário |

Qualquer resposta positiva ativa o fluxo: nomear o desvio → propor alteração → aguardar aprovação → editar CLAUDE.md → registrar no Diário.

---

### Regra de Setup Local — Documentação Obrigatória de Mudanças de Ambiente

| Tipo de mudança | Onde documentar |
|---|---|
| Novo arquivo `.sql` | `docs/setup.md` → seção `Banco de Dados` + `README.md` |
| Nova variável de ambiente obrigatória | `docs/setup.md` + `.env.example` |
| Nova dependência com setup manual | `docs/setup.md` |
| Novo script npm | `docs/setup.md` + `package.json` |
| Mudança em CI | `docs/setup.md` → seção `CI/CD` |
| Novos specs E2E | `CONTRIBUTING.md` → tabela "Covered flows" |

---

### Encerramento da sessão (por issue)

Imediatamente após o merge, o Claude Code executa de forma autônoma:

1. Verificar se houve erros de build novos na sessão. Se sim, adicionar as entradas no `BUILD_ERRORS.md`.
2. Gerar o Diário de Aprendizado — **sem solicitar confirmação**.

O Claude Code **edita o arquivo `1.diario_de_aprendizado.md` diretamente no disco**, inserindo a nova entrada imediatamente após o cabeçalho (ordem decrescente — entrada mais recente sempre no topo).

- **`[N]`** é um número sequencial que reseta para `1` a cada novo dia.
- O Claude Code avalia todos os formatos (A, B, C) e **usa todos os que forem aplicáveis** à sessão.

---

#### Formato A — A Virada de Chave Arquitetural

````markdown
### 1. [Título: decisão arquitetural tomada]

* **Issue:** `[#N - Título da Issue]`
* **Data:** `[DD/MM/AAAA]`
* **Formato:** `A — Virada de Chave Arquitetural`
* **Stack Envolvida:** `[tecnologias relevantes]`
* **Dilema Técnico:** [Contexto do problema e por que a decisão era difícil].
* **Alternativas Descartadas:** [O que foi considerado e por que foi rejeitado].
* **Decisão Final:** [O que foi escolhido e qual o impacto na arquitetura].
* **Lição Documentada:** [Princípio reutilizável extraído da decisão].
````

---

#### Formato B — O Bug Sob Pressão & Resolução Cirúrgica

````markdown
### 1. [Título: o bug e como foi resolvido]

* **Issue:** `[#N - Título da Issue]`
* **Data:** `[DD/MM/AAAA]`
* **Formato:** `B — Bug Sob Pressão & Resolução Cirúrgica`
* **Stack Envolvida:** `[tecnologias relevantes]`
* **Sintoma & Impacto:** [O que quebrou e qual era o efeito visível].
* **Diagnóstico (Causa Raiz):** [O que realmente causou o problema].
* **Resolução Aplicada:** [A correção cirúrgica implementada].
* **Protocolo Preventivo:** [O que foi documentado ou alterado para evitar recorrência].
````

---

#### Formato C — Governança, CI/CD & Engenharia Proativa

````markdown
### 1. [Título: automação ou processo implementado]

* **Issue:** `[#N - Título da Issue]`
* **Data:** `[DD/MM/AAAA]`
* **Formato:** `C — Governança, CI/CD & Engenharia Proativa`
* **Stack Envolvida:** `[tecnologias relevantes]`
* **Gargalo Identificado:** [O problema operacional ou risco que motivou a ação].
* **Automação Implementada:** [O que foi construído ou configurado para resolver].
* **Resultado:** [Ganho concreto em velocidade, robustez ou segurança institucional].
````

---

## 🔍 PADRÕES SONAR — REFERÊNCIA RÁPIDA

### Supabase: `service_role` exclusivo para writes; reads via SECURITY DEFINER

```ts
// ✅ Leituras — usar SSR client + RPC
const supabase = await createServerSupabaseClient();
const { data } = await (supabase as any).rpc("get_dashboard_kpis");

// ✅ Writes/operações admin — usar admin client
const supabase = createServerAdminClient();
await (supabase as any).from("tabela").insert({ ... });
```

### Props `readonly`
```tsx
interface Props {
  readonly open: boolean;
  readonly productId: string;
}
```

### `<button>` com type explícito
```tsx
<button type="button" onClick={handle}>OK</button>
<button type="submit">Enviar</button>
```

### Eventos de mouse com acessibilidade
```tsx
<div
  onMouseOver={handler}
  onFocus={handler}
  onMouseOut={handler}
  onBlur={handler}
>
```

### Espaçamento JSX explícito
```tsx
// ✅ Correto
<p>E-mail{" "}<span>{email}</span>{" "}foi cadastrado.</p>

// ✅ Pontuação após </span> na MESMA LINHA que a tag
<p>
  Feedback sobre{" "}
  <span>{produto}</span>{". "}
  Obrigado pelo retorno.
</p>
```

### Testes similares devem ser parametrizados (`typescript:S5976`)
```tsx
it.each(["GitHub", "LinkedIn", "E-mail"])(
  "exibe o link %s com aria-label",
  (label) => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
  }
);
```

### Zod: `.email()` deprecated — usar `.refine()`
```ts
email: z.string().min(1, "E-mail é obrigatório.").refine(
  (val) => { const at = val.indexOf("@"); return at > 0 && val.indexOf(".", at) > at + 1; },
  { message: "Formato de e-mail inválido." }
),
```

### Server Actions: usar objeto tipado, não FormData, quando invocadas via `useTransition`
```ts
// ✅ Correto
export interface MeuFormData { campo: string; }
export async function minhaAction(data: MeuFormData) { ... }
```

### Novas tabelas Supabase: GRANT obrigatório para service_role
```sql
CREATE TABLE minha_tabela (id uuid DEFAULT gen_random_uuid() PRIMARY KEY);
ALTER TABLE minha_tabela ENABLE ROW LEVEL SECURITY;
GRANT INSERT ON public.minha_tabela TO service_role;
```

### Array index como key é proibido (`typescript:S6479`)
```tsx
{lista.map((item) => <div key={item.titulo}>{item.titulo}</div>)}
```

### `<Link>` para rotas de ação deve ter `prefetch={false}`
```tsx
<Link href="/admin/logout" prefetch={false}>Sair</Link>
```

### `npm ci` em workflows GitHub Actions
```yaml
- name: Instalar dependências
  run: npm ci --ignore-scripts
```

### Sem `npx` em workflows GitHub Actions (S6505 + S8543)
```yaml
- run: ./node_modules/.bin/playwright install --with-deps chromium
```

### Actions externas devem ser fixadas no SHA completo (`githubactions:S7637`)
```yaml
- uses: SonarSource/sonarcloud-github-action@383f7e52eae3ab0510c3cb0e7d9d150bbaeab838
```

### ARIA roles — preferir tag HTML nativa (`typescript:S6819`)
```tsx
// ✅ Correto
<fieldset className="flex gap-1 border-none p-0 m-0">
  <legend className="sr-only">Language</legend>
</fieldset>
```

### Testes RTL: não envolver `fireEvent` em `await act()` (`typescript:S8980`)
```tsx
it("clica no botão", () => {
  render(<Component />);
  fireEvent.click(screen.getByRole("button", { name: "English" }));
  expect(mockFn).toHaveBeenCalled();
});
```

### `String.match()` → `RegExp.exec()` ou `indexOf` (`typescript:S6594`)
```ts
const start = text.indexOf("{");
const end = text.lastIndexOf("}");
if (start === -1 || end <= start) return null;
return JSON.parse(text.slice(start, end + 1));
```

### Imagens externas: usar `<Image>` do Next.js (`@next/next/no-img-element`)
```tsx
import Image from "next/image";
<Image src="https://flagcdn.com/w20/br.png" alt="" width={20} height={15} />
```

### Imports de módulos Node.js com prefixo `node:` (`javascript:S7772`)
```js
import { mkdirSync } from 'node:fs';
```

### Não modificar arquivos com baixa cobertura apenas para anotações de tipo

Antes de aplicar `Readonly<>` ou `readonly` em qualquer arquivo, verificar a cobertura atual:
```bash
node scripts/check-coverage.mjs 2>&1 | grep "nome-do-arquivo"
```
Se o arquivo tiver funções sem cobertura, **não modificá-lo** apenas para conformidade de tipo.

### `async function` + `FormEventHandler<void>` gera S6544
```tsx
// ✅ Correto
async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  await algumaAction();
}
```

---

## 📝 DOCUMENTAÇÃO INLINE

| Caso | Obrigatório? |
|---|---|
| Funções exportadas em `lib/` | ✅ Sempre |
| Server Actions (`"use server"`) | ✅ Sempre |
| Route handlers (`route.ts`) com efeito colateral | ✅ Sempre |
| Hooks customizados (`use*.ts`) | ✅ Sempre |
| Lógica não-óbvia (workarounds, restrições) | ✅ Sempre |
| Componentes React simples | ❌ |
| Funções utilitárias auto-explicativas | ❌ |

---

## 🌿 CONVENÇÕES DE BRANCHES

| Tipo | Padrão |
|---|---|
| Nova funcionalidade | `feature/[N]-descricao-curta` |
| Correção de bug | `fix/[N]-descricao-curta` |
| Setup / config | `chore/[N]-descricao-curta` |
| Documentação | `docs/[N]-descricao-curta` |

---

## 💬 CONVENTIONAL COMMITS — TIPOS VÁLIDOS

| Tipo | Quando usar |
|---|---|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `chore` | Setup, config, dependências |
| `docs` | Documentação |
| `style` | Formatação, sem mudança de lógica |
| `refactor` | Refatoração sem mudança funcional |
| `test` | Adição ou correção de testes |
| `ci` | Mudanças em CI/CD |

> **Regra de ouro:** descrição curta sempre no imperativo em português.
> Todo texto de commit, PR (título e corpo) em **português**.

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
| `status: in progress` | Issue em andamento |
| `status: ready for review` | PR aberto, aguardando revisão |

---

*Elucya Talk — Cesar Antonio Brito Pizarro*
*CLAUDE.md v1.0 — protocolo completo adotado do Kairos Labs*
