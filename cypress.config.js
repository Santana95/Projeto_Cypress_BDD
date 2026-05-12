const { defineConfig } = require("cypress");
require("dotenv").config();

const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");

const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");

const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  projectId: 'yawfo2',
  e2e: {
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      charts: true,
      reportTitle: process.env.CYPRESS_REPORT_TITLE || "Projeto_Cypress_BDD",
      reportPageTitle: process.env.CYPRESS_REPORT_TITLE || "Projeto_Cypress_BDD",
    },
    baseUrl: process.env.BASE_URL || "http://automationpratice.com.br",
    viewportWidth: 1400,
    viewportHeight: 750,
    defaultCommandTimeout: parseInt(process.env.CYPRESS_DEFAULT_COMMAND_TIMEOUT) || 10000,
    specPattern: "**/*.feature",
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
  },
});
