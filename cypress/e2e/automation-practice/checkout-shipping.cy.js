/// <reference types="cypress" />

const userCredentials = require("../../fixtures/user-credentials.json")
const { printedSummerDressInOrange } = require("../../fixtures/products.json")

describe("Checkout - Shipping", () => {
  beforeEach(() => {
    cy.visit("http://www.automationpractice.pl/")

    cy.loginUser(userCredentials)

    cy.addProductToCart(printedSummerDressInOrange)

    cy.contains("Proceed to checkout").should("be.visible").click()

    cy.get(".cart_navigation a span").contains("Proceed to checkout").click()

    cy.get(".cart_navigation button span")
      .contains("Proceed to checkout")
      .click()
  })

  it("should display all the necessary elements", () => {
    cy.url().should("include", "controller=order")

    cy.get(".breadcrumb").should("contain.text", "Shipping:")

    cy.get(".page-heading").should("contain.text", "Shipping:")

    cy.get(".step_current > span").should("contain.text", "04. Shipping")
  })

  context(
    "As a customer, I want to choose a shipping option for my order, so that I can select one that best fits my need:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.contains("Proceed to checkout").should("be.visible").click()

        cy.get(".cart_navigation a span")
          .contains("Proceed to checkout")
          .click()

        cy.get(".cart_navigation button span")
          .contains("Proceed to checkout")
          .click()
      })

      it("should allow user to choose a shipping option", () => {
        cy.get(".order_carrier_content")
          .should("be.visible")
          .within(() => {
            cy.get(".delivery_options_address > .carrier_title")
              .should("be.visible")
              .and(
                "contain.text",
                "Choose a shipping option for this address: Poland address"
              )
          })
      })
    }
  )

  context(
    "As a customer, I want to see the cost of my selected shipping method, so that I can know there are no unexpected charges:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.contains("Proceed to checkout").should("be.visible").click()

        cy.get(".cart_navigation a span")
          .contains("Proceed to checkout")
          .click()

        cy.get(".cart_navigation button span")
          .contains("Proceed to checkout")
          .click()
      })

      it("should display cost of shipping", () => {
        cy.get("td.delivery_option_price")
          .should("be.visible")
          .and("include.text", "$7")
      })
    }
  )

  context(
    "As a customer, I want to be able to agree to a 'Terms of Service' checkbox, so that I can know exactly the terms of my order:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.contains("Proceed to checkout").should("be.visible").click()

        cy.get(".cart_navigation a span")
          .contains("Proceed to checkout")
          .click()

        cy.get(".cart_navigation button span")
          .contains("Proceed to checkout")
          .click()
      })

      it("should allow user to agree to 'Terms of Service'", () => {
        cy.get(".order_carrier_content > :nth-child(4)")
          .should("be.visible")
          .and("include.text", "Terms of service")

        cy.get(".checkbox")
          .should("be.visible")
          .within(() => {
            cy.get("#uniform-cgv").should("be.visible")

            cy.get("label")
              .should("be.visible")
              .and(
                "include.text",
                "I agree to the terms of service and will adhere to them unconditionally."
              )

            cy.get(".iframe")
              .should("be.visible")
              .and("include.text", "(Read the Terms of Service)")
          })
      })
    }
  )

  context(
    "As a webmaster, I want customers to have to agree to the 'Terms of Service' in order to proceed, so that I can be sure they understand them:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.contains("Proceed to checkout").should("be.visible").click()

        cy.get(".cart_navigation a span")
          .contains("Proceed to checkout")
          .click()

        cy.get(".cart_navigation button span")
          .contains("Proceed to checkout")
          .click()
      })

      it("should display 'You must agree to the terms of service before continuing' message when trying to continue without agreeing to them", () => {
        cy.get(".cart_navigation button span")
          .contains("Proceed to checkout")
          .click()

        cy.get(".fancybox-error")
          .should("be.visible")
          .and(
            "have.text",
            "You must agree to the terms of service before continuing."
          )

        cy.get(".fancybox-item").should("be.visible").click()

        cy.get("#uniform-cgv").should("be.visible").click()

        cy.get(".cart_navigation button span")
          .contains("Proceed to checkout")
          .click()

        cy.url().should("include", "controller=order")

        cy.get(".step_current > span").should("contain.text", "05. Payment")
      })
    }
  )

  context(
    "As a customer, I want to be able to proceed to the next checkout section:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.contains("Proceed to checkout").should("be.visible").click()

        cy.get(".cart_navigation a span")
          .contains("Proceed to checkout")
          .click()

        cy.get(".cart_navigation button span")
          .contains("Proceed to checkout")
          .click()
      })

      it("should allow user to continue to next section", () => {
        cy.get("#uniform-cgv").should("be.visible").click()

        cy.get(".cart_navigation button span")
          .contains("Proceed to checkout")
          .click()

        cy.url().should("include", "controller=order")

        cy.get(".step_current > span").should("contain.text", "05. Payment")
      })
    }
  )
})
