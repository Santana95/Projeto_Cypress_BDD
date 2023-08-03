/// <reference types="cypress" />

Cypress.Commands.add("acessLogin", () => {
  cy.visit("/").get("#top_header");

  cy.get(".fa-user").click();
});

Cypress.Commands.add("acessRegister", () => {
  cy.visit("/").get("#top_header");

  cy.get(".fa-lock").click();
});
