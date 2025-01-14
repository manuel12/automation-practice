/// <reference types="cypress" />

const userCredentials = require("../../fixtures/user-credentials.json")
const {
  blouse,
  printedDressInPinkColor,
  printedSummerDressInSkyBlue
} = require("../../fixtures/products.json")
const { generateUniqueEmail } = require("../../support/utils")

describe("Automation Practice Test Cases", () => {
  beforeEach(() => {
    // Make sure to reset email at the start of every test
    userCredentials.email = "testuser@gmail.com"
    cy.visit("http://www.automationpractice.pl/")
  })

  const LOGGED_IN_URL_PATH = "controller=my-account"
  const LOGOUT_URL_PATH = "controller=authentication"
  const NEWSLETTER_SUBMIT_BTN = ".form-group > .btn"
  const PRODUCT_ADDED_TO_CART_MODAL = "#layer_cart > .clearfix"
  const VIEW_MY_SHOPPING_CART_DIV = '[title="View my shopping cart"]'

  it("TC.01 Register User", () => {
    userCredentials.email = generateUniqueEmail()

    cy.signUpUser(userCredentials)

    cy.url().should("include", LOGGED_IN_URL_PATH)

    cy.checkElemText(".breadcrumb", "My account")

    cy.checkElemText("h1", "My account")

    cy.checkElemText(".alert", "Your account has been created.")

    cy.checkElemText(
      ".info-account",
      "Welcome to your account. Here you can manage all of your personal information and orders."
    )
  })

  it("TC.02 Login User with correct email and password", () => {
    cy.loginUser(userCredentials)

    cy.url().should("include", LOGGED_IN_URL_PATH)

    cy.checkElemText(".breadcrumb", "My account")

    cy.checkElemText("h1", "My account")

    cy.checkElemText("h1", "My account")

    cy.checkElemText(
      ".info-account",
      "Welcome to your account. Here you can manage all of your personal information and orders."
    )
  })

  it("TC.03 Login User with incorrect email and password", () => {
    const INVALID_EMAIL = "invalid99@gmail.com"
    userCredentials.email = INVALID_EMAIL

    cy.loginUser(userCredentials, true)

    cy.checkElemText(".breadcrumb", "Authentication")

    cy.checkElemText("h1", "Authentication")

    cy.get("#login_form").should("be.visible")

    cy.checkElemText(
      ".alert-danger",
      "There is 1 error",
      "Authentication failed."
    )
  })

  it("TC.04 Logout User", () => {
    userCredentials.email = generateUniqueEmail()

    cy.signUpUser(userCredentials)

    cy.checkElemText(".alert", "Your account has been created.")

    cy.contains("Sign out").click()

    cy.url().should("contains", LOGOUT_URL_PATH)

    cy.checkElemText(".breadcrumb", "Authentication")

    cy.checkElemText("h1", "Authentication")

    cy.get("#create-account_form").should("be.visible")

    cy.get("#login_form").should("be.visible")
  })

  it("TC.05 Register User with existing email", () => {
    userCredentials.email = generateUniqueEmail()

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

    cy.checkElemText("h1", "Customer service - Contact us")

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

    cy.checkElemText("h1", "Women")

    cy.get(".product_list")
      .should("be.visible")
      .within(() => {
        cy.get(".product-container").each(($el) => {
          cy.get($el).within(() => {
            cy.get(".product-image-container").should("be.visible")
            cy.get(".product-name").should("be.visible")
            cy.get(".content_price").should("be.visible")
            cy.get(".button-container").should("be.visible")
          })
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
    userCredentials.email = generateUniqueEmail()

    cy.get("#newsletter-input").type(userCredentials.email)
    cy.get(NEWSLETTER_SUBMIT_BTN).click()

    cy.checkElemText(
      ".alert-success",
      "Newsletter : You have successfully subscribed to this newsletter."
    )
  })

  it("TC.10 Verify Subscription in Cart page", () => {
    userCredentials.email = generateUniqueEmail()

    cy.get(".shopping_cart").should("be.visible").click()

    cy.get("#newsletter-input").type(userCredentials.email)
    cy.get(NEWSLETTER_SUBMIT_BTN).click()

    cy.checkElemText(
      ".alert-success",
      "Newsletter : You have successfully subscribed to this newsletter."
    )
  })

  it("TC.11 Add Products in Cart", () => {
    cy.checkElemText(".shopping_cart", "(empty)")

    cy.clickNavSection("women")

    cy.addProductToCart(blouse)

    cy.get("#add_to_cart").click()

    cy.checkElemText(
      PRODUCT_ADDED_TO_CART_MODAL,
      "Product successfully added to your shopping cart",
      "There is 1 item in your cart."
    )

    return

    cy.contains("Continue shopping").should("be.visible").click()

    cy.addProductToCart(blouse)

    cy.get("#add_to_cart").click()

    cy.checkElemText(
      PRODUCT_ADDED_TO_CART_MODAL,
      "Product successfully added to your shopping cart",
      "There are 2 items in your cart."
    )

    cy.contains("Continue shopping").should("be.visible").click()

    cy.addProductToCart(blouse)

    cy.get("#add_to_cart").click()

    cy.checkElemText(
      PRODUCT_ADDED_TO_CART_MODAL,
      "Product successfully added to your shopping cart",
      "There are 3 items in your cart."
    )

    cy.contains("Continue shopping").should("be.visible").click()

    cy.checkElemText(".shopping_cart", "3", "Product")
  })

  it("TC.12 Verify Product quantity in Cart", () => {
    cy.checkElemText(".shopping_cart", "(empty)")

    cy.clickNavSection("women")

    blouse.quantity = 3
    cy.addProductToCart(blouse)

    cy.checkElemText(
      PRODUCT_ADDED_TO_CART_MODAL,
      "Product successfully added to your shopping cart",
      "There are 3 items in your cart."
    )

    cy.contains("Continue shopping").should("be.visible").click()

    cy.checkElemText(".shopping_cart", "3", "Products")

    cy.checkElemText(".shopping_cart", "3", "x", "Blouse")
  })

  it("TC.13 Place Order: Login before Checkout", () => {
    const CHECKOUT_FLOW_STEP = ".step_current > span"
    const PROCEED_TO_CHECKOUT_BTN = ".cart_navigation > .button > span"
    const TERMS_OF_SERVICE_CHECKBOX = "#cgv"
    const PAYMENT_METHOD = ".bankwire"

    cy.loginUser(userCredentials)

    cy.url().should("include", "my-account")

    cy.addProductToCart(printedDressInPinkColor)

    cy.contains("Proceed to checkout").click()

    cy.get(CHECKOUT_FLOW_STEP).should("contain.text", "Summary")

    cy.get(PROCEED_TO_CHECKOUT_BTN).click()

    cy.get(CHECKOUT_FLOW_STEP).should("contain.text", "Address")

    cy.get(PROCEED_TO_CHECKOUT_BTN).click()

    cy.get(CHECKOUT_FLOW_STEP).should("contain.text", "Shipping")

    cy.get(TERMS_OF_SERVICE_CHECKBOX).click()
    cy.get(PROCEED_TO_CHECKOUT_BTN).click()

    cy.get(CHECKOUT_FLOW_STEP).should("contain.text", "Payment")

    cy.get(PAYMENT_METHOD).click()
    cy.get(PROCEED_TO_CHECKOUT_BTN).click()

    cy.checkElemText(".alert", "Your order on My Shop is complete.")
  })

  it("TC.14 Remove Products From Cart", () => {
    cy.checkElemText(".shopping_cart", "(empty)")

    cy.clickNavSection("women")

    cy.addProductToCart(blouse)

    cy.addProductToCart(blouse)

    cy.addProductToCart(blouse)

    cy.checkElemText(".shopping_cart", "3", "Products")

    cy.contains("Continue shopping").click()

    cy.get(VIEW_MY_SHOPPING_CART_DIV).trigger("mouseover")

    cy.checkElemText(".cart-info", "3", "x", "Blouse")

    cy.get(".remove_link").click()

    cy.checkElemText(".shopping_cart", "(empty)")

    cy.get(VIEW_MY_SHOPPING_CART_DIV).click()

    cy.checkElemText(".alert", "Your shopping cart is empty.")
  })

  it("TC.15 View Category Products", () => {
    const TOPS_CATEGORY_LABEL = "#ul_layered_category_0 > :nth-child(1) > label"

    cy.clickNavSection("women")

    cy.checkElemText("h1", "Women")

    cy.get(".product_list")
      .should("be.visible")
      .within(() => {
        cy.get(".product-container").should("have.length", 7)
      })

    cy.get(TOPS_CATEGORY_LABEL).click()

    cy.checkElemText("h1", "Women > Categories Tops")

    cy.get(".product_list")
      .should("be.visible")
      .within(() => {
        cy.get(".product-container").should("have.length", 2)
      })
  })

  it("TC.16 View & Cart Brand Products", () => {
    const DRESSES_CATEGORY_LABEL =
      "#ul_layered_category_0 > :nth-child(2) > label"
    const PRODUCT_ADDED_TO_CART_MODAL_CONTINUE_BTN = ".continue > span"

    cy.clickNavSection("women")

    cy.checkElemText("h1", "Women")
    cy.get(".product_list").should("be.visible")
    cy.get(".product-container").should("have.length", 7)

    cy.get(DRESSES_CATEGORY_LABEL).click()

    cy.checkElemText("h1", "Women > Categories Dresses")
    cy.get(".product-container").should("have.length", 5)

    const _printedSummerDressInSkyBlue = {
      productNum: 3, // Product is in the 3rd position when using 'Dresses' filter
      color: printedSummerDressInSkyBlue.color,
      size: "M"
    }
    cy.addProductToCart(_printedSummerDressInSkyBlue)

    cy.checkElemText(
      PRODUCT_ADDED_TO_CART_MODAL,
      "Product successfully added to your shopping cart",
      "There is 1 item in your cart."
    )

    cy.get(PRODUCT_ADDED_TO_CART_MODAL_CONTINUE_BTN).click()

    cy.checkElemText(VIEW_MY_SHOPPING_CART_DIV, "Cart", "1", "Product")
  })

  it("TC.17 Search Products and Verify Cart After Login", () => {
    const PRODUCT_ID_PREFIX = '[id^="product_"]' // Find all elements whose ID starts with "#product_"
    const PRODUCT_ADDED_MODAL_PROCEED_TO_CHECKOUT_BTN = ".button-medium > span"
    const PRODUCT_SKU_TEXT = ".cart_ref"
    const PRODUCT_SIZE_COLOR_TEXT = ".cart_description > :nth-child(3)"
    const PRODUCT_AVAILABILITY_TEXT = ".label"
    const PRODUCT_PRICE_TEXT = ".price"
    const PRODUCT_PRICE = "$29"

    cy.loginUser(userCredentials)

    cy.searchProduct("Printed Summer Dress")

    cy.addProductToCart(printedSummerDressInSkyBlue)

    cy.get(PRODUCT_ADDED_MODAL_PROCEED_TO_CHECKOUT_BTN).click()

    cy.get(PRODUCT_ID_PREFIX)
      .first()
      .within(() => {
        cy.checkElemText(
          ".cart_description > .product-name",
          "Printed Summer Dress"
        )

        cy.checkElemText(PRODUCT_SKU_TEXT, "SKU : demo_5")

        cy.checkElemText(PRODUCT_SIZE_COLOR_TEXT, "Size : M, Color : Blue")

        cy.checkElemText(PRODUCT_AVAILABILITY_TEXT, "In stock")

        cy.checkElemText(PRODUCT_PRICE_TEXT, PRODUCT_PRICE)

        cy.get(".cart_quantity_input")
          .should("be.visible")
          .and("contain.value", "1")

        cy.checkElemText(".cart_total", PRODUCT_PRICE)
      })
  })
})
