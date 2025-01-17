const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://www.automationpractice.pl/",
    specPattern: "cypress/tests/**/*.{js,jsx,ts,tsx}",
    excludeSpecPattern: [
      "cypress/tests/automation-practice/automation-practice.cy.js",
      "cypress/tests/ui/performance.cy.js"
    ],
    experimentalRunAllSpecs: true,
    viewportWidth: 1200,
    viewportHeight: 1000,
    watchForFileChanges: false,
    retries: 0
  }
})
