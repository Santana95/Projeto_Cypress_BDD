/// <reference types="cypress" />

Cypress.Commands.add("acessarTelaLogin", () => {
  cy.visit("/").get("#top_header");

  cy.get(".fa-user").click();
});

Cypress.Commands.add("acessarTelaRegistro", () => {
  cy.visit("/").get("#top_header");

  cy.get(".fa-lock").click();
});
