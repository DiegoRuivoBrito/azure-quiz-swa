# Roadmap de Aprendizado — Azure Static Web App

Cada fase tem quatro seções fixas:
- **Conceito** — o que você vai entender antes de executar
- **Hands-on** — o que vamos construir juntos
- **Entregável** — evidência concreta de que a fase foi concluída
- **Checkpoint** — uma pergunta para confirmar o entendimento real, não só a execução

---

## Fase 0 — Git + GitHub ✅ Concluída

**O que foi feito:**
- Repositório Git inicializado na raiz do projeto
- Primeiro commit com o código do app e as skills do Claude
- Repositório remoto criado em `github.com/DiegoRuivoBrito/azure-quiz-swa`

---

## Fase 1 — Mapa mental do Azure ✅ Concluída

**O que foi feito:**
- Verificada a subscription ativa (`Azure subscription 1`, região `eastus2` escolhida)
- Entendida a hierarquia: Tenant → Subscription → Resource Group → Recursos
- Definido o mapa do projeto:
  ```
  Subscription: Azure subscription 1
  └── rg-quiz-swa
      └── Static Web App: quiz-swa
  ```

**Checkpoint respondido:** Resource Groups são a unidade de lifecycle do Azure — deleção em cascata, controle de acesso (RBAC) e billing por grupo. Não são só organização visual.

**Região escolhida:** `eastus2` — Static Web Apps não está disponível em `brazilsouth`. A região define só o plano de gerenciamento; o conteúdo é servido globalmente via CDN.

---

## Fase 2 — Terraform: conceito e setup ✅ Concluída

**O que foi feito:**
- Criada a pasta `infra/` com quatro arquivos:
  - `main.tf` — provider `azurerm ~> 4.0` e bloco `terraform {}`
  - `variables.tf` — declaração de `subscription_id`, `location`, `project_name`
  - `terraform.tfvars` — valores reais (gitignored — não vai ao GitHub)
  - `outputs.tf` — vazio por ora, preenchido nas próximas fases
- `terraform init` executado: provider `azurerm v4.74.0` baixado
- `.gitignore` atualizado: `.terraform/`, `*.tfstate*` e `terraform.tfvars` excluídos do Git
- `.terraform.lock.hcl` gerado — equivalente ao `package-lock.json`, deve ser commitado

**Checkpoint respondido:** Deletar o `tfstate` não faz o Terraform re-sincronizar com a nuvem. Ele tentaria recriar os recursos e falharia com erro "resource already exists". Para recuperar: `terraform import`. Para evitar: nunca deletar manualmente, e em produção usar backend remoto (Fase 11).

---

## Fase 3 — Primeiro recurso: Resource Group ✅ Concluída

**O que foi feito:**
- Adicionado `resource "azurerm_resource_group" "main"` ao `main.tf` com nome `rg-${var.project_name}` e localização via variável
- Ciclo completo executado: `plan` → `apply` → verificação no Portal → `destroy` → `apply`
- ESLint configurado: ESLint 10 + `eslint-plugin-react` + `eslint-plugin-react-hooks`, flat config (`eslint.config.js`)
- Bug real encontrado e corrigido pelo ESLint: `Math.random()` dentro de `useMemo` substituído por `useState` com inicializador

**Checkpoint respondido:** Sem o `tfstate` compartilhado, Terraform tentaria criar o RG do zero e falharia com `ResourceGroupAlreadyExists` no Azure. A diferença do portal: mudanças em IaC passam pelo Git — têm histórico, revisão e rastreabilidade. `tfstate` compartilhado é o que a Fase 11 resolve com backend remoto no Azure Storage.

---

## Fase 4 — Azure Static Web App: entender o serviço ✅ Concluída

**Conceito:**
Antes de criar o SWA com Terraform, entender o que ele é de verdade.

Azure Static Web App **não é um servidor**. Quando você faz deploy, o Azure pega seus arquivos estáticos (HTML, CSS, JS — o que o Vite gera em `dist/`) e os distribui por uma CDN global (Content Delivery Network). Uma CDN é uma rede de servidores espalhados pelo mundo — o usuário recebe o arquivo do servidor geograficamente mais próximo a ele.

