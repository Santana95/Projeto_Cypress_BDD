import { BasePage } from "./BasePage";

/**
 * RegisterPage - Page Object para a página de registro
 * Define locators e ações específicas do registro
 */
export class RegisterPage extends BasePage {
  // ===== LOCATORS =====
  get nameInput() {
    return "#user";
  }

  get emailInput() {
    return "#email";
  }

  get passwordInput() {
    return "#password";
  }

  get registerButton() {
    return "#btnRegister";
  }

  get errorMessageName() {
    return "#errorMessageFirstName";
  }

  get successTitle() {
    return "#swal2-title";
  }

  get successMessage() {
    return "#swal2-html-container";
  }

  get lockIcon() {
    return ".fa-lock";
  }

  get pageHeader() {
    return "#top_header";
  }

  // ===== AÇÕES =====

  /**
   * Navega até a página de registro
   */
  navigate() {
    this.visit("/");
    this.waitForElement(this.pageHeader);
    this.click(this.lockIcon);
    this.waitForElement(this.nameInput);
  }

  /**
   * Preenche o campo de nome
   * @param {string} name - Nome a digitar
   */
  fillName(name) {
    this.typeText(this.nameInput, name, true);
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
   * Clica no botão de registro
   */
  clickRegisterButton() {
    this.click(this.registerButton);
  }

  /**
   * Executa o fluxo completo de registro
   * @param {string} name - Nome do usuário
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   */
  register(name, email, password) {
    this.fillName(name);
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickRegisterButton();
  }

  /**
   * Limpa os campos de formulário
   */
  clearForm() {
    cy.get(this.nameInput).clear();
    cy.get(this.emailInput).clear();
    cy.get(this.passwordInput).clear();
  }

  // ===== VALIDAÇÕES =====

  /**
   * Valida mensagem de erro no nome
   * @param {string} message - Mensagem esperada
   */
  verifyErrorMessage(message) {
    this.verifyText(this.errorMessageName, message);
  }

  /**
   * Valida sucesso do registro
   * @param {string} successMsg - Mensagem de sucesso esperada
   * @param {string} userName - Nome do usuário esperado
   */
  verifyRegisterSuccess(successMsg, userName) {
    this.verifyText(this.successTitle, successMsg);
    this.verifyText(this.successMessage, `Bem-vindo ${userName}`);
  }

  /**
   * Valida que a página de registro está acessível
   */
  verifyRegisterPageLoaded() {
    this.verifyElementVisible(this.nameInput);
    this.verifyElementVisible(this.emailInput);
    this.verifyElementVisible(this.passwordInput);
    this.verifyElementVisible(this.registerButton);
  }

  /**
   * Valida que o campo de senha está protegido
   */
  verifyPasswordInputType(expectedType = "password") {
    this.verifyAttribute(this.passwordInput, "type", expectedType);
  }

  /**
   * Valida que o campo de email tem o tipo correto
   */
  verifyEmailInputType(expectedType = "email") {
    this.verifyAttribute(this.emailInput, "type", expectedType);
  }
}
