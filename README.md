# Azure Quiz SWA

Quiz app de aprendizado construído como veículo para aprender **Azure**, **IaC com Terraform** e **DevOps com GitHub Actions**.

O app em si é simples — perguntas sobre séries de TV. A complexidade intencional está na infraestrutura.

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 18 + Vite |
| Hospedagem | Azure Static Web Apps |
| IaC | Terraform (`azurerm ~> 4.0`) |
| CI/CD | GitHub Actions |
| Estado Terraform | Azure Storage Account |

## Estrutura

```
Azure_SWA/
├── app/                  # Código React
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .npmrc
├── infra/                # Infraestrutura como código
│   ├── main.tf           # Provider, backend remoto, recursos Azure
│   ├── variables.tf
│   ├── outputs.tf
│   └── terraform.tfvars  # Gitignored — contém subscription_id
└── .github/
    └── workflows/
        └── deploy.yml    # Build + deploy automático no push para main
```

## Rodando localmente

```bash
cd app
npm install
npm run dev
```

## Infraestrutura

Os recursos Azure são gerenciados via Terraform. O estado fica em um Azure Storage Account remoto (`stquizswastate`).

**Pré-requisitos:** `az login` com subscription ativa e `terraform.tfvars` configurado.

```bash
cd infra
terraform init
terraform plan
terraform apply
```

Recursos criados:
- `rg-quiz-swa` — Resource Group do projeto
- `swa-quiz-swa` — Azure Static Web App (Free tier)

## CI/CD

Todo push para `main` dispara o workflow `.github/workflows/deploy.yml`:

```
git push → GitHub Actions → npm run build → Azure/static-web-apps-deploy → CDN global
```

O deploy usa o secret `AZURE_STATIC_WEB_APPS_API_TOKEN`, gerado pelo Terraform via `terraform output -raw swa_deployment_token`.

## Roadmap

O progresso de aprendizado está documentado em [ROADMAP.md](ROADMAP.md).