Comparação:
| | VM / Container App | Static Web App |
|---|---|---|
| O que roda | Um processo Node/nginx/etc. 24h/dia | Nada — só arquivos estáticos |
| Custo | Proporcional ao tempo ligado | Free tier disponível |
| Deploy | Você empurra para o servidor | Você empurra para o Git |
| Escala | Você configura | Automático pela CDN |

O SWA também tem integração nativa com GitHub: ao criar o recurso, o Azure gera um **deployment token** (uma chave secreta) que o GitHub Actions usa para autenticar o deploy. É esse token que faz a ligação entre os dois serviços.

**Hands-on:**
- Explorar o SWA no Azure Portal (sem criar) para ver quais configurações existem
- Ler o conceito de deployment token e entender para onde ele vai na próxima fase

**Entregável:** Entender a diferença entre SWA e um servidor tradicional, e saber o que é o deployment token.

**Checkpoint:** Por que um app React + Vite se encaixa perfeitamente no modelo de Static Web App, mas um app Node.js com Express não se encaixaria?

---

## Fase 5 — SWA com Terraform ✅ Concluída

**Conceito:**
Agora que você entende o que é um SWA, vamos criá-lo via Terraform. O recurso `azurerm_static_web_app` cria a casca do serviço no Azure — sem código, sem GitHub, só a infraestrutura. Dois outputs importantes serão gerados:
- `default_host_name`: a URL onde o app vai ficar acessível
- `api_key`: o deployment token que o GitHub Actions vai usar

O `api_key` é sensível — vira um secret no GitHub na próxima fase, e **nunca vai para o código** nem para o `terraform.tfstate` commitado.

**Hands-on:**
- Adicionar `resource "azurerm_static_web_app"` ao `main.tf`
- Criar `outputs.tf` para expor `default_host_name` e `api_key`
- Rodar `terraform apply`
- Capturar o `api_key` do output (usado na próxima fase)

**Entregável:** SWA criado no Azure, URL gerada (ainda sem conteúdo), `api_key` em mãos.

**Checkpoint:** Se você rodar `terraform apply` de novo sem mudar nada, o que acontece? Por que?

---

## Fase 6 — GitHub Actions: o pipeline de CI/CD ✅ Concluída

**Conceito:**
GitHub Actions é o sistema de automação do GitHub. Você descreve um fluxo de trabalho em um arquivo YAML (`.github/workflows/`) e o GitHub executa automaticamente quando um evento acontece — neste caso, um `push` no branch `main`.

O workflow do SWA tem três etapas principais:
1. **Checkout** — o GitHub Actions clona o repositório dentro da máquina virtual temporária dele
2. **Build** — roda `npm run build`, gerando a pasta `dist/`
3. **Deploy** — usa a action `Azure/static-web-apps-deploy` com o `api_key` para enviar o `dist/` ao Azure

O `api_key` é armazenado como um **GitHub Secret** — uma variável de ambiente criptografada que o Actions pode usar mas que não aparece em logs e não fica visível no código.

**Hands-on:**
- Adicionar o `api_key` como secret no repositório GitHub (`AZURE_STATIC_WEB_APPS_API_TOKEN`)
- Criar o arquivo `.github/workflows/azure-swa-deploy.yml`
- Entender cada bloco do YAML antes de commitar

**Entregável:** Arquivo de workflow commitado, secret configurado no GitHub.

**Checkpoint:** Por que o `api_key` não pode ficar direto no arquivo YAML do workflow?

---

## Fase 7 — Primeiro deploy ✅ Concluída

**Conceito:**
Com tudo no lugar, um `git push` dispara a cadeia completa. Vamos acompanhar cada etapa em tempo real pelo GitHub Actions e verificar o resultado final no Azure.

A cadeia completa que você terá construído:

```
git push
  └── GitHub recebe o código
       └── GitHub Actions dispara o workflow
            ├── Checkout do código
            ├── npm run build (gera dist/)
            └── Azure/static-web-apps-deploy
                 └── Envia dist/ para o Azure SWA
                      └── Azure distribui pela CDN global
                           └── App acessível na URL pública
```

