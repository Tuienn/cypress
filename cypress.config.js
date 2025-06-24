const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://www.thegioididong.com",
    specPattern: "cypress/e2e/**/*.cy.js", // Example path: cypress/e2e/login/login.cy.js
  },
});
