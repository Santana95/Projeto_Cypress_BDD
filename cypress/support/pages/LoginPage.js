import { BasePage } from "./BasePage";

/**
 * LoginPage - Page Object para a página de login
 * Define locators e ações específicas do login
 */
export class LoginPage extends BasePage {
  // ===== LOCATORS =====
  get emailInput() {
    return "#user";
  }

  get passwordInput() {
    return "#password";
  }

  get loginButton() {
    return "#btnLogin";
  }

  get errorMessage() {
    return ".invalid_input";
  }

  get successTitle() {
    return "#swal2-title";
  }

  get successMessage() {
    return "#swal2-html-container";
  }

  get userIcon() {
    return ".fa-user";
  }

  get pageHeader() {
    return "#top_header";
  }

  // ===== AÇÕES =====

  /**
   * Navega até a página de login
   */
  navigate() {
    this.visit("/");
    this.waitForElement(this.pageHeader);
    this.click(this.userIcon);
    this.waitForElement(this.emailInput);
  }

  /**
   * Preenche o campo de email
   * @param {string} email - Email a digitar
   */
  fillEmail(email) {
    this.typeText(this.emailInput, email);
  }

  /**
   * Preenche o campo de senha
   * @param {string} password - Senha a digitar
   */
  fillPassword(password) {
    this.typeText(this.passwordInput, password);
  }

  /**
   * Clica no botão de login
   */
  clickLoginButton() {
    this.click(this.loginButton);
  }

  /**
   * Executa o fluxo completo de login
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   */
  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickLoginButton();
  }

  // ===== VALIDAÇÕES =====

  /**
   * Valida mensagem de erro
   * @param {string} message - Mensagem esperada
   */
  verifyErrorMessage(message) {
    this.verifyText(this.errorMessage, message);
  }

  /**
   * Valida sucesso do login
   * @param {string} successMsg - Mensagem de sucesso esperada
   * @param {string} userName - Nome do usuário esperado
   */
  verifyLoginSuccess(successMsg, userName) {
    this.verifyText(this.successTitle, successMsg);
    this.verifyText(this.successMessage, `Olá, ${userName}`);
  }

  /**
   * Valida que a página de login está acessível
   */
  verifyLoginPageLoaded() {
    this.verifyElementVisible(this.emailInput);
    this.verifyElementVisible(this.passwordInput);
    this.verifyElementVisible(this.loginButton);
  }

  /**
   * Valida que os campos de input têm o atributo correto
   * @param {string} expectedType - Tipo esperado (text, password, etc)
   */
  verifyEmailInputType(expectedType = "text") {
    this.verifyAttribute(this.emailInput, "type", expectedType);
  }

  verifyPasswordInputType(expectedType = "password") {
    this.verifyAttribute(this.passwordInput, "type", expectedType);
  }
}
