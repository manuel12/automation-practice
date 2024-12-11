const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://www.automationpractice.pl/",
    specPattern: "cypress/e2e/automation-practice/**/*.{js,jsx,ts,tsx}",
    experimentalRunAllSpecs: true,
    viewportWidth: 1200,
    viewportHeight: 1000,
    watchForFileChanges: false
  }
})
