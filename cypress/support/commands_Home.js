/// <reference types="cypress" />

Cypress.Commands.add("acessLogin", (email, password) => {
  cy.visit("/").get("#top_header");

  cy.get(".fa-user").click();
});

Cypress.Commands.add("acessRegister", (email, password) => {
  cy.visit("/").get("#top_header");

  cy.get(".fa-lock").click();
});
