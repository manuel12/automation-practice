/// <reference types="cypress" />

const userCredentials = require("../../fixtures/user-credentials.json")
const { generateUniqueEmail } = require("../../support/utils")

describe("Automation Practice Test Cases", () => {
  beforeEach(() => {
    cy.visit("http://www.automationpractice.pl/")
  })

  it("TC.01 Register User", () => {
    cy.signUpUser(userCredentials)

    cy.get(".alert")
      .should("be.visible")
      .and("contain.text", "Your account has been created.")
  })

  it("TC.02 Login User with correct email and password", () => {
    userCredentials.email = generateUniqueEmail(userCredentials.email)

    cy.signUpUser(userCredentials)

    cy.get(".alert")
      .should("be.visible")
      .and("contain.text", "Your account has been created.")

    cy.get(".logout").click()

    cy.loginUser(userCredentials)

    cy.url().should(
      "eq",
      "http://www.automationpractice.pl/index.php?controller=my-account",
    )

    cy.get(".page-heading")
      .should("be.visible")
      .and("contain.text", "My account")

    cy.get(".info-account")
      .should("be.visible")
      .and(
        "contain.text",
        "Welcome to your account. Here you can manage all of your personal information and orders.",
      )
  })

  it("TC.03 Login User with incorrect email and password", () => {
    userCredentials.email = generateUniqueEmail(userCredentials.email)

    cy.signUpUser(userCredentials)

    cy.get(".alert")
      .should("be.visible")
      .and("contain.text", "Your account has been created.")

    cy.get(".logout").click()

    cy.loginUser({
      email: "invalid99@gmail.com",
      password: userCredentials.password,
    })
    cy.get("#center_column > :nth-child(2)")
      .should("be.visible")
      .and("contain.text", "There is 1 error")
      .and("contain.text", "Authentication failed.")
  })

  it("TC.04 Logout User", () => {
    userCredentials.email = generateUniqueEmail(userCredentials.email)

    cy.signUpUser(userCredentials)

    cy.get(".alert")
      .should("be.visible")
      .and("contain.text", "Your account has been created.")

    cy.get(".logout").click()

    cy.url().should(
      "eq",
      "http://www.automationpractice.pl/index.php?controller=authentication&back=my-account",
    )

    cy.get(".page-heading")
      .should("be.visible")
      .and("contain.text", "Authentication")

    cy.get("#create-account_form").should("be.visible")
    cy.get("#login_form").should("be.visible")
  })

  it("TC.05 Register User with existing email", () => {
    userCredentials.email = generateUniqueEmail(userCredentials.email)

    cy.signUpUser(userCredentials)

    cy.get(".alert")
      .should("be.visible")
      .and("contain.text", "Your account has been created.")

    cy.get(".logout").click()

    cy.get(".login").should("be.visible").click()

    cy.fillCreateAccountEmail(userCredentials)

    cy.get("#create_account_error")
      .should("be.visible")
      .and(
        "contain.text",
        "An account using this email address has already been registered. Please enter a valid password or request a new one.",
      )
  })

  it("TC.06 Contact Us Form", () => {
    cy.get("#contact-link > a").click()

    cy.get("#id_contact").select("Customer service")

    cy.get("#email").type(userCredentials.email)

    cy.get("#id_order").type("12345")

    cy.get("#message").type("My order has not yet arrived!")

    cy.get("#submitMessage > span").click()

    cy.get(".alert")
      .should("be.visible")
      .and(
        "contain.text",
        "Your message has been successfully sent to our team.",
      )
  })

  it("TC.07 Verify All Products and product detail page", () => {
    cy.get(
      '.sf-menu > :nth-child(1) > [href="http://www.automationpractice.pl/index.php?id_category=3&controller=category"]',
    ).click()

    cy.get(".product-container").each(($el) => {
      cy.get($el).within(() => {
        cy.get(".product-image-container").should("be.visible")
        cy.get(".product-name").should("be.visible")

        cy.get(".product-name").should("be.visible")
        cy.get(".content_price").should("be.visible")
        cy.get(".button-container").should("be.visible")
      })
    })

    cy.get(
      ".first-in-line.last-item-of-tablet-line > .product-container > .right-block > .button-container > .lnk_view > span",
    ).click()

    cy.url().should(
      "eq",
      "http://www.automationpractice.pl/index.php?id_product=4&controller=product",
    )

    cy.get("h1").should("be.visible").and("contain.text", "Printed Dress")

    cy.get("#product_reference")
      .should("be.visible")
      .and("contain.text", "demo_4")

    cy.get("#product_condition")
      .should("be.visible")
      .and("contain.text", "New product")

    cy.get("#short_description_content > p")
      .should("be.visible")
      .and(
        "contain.text",
        "Printed evening dress with straight sleeves with black thin waist belt and ruffled linings.",
      )

    cy.get(".content_prices").should("be.visible").and("contain.text", "$51")

    cy.get(".product_attributes").should("be.visible")
  })

  it.only("TC.08 Search Product", () => {})
})
