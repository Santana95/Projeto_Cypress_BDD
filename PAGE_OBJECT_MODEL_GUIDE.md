# 📘 Page Object Model (POM) - Guia Completo

## O que é Page Object Model?

Page Object Model é um padrão de design que encapsula os elementos de uma página e as operações que podem ser realizadas nela em uma classe. Isso torna os testes mais **maintíveis**, **legíveis** e **reutilizáveis**.

## Estrutura do Projeto

```
cypress/support/pages/
├── BasePage.js          # Classe base com métodos comuns
├── LoginPage.js         # Page Object para login
├── RegisterPage.js      # Page Object para registro
└── HomePage.js          # Page Object para home
```

## 1. BasePage - Métodos Comuns

A classe `BasePage.js` contém métodos que são compartilhados por todas as páginas:

```javascript
import { BasePage } from "./BasePage";

class MinhaPage extends BasePage {
  // Herda todos estes métodos:
  visit(path)                  // Navega para URL
  click(selector)              // Clica em elemento
  typeText(selector, text)     // Digita em campo
  verifyText(selector, text)   // Valida texto
  verifyElementVisible(selector) // Valida visibilidade
  waitForElement(selector)     // Aguarda elemento
  clearAndType(selector, text) // Limpa e digita
  verifyAttribute(selector, attr, value) // Valida atributo
}
```

## 2. LoginPage - Exemplo Prático

```javascript
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  // ===== LOCATORS =====
  get emailInput() {
    return "#user";
  }

  get loginButton() {
    return "#btnLogin";
  }

  // ===== AÇÕES =====
  navigate() {
    this.visit("/");
    this.click(".fa-user");
  }

  fillEmail(email) {
    this.typeText(this.emailInput, email);
  }

  clickLoginButton() {
    this.click(this.loginButton);
  }

  // ===== VALIDAÇÕES =====
  verifyLoginSuccess(message, email) {
    this.verifyText("#swal2-title", message);
  }
}
```

## 3. Como Usar nos Steps

### ❌ ANTES (Commands - Deprecated)

```javascript
Given("I am on login screen", () => {
  cy.acessLogin();
});

When("I click on Login", () => {
  cy.login();
});
```

### ✅ DEPOIS (Page Objects - Recomendado)

```javascript
import { LoginPage } from "../pages/LoginPage";

const loginPage = new LoginPage();

Given("I am on login screen", () => {
  loginPage.navigate();
  loginPage.verifyLoginPageLoaded();
});

When("I click on Login", () => {
  loginPage.clickLoginButton();
});

Then("I see success message {string}", (message) => {
  loginPage.verifyLoginSuccess(message, "user@example.com");
});
```

## 4. Benefícios do Page Object Model

### 🎯 Problema: Mudança de Seletor

Se o seletor do email mudar de `#user` para `#email-input`:

#### ❌ SEM Page Objects (commands espalhados)
Precisa atualizar em TODOS os arquivos:
- login_steps.js
- register_steps.js
- security_steps.js
- Qualquer outro test que use

#### ✅ COM Page Objects
Atualiza em UM único lugar (LoginPage.js):
```javascript
get emailInput() {
  return "#email-input";  // ← Atualiza aqui
}
```

### 📚 Exemplo: Teste de Segurança Fácil

```javascript
// Com Page Objects, adicionar teste de segurança é trivial
Then("o campo de senha deve ter tipo {string}", (type) => {
  loginPage.verifyPasswordInputType(type);
});
```

## 5. Criando uma Nova Page

### Passo 1: Criar a classe

```javascript
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  get priceTotal() {
    return ".total-price";
  }

  get confirmButton() {
    return "#btn-confirm";
  }

  navigate() {
    this.visit("/checkout");
  }

  confirmPurchase() {
    this.click(this.confirmButton);
  }

  verifyTotalPrice(price) {
    this.verifyText(this.priceTotal, price);
  }
}
```

