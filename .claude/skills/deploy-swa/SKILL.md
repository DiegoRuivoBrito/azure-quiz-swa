---
name: deploy-swa
description: Workflow completo de deploy para Azure Static Web Apps via GitHub. Use quando o usuário quiser publicar o app, configurar CI/CD, ou entender o fluxo de deployment. Cobre desde git init até o app online.
disable-model-invocation: true
---

Conduz o usuário pelo deployment completo do quiz app no Azure Static Web Apps. Sempre explique cada etapa antes de executar — o objetivo é aprendizado, não só o deploy.

## Argumento

`$ARGUMENTS` pode indicar uma etapa específica:
- `status` → verifica o estado atual (git, azure, workflow)
- `git` → foca na configuração do repositório Git/GitHub
- `azure` → foca na criação do recurso Azure SWA
- `workflow` → foca no GitHub Actions workflow
- (vazio) → executa o flow completo do início

## Pré-requisitos — verifique antes de começar

```powershell
# Verifica ferramentas instaladas
gh --version
az --version
git --version
node --version
```

Se alguma ferramenta estiver ausente, pare e oriente a instalação antes de continuar.

## Etapa 1: Inicializar o repositório Git

**Explique primeiro**: "O Azure SWA precisa de um repositório Git porque ele não recebe arquivos diretamente — ele observa seu código e faz o build automaticamente toda vez que você faz push. Isso é o CI/CD em ação."

```powershell
# Na raiz do projeto (Azure_SWA/)
git init
git add .
git commit -m "feat: initial quiz app setup"
```

Verifique o `.gitignore` em `app/` — confirme que `node_modules/` e `dist/` estão incluídos.

## Etapa 2: Criar repositório no GitHub

**Explique primeiro**: "O GitHub vai ser a ponte entre seu código local e o Azure. Quando você fizer push, o GitHub Actions vai automaticamente buildar e fazer deploy."

```powershell
gh repo create azure-quiz-swa --public --source=. --remote=origin --push
```

Confirme que o repositório foi criado e o push foi bem-sucedido.

## Etapa 3: Criar o Azure Static Web App

**Explique primeiro**: "Agora vamos criar o recurso no Azure. O SWA vai se conectar ao GitHub e criar um workflow automático de deploy."

```powershell
# Login (se necessário)
az login

# Criar resource group (se não tiver)
az group create --name rg-quiz-app --location brazilsouth

# Criar o Static Web App
az staticwebapp create \
  --name quiz-swa-app \
  --resource-group rg-quiz-app \
  --source https://github.com/SEU_USUARIO/azure-quiz-swa \
  --location eastus2 \
  --branch main \
  --app-location "app" \
  --output-location "dist" \
  --login-with-github
```

**Parâmetros importantes — explique cada um**:
- `--app-location "app"`: onde está o package.json (nossa pasta `app/`)
- `--output-location "dist"`: onde o Vite coloca os arquivos buildados
- `--branch main`: qual branch o Azure vai observar

## Etapa 4: Acompanhar o primeiro deploy

**Explique**: "O Azure criou automaticamente um arquivo de workflow em `.github/workflows/`. Esse arquivo instrui o GitHub Actions a buildar e fazer deploy a cada push."

```powershell
# Ver o status do deploy
az staticwebapp show --name quiz-swa-app --resource-group rg-quiz-app --query "defaultHostname"

# Ver logs via GitHub CLI
gh run list --limit 5
gh run view --log
```

## Etapa 5: Verificar o app online

Abra a URL retornada pelo comando acima. O app deve estar funcionando.

**Recap de aprendizado**: "Você acabou de configurar um pipeline completo de CI/CD. A partir de agora, qualquer `git push` para main vai automaticamente publicar uma nova versão do app."

## Troubleshooting comum

| Sintoma | Causa provável | Solução |
|---|---|---|
| Build falha no Actions | `app-location` errado | Verificar se aponta para pasta com package.json |
| App em branco | `output-location` errado | Deve ser `dist` para Vite |
| 404 em rotas do SPA | Falta `staticwebapp.config.json` | Criar arquivo de roteamento |
