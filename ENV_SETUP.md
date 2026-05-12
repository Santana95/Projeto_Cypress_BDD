# ========================================================
# CONFIGURAÇÃO DE VARIÁVEIS DE AMBIENTE
# ========================================================

## Instalação do dotenv

Execute no terminal (bash/git-bash):
```bash
npm install dotenv --save-dev
```

Ou se estiver usando PowerShell, execute como Administrador primeiro.

## Arquivo .env

Um arquivo `.env` foi criado na raiz do projeto com as variáveis de configuração:

```env
BASE_URL=http://automationpratice.com.br
CYPRESS_DEFAULT_COMMAND_TIMEOUT=10000
CYPRESS_REPORT_DIR=cypress/reports
CYPRESS_REPORT_TITLE=Projeto_Cypress_BDD
```

**⚠️ IMPORTANTE:** O arquivo `.env` está no `.gitignore` - NÃO commitá-lo ao Git!

## Como usar variáveis de ambiente

### Em cypress.config.js:
```javascript
require("dotenv").config();

baseUrl: process.env.BASE_URL || "http://automationpratice.com.br",
defaultCommandTimeout: parseInt(process.env.CYPRESS_DEFAULT_COMMAND_TIMEOUT) || 10000,
```

### Nos Steps (usando Cypress.env):

```javascript
// No arquivo .env:
CYPRESS_USUARIO_TESTE=usuario@teste.com
CYPRESS_SENHA_TESTE=senhaSegura123!

// Nos steps:
const email = Cypress.env('USUARIO_TESTE');
const senha = Cypress.env('SENHA_TESTE');
loginPage.login(email, senha);
```

### Via linha de comando:
```bash
BASE_URL=http://staging.automationpratice.com.br npm test
CYPRESS_DEFAULT_COMMAND_TIMEOUT=15000 npm test
```

## Ambientes Diferentes

Para utilizar diferentes ambientes, edite o .env:

**Desenvolvimento (padrão):**
```env
BASE_URL=http://localhost:3000
```

**Staging:**
```env
BASE_URL=http://staging.automationpratice.com.br
```

**Produção:**
```env
BASE_URL=https://automationpratice.com.br
```

## Benefícios

✅ Configurações não hardcoded  
✅ Segurança para credenciais sensíveis  
✅ Fácil trocar ambientes sem mexer no código  
✅ Diferentes configs por desenvolvedor  
✅ Pronto para CI/CD  
