/// <reference types="cypress" />

const userCredentials = require("../../fixtures/user-credentials.json")
const {
  printedSummerDressInOrange,
  printedSummerDressInSkyBlue
} = require("../../fixtures/products.json")

describe("Shopping Cart - Dropdown List", () => {
  context(
    "As a customer, I want a shopping cart element on every page of the site, so that I can keep track of my products:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)
      })

      it("should display shopping cart element in all pages of the catalogue", () => {
        cy.get('[title="View my shopping cart"]').should("be.visible")

        cy.get("#block_top_menu").contains("Women").click()

        cy.get('[title="View my shopping cart"]').should("be.visible")

        cy.get(".sf-menu > :nth-child(2) > .sf-with-ul").click()

        cy.get('[title="View my shopping cart"]').should("be.visible")

        cy.get(".sf-menu > :nth-child(3) > a").click()

        cy.get('[title="View my shopping cart"]').should("be.visible")

        cy.get(".nav").contains("Contact us").click()

        cy.get('[title="View my shopping cart"]').should("be.visible")

        cy.get(".nav").contains("Test user").click()

        cy.get('[title="View my shopping cart"]').should("be.visible")
      })
    }
  )

  context(
    "As a customer, I want to see a dropdown list of all my products by hovering over shopping cart, so that I can keep track of my products:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.addProductToCart(printedSummerDressInSkyBlue)
      })

      it("should display shopping cart dropdown product list when hovering over shopping cart element", () => {
        cy.get('[title="View my shopping cart"]').should("be.visible")

        cy.get('[title="View my shopping cart"]').trigger("mouseover")

        cy.get("dl.products").should("be.visible")
      })
    }
  )

  context(
    "As a customer, I want the products in my shopping cart to display their name, quantity, size, color, and price, so that I can keep track of their features:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.addProductToCart(printedSummerDressInSkyBlue)

        cy.get('[title="View my shopping cart"]').should("be.visible")

        cy.get('[title="View my shopping cart"]').trigger("mouseover")

        cy.get("dl.products").should("be.visible")
      })

      it("should display all products added to the shopping cart in dropdown list including name, quantity, size, color and price", () => {
        cy.get('[data-id^="cart_block_product_"]')
          .should("be.visible")
          .first()
          .within(() => {
            cy.get(".cart-images > img").should("be.visible")

            cy.get(".cart-info")
              .should("be.visible")
              .within(() => {
                cy.get(".product-name")
                  .should("be.visible")
                  // Check quantity is correct
                  .and("include.text", "1x")
                  // Check name is correct
                  .and("include.text", "Printed Summer Dress")

                cy.get(".product-atributes")
                  .should("be.visible")

                  // Check size is correct
                  .and("include.text", "M")

                  // Check color is correct
                  .and("include.text", "Orange")

                cy.get(".price").should("be.visible")
              })
          })

        cy.get('[data-id^="cart_block_product_"]')
          .should("be.visible")
          .eq(1)
          .within(() => {
            cy.get(".cart-images > img").should("be.visible")

            cy.get(".cart-info")
              .should("be.visible")
              .within(() => {
                cy.get(".product-name")
                  // Check quantity is correct
                  .and("include.text", "1x")
                  // Check name is correct
                  .and("include.text", "Printed Summer Dress")

                cy.get(".product-atributes")
                  .should("be.visible")

                  // Check size is correct
                  .and("include.text", "M")

                  // Check color is correct
                  .and("include.text", "Orange")

                cy.get(".price").should("be.visible")
              })
          })
      })
    }
  )

  context(
    "As a customer, I want to be able to remove products directly from the shopping cart list, so that I can take out any products added incorrectly:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.addProductToCart(printedSummerDressInSkyBlue)

        cy.get('[title="View my shopping cart"]').should("be.visible")

        cy.get('[title="View my shopping cart"]').trigger("mouseover")

        cy.get("dl.products").should("be.visible")
      })

      it("should allow user to remove any products added to the shopping cart", () => {
        cy.get('[data-id^="cart_block_product_"]').should("have.length", 2)

        cy.get('[data-id^="cart_block_product_"]')
          .should("be.visible")
          .first()
          .within(() => {
            cy.get(".remove_link").should("be.visible").click()
          })
          .then(() => {
            cy.get('[data-id^="cart_block_product_"]').should("have.length", 1)

            cy.get('[data-id^="cart_block_product_"]')
              .should("be.visible")
              .first()
              .within(() => {
                cy.get(".remove_link").should("be.visible").click()
              })
              .then(() => {
                cy.get('[data-id^="cart_block_product_"]').should(
                  "have.length",
                  0
                )

                cy.get('[title="View my shopping cart"]')
                  .should("be.visible")
                  .and("include.text", "Cart", "(empty)")
              })
          })
      })
    }
  )

  context(
    "As a customer, I want the price of shipping to be displayed in the shopping cart, so that I don't get unexpected charges:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.addProductToCart(printedSummerDressInSkyBlue)

        cy.get('[title="View my shopping cart"]').should("be.visible")

        cy.get('[title="View my shopping cart"]').trigger("mouseover")

        cy.get("dl.products").should("be.visible")
      })

      it("should display the price of shipping in the shopping cart", () => {
        cy.get(".cart_block_shipping_cost")
          .should("be.visible")
          .and("have.text", "Shipping")
          .and("have.text", "$7")
      })
    }
  )

  context(
    "As a customer, I want to see the total price of my products + shipping in the shopping cart, so that I don't get unexpected charges:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.addProductToCart(printedSummerDressInSkyBlue)

        cy.get('[title="View my shopping cart"]').should("be.visible")

        cy.get('[title="View my shopping cart"]').trigger("mouseover")

        cy.get("dl.products").should("be.visible")
      })

      it("should display the total price of products + shipping in the shopping cart", () => {
        cy.get(".cart_block_total")
          .should("be.visible")
          .and("have.text", "Total")
          .and("have.text", "$36")
      })
    }
  )
})
