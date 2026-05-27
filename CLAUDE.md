# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projeto

Quiz app de aprendizado (React + Vite) sendo publicado como Azure Static Web App. O objetivo principal é aprender Azure, IaC e DevOps — o app é o veículo de aprendizado, não o produto final.

## Estrutura

O código do app vive dentro de `app/`. Todos os comandos npm devem ser executados a partir dessa pasta:

```
Azure_SWA/
├── CLAUDE.md
├── app/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       └── index.css
└── infra/          ← ainda não existe; será criado durante o aprendizado de IaC
```

## Comandos

Rodar sempre a partir de `app/`:

```bash
npm run dev       # servidor de desenvolvimento (Vite)
npm run build     # build de produção → gera app/dist/
npm run preview   # preview local do build de produção
```

## Estado atual do projeto

- **Git**: repositório ainda não inicializado — será criado como parte do aprendizado
- **Azure**: subscription ativa, mas nenhum recurso criado ainda
- **CI/CD**: GitHub Actions será configurado junto com o Azure SWA
- **Linting/formatação**: não configurado ainda

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

## Roadmap de evolução

O app vai crescer além do frontend estático:
1. **Fase atual**: React SPA → Azure Static Web Apps
2. **Próxima fase**: adicionar backend (Azure Functions ou API separada) e banco de dados
Mantenha o código preparado para essa evolução sem over-engineering agora.
