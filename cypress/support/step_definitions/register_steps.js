import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import { RegisterPage } from "../pages/RegisterPage";

const registerPage = new RegisterPage();

Given("que estou na tela de registro", () => {
  registerPage.navigate();
  registerPage.verifyRegisterPageLoaded();
});

Given("eu preencho o nome", () => {
  const nomeAleatorio = faker.person.fullName();
  registerPage.fillName(nomeAleatorio);
});

Given("eu preencho o e-mail no registro", () => {
  const emailAleatorio = faker.internet.email();
  registerPage.fillEmail(emailAleatorio);
});

Given("eu preencho um e-mail inválido no registro", () => {
  const nomeAleatorio = faker.person.fullName();
  registerPage.fillEmail(nomeAleatorio);
});

Given("eu preencho uma senha inválida no registro", () => {
  registerPage.fillPassword("12345");
});

Given("eu preencho meus dados para registro", () => {
  const nomeAleatorio = faker.person.fullName();
  const emailAleatorio = faker.internet.email();
  registerPage.fillName(nomeAleatorio);
  registerPage.fillEmail(emailAleatorio);
  registerPage.fillPassword("123456");
});

When("clico em registrar", () => {
  registerPage.clickRegisterButton();
});

Then("vejo a mensagem {string} no registro", (mensagem) => {
  registerPage.verifyErrorMessage(mensagem);
});

Then("vejo a mensagem de sucesso {string} no registro", (mensagem) => {
  const nomeAleatorio = faker.person.fullName();
  registerPage.verifyRegisterSuccess(mensagem, nomeAleatorio);
});
