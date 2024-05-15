/**
 * Fills the email field in the create account form.
 * @param {Object} userCredentials - User credentials object containing email.
 */

Cypress.Commands.add("fillCreateAccountEmail", (userCredentials) => {
  const { email } = userCredentials

  cy.checkElemText("#create-account_form", "Create an account").within(() => {
    cy.get("#email_create").type(email).blur()

    cy.get(".form-ok").should("be.visible")
    cy.get(".form-error").should("not.exist")

    cy.get("#SubmitCreate > span").click()
  })
})

/**
 * Fills the personal information fields in the create account form.
 * @param {Object} userCredentials - User credentials object containing personal information.
 */

Cypress.Commands.add("fillYourPersonalInfo", (userCredentials) => {
  const { firstName, lastName, password, days, months, years } = userCredentials

  cy.checkElemText(
    "#account-creation_form",
    "Your personal information",
  ).within(() => {
    cy.get("#id_gender1").click()

    cy.get("#customer_firstname").type(firstName).blur()
    cy.get(".form-ok #customer_firstname").should("be.visible")

    cy.get("#customer_lastname").type(lastName).blur()
    cy.get(".form-ok #customer_lastname").should("be.visible")

    cy.get("#passwd").type(password).blur()
    cy.get(".form-ok #passwd").should("be.visible")

    cy.get("#days").select(days)
    cy.get("#months").select(months)
    cy.get("#years").select(years)

    cy.get("#newsletter").click()

    cy.get("#submitAccount > span").click()
  })
})

/**
 * Signs up a user by filling in the create account form and personal information.
 * @param {Object} userCredentials - User credentials object containing email, personal information, etc.
 */

Cypress.Commands.add("signUpUser", (userCredentials) => {
  cy.contains("Sign in").click()

  cy.checkElemText(".breadcrumb", "Authentication")

  cy.fillCreateAccountEmail(userCredentials)

  cy.fillYourPersonalInfo(userCredentials)
})

/**
 * Logs in a user by filling in the login form.
 * @param {Object} userCredentials - User credentials object containing email and password.
 * @param {boolean} testInvalidLogin - Flag to indicate whether to test for an invalid login.
 */

Cypress.Commands.add("loginUser", (userCredentials, testInvalidLogin) => {
  cy.contains("Sign in").click()

  const { email, password } = userCredentials

  cy.get("#email").type(email).blur()
  cy.get(".form-ok #email").should("be.visible")

  cy.get("#passwd").type(password).blur()
  cy.get(".form-ok #passwd").should("be.visible")

  cy.get("#SubmitLogin > span").click()

  if (testInvalidLogin) {
    cy.contains("There is 1 error")
    cy.contains("Authentication failed.")
  } else {
    cy.contains("There is 1 error", { matchCase: false }).should("not.exist")
    cy.contains("Authentication failed.", { matchCase: false }).should(
      "not.exist",
    )
  }
})

/**
 * Searches for a product using the search box.
 * @param {string} productQuery - The query string for the product search.
 */

Cypress.Commands.add("searchProduct", (productQuery) => {
  cy.get("#search_query_top").type(productQuery)
  cy.get("#searchbox > .btn").click()
})

/**
 * Clicks on a navigation section.
 * @param {string} navSection - The navigation section to click (e.g., "women", "dresses", "t-shirts", "blog").
 */

Cypress.Commands.add("clickNavSection", (navSection) => {
  switch (navSection) {
    case "women":
      cy.get(".sf-menu > :nth-child(1)").click()
      break
    case "dresses":
      cy.get(".sf-menu > :nth-child(2)").click()
      break
    case "t-shirts":
      cy.get(".sf-menu > :nth-child(3)").click()
      break
    case "blog":
      cy.get(".sf-menu > :nth-child(4)").click()
      break
    default:
      cy.get(".sf-menu > :nth-child(1)").click()
  }
})

/**
 * Adds a product to the cart.
 * @param {string} productNum - The product number to add (1 = first product, 2 = second product, and so on).
 * @param {string} [color=null] - The color of the product. Defaults to null if not provided.
 * @param {string} [size=null] - The size of the product. Defaults to null if not provided.
 * @param {number} [quantity=null] - The quantity of the product. Defaults to null if not provided.
 */

Cypress.Commands.add(
  "addProductToCart",
  (productNum, color = null, size = null, quantity = null) => {
    cy.url().then((url) => {
      cy.log(url)

      if (
        !url.includes("&controller=category") &&
        !url.includes("&search_query=")
      ) {
        cy.log(url)
        cy.clickNavSection("women")
      }
    })

    const availableProducts = [2, 4, 5, 6, 7]

    cy.get(".product-container")
      .eq(productNum - 1)
      .within(($el) => {
        cy.get(" .right-block > .button-container > .lnk_view > span").click()
      })

    if (size) {
      cy.get("#group_1").select(size)
    }

    if (quantity) {
      cy.get("#quantity_wanted").clear().type(quantity)
    }

    const colorIDs = {
      beige: "#color_7",
      white: "#color_8",
      black: "#color_11",
      orange: "#color_13",
      "sky blue": "#color_14",
      green: "#color_15",
      yellow: "#color_16",
      pink: "#color_24",
    }

    if (color) {
      const selectedColor = colorIDs[color]

      if (!selectedColor)
        throw new Error(`Color ${color} not available for products!`)

      cy.get(selectedColor).click()
    } else {
      cy.get(colorIDs["white"]).click()
    }

    cy.checkElemText(".exclusive > span", "Add to cart").click()
  },
)

/**
 * Removes a product from the cart.
 * @param {string} productNum - The product number to remove (e.g., "1", "2", etc.).
 */

Cypress.Commands.add("removeProductFromCart", (productNum) => {
  // Finding the cart element that contains .cart_ref with text `demo_${productNum}`
  cy.get('[id^="product_"]')
    .contains(".cart_ref", `demo_${productNum}`)
    .closest('[id^="product_"]')
    .then(($element) => {
      // You can now interact with $element or perform further assertions
      cy.wrap($element)
        .should("be.visible")
        .within(() => {
          cy.get(".icon-trash").click()
        })
    })
})

/**
 * Retrieves an element and asserts its text content.
 * @param {string} element - Selector of the element to retrieve.
 * @param {string[]} texts - Expected text content of the element.
 */

Cypress.Commands.add("checkElemText", (element, ...texts) => {
  if (texts.length === 0)
    throw new Error("You need to provide a text to check!")

  cy.get(element)
    .should("be.visible")
    .then(($el) => {
      texts.forEach((text) => {
        cy.wrap($el).should("contain.text", text)
      })
    })
})
