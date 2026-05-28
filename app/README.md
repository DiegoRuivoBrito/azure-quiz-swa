# Quiz App

App de quiz de cultura pop em React + Vite, hospedado como Azure Static Web App.

## Temas disponíveis

- Friends
- Game of Thrones
- Two and a Half Men
- The Office

Cada sessão sorteia 5 perguntas aleatórias de um banco de 40 por tema.

## Desenvolvimento local

```bash
npm install
npm run dev       # servidor de desenvolvimento → http://localhost:5173
npm run build     # build de produção → dist/
npm run preview   # preview local do build
npm run lint      # ESLint
```

## Stack

- React 18 + JSX
- Vite 5
- ESLint 10 (flat config)
- Estado gerenciado com `useState` do React

## Deploy

O deploy é feito automaticamente via GitHub Actions ao fazer push para `main`. O build gerado em `dist/` é enviado para o Azure Static Web Apps.
