import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import "../commands_Home.js";
import "../commands_Login.js";

const nomeAleatorio = faker.person.fullName();
const emailAleatorio = faker.internet.email();

// =============================================================
// DADO / GIVEN - Steps de Setup e Pré-condição
// =============================================================

Given("que eu estou na tela de login", () => {
  cy.acessLogin();
});

Given("eu preencho o campo email com {string}", (email) => {
  cy.preencherEmail(email);
});

Given("eu preencho o campo email com email inválido", () => {
  cy.preencherEmail(nomeAleatorio);
});

Given("eu preencho o campo senha com senha inválida", () => {
  cy.preencherSenha("12345");
});

Given("eu preencho minhas credenciais", () => {
  cy.preencherEmail(emailAleatorio);
  cy.preencherSenha("123456");
});

// =============================================================
// QUANDO / WHEN - Steps de Ação
// =============================================================

When("eu preencho o campo senha com {string}", (senha) => {
  cy.preencherSenha(senha);
});

When("clico em Login", () => {
  cy.entrar();
});

// =============================================================
// ENTÃO / THEN - Steps de Validação
// =============================================================

Then("devo ver a mensagem de erro {string}", (mensagem) => {
  cy.verificarMensagemErro(mensagem);
});

Then("devo ver a mensagem de sucesso {string}", (mensagem) => {
  cy.verificarMensagemSucesso(mensagem, emailAleatorio);
});
