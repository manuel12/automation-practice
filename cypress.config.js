const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://www.automationpractice.pl/",
    specPattern: "cypress/e2e/automation-practice/**/*.{js,jsx,ts,tsx}",
    excludeSpecPattern: [
      "cypress/e2e/automation-practice/automation-practice.cy.js",
      "cypress/e2e/automation-practice/performance.cy.js"
    ],
    experimentalRunAllSpecs: true,
    viewportWidth: 1200,
    viewportHeight: 1000,
    watchForFileChanges: false,
    retries: 0
  }
})
