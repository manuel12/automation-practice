/// <reference types="cypress" />

const userCredentials = require("../../fixtures/user-credentials.json")
const unregisteredUserCredentials = require("../../fixtures/unregistered-credentials.json")
const invalidUserCredentials = require("../../fixtures/invalid-credentials.json")

describe("Authentication - Login", () => {
  context(
    "As a user I want to be able to login with an existing account so that I can preserve my user data: ",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.get(".login")
          .should("be.visible")
          .and("include.text", "Sign in")
          .click()
      })

      it("should display all the necessary elements", () => {
        cy.url().should("include", "controller=authentication")

        cy.get(".breadcrumb").should("contain.text", "Authentication")

        cy.get(".page-heading").should("contain.text", "Authentication")

        cy.get("#login_form").within(() => {
          cy.get(".page-subheading").should("have.text", "Already registered?")

          cy.get(":nth-child(1) > label").should("have.text", "Email address")

          cy.get("#email").should("be.visible")

          cy.get(":nth-child(2) > label").should("have.text", "Password")

          cy.get("#passwd").should("be.visible")

          cy.get(".lost_password")
            .should("be.visible")
            .and("include.text", "Forgot your password?")

          cy.get("#SubmitLogin > span")
            .should("be.visible")
            .and("include.text", "Sign in")
        })
      })

      it("should login with an existing account", () => {
        cy.get("#email").type(userCredentials.email).blur()
        cy.get("#login_form > .form_content > :nth-child(1)").should(
          "have.class",
          "form-ok"
        )
        cy.get("#passwd").type(userCredentials.password).blur()
        cy.get("#login_form > .form_content > :nth-child(2)").should(
          "have.class",
          "form-ok"
        )

        cy.get("#SubmitLogin > span").click()

        cy.url().should("include", "controller=my-account")

        cy.get(".breadcrumb").should("contain.text", "My account")

        cy.get(".page-heading").should("contain.text", "My account")

        cy.get(".info-account")
          .should("be.visible")
          .and(
            "have.text",
            "Welcome to your account. Here you can manage all of your personal information and orders."
          )
      })

      it.skip("should preserve previous user data", () => {})
    }
  )

  context(
    "As a webmaster I want a user trying to login with  unregister but valid credentials to be denied access:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.get(".login")
          .should("be.visible")
          .and("include.text", "Sign in")
          .click()
      })

      it("should not login with an unregistered but valid credentials", () => {
        cy.get("#email").type(unregisteredUserCredentials.email).blur()
        cy.get("#login_form > .form_content > :nth-child(1)").should(
          "have.class",
          "form-ok"
        )
        cy.get("#passwd").type("Testpass1!").blur()
        cy.get("#login_form > .form_content > :nth-child(2)").should(
          "have.class",
          "form-ok"
        )

        cy.url().should("include", "controller=authentication")

        cy.get(".breadcrumb").should("contain.text", "Authentication")

        cy.get(".page-heading").should("contain.text", "Authentication")
      })
    }
  )

  context(
    "As a user I want descriptive error labels to be displayed on login formm so that I know which data to input:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.get(".login")
          .should("be.visible")
          .and("include.text", "Sign in")
          .click()
      })

      it("should display error label 'An email address required.' when submitting an empty email address", () => {
        cy.get("#SubmitLogin > span").click()

        cy.get("#center_column > :nth-child(2)")
          .should("be.visible")
          .and("include.text", "An email address required.")
      })

      it("should display error label 'Invalid email address.' when submitting an invalid email address", () => {
        cy.get("#email").type(invalidUserCredentials.email)

        cy.get("#SubmitLogin > span").click()

        cy.get("#center_column > :nth-child(2)")
          .should("be.visible")
          .and("include.text", "Invalid email address.")
      })

      it("should display error label 'A password required.' when submitting an empty password", () => {
        cy.get("#email").type("testuser@gmail.com")

        cy.get("#SubmitLogin > span").click()

        cy.get("#center_column > :nth-child(2)")
          .should("be.visible")
          .and("include.text", "Password is required.")
      })

      it("should display error label 'Invalid password.' when submitting an invalid password", () => {
        cy.get("#email").type(userCredentials.email)

        cy.get("#passwd").type(invalidUserCredentials.password)

        cy.get("#SubmitLogin > span").click()

        cy.get("#center_column > :nth-child(2)")
          .should("be.visible")
          .and("include.text", "Invalid password.")
      })
    }
  )
})
