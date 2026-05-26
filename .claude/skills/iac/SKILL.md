---
name: iac
description: Guia de Infrastructure as Code com Terraform para Azure. Use quando o usuário quiser criar ou gerenciar recursos Azure via Terraform, entender IaC, ou evoluir de "clicar no portal" para infraestrutura versionada.
disable-model-invocation: true
---

Conduz o usuário na jornada de IaC com Terraform + Azure. O usuário é iniciante completo — sempre explique os conceitos antes dos comandos, e conecte tudo ao projeto concreto (o quiz app no Azure).

## Argumento

`$ARGUMENTS` pode indicar o foco:
- `conceitos` → explica o que é IaC e por que usar Terraform
- `setup` → configura o ambiente Terraform para Azure
- `swa` → cria o Static Web App via Terraform (em vez do portal)
- `state` → explica e configura o state file remoto
- `plan` → workflow de plan → apply → destroy
- (vazio) → começa pelo início: conceitos → setup → primeiro recurso

## Estrutura de pastas que vamos criar

```
Azure_SWA/
├── app/          ← o código do app (já existe)
└── infra/        ← vamos criar isso
    ├── main.tf
    ├── variables.tf
    ├── outputs.tf
    └── terraform.tfvars
```

## Conceitos fundamentais (sempre explique antes de codar)

**O que é IaC?**
"Em vez de clicar no portal do Azure para criar recursos, você escreve um arquivo de texto descrevendo o que quer. O Terraform lê esse arquivo e cria os recursos por você. Vantagem: você versiona a infraestrutura igual ao código."

**O que é o State File?**
"O Terraform mantém um arquivo chamado `terraform.tfstate` que mapeia o que está no seu código com o que existe de verdade no Azure. É a memória do Terraform."

**O ciclo de vida básico:**
```
terraform init    → baixa o provider do Azure
terraform plan    → mostra o que vai mudar (sem fazer nada ainda)
terraform apply   → executa as mudanças
terraform destroy → destrói os recursos
```

## Setup inicial

```powershell
# Criar pasta de infra
New-Item -ItemType Directory -Path "infra"
Set-Location "infra"

# Autenticar Terraform com Azure
az login
az account show  # confirma qual subscription está ativa
```

## Primeiro arquivo: main.tf

Sempre construa incrementalmente — comece simples, adicione complexidade depois:

```hcl
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location
}
```

Após criar o arquivo:
1. Explique cada bloco
2. Execute `terraform init`
3. Execute `terraform plan` e mostre o output
4. Pergunte: "O que você acha que o `apply` vai fazer?"

## Boas práticas que ensinar desde o início

- **Nunca commite `terraform.tfstate`** — adicionar ao .gitignore
- **Use variáveis** (`variables.tf`) em vez de valores hardcoded
- **Use outputs** (`outputs.tf`) para expor valores importantes (como a URL do SWA)
- **`terraform plan` sempre antes de `apply`** — nunca aplique às cegas

## Checkpoint de aprendizado

Após cada recurso criado via Terraform, faça o usuário:
1. Confirmar no portal do Azure que o recurso existe
2. Explicar com suas próprias palavras o que o código faz
3. Tentar destruir e recriar o recurso (`terraform destroy` + `terraform apply`)

Isso solidifica que a infraestrutura é código, não configuração manual.