**Hands-on:**
- Commitar as mudanças do app (os novos tópicos Two and a Half Men e The Office)
- Fazer `git push` e acompanhar o workflow no GitHub
- Verificar o app funcionando na URL do Azure

**Entregável:** Quiz app online e acessível publicamente em `https://<nome>.azurestaticapps.net`.

**Checkpoint:** O que acontece se você fizer uma mudança no código e der push? Precisa fazer alguma coisa manualmente?

---

## Fase 8 — Consolidação e revisão ✅ Concluída

**Conceito:**
A melhor prova de que você entendeu IaC de verdade é conseguir destruir tudo e recriar do zero com confiança. `terraform destroy` apaga o SWA e o Resource Group. `terraform apply` os recria em minutos — idênticos ao original.

Também é o momento de revisar o que foi construído como sistema completo: código, versionamento, automação e infraestrutura como partes integradas de um pipeline.

**Hands-on:**
- Rodar `terraform destroy` (o app sai do ar)
- Rodar `terraform apply` (o app volta ao ar automaticamente via GitHub Actions)
- Documentar o que foi aprendido

**Entregável:** Confiança para criar e destruir a infraestrutura sem medo, sabendo que o código é a fonte da verdade.

---

---

## Fase 9 — Estado remoto do Terraform ✅ Concluída

**Conceito:**
Atualmente o `terraform.tfstate` vive só na sua máquina. Se você perder o arquivo, o Terraform perde o rastro de tudo que criou no Azure. Em times ou ambientes de CI/CD isso é inviável. A solução é mover o estado para um **backend remoto** — no Azure, isso significa um Storage Account com um blob container.

**Hands-on:**
- Criar um Storage Account e container no Terraform
- Configurar o bloco `backend "azurerm"` no `main.tf`
- Rodar `terraform init -migrate-state` para mover o estado local para a nuvem

**Entregável:** `tfstate` armazenado no Azure Storage, máquina local sem arquivo de estado.

---

## Fase 10 — Azure Functions: adicionando backend ao quiz ✅ Concluída

**O que foi feito:**
- Criada a pasta `api/` com Azure Functions v4 (Node.js), integrada ao SWA via `api_location: api` no workflow
- Perguntas do quiz movidas do bundle JS (`App.jsx`) para `api/src/data/questions.js`
- Endpoint `GET /api/questions?topic=<key>` retorna as perguntas do tópico solicitado
- `App.jsx` atualizado para fazer `fetch('/api/questions?topic=...)` via `useEffect`, com estados de loading e erro
- Deploy automático das Functions junto com o frontend via GitHub Actions

**Por que managed Functions e não um Function App separado:** Functions integradas ao SWA não exigem nenhum recurso Azure adicional — o runtime é gerenciado pelo próprio SWA. Menos infra, menos custo, mesma URL (sem CORS).

---

## Fase 11 — Banco de dados: Azure Cosmos DB ✅ Concluída

**O que foi feito:**
- Adicionado `azurerm_cosmosdb_account` (serverless), `azurerm_cosmosdb_sql_database` e dois containers ao `main.tf`:
  - `questions` — particionado por `/topic`, armazena as perguntas do quiz
  - `scores` — particionado por `/email`, armazena os resultados dos usuários
- `outputs.tf` atualizado com `cosmosdb_endpoint` e `cosmosdb_primary_key` (sensitive)
- `api/src/lib/cosmos.js` — client Cosmos DB compartilhado entre as Functions, lê endpoint e chave via variáveis de ambiente (`COSMOS_ENDPOINT`, `COSMOS_KEY`)
- `api/src/functions/getScores.js` — `GET /api/scores?email=...` retorna histórico e médias por tópico
- `api/src/functions/postScore.js` — `POST /api/scores` salva resultado ao finalizar o quiz
- `api/scripts/seed.js` — script para popular o container `questions` no Cosmos DB
- Perguntas do quiz migradas para o Cosmos DB; adicionar ou editar perguntas não exige redeploy

