/// <reference types="cypress" />

Cypress.Commands.add("register", () => {
  cy.get("#btnRegister").click();
});

Cypress.Commands.add("checkErrorMessageRegister", (message) => {
  cy.get("#errorMessageFirstName").should("have.text", message);
});

Cypress.Commands.add("fillNameRegister", (name) => {
  cy.get("#user").type(name, { force: true });
});

Cypress.Commands.add("fillEmailRegister", (email) => {
  cy.get("#email").type(email);
});

Cypress.Commands.add("fillPasswordRegister", (password) => {
  cy.get("#password").type(password);
});

Cypress.Commands.add("checkSuccessMessageRegister", (message, randomName) => {
  cy.get("#swal2-title").should("have.text", message);

  cy.get("#swal2-html-container").should("have.text", `Bem-vindo ${randomName}`);
});
