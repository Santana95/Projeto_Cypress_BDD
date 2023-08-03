/// <reference types="cypress" />

Cypress.Commands.add("login", () => {
  cy.get("#btnLogin").click();
});

Cypress.Commands.add("checkErrorMessage", (message) => {
  cy.get(".invalid_input").should("have.text", message);
});

Cypress.Commands.add("fillEmail", (email) => {
  cy.get("#user").type(email);
});

Cypress.Commands.add("fillPassword", (password) => {
  cy.get("#password").type(password);
});

Cypress.Commands.add("checkSuccessMessage", (message, randomEmail) => {
  cy.get("#swal2-title").should("have.text", message);

  cy.get("#swal2-html-container").should("have.text", `Olá, ${randomEmail}`);
});