**Por que dois containers separados:** `questions` e `scores` têm partition keys diferentes (`/topic` vs `/email`) porque os padrões de acesso são opostos — perguntas são lidas por tópico, resultados são consultados por usuário. Separar os containers maximiza a eficiência das queries no Cosmos DB.

**Melhorias na página de histórico (pós-fase):**
- Histórico reorganizado em quatro seções: **Média por tema** (%), **Melhor resultado** (melhor nota individual por tema, destacado em dourado), **Acumulado por tema** (total de acertos/questões somando todas as partidas), **Partidas individuais** (cada jogo separado com data)
- `accumulatedByTopic` e `bestByTopic` calculados no frontend a partir do array `history` já retornado pela API, sem mudança de backend

---

## Fase 12 — Ambientes: dev e prod com Terraform Workspaces ✅ Concluída

**Conceito:**
Hoje temos um único ambiente: tudo que vai para `main` vai direto para produção. Em projetos reais, você precisa de pelo menos dois ambientes — um para testar mudanças antes de expô-las aos usuários.

Terraform Workspaces permitem usar o mesmo código de infra para criar recursos paralelos e independentes. Um `workspace` é como uma "cópia isolada" do estado — `terraform workspace select dev` mantém um `tfstate` separado do `terraform workspace select prod`. No Azure Storage (backend remoto), os arquivos ficam separados:

```
blob container: tfstate
├── env:/prod/quiz-swa.terraform.tfstate
└── env:/dev/quiz-swa.terraform.tfstate
```

A arquitetura de ambientes:
```
Branch: dev  → GitHub Actions → rg-quiz-swa-dev  → swa-quiz-swa-dev  → cosmos-quiz-swa-dev
Branch: main → GitHub Actions → rg-quiz-swa-prod → swa-quiz-swa-prod → cosmos-quiz-swa-prod
```

Cada ambiente tem seu próprio Resource Group, SWA e Cosmos DB — completamente isolados. `terraform destroy` no workspace `dev` não toca no tfstate do `prod`.

**Checkpoint respondido:** `terraform destroy` age sobre o tfstate do workspace ativo — cada workspace tem o seu próprio arquivo de estado separado no Storage Account. Destruir `dev` não afeta `prod`.

**Plano de execução (hands-on):**

| # | Onde | O que |
|---|------|--------|
| 1 | `infra/main.tf` | Adicionar `${terraform.workspace}` nos nomes dos 3 recursos + `app_settings` no SWA para injetar `COSMOS_ENDPOINT` e `COSMOS_KEY` automaticamente |
| 2 | terminal (`infra/`) | `terraform destroy` no workspace `default` (infra atual sai do ar brevemente) |
| 3 | terminal | `terraform workspace new prod` + `terraform apply` |
| 4 | GitHub | Adicionar secret `AZURE_STATIC_WEB_APPS_API_TOKEN_PROD` com o token do SWA prod |
| 5 | terminal | `terraform workspace new dev` + `terraform apply` |
| 6 | GitHub | Adicionar secret `AZURE_STATIC_WEB_APPS_API_TOKEN_DEV` com o token do SWA dev |
| 7 | `.github/workflows/deploy.yml` | Disparar em `main` e `dev`; usar token correto por branch via `$GITHUB_REF` |
| 8 | Git | Criar branch `dev` e dar push |
| 9 | `api/scripts/seed.js` | Re-popular Cosmos DB de prod (e opcionalmente dev) |

**Mudanças no `main.tf` (resumo):**
```hcl
# Nomes dinâmicos por workspace
resource "azurerm_resource_group" "main" {
  name = "rg-${var.project_name}-${terraform.workspace}"
}

resource "azurerm_static_web_app" "main" {
  name = "swa-${var.project_name}-${terraform.workspace}"
  app_settings = {
    COSMOS_ENDPOINT = azurerm_cosmosdb_account.main.endpoint
    COSMOS_KEY      = azurerm_cosmosdb_account.main.primary_key
  }
}

resource "azurerm_cosmosdb_account" "main" {
  name = "cosmos-${var.project_name}-${terraform.workspace}"
}
```

