import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import "../commands_Home.js";
import "../commands_Login.js";
import "../commands_Register.js";

const nomeAleatorio = faker.person.fullName();
const emailAleatorio = faker.internet.email();

Given("que estou na tela de registro", () => {
  cy.acessarTelaRegistro();
});

Given("eu preencho o nome", () => {
  cy.preencherNomeRegistro(nomeAleatorio);
});

Given("eu preencho o e-mail no registro", () => {
  cy.preencherEmailRegistro(emailAleatorio);
});

Given("eu preencho um e-mail inválido no registro", () => {
  cy.preencherEmailRegistro(nomeAleatorio);
});

Given("eu preencho uma senha inválida no registro", () => {
  cy.preencherSenhaRegistro("12345");
});

Given("eu preencho meus dados para registro", () => {
  cy.preencherNomeRegistro(nomeAleatorio);
  cy.preencherEmailRegistro(emailAleatorio);
  cy.preencherSenhaRegistro("123456");
});

When("clico em registrar", () => {
  cy.registrar();
});

Then("vejo a mensagem {string} no registro", (mensagem) => {
  cy.verificarMensagemErroRegistro(mensagem);
});

Then("vejo a mensagem de sucesso {string} no registro", (mensagem) => {
  cy.verificarMensagemSucessoRegistro(mensagem, nomeAleatorio);
});
