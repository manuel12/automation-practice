// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const { generateUniqueEmail } = require("../support/utils")

Cypress.Commands.add("fillCreateAccountEmail", (userCredentials) => {
  const { email } = userCredentials
  cy.get("#email_create").type(email)
  cy.get("#SubmitCreate > span").click()
})

Cypress.Commands.add("fillYourPersonalInfo", (userCredentials) => {
  const { firstName, lastName, password, days, months, years } = userCredentials

  cy.get("#id_gender1").click()
  cy.get("#customer_firstname").type(firstName)
  cy.get("#customer_lastname").type(lastName)
  cy.get("#passwd").type(password)

  cy.get("#days").select(days)
  cy.get("#months").select(months)
  cy.get("#years").select(years)

  cy.get("#newsletter").click()

  cy.get("#submitAccount > span").click()
})

Cypress.Commands.add("signUpUser", (userCredentials) => {
  cy.get(".login").should("be.visible").click()

  cy.fillCreateAccountEmail(userCredentials)

  cy.fillYourPersonalInfo(userCredentials)
})

Cypress.Commands.add("loginUser", (userCredentials) => {
  cy.get(".login").should("be.visible").click()

  const { email, password } = userCredentials

  cy.get("#email").type(email)

  cy.get("#passwd").type(password)

  cy.get("#SubmitLogin > span").click()
})