**Mudanças no `deploy.yml` (resumo):**
```yaml
on:
  push:
    branches: [main, dev]

# Detectar ambiente pelo branch:
# refs/heads/main → AZURE_STATIC_WEB_APPS_API_TOKEN_PROD
# refs/heads/dev  → AZURE_STATIC_WEB_APPS_API_TOKEN_DEV
```

**O que foi feito:**
- `main.tf` atualizado: nomes dos recursos usam `${terraform.workspace}` (Resource Group, SWA, Cosmos DB)
- `app_settings` injetados automaticamente no SWA com `COSMOS_ENDPOINT` e `COSMOS_KEY` do Cosmos DB do mesmo workspace
- Workspaces `prod` e `dev` criados; `terraform apply` executado nos dois
- `deploy.yml` atualizado: dispara em `main` e `dev`, seleciona o token correto por branch via `$GITHUB_REF`
- Secrets `AZURE_STATIC_WEB_APPS_API_TOKEN_PROD` e `AZURE_STATIC_WEB_APPS_API_TOKEN_DEV` configurados no GitHub
- Branch `dev` criado no Git e pushed

**Entregável:** Push no branch `dev` deploya no ambiente de desenvolvimento. Merge para `main` deploya em produção. Os dois coexistem sem interferência.

**Custo extra:** dois Cosmos DB serverless coexistindo — com o uso atual (quiz pessoal), o custo adicional é próximo de zero.

---

## Fase 13 — Backup do banco de produção

**Conceito:**
O `terraform destroy` nos mostrou na prática o risco de não ter backup: dados de scores perdidos para sempre. Em produção real, o banco de dados é o ativo mais crítico — código e infra se recriam em minutos com IaC, mas dados perdidos não voltam.

O Cosmos DB oferece dois modos de backup:
- **Periodic** (padrão): snapshots a cada 1–24h, retidos por 2–30 dias. Restore leva horas e é feito pelo suporte da Microsoft.
- **Continuous** (o padrão corporativo): point-in-time restore para qualquer momento dos últimos 7 ou 30 dias. Você mesmo inicia o restore pelo Portal ou CLI sem abrir ticket.

**Restrições identificadas e validadas pelo arquiteto:**
- Continuous backup é incompatível com contas Serverless
- Timer triggers não funcionam em SWA managed functions (Free tier) — o host não fica sempre ativo
- Storage Account no mesmo RG do workspace é destruído com ele — não é backup real

**Abordagem aprovada: GitHub Actions scheduled workflow + RG de dados permanente**

```
[GitHub Actions: on schedule diário]
        ↓ az cosmosdb sql container query (via COSMOS_KEY como GitHub Secret)
Cosmos DB → todos os scores como JSON
        ↓ az storage blob upload (via BACKUP_STORAGE_CONNECTION como GitHub Secret)
Storage Account stquizswabackup → container backups-prod/backups-dev
        (em rg-quiz-swa-data — RG permanente, fora dos workspaces Terraform)
```

**Por que essa arquitetura:**
- GitHub Actions é o scheduler — não depende do host do SWA estar ativo
- Nenhum endpoint HTTP novo — acesso direto ao Cosmos DB via az CLI elimina superfície de ataque
- `rg-quiz-swa-data` é criado via az CLI uma única vez, **não gerenciado por nenhum workspace Terraform** — sobrevive a qualquer `terraform destroy`
- Connection strings ficam como GitHub Secrets, nunca em `app_settings` (sem risco de cascade destroy)

**Separação de responsabilidades dos Resource Groups:**

| RG | Ciclo de vida | Conteúdo |
|---|---|---|
| `rg-terraform-state` | Permanente | tfstate, controle de infra |
| `rg-quiz-swa-data` | Permanente | backups de dados da aplicação |
| `rg-quiz-swa-dev` | Destruível | SWA dev, Cosmos DB dev |
| `rg-quiz-swa-prod` | Destruível | SWA prod, Cosmos DB prod |

