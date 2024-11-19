const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/automation-practice/**/*.{js,jsx,ts,tsx}",

    viewportWidth: 1200,
    viewportHeight: 1000,
    watchForFileChanges: false
  }
})
