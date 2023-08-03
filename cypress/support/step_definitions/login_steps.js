import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import "../commands_Home.js";
import "../commands_Login.js";

const randomName = faker.person.fullName();
const randomEmail = faker.internet.email();

Given("I am on login screen", () => {
  cy.acessLogin();
});

Given("I fill e-mail", () => {
  cy.fillEmail(randomEmail);
});

Given("I fill invalid e-mail", () => {
  cy.fillEmail(randomName);
});

Given("I fill invalid password", () => {
  cy.fillPassword("12345");
});

Given("I fill my credentials", () => {
  cy.fillEmail(randomEmail);
  cy.fillPassword("123456");
});

When("I click on Login", () => {
  cy.login();
});

Then("I see the message {string}", (message) => {
  cy.checkErrorMessage(message);
});

Then("I see success message {string}", (message) => {
  cy.checkSuccessMessage(message, randomEmail);
});
