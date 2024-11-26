/// <reference types="cypress" />

const userCredentials = require("../../fixtures/user-credentials.json")
const { printedSummerDressInOrange } = require("../../fixtures/products.json")

describe("Checkout -Address", () => {
  context(
    "As a user I want to be able to choose my preferred delivery address in checkout Address:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.contains("Proceed to checkout").should("be.visible").click()

        cy.get(".cart_navigation a span")
          .contains("Proceed to checkout")
          .click()
      })

      it("should display all the necessary elements", () => {
        cy.url().should("include", "controller=order&step=1")

        cy.get(".breadcrumb").should("contain.text", "Addresses")

        cy.get(".page-heading").should("contain.text", "Addresses")

        cy.get(".step_current > span").should("contain.text", "03. Address")
      })

      it("should allow user to choose delivery address", () => {
        cy.get(".address_delivery > label")
          .should("be.visible")
          .and("have.text", "Choose a delivery address:")

        cy.get("#id_address_delivery").should("be.visible")
      })
    }
  )

  context(
    "As a user I want to be able to choose my delivery address as billing address for tax purposes:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.contains("Proceed to checkout").should("be.visible").click()

        cy.get(".cart_navigation a span")
          .contains("Proceed to checkout")
          .click()
      })

      it("should allow user to choose delivery address as billing address", () => {
        cy.get(".checkbox")
          .should("be.visible")
          .within(() => {
            cy.get("#addressesAreEquals").should("be.visible")
            cy.get(".checkbox > label").should(
              "have.text",
              "Use the delivery address as the billing address."
            )
          })
      })
    }
  )

  context(
    "As a user I want to be able see my delivery address displayed in checkout Address:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.contains("Proceed to checkout").should("be.visible").click()

        cy.get(".cart_navigation a span")
          .contains("Proceed to checkout")
          .click()
      })

      it("should display delivery address details", () => {
        cy.get("#address_delivery")
          .should("be.visible")
          .within(() => {
            cy.get(".address_firstname")
              .should("be.visible")
              .and("contain.text", "Test user")
            cy.get(" .address_company")
              .should("be.visible")
              .and("contain.text", "Microsoft")
            cy.get(".address_address1")
              .should("be.visible")
              .and("contain.text", "Elm Street 66")
            cy.get(" .address_city")
              .should("be.visible")
              .and("contain.text", "New York City")
            cy.get(".address_country_name")
              .should("be.visible")
              .and("contain.text", "United States")

            cy.get(".address_phone_mobile")
              .should("be.visible")
              .and("contain.text", "222 2222 2222")
          })
      })
    }
  )

  context(
    "As a user I want to be able to update my delivery address displayed in checkout Address:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.contains("Proceed to checkout").should("be.visible").click()

        cy.get(".cart_navigation a span")
          .contains("Proceed to checkout")
          .click()
      })

      it("should allow user to update delivery address details", () => {
        cy.get("#address_delivery")
          .should("be.visible")
          .and("include.text", "Your delivery address")
          .within(() => {
            cy.get(".address_update > .button > span")
              .should("be.visible")
              .click()
          })

        cy.get("#address1").clear().type("Elm Street 66")
        cy.get("#city").clear().type("New York City")
        cy.get("#id_state").select("New York")

        cy.get("#postcode").clear().type("11111")

        cy.get("#id_country").select("United States")

        cy.get("#phone_mobile").clear().type("222 2222 2222")

        cy.get("#submitAddress > span").should("be.visible").click()

        cy.url().should("include", "controller=order?step=1")

        cy.get("#address_delivery")
          .should("be.visible")
          .within(() => {
            cy.get(".address_firstname")
              .should("be.visible")
              .and("contain.text", "Test user")
            cy.get(".address_company")
              .should("be.visible")
              .and("contain.text", "Microsoft")
            cy.get(".address_address1")
              .should("be.visible")
              .and("contain.text", "Elm Street 66")
            cy.get(".address_city")
              .should("be.visible")
              .and("contain.text", "New York City")
            cy.get(".address_country_name")
              .should("be.visible")
              .and("contain.text", "United States")

            cy.get(".address_phone_mobile")
              .should("be.visible")
              .and("contain.text", "222 2222 2222")
          })
      })
    }
  )

  context(
    "As a user I want to be able see my billing address displayed in checkout Address:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.contains("Proceed to checkout").should("be.visible").click()

        cy.get(".cart_navigation a span")
          .contains("Proceed to checkout")
          .click()
      })

      it("should display billing address details", () => {
        cy.get("#address_invoice")
          .should("be.visible")
          .within(() => {
            cy.get(".address_firstname")
              .should("be.visible")
              .and("contain.text", "Test user")
            cy.get(".address_company")
              .should("be.visible")
              .and("contain.text", "Microsoft")
            cy.get(".address_address1")
              .should("be.visible")
              .and("contain.text", "Elm Street 66")
            cy.get(".address_city")
              .should("be.visible")
              .and("contain.text", "New York City")
            cy.get(".address_country_name")
              .should("be.visible")
              .and("contain.text", "United States")

            cy.get(".address_phone_mobile")
              .should("be.visible")
              .and("contain.text", "222 2222 2222")
          })
      })
    }
  )

  context(
    "As a user I want to be able to update my billing address displayed in checkout Address:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.contains("Proceed to checkout").should("be.visible").click()

        cy.get(".cart_navigation a span")
          .contains("Proceed to checkout")
          .click()
      })

      it("should allow user to update billing address details", () => {
        cy.get("#address_invoice")
          .should("be.visible")
          .and("include.text", "Your billing address")
          .within(() => {
            cy.get(".address_update > .button > span")
              .should("be.visible")
              .click()
          })

        cy.get("#address1").clear().type("Elm Street 66")
        cy.get("#city").clear().type("New York City")
        cy.get("#id_state").select("New York")

        cy.get("#postcode").clear().type("11111")

        cy.get("#id_country").select("United States")

        cy.get("#phone_mobile").clear().type("222 2222 2222")

        cy.get("#submitAddress > span").should("be.visible").click()

        cy.url().should("include", "controller=order?step=1")

        cy.get("#address_invoice")
          .should("be.visible")
          .within(() => {
            cy.get(".address_firstname")
              .should("be.visible")
              .and("contain.text", "Test user")
            cy.get(".address_company")
              .should("be.visible")
              .and("contain.text", "Microsoft")
            cy.get(".address_address1")
              .should("be.visible")
              .and("contain.text", "Elm Street 66")
            cy.get(".address_city")
              .should("be.visible")
              .and("contain.text", "New York City")
            cy.get(".address_country_name")
              .should("be.visible")
              .and("contain.text", "United States")

            cy.get(".address_phone_mobile")
              .should("be.visible")
              .and("contain.text", "222 2222 2222")
          })
      })
    }
  )

  context(
    "As a user I want to be add a new address in checkout Address:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.contains("Proceed to checkout").should("be.visible").click()

        cy.get(".cart_navigation a span")
          .contains("Proceed to checkout")
          .click()
      })

      it("should allow user to add a new address", () => {
        cy.get(".address_add > .button > span").should("be.visible").click()

        cy.get("#address1").clear().type("Elm Street 66")
        cy.get("#city").clear().type("New York City")
        cy.get("#id_state").select("New York")

        cy.get("#postcode").clear().type("11111")

        cy.get("#id_country").select("United States")

        cy.get("#phone_mobile").clear().type("222 2222 2222")

        cy.get("#alias").clear().type("My New Address")

        cy.get("#submitAddress > span").should("be.visible").click()

        cy.url().should("include", "controller=order?step=1")
      })
    }
  )

  context(
    "As a user I want to add a comment about my order so that I can give additional information:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.contains("Proceed to checkout").should("be.visible").click()

        cy.get(".cart_navigation a span")
          .contains("Proceed to checkout")
          .click()
      })

      it("should allow user to add a comment about the order", () => {
        cy.get("#ordermsg")
          .should("be.visible")
          .within(() => {
            cy.get("label")
              .should("be.visible")
              .and(
                "have.text",
                "If you would like to add a comment about your order, please write it in the field below."
              )

            cy.get(".form-control")
              .should("be.visible")
              .and("have.value", "")
              .type("This is some additonal information for my order")

            cy.get(".form-control")
              .should("be.visible")
              .and(
                "have.value",
                "This is some additonal information for my order"
              )
          })
      })
    }
  )

  context(
    "As a user I want to be able to proceed to the next checkout section:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.contains("Proceed to checkout").should("be.visible").click()

        cy.get(".cart_navigation a span")
          .contains("Proceed to checkout")
          .click()
      })

      it("should allow user to continue to next section", () => {
        cy.get(".cart_navigation button span")
          .contains("Proceed to checkout")
          .click()

        cy.url().should("include", "controller=order")

        cy.get(".step_current > span").should("contain.text", "04. Shipping")
      })
    }
  )
})
