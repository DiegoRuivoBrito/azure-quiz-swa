# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projeto

Quiz app de aprendizado (React + Vite) sendo publicado como Azure Static Web App. O objetivo principal é aprender Azure, IaC e DevOps — o app é o veículo de aprendizado, não o produto final.

## Estrutura

O código do app vive dentro de `app/`. Todos os comandos npm devem ser executados a partir dessa pasta:

```
Azure_SWA/
├── CLAUDE.md
├── ROADMAP.md
├── .github/
│   └── workflows/
│       └── deploy.yml        ← CI/CD: build + deploy para Azure SWA
├── app/
│   ├── package.json
│   ├── .npmrc                ← legacy-peer-deps=true (ESLint 10 compat)
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       └── index.css
└── infra/
    ├── main.tf               ← provider, backend remoto, recursos Azure
    ├── variables.tf
    ├── outputs.tf
    └── terraform.tfvars      ← gitignored (contém subscription_id)
```

## Comandos

Rodar sempre a partir de `app/`:

```bash
npm run dev       # servidor de desenvolvimento (Vite)
npm run build     # build de produção → gera app/dist/
npm run preview   # preview local do build de produção
```

## Estado atual do projeto

- **Git**: repositório ativo em `github.com/DiegoRuivoBrito/azure-quiz-swa`, branch `main`
- **Azure**: SWA `swa-quiz-swa` e Resource Group `rg-quiz-swa` criados via Terraform em `eastus2`
- **CI/CD**: GitHub Actions configurado — push no `main` faz build e deploy automaticamente
- **Terraform**: backend remoto configurado — tfstate no Storage Account `stquizswastate` (RG `rg-terraform-state`)
- **Linting**: ESLint 10 com flat config (`eslint.config.js`)

## Perfil do usuário

O usuário é **iniciante completo com Azure e IaC** mas tem todas as ferramentas instaladas (az, terraform, gh, node). Sempre:
- Explique o **porquê** antes do **como**
- Conecte o que estamos fazendo com o conceito geral
- Use linguagem simples, sem pressupor conhecimento prévio de cloud
- Sugira sempre o próximo passo lógico na jornada de aprendizado

## Estilo de comunicação

Após cada ação executada, forneça uma explicação técnica com:
- **O que foi feito** — explique tecnicamente o que aconteceu, não apenas nomeie a ação
- **Por que foi feito** — explique o raciocínio técnico por trás da decisão, conectando ao contexto do projeto

A explicação completa deve ser legível em no máximo 2 minutos. Pode ir além de 1-2 frases por tópico — o importante é ser técnico e informativo, não apenas descritivo. Se o usuário quiser aprofundar, ele pergunta.

## Convenções do app

- UI em português (pt-BR)
- React 18 com JSX (arquivos `.jsx`)
- Sem TypeScript por ora
- Estado gerenciado com `useState`/`useMemo` do React (sem Zustand/Redux)
- O build de produção vai para `app/dist/` — é essa pasta que o Azure SWA serve

## Fluxo de desenvolvimento por fase

Cada fase do ROADMAP.md segue este fluxo obrigatório:

1. **Conceito primeiro** — invocar o skill `professor` para explicar o porquê antes do como
2. **Hands-on** — executar os comandos/código com o usuário
3. **Atualizar o ROADMAP.md** — marcar a fase como `✅ Concluída` e registrar o que foi feito
4. **Atualizar a memória** — refletir o novo estado em `memory/project_state.md`

Nunca avançar para a próxima fase sem concluir esses quatro passos.

## Roadmap de evolução

O estado completo das fases está em `ROADMAP.md` na raiz do projeto. O app vai crescer além do frontend estático:

- **Próxima fase (10)**: Azure Functions — adicionar backend integrado ao SWA
- **Fase futura (11)**: banco de dados (Azure Cosmos DB ou SQL)
- **Fase futura (12)**: ambientes `dev` e `prod` com Terraform workspaces

Mantenha o código preparado para essa evolução sem over-engineering agora.