**Hands-on:**
1. Criar `rg-quiz-swa-data` via `az group create` (operação única, fora do Terraform)
2. Criar Storage Account `stquizswabackup` e containers `backups-prod` e `backups-dev` via az CLI
3. Adicionar `BACKUP_STORAGE_CONNECTION` e `COSMOS_KEY_PROD` como GitHub Secrets
4. Adicionar job `backup` ao `deploy.yml` com `on: schedule: - cron: '0 2 * * *'`
5. Documentar processo de restore (como importar o JSON de volta ao Cosmos DB)

**Entregável:** Scores de prod exportados diariamente como JSON para `rg-quiz-swa-data`, sobrevivendo a qualquer operação Terraform nos workspaces.

**Checkpoint:** Por que o Storage Account de backup não deve ser gerenciado pelo mesmo workspace Terraform que gerencia o Cosmos DB?

---

## Fase 14 — Script de bootstrap: recriação do ambiente do zero

**Conceito:**
Em ambientes corporativos existe um conceito chamado **Day-0 script** ou **bootstrap script** — um script que recria tudo que é necessário para um desenvolvedor (ou um pipeline de CI) operar do zero em uma nova máquina. Ele captura o conhecimento implícito ("o que eu preciso fazer depois de um terraform destroy?") e torna o processo repetível e auditável.

O que precisamos automatizar:
1. Configurar identidade Git (`user.name`, `user.email`)
2. Gerar chave SSH, registrá-la no GitHub e verificar a conexão
3. `terraform init` no workspace correto
4. Capturar os deployment tokens do Terraform output e atualizar os GitHub Secrets automaticamente (`gh secret set`)
5. Rodar o seed do Cosmos DB nos ambientes necessários

Sem esse script, cada vez que a infra é recriada (intencional ou acidental), há uma lista mental de passos que podem ser esquecidos — e um erro silencioso (app sem token atualizado, banco vazio) é difícil de diagnosticar.

**Hands-on:**
- Criar `scripts/bootstrap.ps1` (PowerShell para Windows) que executa os passos acima em ordem
- Criar `scripts/update-swa-tokens.ps1` — script focado só em capturar os tokens do Terraform e atualizar os GitHub Secrets (útil após qualquer `terraform apply` que recriar o SWA)
- Documentar no `README` quando e como usar cada script

**Entregável:** Após um `terraform destroy` + `terraform apply`, rodar `bootstrap.ps1` reconfigura tudo — Git, secrets do GitHub, seed do banco — sem nenhum passo manual.

**Checkpoint:** Por que atualizar o GitHub Secret do deployment token é necessário após recriar o SWA? O que acontece com o deploy se você esquecer?

---

## Fase 15 — Key Vault: gestão de secrets

**Conceito:**
Atualmente `COSMOS_KEY` é injetada direto no `app_settings` do SWA. Isso significa que a chave do banco fica visível no Portal do Azure, nos logs do Terraform e em qualquer lugar que liste as configurações do app. Em produção corporativa real, secrets nunca ficam em `app_settings` — eles ficam no **Azure Key Vault** e o app referencia o Key Vault, não o valor direto.

O padrão é: Azure Key Vault armazena o secret → SWA/Function tem uma **Managed Identity** (identidade atribuída pelo Azure, sem senha) → o RBAC do Key Vault autoriza essa identidade a ler o secret → o app usa uma referência `@Microsoft.KeyVault(...)` em vez do valor real.

Benefícios corporativos:
- Rotação de chaves sem redeploy (você muda no Key Vault, o app pega automaticamente)
- Auditoria de quem acessou qual secret e quando
- Nenhum humano precisa ver a chave para o app funcionar
- Secrets não aparecem em logs ou outputs do Terraform

**Hands-on:**
- Criar `azurerm_key_vault` e `azurerm_key_vault_secret` no `main.tf` (só para o workspace `prod`)
- Habilitar Managed Identity no SWA (`identity { type = "SystemAssigned" }`)
- Dar permissão de leitura no Key Vault para a identidade do SWA via RBAC
- Substituir o valor direto de `COSMOS_KEY` no `app_settings` pela referência Key Vault

