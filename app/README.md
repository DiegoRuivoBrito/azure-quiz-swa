# Terraform Quiz App

Aplicativo React simples com um quiz de Terraform. A cada carregamento, são sorteadas 5 perguntas diferentes a partir de um conjunto de 20.

## Como usar

```bash
cd app
npm install
npm run dev
```

Acesse a URL exibida pelo Vite para responder ao quiz.

## Build Docker

```bash
docker build -t terraform-quiz-app .
```

## Observações

- O quiz usa `useState` para armazenar as respostas.
- Cada pergunta tem 5 alternativas.
- Ao confirmar, o aplicativo calcula a nota final.
