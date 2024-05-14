/// <reference types="cypress" />

const userCredentials = require("../../fixtures/user-credentials.json")
const { generateUniqueEmail } = require("../../support/utils")

describe("Automation Practice Test Cases", () => {
  beforeEach(() => {
    cy.visit("http://www.automationpractice.pl/")
  })

  it("TC.01 Register User", () => {
    userCredentials.email = generateUniqueEmail(userCredentials.email)
    cy.signUpUser(userCredentials)

    cy.getElemAndAssertText(".alert", "Your account has been created.")
  })

  it("TC.02 Login User with correct email and password", () => {
    userCredentials.email = generateUniqueEmail(userCredentials.email)

    cy.signUpUser(userCredentials)

    cy.getElemAndAssertText(".alert", "Your account has been created")

    cy.get(".logout").click()

    cy.loginUser(userCredentials)

    cy.url().should(
      "eq",
      "http://www.automationpractice.pl/index.php?controller=my-account",
    )

    cy.getElemAndAssertText(".page-heading", "My account")

    cy.getElemAndAssertText(
      ".info-account",
      "Welcome to your account. Here you can manage all of your personal information and orders.",
    )
  })

  it("TC.03 Login User with incorrect email and password", () => {
    userCredentials.email = generateUniqueEmail(userCredentials.email)

    cy.signUpUser(userCredentials)

    cy.getElemAndAssertText(".alert", "Your account has been created.")

    cy.get(".logout").click()

    cy.loginUser({
      email: "invalid99@gmail.com",
      password: userCredentials.password,
    })

    cy.getElemAndAssertText(
      "#center_column > :nth-child(2)",
      "There is 1 error",
    )

    cy.getElemAndAssertText(
      "#center_column > :nth-child(2)",
      "Authentication failed.",
    )
  })

  it("TC.04 Logout User", () => {
    userCredentials.email = generateUniqueEmail(userCredentials.email)

    cy.signUpUser(userCredentials)

    cy.getElemAndAssertText(".alert", "Your account has been created.")

    cy.get(".logout").click()

    cy.url().should(
      "eq",
      "http://www.automationpractice.pl/index.php?controller=authentication&back=my-account",
    )

    cy.getElemAndAssertText(".page-heading", "Authentication")

    cy.get("#create-account_form").should("be.visible")
    cy.get("#login_form").should("be.visible")
  })

  it("TC.05 Register User with existing email", () => {
    userCredentials.email = generateUniqueEmail(userCredentials.email)

    cy.signUpUser(userCredentials)

    cy.getElemAndAssertText(".alert", "Your account has been created.")

    cy.get(".logout").click()

    cy.get(".login").should("be.visible").click()

    cy.fillCreateAccountEmail(userCredentials)

    cy.getElemAndAssertText(
      "#create_account_error",
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

    cy.getElemAndAssertText(
      ".alert",
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

    cy.getElemAndAssertText("h1", "Printed Dress")

    cy.getElemAndAssertText("#product_reference", "demo_4")

    cy.getElemAndAssertText("#product_condition", "New product")

    cy.getElemAndAssertText(
      "#short_description_content > p",
      "Printed evening dress with straight sleeves with black thin waist belt and ruffled linings.",
    )

    cy.getElemAndAssertText(".content_prices", "$51")

    cy.get(".product_attributes").should("be.visible")
  })

  it("TC.08 Search Product", () => {
    cy.get("#search_query_top").type("Blouse")
    cy.get("#searchbox > .btn").click()

    cy.getElemAndAssertText(".page-heading", "Search")

    cy.getElemAndAssertText(".page-heading", "Blouse")

    cy.get(".product_list").should("be.visible")

    cy.get(".product_list").within(() => {
      cy.getElemAndAssertText(".product-container", "Blouse")
    })
  })

  it("TC.09 Verify Subscription in home page", () => {
    userCredentials.email = generateUniqueEmail(userCredentials.email)

    cy.get("#newsletter-input").type(userCredentials.email)
    cy.get(".form-group > .btn").click()

    cy.getElemAndAssertText(
      ".alert-success",
      "Newsletter : You have successfully subscribed to this newsletter.",
    )
  })

  it("TC.10 Verify Subscription in Cart page", () => {
    userCredentials.email = generateUniqueEmail(userCredentials.email)

    cy.get(".shopping_cart").click()

    cy.get("#newsletter-input").type(userCredentials.email)
    cy.get(".form-group > .btn").click()

    cy.getElemAndAssertText(
      ".alert-success",
      "Newsletter : You have successfully subscribed to this newsletter.",
    )
  })

  it("TC.11 Add Products in Cart", () => {
    cy.loginUser(userCredentials)
    cy.get(
      '.sf-menu > :nth-child(1) > [href="http://www.automationpractice.pl/index.php?id_category=3&controller=category"]',
    ).click()

    cy.get(".product-container")
      .eq(1)
      .within(($el) => {
        cy.get(" .right-block > .button-container > .lnk_view > span").click()
      })

    cy.get("#color_8").click()

    cy.getElemAndAssertText(".exclusive > span", "Add to cart")
    cy.get(".exclusive > span").click()

    cy.getElemAndAssertText(
      ".layer_cart_product > h2",
      "Product successfully added to your shopping cart",
    )

    cy.getElemAndAssertText(".layer_cart_cart", "There is 1 item in your cart")

    cy.getElemAndAssertText(".layer_cart_cart", "Total products")

    cy.getElemAndAssertText(".layer_cart_cart", "$27")

    cy.getElemAndAssertText(".layer_cart_cart", "Total shipping")

    cy.getElemAndAssertText(".layer_cart_cart", "$7")

    cy.getElemAndAssertText(".layer_cart_cart", "Total")

    cy.getElemAndAssertText(".layer_cart_cart", "$34")

    cy.get(".button-medium > span").click()

    cy.getElemAndAssertText("#cart_title", "Shopping-cart summary")

    cy.get("#order-detail-content").should("be.visible")

    cy.get("#cart_summary").should("be.visible")

    cy.get("#order-detail-content").should("be.visible")

    cy.getElemAndAssertText("#cart_summary tr", "Product")
    cy.getElemAndAssertText("#cart_summary tr", "Description")
    cy.getElemAndAssertText("#cart_summary tr", "Availability")
    cy.getElemAndAssertText("#cart_summary tr", "Unit price")
    cy.getElemAndAssertText("#cart_summary tr", "Qty")
    cy.getElemAndAssertText("#cart_summary tr", "Total")

    // Find all elements whose ID starts with "#product_"
    cy.get('[id^="product_"]')
      .first()
      .within(() => {
        cy.getElemAndAssertText(".cart_description > .product-name", "Blouse")

        cy.getElemAndAssertText(".cart_ref", "SKU : demo_2")

        cy.getElemAndAssertText(
          ".cart_description > :nth-child(3)",
          "Size : S, Color : White",
        )

        cy.getElemAndAssertText(".label", "In stock")

        cy.getElemAndAssertText(".price", "$27")

        cy.get(".cart_quantity_input")
          .should("be.visible")
          .and("contain.value", "1")

        cy.getElemAndAssertText(".cart_total", "$27")
      })

    cy.getElemAndAssertText("#total_product", "$27")

    cy.getElemAndAssertText("#total_shipping", "$7")

    cy.getElemAndAssertText("#total_price_container", "$34")
  })

  it("TC.12 Verify Product quantity in Cart", () => {
    cy.loginUser(userCredentials)
    cy.get(
      '.sf-menu > :nth-child(1) > [href="http://www.automationpractice.pl/index.php?id_category=3&controller=category"]',
    ).click()

    cy.get(".product-container")
      .eq(1)
      .within(($el) => {
        cy.get(" .right-block > .button-container > .lnk_view > span").click()
      })

    cy.get("#color_8").click()

    cy.getElemAndAssertText(".exclusive > span", "Add to cart").click()

    cy.getElemAndAssertText(
      ".layer_cart_product > h2",
      "Product successfully added to your shopping cart",
    )

    cy.getElemAndAssertText(".layer_cart_cart", "There is 1 item in your cart.")

    cy.get(".continue > span").click()

    cy.get(
      '.sf-menu > :nth-child(1) > [href="http://www.automationpractice.pl/index.php?id_category=3&controller=category"]',
    ).click()

    cy.get(".product-container")
      .eq(3)
      .within(($el) => {
        cy.get(" .right-block > .button-container > .lnk_view > span").click()
      })

    cy.get("#color_24").click()

    cy.get(".exclusive > span").click()

    cy.get(".continue > span").click()

    cy.get(
      '.sf-menu > :nth-child(1) > [href="http://www.automationpractice.pl/index.php?id_category=3&controller=category"]',
    ).click()

    cy.get(".product-container")
      .eq(4)
      .within(($el) => {
        cy.get(" .right-block > .button-container > .lnk_view > span").click()
      })

    cy.get("#color_14").click()

    cy.get(".exclusive > span").click()

    cy.get(".button-medium > span").click()

    cy.get(".cart_quantity_input").each(($el) => {
      cy.get($el).should("have.value", "1")
    })
  })
})
