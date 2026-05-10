/**
 * BasePage - Classe base para todas as páginas
 * Contém métodos comuns reutilizáveis
 */
export class BasePage {
  /**
   * Visita uma URL
   * @param {string} path - Caminho relativo da URL
   */
  visit(path = "/") {
    cy.visit(path);
  }

  /**
   * Aguarda um elemento estar visível
   * @param {string} selector - Seletor CSS do elemento
   * @param {number} timeout - Tempo máximo de espera em ms
   */
  waitForElement(selector, timeout = 5000) {
    cy.get(selector, { timeout }).should("be.visible");
  }

  /**
   * Clica em um elemento
   * @param {string} selector - Seletor CSS do elemento
   */
  click(selector) {
    cy.get(selector).click();
  }

  /**
   * Digita texto em um campo
   * @param {string} selector - Seletor CSS do elemento
   * @param {string} text - Texto a digitar
   * @param {boolean} force - Forçar digitação mesmo se não visível
   */
  typeText(selector, text, force = false) {
    cy.get(selector).type(text, { force });
  }

  /**
   * Valida que um elemento contém um texto específico
   * @param {string} selector - Seletor CSS do elemento
   * @param {string} text - Texto esperado
   */
  verifyText(selector, text) {
    cy.get(selector).should("have.text", text);
  }

  /**
   * Valida que um elemento está visível
   * @param {string} selector - Seletor CSS do elemento
   */
  verifyElementVisible(selector) {
    cy.get(selector).should("be.visible");
  }

  /**
   * Limpa o campo de texto e digita novo valor
   * @param {string} selector - Seletor CSS do elemento
   * @param {string} text - Novo texto
   */
  clearAndType(selector, text) {
    cy.get(selector).clear().type(text);
  }

  /**
   * Aguarda carregamento da página
   */
  waitPageLoad() {
    cy.get("body").should("be.visible");
  }

  /**
   * Valida atributo de um elemento
   * @param {string} selector - Seletor CSS
   * @param {string} attr - Nome do atributo
   * @param {string} value - Valor esperado
   */
  verifyAttribute(selector, attr, value) {
    cy.get(selector).should("have.attr", attr, value);
  }
}
