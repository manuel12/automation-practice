/// <reference types="cypress" />

const userCredentials = require("../../fixtures/user-credentials.json")
const { printedSummerDressInOrange } = require("../../fixtures/products.json")

describe("Checkout -Shopping Cart", () => {
  context(
    "As a user I want to see a clear summary of items in my cart with details(product name, SKU, size, color, availability, price, discounts, quantity, and total product price(after any discounts are applied)) so I can confirm my order:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.contains("Proceed to checkout").click()
      })

      it("should display all the necessary elements", () => {
        cy.url().should("include", "controller=order")

        cy.get(".breadcrumb").should("contain.text", "Your shopping cart")

        cy.get("#cart_title").should("contain.text", "Shopping-cart summary")

        cy.get(".heading-counter").should(
          "contain.text",
          "Your shopping cart contains:",
          "1 product"
        )

        cy.get(".step_current > span").should("contain.text", "01. Summary")
      })

      it("should display any items added to cart in cart summary", () => {
        cy.get("#cart_summary").within(() => {
          cy.get("tbody").within(() => {
            cy.get("tr").contains("Printed Summer Dress")
          })
        })
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

          cy.get("td.cart_quantity ").within(() => {
            cy.get(".cart_quantity_input").should("be.visible")
            cy.get(".cart_quantity_button").should("be.visible")
          })
        })
      })

      it("should display product name of any item added to cart", () => {
        cy.get("td.cart_description").within(() => {
          cy.get(".product-name")
            .should("be.visible")
            .and("have.text", "Printed Summer Dress")
        })
      })

      it("should display product name of any item added to cart", () => {
        cy.get("td.cart_description").within(() => {
          cy.get(".cart_ref")
            .should("be.visible")
            .and("have.text", "SKU : demo_5")
        })
      })

      it("should display size of any item added to cart", () => {
        cy.get("td.cart_description").within(() => {
          cy.get("a").should("be.visible").and("include.text", "Size : M")
        })
      })

      it("should display color of any item added to cart", () => {
        cy.get("td.cart_description").within(() => {
          cy.get("a").should("be.visible").and("include.text", "Color : Orange")
        })
      })

      it("should display availability of any item added to cart", () => {
        cy.get("td.cart_avail").within(() => {
          cy.get(".label").should("be.visible").and("have.text", "In stock")
        })
      })

      it("should display price of any item added to cart", () => {
        cy.get("td.cart_unit").within(() => {
          cy.get(".old-price").should("be.visible").and("have.text", "$31")
        })
      })

      it("should display discounts of any item added to cart", () => {
        cy.get("td.cart_unit").within(() => {
          cy.get(".price-percent-reduction")
            .should("be.visible")
            .and("include.text", "-5%")
        })
      })

      it("should display quantity of any item added to cart", () => {
        cy.get("td.cart_quantity").within(() => {
          cy.get(".cart_quantity_input")
            .should("be.visible")
            .and("have.value", 1)
        })
      })

      it("should display total product price of any item added to cart", () => {
        cy.get("td.cart_total").within(() => {
          cy.get('[id^="total_product_price_"]')
            .should("be.visible")
            .and("include.text", "$29")
        })
      })
    }
  )

  context(
    "As a user I want to be able to update the quantity of items in the shopping cart summary so I can correct any issues with quantity:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.contains("Proceed to checkout").click()
      })

      it("should allow the user to update(increasing) the quantity of items in the shopping cart", () => {
        cy.get("td.cart_quantity").within(() => {
          cy.get(".cart_quantity_input")
            .should("be.visible")
            .and("have.value", 1)

          cy.get('[id^="cart_quantity_up_"]').click()

          cy.get(".cart_quantity_input")
            .should("be.visible")
            .and("have.value", 2)
        })
      })

      it("should allow the user to update(decreasing) the quantity of items in the shopping cart", () => {
        cy.get("td.cart_quantity").within(() => {
          cy.get(".cart_quantity_input")
            .should("be.visible")
            .and("have.value", 1)

          cy.get('[id^="cart_quantity_up_"]').click()

          cy.get(".cart_quantity_input")
            .should("be.visible")
            .and("have.value", 2)

          cy.get('[id^="cart_quantity_down_"]').click()

          cy.get(".cart_quantity_input")
            .should("be.visible")
            .and("have.value", 1)
        })
      })
    }
  )

  context(
    "As a user I want to be able to remove any items in the shopping cart summary so I can remove unwanted items:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.contains("Proceed to checkout").click()
      })

      it("should allow user to remove any items from the shopping cart", () => {
        cy.get('[id^="product_"]').first().should("have.length", 1)
        cy.get("td.cart_delete").within(() => {
          cy.get(".icon-trash").should("be.visible").click()
          cy.get('[id^="product_"]').should("not.exist")

          cy.get(".alert")
            .should("be.visible")
            .and("have.text", "Your shopping cart is empty.")
        })
      })
    }
  )

  context(
    "As a user I want to see the total price of items in the shopping cart summary so I can ensure there are no unexpected charges:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.contains("Proceed to checkout").click()
      })

      it("should display the total price of items in the shopping cart", () => {
        cy.get("#total_product").should("be.visible").and("include.text", "$29")
      })
    }
  )

  context(
    "As a user I want to see the total price of shipping in the shopping cart summary so I can ensure there are no unexpected charges:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.contains("Proceed to checkout").click()
      })

      it("should display the total price of shipping in the shopping cart", () => {
        cy.get("#total_shipping").should("be.visible").and("include.text", "$7")
      })
    }
  )

  context(
    "As a user I want to see the total price of the checkout(total products + total shipping price) in the shopping cart summary so I can ensure there are no unexpected charges:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.contains("Proceed to checkout").click()
      })

      it("should display the total price of the order in the shopping cart", () => {
        cy.get("#total_price_container")
          .should("be.visible")
          .and("include.text", "$36")
      })
    }
  )

  context(
    "As a user I want to see my delivery address in the shopping cart summary so I can confirm correct address:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.loginUser(userCredentials)

        cy.addProductToCart(printedSummerDressInOrange)

        cy.contains("Proceed to checkout").click()
      })

      it("should display my delivery address in the shopping cart", () => {
        cy.get(".address.first_item")
          .should("be.visible")
          .and("include.text", "Delivery address")
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

        cy.contains("Proceed to checkout").click()
      })

      it("should allow user to continue to next section", () => {
        cy.get(".address.last_item")
          .should("be.visible")
          .and("include.text", "Invoice address")
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

        cy.contains("Proceed to checkout").click()
      })

      it("should allow user to continue to next section", () => {
        cy.get('[id^="product_"]').first().should("have.length", 1)

        cy.contains("Proceed to checkout").click()

        cy.url().should("include", "controller=authentication")

        cy.get(".step_current > span").should("contain.text", "02. Sign in")
      })
    }
  )
})
