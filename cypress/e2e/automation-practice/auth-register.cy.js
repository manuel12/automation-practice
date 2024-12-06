/// <reference types="cypress" />

const userCredentials = require("../../fixtures/user-credentials.json")
const unregisteredUserCredentials = require("../../fixtures/unregistered-credentials.json")
const invalidUserCredentials = require("../../fixtures/invalid-credentials.json")

describe("Authentication - Register", () => {
  context(
    "As a user I want to be able to register an account so that I can log in and access my account later:",
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

        cy.get("#create-account_form").within(() => {
          cy.get(".page-subheading").should("have.text", "Create an account")

          cy.get(".form_content > .form-group > label").should(
            "have.text",
            "Email address"
          )

          cy.get("#email_create").should("be.visible")

          cy.get("#SubmitCreate  > span")
            .should("be.visible")
            .and("include.text", "Create an account")
        })
      })

      it("should register an account", () => {
        const newEmail = "testuser1233@gmail.com"
        cy.get("#email_create").type(newEmail).blur()

        cy.get("#create-account_form > .form_content > .form-group").should(
          "have.class",
          "form-ok"
        )

        cy.get("#SubmitCreate  > span").click()

        cy.get(".breadcrumb").should("contain.text", "Authentication")

        cy.get(".page-heading").should("contain.text", "Create an account")

        cy.get(".page-subheading").should(
          "contain.text",
          "Your personal information"
        )

        cy.get(".account_creation > .clearfix > :nth-child(1)")
          .should("be.visible")
          .and("have.text", "Title")

        cy.get(":nth-child(3) > .top")
          .should("be.visible")
          .and("include.text", "Mr.")

        cy.get(":nth-child(4) > .top")
          .should("be.visible")
          .and("include.text", "Mrs.")

        cy.get("#id_gender1").click()

        cy.get(".account_creation > :nth-child(3) > label")
          .should("be.visible")
          .and("have.text", "First name *")

        cy.get("#customer_firstname").type(userCredentials.firstName)

        cy.get(".account_creation > :nth-child(4) > label")
          .should("be.visible")
          .and("have.text", "Last name *")

        cy.get("#customer_lastname").type(userCredentials.lastName)

        cy.get(".password > label")
          .should("be.visible")
          .and("have.text", "Password *")

        cy.get("#passwd").type(userCredentials.password)

        cy.get("#days").select(userCredentials.days)

        cy.get("#months").select(userCredentials.months)

        cy.get("#years").select(userCredentials.years)

        cy.get("#submitAccount > span")
          .should("be.visible")
          .and("have.text", "Register")
          .click()

        cy.get(".breadcrumb").should("contain.text", "My account")

        cy.get(".page-heading").should("contain.text", "My account")

        cy.get(".alert")
          .should("be.visible")
          .and("include.text", "Your account has been created.")
      })
    }
  )

  context(
    "As a user I want descriptive error labels to be displayed on email form so that I know which data to input:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.get(".login")
          .should("be.visible")
          .and("include.text", "Sign in")
          .click()
      })

      it("should display error label 'Invalid email address.' when submitting an empty email address", () => {
        cy.get("#SubmitCreate  > span")
          .should("be.visible")
          .and("include.text", "Create an account")
          .click()

        cy.url().should("include", "controller=authentication")

        cy.get(".breadcrumb").should("contain.text", "Authentication")

        cy.get(".page-heading").should("contain.text", "Authentication")

        cy.get(".alert")
          .should("be.visible")
          .and("include.text", "Invalid email address.")
      })
    }
  )

  context(
    "As a webmaster I want user that try to register with an existing email to be denied access so that they need to add an unique email:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.get(".login")
          .should("be.visible")
          .and("include.text", "Sign in")
          .click()
      })

      it("should not allow user to register with existing email", () => {
        cy.get("#email_create").type(userCredentials.email).blur()

        cy.get("#SubmitCreate  > span")
          .should("be.visible")
          .and("include.text", "Create an account")
          .click()

        cy.url().should("include", "controller=authentication")

        cy.get(".breadcrumb").should("contain.text", "Authentication")

        cy.get(".page-heading").should("contain.text", "Authentication")

        cy.get(".alert")
          .should("be.visible")
          .and(
            "include.text",
            "An account using this email address has already been registered. Please enter a valid password or request a new one."
          )
      })
    }
  )

  context(
    "As a user I want descriptive error labels to be displayed on register form so that I know which data to input:							",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.get(".login")
          .should("be.visible")
          .and("include.text", "Sign in")
          .click()
      })

      it("should display error label 'An account using this email address has already been registered. Please enter a valid password or request a new one.' when submitting a used email", () => {})

      it("should display error label 'Invalid email address.' when submitting an empty email address", () => {
        cy.get("#SubmitCreate  > span")
          .should("be.visible")
          .and("include.text", "Create an account")
          .click()

        cy.get(".alert")
          .should("be.visible")
          .and("include.text", "Invalid email address.")
      })

      it("should display error label 'Invalid email address.' when submitting an invalid email address", () => {
        cy.get("#email_create").type(invalidUserCredentials.email).blur()

        cy.get("#SubmitCreate  > span")
          .should("be.visible")
          .and("include.text", "Create an account")
          .click()

        cy.get(".alert")
          .should("be.visible")
          .and("include.text", "Invalid email address.")
      })

      it("should display error label 'firstname is required.' when submitting an empty first name", () => {
        cy.get("#email_create").type(unregisteredUserCredentials.email).blur()

        cy.get("#SubmitCreate  > span")
          .should("be.visible")
          .and("include.text", "Create an account")
          .click()

        cy.get("#submitAccount > span")
          .should("be.visible")
          .and("have.text", "Register")
          .click()

        cy.get(".alert")
          .should("be.visible")
          .and("include.text", "firstname is required")
      })

      it("should display error label 'lastname is required.' when submitting an empty last name", () => {
        cy.get("#email_create").type(unregisteredUserCredentials.email).blur()

        cy.get("#SubmitCreate  > span")
          .should("be.visible")
          .and("include.text", "Create an account")
          .click()

        cy.get("#submitAccount > span")
          .should("be.visible")
          .and("have.text", "Register")
          .click()

        cy.get(".alert")
          .should("be.visible")
          .and("include.text", "lastname is required")
      })

      it("should display error label 'passwd is required.' when submitting an empty password", () => {
        cy.get("#email_create").type(unregisteredUserCredentials.email).blur()

        cy.get("#SubmitCreate  > span")
          .should("be.visible")
          .and("include.text", "Create an account")
          .click()

        cy.get("#submitAccount > span")
          .should("be.visible")
          .and("have.text", "Register")
          .click()

        cy.get(".alert")
          .should("be.visible")
          .and("include.text", "passwd is required")
      })

      it("should display error label 'passwd is invalid.' when submitting an invalid password", () => {
        cy.get("#email_create").type(unregisteredUserCredentials.email).blur()

        cy.get("#SubmitCreate  > span")
          .should("be.visible")
          .and("include.text", "Create an account")
          .click()

        cy.get("#passwd").type(invalidUserCredentials.password)

        cy.get("#submitAccount > span")
          .should("be.visible")
          .and("have.text", "Register")
          .click()

        cy.get(".alert")
          .should("be.visible")
          .and("include.text", "passwd is required")
      })
    }
  )

  context("Register - EP test cases - Register invalid email", () => {
    beforeEach(() => {
      cy.visit("http://www.automationpractice.pl/")

      cy.get(".login")
        .should("be.visible")
        .and("include.text", "Sign in")
        .click()
    })

    it("should consider any email without '@' as invalid", () => {
      cy.get("#email_create").type("invalidEmail").blur()
      cy.get("#create-account_form > .form_content > .form-group").should(
        "have.class",
        "form-error"
      )
    })

    it("should consider any email with '@' as valid", () => {
      cy.get("#email_create").type("randomValidEmail@gmail.com").blur()
      cy.get("#create-account_form > .form_content > .form-group").should(
        "have.class",
        "form-ok"
      )
    })
  })

  context("Register - EP test cases - Register invalid password", () => {
    beforeEach(() => {
      cy.visit("http://www.automationpractice.pl/")

      cy.get(".login")
        .should("be.visible")
        .and("include.text", "Sign in")
        .click()

      cy.get("#email_create").type("testuser321@gmail.com")
      cy.get("#SubmitCreate > span").click()
    })

    it("should consider any password with less than 5 characters as invalid", () => {
      cy.get("#account-creation_form").within(() => {
        cy.get("#passwd").type("123").blur()
        cy.get(".password.form-group").should("have.class", "form-error")
      })
    })

    it("should consider any password with 5 characters or more as valid", () => {
      cy.get("#account-creation_form").within(() => {
        cy.get("#passwd").type("ABCDEFGH").blur()
        cy.get(".password.form-group").should("have.class", "form-ok")
      })
    })
  })

  context("Register - BVA test cases - Register invalid password", () => {
    beforeEach(() => {
      cy.visit("http://www.automationpractice.pl/")

      cy.get(".login")
        .should("be.visible")
        .and("include.text", "Sign in")
        .click()

      cy.get("#email_create").type("testuser321@gmail.com")
      cy.get("#SubmitCreate > span").click()
    })

    it("should have boundary for invalid partition at 4 characters", () => {
      cy.get("#account-creation_form").within(() => {
        cy.get("#passwd").type("1234").blur()
        cy.get(".password.form-group").should("have.class", "form-error")
      })
    })

    it("should have boundary for valid partition at 5 characters", () => {
      cy.get("#account-creation_form").within(() => {
        cy.get("#passwd").type("12345").blur()
        cy.get(".password.form-group").should("have.class", "form-ok")
      })
    })
  })
})
