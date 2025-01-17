/// <reference types="cypress" />

const userCredentials = require("../../fixtures/user-credentials.json")

const { generateUniqueEmail } = require("../../support/utils")

describe("Smoke test suite", () => {
  it("should load main page successfully", () => {
    cy.visit("")

    cy.url().should("contain", "http://www.automationpractice.pl/index.php")

    cy.get("body").should("be.visible")
  })

  it("should validate user login and logout functionality", () => {
    cy.visit("")

    cy.get(".login").click()

    cy.url().should("contain", "controller=authentication")

    cy.get(".breadcrumb")
      .should("be.visible")
      .and("include.text", "Authentication")

    cy.get(".page-heading")
      .should("be.visible")
      .and("include.text", "Authentication")

    cy.get("#login_form")
      .should("be.visible")
      .within(() => {
        cy.get("#email").type(userCredentials.email).blur()
        cy.get(".form_content > :nth-child(1)").should("have.class", "form-ok")
        cy.get("#passwd").type(userCredentials.password).blur()
        cy.get(".form_content > :nth-child(2)").should("have.class", "form-ok")

        cy.get("#SubmitLogin > span").contains("Sign in").click()
      })

    cy.url().should("contain", "controller=my-account")

    cy.get(".breadcrumb").should("be.visible").and("include.text", "My account")

    cy.get(".page-heading")
      .should("be.visible")
      .and("include.text", "My account")

    cy.get(".info-account")
      .should("be.visible")
      .and(
        "include.text",
        "Welcome to your account. Here you can manage all of your personal information and orders."
      )

    cy.get(".logout")
      .should("be.visible")
      .and("include.text", "Sign out")
      .click()

    cy.url().should("contain", "controller=authentication")

    cy.get(".breadcrumb")
      .should("be.visible")
      .and("include.text", "Authentication")

    cy.get(".page-heading")
      .should("be.visible")
      .and("include.text", "Authentication")
  })

  it("should ensure product search returns relevant results", () => {
    cy.visit("")

    cy.get("#search_query_top")
      .should("be.visible")
      .type("Printed Summer Dress")

    cy.get("#searchbox > .btn").should("be.visible").click()

    cy.url().should("contain", "controller=search")

    cy.get(".breadcrumb").should("be.visible").and("include.text", "Search")

    cy.get(".page-heading")
      .should("be.visible")
      .and("include.text", '"Printed Summer Dress"')

    cy.get(".product-container")
      .should("have.length", 3)
      .each(($el) => {
        cy.get($el).within(() => {
          cy.get(".product-name").should("contain.text", "Dress")
        })
      })
  })

  it("should confirm adding a product to the shopping cart", () => {
    cy.visit("")

    cy.get(".sf-menu").contains("Women").click()

    cy.get(".product-container .product_img_link").eq(3).click("top")

    cy.url().should("contain", "controller=product")

    cy.get("#bigpic").should("be.visible")

    cy.get("h1").should("be.visible")

    cy.get("#product_reference").should("be.visible")

    cy.get("#product_condition").should("be.visible")

    cy.get("#short_description_content ").should("be.visible")

    cy.get("#group_1").select("M")

    cy.wait(500)

    cy.get("#color_24").click()

    cy.get("#add_to_cart > .exclusive").contains("Add to cart").click()

    cy.get("#layer_cart")
      .should("be.visible")
      .within(() => {
        cy.get(".continue > span").contains("Continue shopping").click()
      })

    cy.get('[title="View my shopping cart"]')
      .should("contain.text", "1")
      .and("contain.text", "Product")
  })

  it.skip("should verify checkout flow can be accessed and initiated", () => {
    cy.visit("")

    cy.get(".sf-menu").contains("Women").click()

    cy.get(".product-container .product_img_link").eq(3).click("top")

    cy.url().should("contain", "controller=product")

    cy.get("#bigpic").should("be.visible")

    cy.get("h1").should("be.visible")

    cy.get("#product_reference").should("be.visible")

    cy.get("#product_condition").should("be.visible")

    cy.get("#short_description_content ").should("be.visible")

    cy.get("#group_1").select("M")

    cy.wait(500)

    cy.get("#color_24").click()

    cy.get("#add_to_cart > .exclusive").contains("Add to cart").click()

    cy.get(".button-medium > span").contains("Proceed to checkout").click()
  })

  it("should validate navigation to My Account page", () => {
    cy.visit("")

    cy.get(".login").click()

    cy.url().should("contain", "controller=authentication")

    cy.get(".breadcrumb")
      .should("be.visible")
      .and("include.text", "Authentication")

    cy.get(".page-heading")
      .should("be.visible")
      .and("include.text", "Authentication")

    cy.get("#login_form")
      .should("be.visible")
      .within(() => {
        cy.get("#email").type(userCredentials.email).blur()
        cy.get(".form_content > :nth-child(1)").should("have.class", "form-ok")
        cy.get("#passwd").type(userCredentials.password).blur()
        cy.get(".form_content > :nth-child(2)").should("have.class", "form-ok")

        cy.get("#SubmitLogin > span").contains("Sign in").click()
      })

    cy.url().should("contain", "controller=my-account")

    cy.get(".breadcrumb").should("be.visible").and("include.text", "My account")

    cy.get(".page-heading")
      .should("be.visible")
      .and("include.text", "My account")

    cy.get(".info-account")
      .should("be.visible")
      .and(
        "include.text",
        "Welcome to your account. Here you can manage all of your personal information and orders."
      )
  })

  it("should verify Contact Us form submission", () => {
    cy.visit("")

    cy.get("#contact-link > a").click()

    cy.url().should("contain", "controller=contact")

    cy.get(".breadcrumb").should("be.visible").and("include.text", "Contact")

    cy.get(".page-heading")
      .should("be.visible")
      .and("contain.text", "Customer service - Contact us")

    cy.get(".contact-form-box")
      .should("be.visible")
      .and("contain.text", "send a message")

    cy.get("#id_contact").select("Customer service")

    cy.get("#email").type("testuser@gmail.com")

    cy.get("#message").type("Please I need help with the following order...")

    cy.get("#submitMessage > span")
      .should("be.visible")
      .and("contain.text", "Send")
      .click()

    cy.get(".alert")
      .should("be.visible")
      .and(
        "contain.text",
        "Your message has been successfully sent to our team."
      )
  })

  it("should ensure product details display correctly on product detail pages", () => {
    cy.visit("")

    cy.get(".sf-menu").contains("Women").click()

    cy.get(".product-container .product_img_link").eq(3).click("top")

    cy.url().should("contain", "controller=product")

    cy.get("#bigpic").should("be.visible")

    cy.get("h1").should("be.visible")

    cy.get("#product_reference").should("be.visible")

    cy.get("#product_condition").should("be.visible")

    cy.get("#short_description_content ").should("be.visible")

    cy.get("#availability_value").should("be.visible")

    cy.get(".content_prices").should("be.visible")

    cy.get("#group_1").should("exist")

    cy.get("#color_to_pick_list").should("be.visible")
  })

  it("should confirm subscription to newsletter functionality", () => {
    cy.visit("")

    const uniqueEmail = generateUniqueEmail()
    cy.get("#newsletter-input").should("be.visible").type(uniqueEmail)

    cy.get(".form-group > .btn").click()

    cy.get(".alert-success")
      .should("be.visible")
      .and(
        "contain.text",
        " Newsletter : You have successfully subscribed to this newsletter."
      )
  })

  it("should validate footer links redirect to correct pages", () => {
    cy.visit("")

    cy.get("#footer")
      .should("be.visible")
      .within(() => {
        cy.get(".blockcategories_footer")
          .should("be.visible")
          .and("contain.text", "Categories")
          .and("contain.text", "Women")

        cy.get("#block_various_links_footer")
          .should("be.visible")
          .and("contain.text", "Information")
          .and("contain.text", "Our stores")
          .and("contain.text", "Terms and conditions of use")
          .and("contain.text", "About us")

        cy.get(".row > :nth-child(7)")
          .should("be.visible")
          .and("contain.text", "My account")
          .and("contain.text", "My orders")
          .and("contain.text", "My credit slips")
          .and("contain.text", "My addresses")
          .and("contain.text", "My personal info")
      })
  })
})
