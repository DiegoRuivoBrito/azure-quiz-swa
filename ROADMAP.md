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

## Fase 10 — Azure Functions: adicionando backend ao quiz

**Conceito:**
O SWA tem integração nativa com Azure Functions via pasta `api/`. Tudo que estiver em `api/` é automaticamente deployado como Functions e fica acessível em `/api/<nome-da-function>`. Isso permite adicionar lógica server-side sem sair do repositório.

**Hands-on:**
- Criar a pasta `api/` com uma Function simples (ex: salvar pontuação)
- Testar localmente com o Azure Functions Core Tools
- Fazer deploy via GitHub Actions (o workflow já suporta)

**Entregável:** Endpoint `/api/score` funcionando em produção, integrado ao quiz.

---

## Fases futuras

- **Fase 11** — Banco de dados: Azure Cosmos DB ou Azure SQL conectado às Functions
- **Fase 12** — Ambientes: infra separada para `dev` e `prod` com Terraform workspaces
