/**
 * EXEMPLO DE REFATORAÇÃO: LOGIN_STEPS COM PAGE OBJECT MODEL
 * ============================================================
 * 
 * Este arquivo mostra como refatorar os steps de login
 * usando o novo Page Object Model implementado.
 * 
 * ANTES (usando commands globais):
 * ---------------------------------
 * Given("I am on login screen", () => {
 *   cy.acessLogin();
 * });
 * 
 * DEPOIS (usando Page Object):
 * ----------------------------
 * Given("I am on login screen", () => {
 *   const loginPage = new LoginPage();
 *   loginPage.navigate();
 * });
 * 
 * 
 * BENEFÍCIOS DO PAGE OBJECT MODEL
 * ================================
 * 
 * 1. MANUTENIBILIDADE
 *    - Se um seletor mudar, atualiza em um único lugar
 *    - Exemplo: Se #user muda para #email-input
 *    - Atualiza só em LoginPage.js, não em todos os tests
 * 
 * 2. LEGIBILIDADE
 *    - Código mais descritivo e semântico
 *    - loginPage.fillEmail() é mais claro que cy.get("#user").type()
 * 
 * 3. REUTILIZAÇÃO
 *    - Métodos comuns em BasePage.js
 *    - Compartilhados entre LoginPage, RegisterPage, etc
 * 
 * 4. ESCALABILIDADE
 *    - Fácil adicionar novas páginas
 *    - Padrão consistente
 * 
 * 5. TESTES DE SEGURANÇA
 *    - Métodos específicos: verifyPasswordInputType()
 *    - Facilita validações de segurança
 * 
 * 
 * ESTRUTURA DO PROJETO
 * =====================
 * 
 * cypress/support/
 * ├── pages/
 * │   ├── BasePage.js          <- Classe base com métodos comuns
 * │   ├── LoginPage.js         <- Locators e ações do login
 * │   ├── RegisterPage.js      <- Locators e ações do registro
 * │   └── HomePage.js          <- Locators e ações da home
 * │
 * ├── step_definitions/
 * │   ├── login_steps.js       <- Steps do login (mantém compatibilidade)
 * │   ├── register_steps.js    <- Steps do registro
 * │   └── security_steps.js    <- Steps de segurança (NOVO)
 * │
 * ├── commands_Login.js        <- Commands (DEPRECATED - usar Page Objects)
 * ├── commands_Register.js     <- Commands (DEPRECATED)
 * ├── commands_Home.js         <- Commands (DEPRECATED)
 * └── e2e.js
 * 
 * 
 * MIGRAÇÃO GRADUAL
 * =================
 * 
 * Não precisa refatorar tudo de uma vez:
 * 
 * Fase 1: Criar Page Objects (✓ FEITO)
 * Fase 2: Novos testes usam Page Objects
 * Fase 3: Gradualmente refatorar testes antigos
 * Fase 4: Remover commands antigos
 * 
 * 
 * EXEMPLO: REFATORAÇÃO DE LOGIN_STEPS.js
 * ========================================
 * 
 * VERSÃO ATUAL (com commands):
 */

// import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
// import { faker } from "@faker-js/faker";
// import "../commands_Home.js";
// import "../commands_Login.js";

// const randomEmail = faker.internet.email();

// Given("I am on login screen", () => {
//   cy.acessLogin();  // Usa command global
// });

// When("I click on Login", () => {
//   cy.login();  // Usa command global
// });

/**
 * VERSÃO REFATORADA (com Page Objects):
 */

// import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
// import { faker } from "@faker-js/faker";
// import { LoginPage } from "../pages/LoginPage";

// const loginPage = new LoginPage();
// const randomEmail = faker.internet.email();

// Given("I am on login screen", () => {
//   loginPage.navigate();  // Método específico da página
//   loginPage.verifyLoginPageLoaded();  // Validação
// });

// When("I click on Login", () => {
//   loginPage.clickLoginButton();  // Método específico
// });

// Then("I see success message {string}", (message) => {
//   loginPage.verifyLoginSuccess(message, randomEmail);  // Validação de página
// });

/**
 * 
 * PRÓXIMOS PASSOS
 * ===============
 * 
 * 1. Usar Page Objects para testes novos
 * 2. Implementar testes de segurança (security.feature)
 * 3. Gradualmente refatorar testes antigos
 * 4. Adicionar mais validações de segurança
 * 5. Integrar com relatórios de segurança
 * 
 * 
 * EXEMPLO DE USO COMPLETO
 * =======================
 */

export class LoginPageRefactorExample {
  // ANTES: Feature com commands
  static oldWayFeature() {
    return `
Feature: Login (OLD WAY - using commands)
  Background:
    Given I am on login screen

  Scenario: Login with valid credentials
    When I fill e-mail with "user@example.com"
    And I fill password with "senha123"
    And I click on Login
    Then I see success message "Login realizado"
    `;
  }

  // DEPOIS: Feature com Page Objects (RECOMENDADO)
  static newWayFeature() {
    return `
Feature: Login (NEW WAY - using Page Objects)
  Background:
    Given I am on the login screen

  Scenario: Login with valid credentials
    When I fill the email with "user@example.com"
    And I fill the password with "senha123"
    And I click the login button
    Then I should see the success message "Login realizado"
    And the password field should be type "password"
    And the email field should be type "text"
    `;
  }
}

/**
 * CHECKLIST PARA REFATORAÇÃO
 * ==========================
 * 
 * [ ] Criar PageObject para cada página
 * [ ] Mover locators para PageObject
 * [ ] Mover ações para PageObject
 * [ ] Mover validações para PageObject
 * [ ] Refatorar steps para usar PageObject
 * [ ] Atualizar features se necessário
 * [ ] Testar que tudo funciona
 * [ ] Documentar novo padrão
 * [ ] Remover commands antigos (após testes)
 */
