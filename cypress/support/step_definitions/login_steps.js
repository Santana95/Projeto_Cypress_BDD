import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import { LoginPage } from "../pages/LoginPage";

const loginPage = new LoginPage();

// =============================================================
// DADO / GIVEN - Steps de Setup e Pré-condição
// =============================================================

Given("que eu estou na tela de login", () => {
  loginPage.navigate();
  loginPage.verifyLoginPageLoaded();
});

Given("eu preencho o campo email com {string}", (email) => {
  loginPage.fillEmail(email);
});

Given("eu preencho o campo email com email inválido", () => {
  const nomeAleatorio = faker.person.fullName();
  loginPage.fillEmail(nomeAleatorio);
});

Given("eu preencho o campo senha com senha inválida", () => {
  loginPage.fillPassword("12345");
});

Given("eu preencho minhas credenciais", () => {
  const emailAleatorio = faker.internet.email();
  loginPage.fillEmail(emailAleatorio);
  loginPage.fillPassword("123456");
});

// =============================================================
// QUANDO / WHEN - Steps de Ação
// =============================================================

When("eu preencho o campo senha com {string}", (senha) => {
  loginPage.fillPassword(senha);
});

When("clico em Login", () => {
  loginPage.clickLoginButton();
});

// =============================================================
// ENTÃO / THEN - Steps de Validação
// =============================================================

Then("devo ver a mensagem de erro {string}", (mensagem) => {
  loginPage.verifyErrorMessage(mensagem);
});

Then("devo ver a mensagem de sucesso {string}", (mensagem) => {
  const emailAleatorio = faker.internet.email();
  loginPage.verifyLoginSuccess(mensagem, emailAleatorio);
});
