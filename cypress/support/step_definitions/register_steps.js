import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import "../commands_Home.js";
import "../commands_Login.js";
import "../commands_Register.js";

const randomName = faker.person.fullName();
const randomEmail = faker.internet.email();

Given("I am on register screen", () => {
  cy.acessRegister();
});

Given("I fill name", () => {
  cy.fillNameRegister(randomName);
});

Given("I fill e-mail register", () => {
  cy.fillEmailRegister(randomEmail);
});

Given("I fill invalid e-mail register", () => {
  cy.fillEmailRegister(randomName);
});

Given("I fill invalid password register", () => {
  cy.fillPasswordRegister("12345");
});

Given("I fill my datas of register", () => {
  cy.fillNameRegister(randomName);
  cy.fillEmailRegister(randomEmail);
  cy.fillPasswordRegister("123456");
});

When("I click on register", () => {
  cy.register();
});

Then("I see message {string} on register", (message) => {
  cy.checkErrorMessageRegister(message);
});

Then("I see success message {string} on register", (message) => {
  cy.checkSuccessMessageRegister(message, randomName);
});
