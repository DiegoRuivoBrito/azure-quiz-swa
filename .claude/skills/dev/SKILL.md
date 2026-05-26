---
name: dev
description: Workflow de desenvolvimento do quiz app. Use quando o usuário quiser adicionar features ao frontend React, preparar o app para receber backend, ou implementar melhorias na UI. Cobre React, Vite, e preparação para Azure Functions/banco de dados.
---

Conduz o desenvolvimento do quiz app com foco em boas práticas de React e preparação para evolução futura (backend + banco de dados).

## Argumento

`$ARGUMENTS` pode indicar o tipo de tarefa:
- `feature <descrição>` → implementa uma nova feature no app
- `refactor` → melhora a estrutura do código existente
- `backend-prep` → prepara o app para receber uma API
- `component <nome>` → cria um novo componente React
- (vazio) → avalia o estado atual e sugere próximos passos

## Estado atual do app

- **Fonte de dados**: perguntas hardcoded em `App.jsx` — future state: API
- **Componentes**: `Home` e `Quiz` em um único arquivo `App.jsx`
- **Estilo**: CSS puro em `index.css`
- **Estado**: `useState`/`useMemo` locais — sem gerenciador global

## Convenções do projeto

- Arquivos `.jsx` para componentes com JSX
- Português no UI; código (variáveis, funções) em inglês
- Sem TypeScript por ora — não adicione sem discutir com o usuário
- Sem bibliotecas externas sem justificativa clara

## Workflow para novas features

**1. Entenda o pedido**
Antes de codar, descreva em 2-3 linhas o que vai ser implementado e confirme com o usuário.

**2. Implemente incrementalmente**
Para mudanças grandes, divida em partes testáveis. Nunca faça uma mudança enorme de uma vez.

**3. Teste no browser**
Sempre rode `npm run dev` e confirme que:
- O golden path funciona
- Nenhuma feature existente quebrou
- A UI faz sentido visualmente

**4. Verifique o build de produção**
Para mudanças que vão ao ar:
```powershell
Set-Location app
npm run build
npm run preview
```

## Preparando para backend (quando chegar a hora)

O app hoje é 100% estático. Quando formos adicionar backend:

**Opção Azure**: Azure Functions + Azure Static Web Apps linked backend
- A SWA tem suporte nativo para Azure Functions em `/api`
- Não precisa de CORS separado — o SWA faz o proxy automaticamente

**Estrutura futura:**
```
Azure_SWA/
├── app/          ← frontend React (atual)
├── api/          ← Azure Functions (futuro)
│   └── GetQuestions/
│       └── index.js
└── infra/        ← Terraform (em construção)
```

**Sinais de que é hora de criar a API:**
- Queries de banco de dados no frontend (não faça isso)
- Lógica de negócio que precisa ser privada
- Dados que precisam de autenticação

## Banco de dados (fase futura)

Opções no ecossistema Azure SWA:
- **Azure Cosmos DB** (NoSQL) — bom para dados de quiz/sessão
- **Azure SQL Database** — bom para dados relacionais
- **Azure Table Storage** — mais simples e barato para MVP

Não escolha agora — espere ter requisitos concretos antes de decidir.

## Quando sugerir refatoração

O arquivo `App.jsx` vai ficar grande. Considere extrair componentes quando:
- Um componente passa de ~100 linhas
- A mesma lógica aparece em dois lugares
- Uma parte do app vai ser reutilizada em outra página

Sempre proponha a refatoração e explique o motivo antes de implementar.
