/// <reference types="cypress" />

const userCredentials = require("../../fixtures/user-credentials.json")
const { printedSummerDressInOrange } = require("../../fixtures/products.json")

describe("Checkout - Shipping", () => {
  it("should display all the necessary elements", () => {
    cy.visit("http://www.automationpractice.pl/")

    cy.loginUser(userCredentials)

    cy.addProductToCart(printedSummerDressInOrange)

    cy.contains("Proceed to checkout").should("be.visible").click()

    cy.get(".cart_navigation a span").contains("Proceed to checkout").click()

    cy.get(".cart_navigation button span")
      .contains("Proceed to checkout")
      .click()

    cy.get("#uniform-cgv").should("be.visible").click()

    cy.get(".cart_navigation button span")
      .contains("Proceed to checkout")
      .click()

    cy.url().should("include", "controller=order")

    cy.get(".breadcrumb").should("contain.text", "Your payment method")

    cy.get(".page-heading").should(
      "contain.text",
      "Please choose your payment method"
    )

    cy.get(".heading-counter").should(
      "contain.text",
      "Your shopping cart contains:",
      "1 product"
    )

    cy.get(".step_current > span").should("contain.text", "05. Payment")
  })

  context(
    "As a customer, I want to see a clear summary of items in my cart with details (product name, SKU, size, color, availability, price, discounts, quantity, and total product price(after any discounts are applied)), so that I can confirm my order:",
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

        cy.get("#uniform-cgv").should("be.visible").click()

        cy.get(".cart_navigation button span")
          .contains("Proceed to checkout")
          .click()
      })

      it("should display any items added to cart in cart summary", () => {
        cy.get("tr.cart_item")
          .first()
          .should("have.length", 1)
          .contains("Printed Summer Dress")
      })

      it("should display items inside their respective cart elements", () => {
        cy.get("#cart_summary").within(() => {
          cy.get("thead").within(() => {
            cy.get("th").contains("Product")
            cy.get("th").contains("Description")
            cy.get("th").contains("Availability")
            cy.get("th").contains("Unit price")
            cy.get("th").contains("Qty")
            cy.get("th").contains("Total")
          })

          cy.get("td.cart_product").within(() => {
            cy.get("a > img").should("be.visible")
          })

          cy.get("td.cart_description").within(() => {
            cy.get(".product-name").should("be.visible")
            cy.get(".cart_ref").should("be.visible")
            cy.get("a").should("be.visible")
          })

          cy.get("td.cart_avail").within(() => {
            cy.get(".label-success").should("be.visible")
          })

          cy.get("td.cart_unit").within(() => {
            cy.get(".special-price").should("be.visible")
            cy.get(".price-percent-reduction").should("be.visible")
            cy.get(".old-price").should("be.visible")
          })

          cy.get("td.cart_quantity").within(() => {
            cy.get("span").should("be.visible")
          })
        })
      })

      it("should display product name of any item added to cart", () => {
        cy.get("tr.cart_item").should("have.length", 1)
        cy.get("td.cart_description").within(() => {
          cy.get(".product-name")
            .should("be.visible")
            .and("have.text", "Printed Summer Dress")
        })
      })

      it("should display SKU of any item added to cart", () => {
        cy.get("tr.cart_item").should("have.length", 1)
        cy.get("td.cart_description").within(() => {
          cy.get(".cart_ref")
            .should("be.visible")
            .and("have.text", "SKU : demo_5")
        })
      })

      it("should display size of any item added to cart", () => {
        cy.get("tr.cart_item").should("have.length", 1)
        cy.get("td.cart_description").within(() => {
          cy.get("a").should("be.visible").and("include.text", "Size : M")
        })
      })

      it("should display color of any item added to cart", () => {
        cy.get("tr.cart_item").should("have.length", 1)
        cy.get("td.cart_description").within(() => {
          cy.get("a").should("be.visible").and("include.text", "Color : Orange")
        })
      })

      it("should display availability of any item added to cart", () => {
        cy.get("tr.cart_item").should("have.length", 1)
        cy.get("td.cart_avail").within(() => {
          cy.get(".label").should("be.visible").and("have.text", "In stock")
        })
      })

      it("should display price of any item added to cart", () => {
        cy.get("tr.cart_item").should("have.length", 1)
        cy.get("td.cart_unit").within(() => {
          cy.get(".old-price").should("be.visible").and("have.text", "$31")
        })
      })

      it("should display discounts of any item added to cart", () => {
        cy.get("tr.cart_item").should("have.length", 1)
        cy.get("td.cart_unit").within(() => {
          cy.get(".price-percent-reduction")
            .should("be.visible")
            .and("include.text", "-5%")
        })
      })

      it("should display quantity of any item added to cart", () => {
        cy.get("tr.cart_item").should("have.length", 1)
        cy.get("td.cart_quantity").should("be.visible").and("include.text", "1")
      })

      it("should display shipping price of any items added to cart", () => {
        cy.get("tr.cart_item").should("have.length", 1)
        cy.get("#total_shipping").should("be.visible").and("include.text", "$7")
      })

      it("should display total product price of any item added to cart", () => {
        cy.get("tr.cart_item").should("have.length", 1)
        cy.get("td.cart_total").within(() => {
          cy.get('[id^="total_product_price_"]')
            .should("be.visible")
            .and("include.text", "$29")
        })
      })
    }
  )

  context(
    "As a customer, I want to see the total price of shipping in the payment section summary, so that I can ensure there are no unexpected charges:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.contains("Proceed to checkout").click()
      })

      it("should display the total price of shipping in the payment section", () => {
        cy.get("tr.cart_item").should("have.length", 1)
        cy.get("#total_shipping").should("be.visible").and("include.text", "$7")
      })
    }
  )

  context(
    "As a customer, I want to see the total price of the order(total products + total shipping price) in the payment section summary, so that I can ensure there are no unexpected charges:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.contains("Proceed to checkout").click()
      })

      it("should display the total price of the order in the payment section", () => {
        cy.get("tr.cart_item").should("have.length", 1)
        cy.get("#total_price_container")
          .should("be.visible")
          .and("include.text", "$36")
      })
    }
  )

  context(
    "As a customer, I want to be able to pay by bank wire, so that I can pay in case no other methods are available:",
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

        cy.get("#uniform-cgv").should("be.visible").click()

        cy.get(".cart_navigation button span")
          .contains("Proceed to checkout")
          .click()
      })

      it("should allow the user to pay by bank wire", () => {
        cy.get("#cart_summary").within(() => {
          cy.get("tr.cart_item").first().should("have.length", 1)
        })

        cy.get(".bankwire")
          .should("be.visible")
          .and("include.text", "Pay by bank wire")
          .click()

        cy.get(".box")
          .should("be.visible")
          .and("include.text", "Bank-wire payment")
          .within(() => {
            cy.get("#amount").should("be.visible").and("have.text", "$36")
          })

        cy.get("#cart_navigation").contains("I confirm my order").click()

        cy.get(".alert")
          .should("be.visible")
          .and("have.text", "Your order on My Shop is complete.")
      })
    }
  )

  context(
    "As a customer, I want to be able to pay by check wire, so that I can pay in case no other methods are available:",
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

        cy.get("#uniform-cgv").should("be.visible").click()

        cy.get(".cart_navigation button span")
          .contains("Proceed to checkout")
          .click()
      })

      it("should allow the user to pay by check wire", () => {
        cy.get("#cart_summary").within(() => {
          cy.get("tr.cart_item").first().should("have.length", 1)
        })

        cy.get(".cheque")
          .should("be.visible")
          .and("include.text", "Pay by check")
          .click()

        cy.get(".box")
          .should("be.visible")
          .and("include.text", "Check payment")
          .within(() => {
            cy.get("#amount").should("be.visible").and("have.text", "$36")
          })

        cy.get("#cart_navigation").contains("I confirm my order").click()

        cy.get(".alert")
          .should("be.visible")
          .and("have.text", "Your order on My Shop is complete.")
      })
    }
  )
})
