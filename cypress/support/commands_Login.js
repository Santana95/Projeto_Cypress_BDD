/// <reference types="cypress" />

Cypress.Commands.add("entrar", () => {
  cy.get("#btnLogin").click();
});

Cypress.Commands.add("verificarMensagemErro", (mensagem) => {
  cy.get(".invalid_input").should("have.text", mensagem);
});

Cypress.Commands.add("preencherEmail", (email) => {
  cy.get("#user").type(email);
});

Cypress.Commands.add("preencherSenha", (senha) => {
  cy.get("#password").type(senha);
});

Cypress.Commands.add("verificarMensagemSucesso", (mensagem, emailAleatorio) => {
  cy.get("#swal2-title").should("have.text", mensagem);

  cy.get("#swal2-html-container").should("have.text", `Olá, ${emailAleatorio}`);
});
