/// <reference types="cypress" />

const userCredentials = require("../../fixtures/user-credentials.json")
const {
  blouse,
  smallBlouse,
  printedDressInPinkColor,
  printedSummerDressInSkyBlue
} = require("../../fixtures/products.json")
const { generateUniqueEmail } = require("../../support/utils")

describe("Automation Practice Test Cases", () => {
  beforeEach(() => {
    userCredentials.email = "testuser@gmail.com"
    cy.visit("http://www.automationpractice.pl/")
  })

  it("TC.01 Register User", () => {
    userCredentials.email = generateUniqueEmail(userCredentials.email)

    cy.signUpUser(userCredentials)

    cy.url().should(
      "eq",
      "http://www.automationpractice.pl/index.php?controller=my-account"
    )

    cy.checkElemText(".breadcrumb", "My account")

    cy.checkElemText(".page-heading", "My account")

    cy.checkElemText(".alert", "Your account has been created.")

    cy.checkElemText(
      ".info-account",
      "Welcome to your account. Here you can manage all of your personal information and orders."
    )
  })

  it("TC.02 Login User with correct email and password", () => {
    cy.loginUser(userCredentials)

    cy.url().should(
      "eq",
      "http://www.automationpractice.pl/index.php?controller=my-account"
    )

    cy.checkElemText(".breadcrumb", "My account")

    cy.checkElemText(".page-heading", "My account")

    cy.checkElemText(
      ".info-account",
      "Welcome to your account. Here you can manage all of your personal information and orders."
    )
  })

  it("TC.03 Login User with incorrect email and password", () => {
    cy.loginUser(
      {
        email: "invalid99@gmail.com",
        password: userCredentials.password
      },
      true
    )

    cy.checkElemText(".breadcrumb", "Authentication")

    cy.checkElemText(".page-heading", "Authentication")

    cy.checkElemText(
      "#center_column > :nth-child(2)",
      "There is 1 error",
      "Authentication failed."
    )
  })

  it("TC.04 Logout User", () => {
    userCredentials.email = generateUniqueEmail(userCredentials.email)

    cy.signUpUser(userCredentials)

    cy.checkElemText(".alert", "Your account has been created.")

    cy.contains("Sign out").click()

    cy.url().should("contains", "controller=authentication")

    cy.checkElemText(".breadcrumb", "Authentication")

    cy.checkElemText("h1", "Authentication")

    cy.get("#create-account_form").should("be.visible")

    cy.get("#login_form").should("be.visible")
  })

  it("TC.05 Register User with existing email", () => {
    userCredentials.email = generateUniqueEmail(userCredentials.email)

    cy.signUpUser(userCredentials)

    cy.checkElemText(".alert", "Your account has been created.")

    cy.contains("Sign out").click()

    cy.contains("Sign in").click()

    cy.fillCreateAccountEmail(userCredentials)

    cy.checkElemText(
      "#create_account_error",
      "An account using this email address has already been registered. Please enter a valid password or request a new one."
    )
  })

  it("TC.06 Contact Us Form", () => {
    cy.contains("Contact us").click()

    cy.checkElemText(".breadcrumb", "Contact")

    cy.checkElemText(".page-heading", "Customer service - Contact us")

    cy.checkElemText(".contact-form-box", "send a message").within(() => {
      cy.get("#id_contact").select("Customer service")

      cy.get("#email").should("be.visible").type(userCredentials.email).blur()
      cy.get(".form-ok #email").should("be.visible")

      cy.get("#id_order").should("be.visible").type("12345")

      cy.get("#message")
        .should("be.visible")
        .type("My order has not yet arrived!")

      cy.contains("Send").should("be.visible").click()
    })

    cy.checkElemText(
      ".alert",
      "Your message has been successfully sent to our team."
    )
  })

  it("TC.07 Verify All Products and product detail page", () => {
    cy.clickNavSection("women")

    cy.get(".product-container").each(($el) => {
      cy.get($el).within(() => {
        cy.get(".product-image-container").should("be.visible")
        cy.get(".product-name").should("be.visible")
        cy.get(".content_price").should("be.visible")
        cy.get(".button-container").should("be.visible")
      })
    })

    cy.get(
      ".first-in-line.last-item-of-tablet-line > .product-container > .right-block > .button-container > .lnk_view > span"
    ).click()

    cy.url().should(
      "eq",
      "http://www.automationpractice.pl/index.php?id_product=4&controller=product"
    )

    cy.checkElemText("h1", "Printed Dress")

    cy.checkElemText("#product_reference", "demo_4")

    cy.checkElemText("#product_condition", "New product")

    cy.checkElemText(
      "#short_description_content > p",
      "Printed evening dress with straight sleeves with black thin waist belt and ruffled linings."
    )

    cy.checkElemText(".content_prices", "$51")

    cy.get(".product_attributes").should("be.visible")
  })

  it("TC.08 Search Product", () => {
    cy.searchProduct("Blouse")

    cy.checkElemText("h1", "Search", "Blouse")

    cy.get(".product-count").first().should("contain.text", "1 - 1 of 1 item")

    cy.get(".product_list")
      .should("be.visible")
      .within(() => {
        cy.get(".product-container").should("have.length", 1)
        cy.checkElemText(".product-container", "Blouse")
      })
  })

  it("TC.09 Verify Subscription in home page", () => {
    userCredentials.email = generateUniqueEmail(userCredentials.email)

    cy.get("#newsletter-input").type(userCredentials.email)
    cy.get(".form-group > .btn").click()

    cy.checkElemText(
      ".alert-success",
      "Newsletter : You have successfully subscribed to this newsletter."
    )
  })

  it("TC.10 Verify Subscription in Cart page", () => {
    userCredentials.email = generateUniqueEmail(userCredentials.email)

    cy.get(".shopping_cart").should("be.visible").click()

    cy.get("#newsletter-input").type(userCredentials.email)
    cy.get(".form-group > .btn").click()

    cy.checkElemText(
      ".alert-success",
      "Newsletter : You have successfully subscribed to this newsletter."
    )
  })

  it("TC.11 Add Products in Cart", () => {
    cy.checkElemText(".shopping_cart", "(empty)")

    cy.clickNavSection("women")

    cy.addProductToCart(smallBlouse)

    cy.get(".exclusive > span").click()

    cy.checkElemText(
      "#layer_cart > .clearfix",
      "Product successfully added to your shopping cart",
      "There is 1 item in your cart."
    )

    cy.contains("Continue shopping").should("be.visible").click()

    cy.checkElemText(".shopping_cart", "1", "Product")
  })

  it("TC.12 Verify Product quantity in Cart", () => {
    cy.checkElemText(".shopping_cart", "(empty)")

    cy.clickNavSection("women")

    blouse.quantity = 3
    cy.addProductToCart(blouse)

    cy.checkElemText(
      "#layer_cart > .clearfix",
      "Product successfully added to your shopping cart",
      "There are 3 items in your cart."
    )

    cy.contains("Continue shopping").should("be.visible").click()

    cy.checkElemText(".shopping_cart", "3", "Products")

    cy.checkElemText(".shopping_cart", "3", "x", "Blouse")
  })

  it("TC.13 Place Order: Login before Checkout", () => {
    cy.loginUser(userCredentials)

    cy.addProductToCart(printedDressInPinkColor)

    cy.get(".button-medium > span").click()

    cy.get(".cart_navigation > .button > span").click()

    cy.get(".cart_navigation > .button > span").click()

    cy.get("#cgv").click()
    cy.get(".cart_navigation > .button > span").click()

    cy.get(".bankwire").click()
    cy.get("#cart_navigation > .button > span").click()

    cy.checkElemText(".alert", "Your order on My Shop is complete.")
  })

  it.only("TC.14 Remove Products From Cart", () => {
    cy.checkElemText(".shopping_cart", "3", "Products")

    cy.checkElemText(".shopping_cart", "3", "x", "Blouse")

    cy.checkElemText(".alert", "Your shopping cart is empty.")
  })

  it("TC.15 View Category Products", () => {
    cy.clickNavSection("women")

    cy.checkElemText("h1", "Women")

    cy.get(".product_list")
      .should("be.visible")
      .within(() => {
        cy.get(".product-container").should("have.length", 7)
      })

    cy.get("#ul_layered_category_0 > :nth-child(1) > label").click()

    cy.checkElemText("h1", "Women > Categories Tops")

    cy.get(".product_list")
      .should("be.visible")
      .within(() => {
        cy.get(".product-container").should("have.length", 2)
      })
  })

  it("TC.16 View & Cart Brand Products", () => {
    cy.clickNavSection("women")

    cy.checkElemText(".page-heading", "Women")
    cy.get(".product-container").should("have.length", 7)

    cy.get("#ul_layered_category_0 > :nth-child(1) > label").click()

    cy.checkElemText(".page-heading", "Women > Categories Tops")
    cy.get(".product-container").should("have.length", 2)

    cy.addProductToCart(blouse)

    cy.get(".continue > span").click()

    cy.checkElemText('[title="View my shopping cart"]', "Cart", "1", "Product")
  })

  it("TC.17 Search Products and Verify Cart After Login", () => {
    cy.loginUser(userCredentials)

    cy.searchProduct("Printed Summer Dress")

    cy.addProductToCart(printedSummerDressInSkyBlue)

    cy.get(".button-medium > span").click()

    // Find all elements whose ID starts with "#product_"
    cy.get('[id^="product_"]')
      .first()
      .within(() => {
        cy.checkElemText(
          ".cart_description > .product-name",
          "Printed Summer Dress"
        )

        cy.checkElemText(".cart_ref", "SKU : demo_5")

        cy.checkElemText(
          ".cart_description > :nth-child(3)",
          "Size : S, Color : Blue"
        )

        cy.checkElemText(".label", "In stock")

        cy.checkElemText(".price", "$29")

        cy.get(".cart_quantity_input")
          .should("be.visible")
          .and("contain.value", "1")

        cy.checkElemText(".cart_total", "$29")
      })
  })
})