### Passo 2: Usar nos steps

```javascript
import { CheckoutPage } from "../pages/CheckoutPage";

const checkoutPage = new CheckoutPage();

Given("I am on checkout page", () => {
  checkoutPage.navigate();
});

Then("I verify total is {string}", (price) => {
  checkoutPage.verifyTotalPrice(price);
});
```

## 6. Testes de Segurança com Page Objects

### Validar tipo de campo senha

```javascript
// LoginPage.js
verifyPasswordInputType(expectedType = "password") {
  this.verifyAttribute(this.passwordInput, "type", expectedType);
}

// security_steps.js
Then("o campo de senha deve ter tipo {string}", (type) => {
  loginPage.verifyPasswordInputType(type);
});
```

### Validar que senha não é armazenada

```javascript
// security_steps.js
Then("a senha NÃO deve estar armazenada em localStorage", () => {
  cy.window().then((win) => {
    const allData = JSON.stringify(win.localStorage);
    expect(allData).not.to.include("senhaValida123");
  });
});
```

## 7. Migração Gradual

Não precisa refatorar tudo de uma vez:

### Fase 1: Novos testes
Todos os novos testes devem usar Page Objects

### Fase 2: Segurança
Implementar testes de segurança com Page Objects (✓ FEITO)

### Fase 3: Refatorar antigos
Gradualmente refatorar testes existentes

### Fase 4: Remover commands
Depois que tudo estiver migrado, remover commands antigos

## 8. Padrões e Convenções

### ✅ FAÇA

```javascript
// Nomes descritivos
get emailInputField() { return "#user"; }
get loginButton() { return "#btnLogin"; }

// Métodos reutilizáveis
fillEmail(email) { this.typeText(this.emailInputField, email); }

// Documentação
/**
 * Preenche o email e executa login
 * @param {string} email
 * @param {string} password
 */
login(email, password) { ... }
```

### ❌ NÃO FAÇA

```javascript
// Selectors curtos e não descritivos
get inp() { return "#user"; }

// Lógica complexa nos steps (deve estar na página)
cy.get("#user").type(email).then(...complex logic...)

// Validações no step em vez da página
cy.get(".error").should("be.visible");
// MELHOR: loginPage.verifyErrorMessage();
```

## 9. Métodos Úteis da BasePage

```javascript
// Navegação
visit(path)
waitPageLoad()

// Interação
click(selector)
typeText(selector, text, force)
clearAndType(selector, text)

// Validação
verifyText(selector, text)
verifyElementVisible(selector)
verifyAttribute(selector, attr, value)
waitForElement(selector, timeout)
```

## 10. Exemplo Completo: Teste de Segurança

### Feature (security.feature)
```gherkin
@security
Cenario: Senha não aparece em texto plano
  Dado que eu estou na tela de login
  Entao o campo de senha deve ter tipo "password"
```

### Page Object (LoginPage.js)
```javascript
get passwordInput() {
  return "#password";
}

verifyPasswordInputType(expectedType = "password") {
  this.verifyAttribute(this.passwordInput, "type", expectedType);
}
```

### Step (security_steps.js)
```javascript
Then("o campo de senha deve ter tipo {string}", (type) => {
  loginPage.verifyPasswordInputType(type);
});
```

## 📊 Comparação: Com vs Sem POM

| Aspecto | Sem POM | Com POM |
|---------|---------|---------|
| Mudança de seletor | Múltiplos arquivos | Um arquivo |
| Legibilidade | Confusa | Clara |
| Reutilização | Baixa | Alta |
| Escalabilidade | Difícil | Fácil |
| Manutenção | Cara | Barata |
| Testes de segurança | Difícil | Fácil |

## 🎓 Recursos

- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Page Object Model Pattern](https://martinfowler.com/bliki/PageObject.html)
- [OWASP Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)

---

**Conclusão:** Use Page Objects para código mais profissional, mantível e seguro! 🚀
