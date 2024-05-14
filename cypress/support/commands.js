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

/**
 * Retrieves an element and asserts its text content.
 * @param {string} element - Selector of the element to retrieve.
 * @param {string} text - Expected text content of the element.
 */

Cypress.Commands.add("getElemAndAssertText", (element, text) => {
  cy.get(element).should("be.visible").and("contain.text", text)
})