**Entregável:** `COSMOS_KEY` armazenada no Key Vault de prod. O app funciona normalmente, mas a chave não aparece em nenhum lugar visível.

**Checkpoint:** O que é uma Managed Identity e por que ela é preferível a um service principal com senha para autenticar o acesso ao Key Vault?

---

## Fase 16 — GitHub Environments: aprovação manual para prod

**Conceito:**
Em produção corporativa, ninguém faz deploy direto em prod sem revisão. O GitHub Environments resolve isso com **protection rules**: antes de um job de deploy em prod rodar, ele pausa e aguarda aprovação de um revisor designado. Isso cria um gate de segurança sem mudar nada no código.

Complementar a isso: **branch protection rules** no branch `main` que exigem Pull Request antes de qualquer merge. Com isso, o fluxo completo fica:
```
dev branch → PR para main → reviewer aprova → merge → GitHub Actions pausa → aprovação manual → deploy em prod
```

Isso elimina deploys acidentais em prod e cria um histórico auditável de quem aprovou o quê e quando.

**Hands-on:**
- Criar GitHub Environments `production` e `development` no repositório
- Configurar protection rule no environment `production` com você mesmo como required reviewer
- Mover os secrets de token por environment (em vez de secrets de repositório)
- Habilitar branch protection no `main`: require PR, require 1 approval, dismiss stale reviews
- Atualizar `deploy.yml` para referenciar os environments

**Entregável:** Merge para `main` dispara o workflow, que pausa antes do deploy e aguarda aprovação manual. Deploy em `dev` continua automático.

---

## Fase 17 — Observabilidade: Application Insights

**Conceito:**
Sem monitoramento, você só descobre que algo quebrou em prod quando um usuário reclama. **Application Insights** é o serviço de APM (Application Performance Monitoring) do Azure — ele coleta automaticamente métricas de disponibilidade, erros, latência e uso, e permite configurar alertas que te notificam antes que o problema afete usuários.

Para Azure Functions especificamente, o Application Insights mostra: quantas invocações por função, taxa de erro, duração média, exceptions com stack trace completo — tudo sem adicionar código de logging manual.

**Hands-on:**
- Criar `azurerm_application_insights` no `main.tf` (workspace `prod`)
- Conectar ao SWA via `app_settings` (`APPINSIGHTS_INSTRUMENTATIONKEY`)
- Configurar um alerta de disponibilidade (availability test) que notifica por email se o app ficar fora do ar
- Configurar um alerta de taxa de erro nas Functions (threshold: >5% de erros em 5 minutos)
- Explorar o Live Metrics durante um uso real do quiz

**Entregável:** Dashboard do Application Insights mostrando métricas reais de uso. Alerta de disponibilidade configurado e testado.

**Checkpoint:** Qual a diferença entre um log e uma métrica? Por que o Application Insights mantém os dois?

---

## Fase 18 — Controle de custos: budget alerts

**Conceito:**
Contas de cloud podem surpreender. Um recurso esquecido ligado, um loop de código que chama a API em excesso, ou simplesmente crescimento de uso — tudo isso pode gerar cobranças inesperadas. Em ambientes corporativos, **budget alerts** são obrigatórios: eles definem um limite de gasto mensal e disparam notificações quando você se aproxima dele.

O Azure Cost Management permite criar budgets por Resource Group, subscription ou tag. Para este projeto, faz sentido um budget por Resource Group de prod — se o custo do `rg-quiz-swa-prod` passar de um threshold definido (ex: $10/mês), você recebe um email antes de ser cobrado em excesso.

**Hands-on:**
- Explorar o Azure Cost Management no Portal para ver o gasto atual por serviço
- Criar um `azurerm_consumption_budget_resource_group` no Terraform para o RG de prod
- Configurar notificação em 80% e 100% do budget mensal definido
- Criar uma tag `environment` nos recursos via Terraform para filtrar custos por ambiente no Cost Management

**Entregável:** Budget alert ativo para prod. Tags `environment=prod` e `environment=dev` nos recursos, visíveis no relatório de custos do Azure.
