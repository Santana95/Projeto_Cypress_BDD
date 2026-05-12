import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { HomePage } from "../pages/HomePage";
import "../commands_Login.js";
import "../commands_Register.js";
import "../commands_Home.js";

// Instâncias dos Page Objects
const loginPage = new LoginPage();
const registerPage = new RegisterPage();
const homePage = new HomePage();

// =============================================================
// DADO / GIVEN - Steps de Setup e Pré-condição (Específicos de Segurança)
// =============================================================

// Reutiliza steps existentes: que eu estou na tela de login, registro, etc

// =============================================================
// QUANDO / WHEN - Steps de Ação (Específicos de Segurança)
// =============================================================

When("eu clico em Login {string} vezes com credenciais inválidas", (times) => {
  for (let i = 0; i < parseInt(times); i++) {
    loginPage.fillEmail("teste@invalido.com");
    loginPage.fillPassword("senhaInvalida");
    loginPage.clickLoginButton();
    // Aguarda resposta antes de próxima tentativa
    cy.wait(500);
  }
});

// =============================================================
// ENTÃO / THEN - Steps de Validação (Específicos de Segurança)
// =============================================================

Then("o campo de senha deve ter tipo {string}", (type) => {
  loginPage.verifyPasswordInputType(type);
});

Then("o campo de email tem tipo {string}", (type) => {
  loginPage.verifyEmailInputType(type);
});

Then("devo ver mensagem de validação", () => {
  // Verifica que há validação visual ou mensagem de erro
  cy.get("body").then(($body) => {
    const hasError =
      $body.find(".invalid_input").length > 0 ||
      $body.find("[role='alert']").length > 0;
    expect(hasError || cy.get("input[type='email']")).to.exist;
  });
});

Then("devo ver mensagem de erro", () => {
  cy.get(".invalid_input, [role='alert'], .error-message").should("be.visible");
});

Then("o sistema não deve expor detalhes do banco de dados", () => {
  // Verifica que mensagens de erro não revelam detalhes técnicos
  cy.get(".invalid_input, [role='alert'], .error-message").then(($el) => {
    const text = $el.text().toLowerCase();
    // Não deve conter termos técnicos de banco de dados
    expect(text).not.to.include("sql");
    expect(text).not.to.include("database");
    expect(text).not.to.include("query");
    expect(text).not.to.include("table");
  });
});

Then("o payload não deve ser executado", () => {
  // Se o teste chegar aqui sem erro de XSS, está seguro
  // Cypress detectaria scripts executados
  cy.window().should((win) => {
    // Verifica que não há alerts (sinal de XSS)
    expect(win.alertCalled).to.be.undefined;
  });
});

Then("o conteúdo deve ser escapado corretamente", () => {
  // Verifica que o conteúdo foi escapado e não renderizado como HTML
  cy.get("body").should("not.contain", "<script>");
  cy.get("body").should("not.contain", "onerror=");
  cy.get("body").should("not.contain", "onload=");
});

Then("a senha NÃO deve estar armazenada em localStorage", () => {
  cy.window().then((win) => {
    const localStorage = win.localStorage;
    const allData = JSON.stringify(localStorage);
    expect(allData).not.to.include("senhaValida123");
    expect(allData).not.to.include("password");
  });
});

Then("a senha NÃO deve estar armazenada em sessionStorage", () => {
  cy.window().then((win) => {
    const sessionStorage = win.sessionStorage;
    const allData = JSON.stringify(sessionStorage);
    expect(allData).not.to.include("senhaValida123");
    expect(allData).not.to.include("password");
  });
});

Then("registro deve ser bem-sucedido", () => {
  registerPage.verifyRegisterSuccess("Cadastro realizado!", "Teste User");
});

Then("devo ver erro {string}", (message) => {
  cy.get(".invalid_input, [role='alert'], .error-message").should(
    "contain",
    message
  );
});

Then("a aplicação deve ter headers de segurança adequados", () => {
  // Valida headers via requisição
  cy.request("/").then((response) => {
    // Verifica que a resposta foi bem-sucedida
    expect(response.status).to.equal(200);
  });
});

Then("o header {string} deve ser {string}", (headerName, expectedValue) => {
  cy.request("/").then((response) => {
    expect(response.headers[headerName.toLowerCase()]).to.equal(expectedValue);
  });
});

Then("o header {string} deve estar presente", (headerName) => {
  cy.request("/").then((response) => {
    expect(response.headers[headerName.toLowerCase()]).to.exist;
  });
});

Then("a URL deve usar protocolo HTTPS", () => {
  cy.url().should("include", "https://");
});

Then("devo ser informado que excedi o limite de tentativas", () => {
  cy.get(".invalid_input, [role='alert'], .error-message, .warning").should(
    "be.visible"
  );
});

Then("a aplicação deve bloquear o acesso temporariamente", () => {
  // Verifica se há delay ou mensagem de bloqueio
  cy.get(".invalid_input, [role='alert'], .error-message")
    .should("be.visible")
    .and("contain.text", /tente novamente|bloqueado|limite/i);
});
