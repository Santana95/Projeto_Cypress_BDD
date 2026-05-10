import { BasePage } from "./BasePage";

/**
 * HomePage - Page Object para a página inicial
 * Define locators e ações da página home
 */
export class HomePage extends BasePage {
  // ===== LOCATORS =====
  get userIcon() {
    return ".fa-user";
  }

  get registerIcon() {
    return ".fa-lock";
  }

  get pageHeader() {
    return "#top_header";
  }

  get pageTitle() {
    return "h1";
  }

  get logoutButton() {
    return ".fa-sign-out";
  }

  // ===== AÇÕES =====

  /**
   * Navega até a home
   */
  navigate() {
    this.visit("/");
    this.waitForElement(this.pageHeader);
  }

  /**
   * Clica no ícone de usuário (login)
   */
  clickUserIcon() {
    this.click(this.userIcon);
  }

  /**
   * Clica no ícone de registro
   */
  clickRegisterIcon() {
    this.click(this.registerIcon);
  }

  /**
   * Faz logout se estiver logged
   */
  logout() {
    if (cy.get(this.logoutButton).length > 0) {
      this.click(this.logoutButton);
    }
  }

  // ===== VALIDAÇÕES =====

  /**
   * Valida que a página inicial está carregada
   */
  verifyHomePageLoaded() {
    this.verifyElementVisible(this.pageHeader);
    this.verifyElementVisible(this.userIcon);
    this.verifyElementVisible(this.registerIcon);
  }

  /**
   * Valida que o título da página é o esperado
   * @param {string} title - Título esperado
   */
  verifyPageTitle(title) {
    this.verifyText(this.pageTitle, title);
  }
}
