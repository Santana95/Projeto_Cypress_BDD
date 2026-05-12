/// <reference types="cypress" />

Cypress.Commands.add("registrar", () => {
  cy.get("#btnRegister").click();
});

Cypress.Commands.add("verificarMensagemErroRegistro", (mensagem) => {
  cy.get("#errorMessageFirstName").should("have.text", mensagem);
});

Cypress.Commands.add("preencherNomeRegistro", (nome) => {
  cy.get("#user").type(nome, { force: true });
});

Cypress.Commands.add("preencherEmailRegistro", (email) => {
  cy.get("#email").type(email);
});

Cypress.Commands.add("preencherSenhaRegistro", (senha) => {
  cy.get("#password").type(senha);
});

Cypress.Commands.add("verificarMensagemSucessoRegistro", (mensagem, nomeAleatorio) => {
  cy.get("#swal2-title").should("have.text", mensagem);

  cy.get("#swal2-html-container").should("have.text", `Bem-vindo ${nomeAleatorio}`);
});
