/// <reference types="cypress" />

describe("Produc Detail Page", () => {
  it("should display all the necessary elements", () => {
    cy.visit("http://www.automationpractice.pl/")

    cy.get("#block_top_menu").contains("Women").click()

    cy.get(
      ".product-container > .left-block > .product-image-container > a.product_img_link"
    )
      .eq(1)
      .click("top") // Click top to avoid Quick View button

    cy.get("#bigpic").should("be.visible")

    cy.get("h1").should("be.visible")

    cy.get("#product_reference").should("be.visible")

    cy.get("#product_condition").should("be.visible")

    cy.get("#short_description_content > p").should("be.visible")

    cy.get("#availability_value").should("be.visible")

    cy.get(".socialsharing_product").should("be.visible")

    cy.get(".sendtofriend").should("be.visible")

    cy.get("#our_price_display").should("be.visible")

    cy.get(":nth-child(2) > .attribute_list").should("be.visible")

    cy.get("#color_to_pick_list").should("be.visible")

    cy.get(".box-security > .img-responsive").should("be.visible")
  })

  context(
    "As a customer, I want to be able to access product detail pages, so that I know all the characteristics of the products:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.get("#block_top_menu").contains("Women").click()
      })

      it("should be able to access product detail page by clicking on product image on catalogue", () => {
        cy.get(
          ".product-container > .left-block > .product-image-container > a.product_img_link"
        )
          .eq(1)
          .click("top") // Click top to avoid Quick View button

        cy.url().should("include", "id_product=2&controller=product")

        cy.get(".breadcrumb").should("include.text", "Women>Blouse")
      })

      it("should be able to access product detail page by clicking on product name on catalogue", () => {
        cy.get(" .product-container .product-name").eq(1).click()

        cy.url().should("include", "id_product=2&controller=product")

        cy.get(".breadcrumb").should("include.text", "Women>Blouse")
      })

      it("should be able to access product detail page by clicking on product 'More' button on catalogue", () => {
        cy.get(".product-container")
          .eq(1)
          .trigger("mouseover")
          .within(() => {
            cy.contains("More").click()
          })

        cy.url().should("include", "id_product=2&controller=product")

        cy.get(".breadcrumb").should("include.text", "Women>Blouse")
      })

      it("should be able to access product detail page by clicking on product colors on catalogue", () => {
        cy.get(".product-container")
          .eq(1)
          .within(() => {
            cy.get("#color_7").should("be.visible").click({ force: true }) // Doesn't work on normal click for some reason
          })

        cy.url().should("include", "id_product=2&controller=product")

        cy.get(".breadcrumb").should("include.text", "Women>Blouse")
      })
    }
  )

  context(
    "As a customer, I want to see the product's name, reference, condition and description, so that I know the state of the product:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.get("#block_top_menu").contains("Women").click()

        cy.get(
          ".product-container > .left-block > .product-image-container > a.product_img_link"
        )
          .eq(1)
          .click("top") // Click top to avoid Quick View button
      })

      it("should display product's name, reference, condition and description", () => {
        cy.get("h1").should("be.visible").and("have.text", "Blouse")

        cy.get("#product_reference")
          .should("be.visible")
          .and("include.text", "Reference:", "demo_2")

        cy.get("#product_condition")
          .should("be.visible")
          .and("include.text", "Condition:", "New product")

        cy.get("#short_description_content > p")
          .should("be.visible")
          .and(
            "have.text",
            "Short sleeved blouse with feminine draped sleeve detail."
          )
      })
    }
  )

  context(
    "As a customer, I want to see if product is in stock or not, so that I can know what I can buy::",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.get("#block_top_menu").contains("Women").click()
      })

      it("should display 'In Stock' text if product is available", () => {
        cy.get(
          ".product-container > .left-block > .product-image-container > a.product_img_link"
        )
          .eq(4)
          .click("top") // Click top to avoid Quick View button
        cy.wait(500)
        cy.get("#group_1").select("M")

        cy.wait(500)
        cy.get("#color_13").click({ force: true })

        cy.get("#availability_value")
          .should("be.visible")
          .and("have.text", "In stock")
      })

      it("should display 'This product is no longer in stock with those attributes but is available with others.' text if product not available", () => {
        cy.get(
          ".product-container > .left-block > .product-image-container > a.product_img_link"
        )
          .eq(4)
          .click("top") // Click top to avoid Quick View button

        cy.get("#availability_value")
          .should("be.visible")
          .and(
            "have.text",
            "This product is no longer in stock with those attributes but is available with others."
          )
      })

      it("should display 'This product is no longer in stock' text if product not available", () => {
        cy.get(
          ".product-container > .left-block > .product-image-container > a.product_img_link"
        )
          .eq(0)
          .click("top") // Click top to avoid Quick View button

        cy.get("#availability_value")
          .should("be.visible")
          .and("have.text", "This product is no longer in stock")
      })
    }
  )

  context(
    "As a customer, I want to see how many items of each product in stock are available so I can know when to order:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.get("#block_top_menu").contains("Women").click()

        cy.get(
          ".product-container > .left-block > .product-image-container > a.product_img_link"
        )
          .eq(4)
          .click("top") // Click top to avoid Quick View button

        cy.wait(500)
        cy.get("#group_1").select("M")

        cy.wait(500)
        cy.get("#color_13").click({ force: true })
      })

      it("should display number of items available if product is in stock", () => {
        cy.get("#quantityAvailable")
          .should("be.visible")
          .invoke("text")
          .then((text) => {
            // Check if the text matches a positive integer
            expect(text.trim()).to.match(/^\d+$/)
          })

        cy.get("#quantityAvailableTxtMultiple")
          .should("be.visible")
          .and("have.text", "Items")
      })
    }
  )

  context(
    "As a customer, I want to see social buttons, so that I can share products I like with my friends:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.get("#block_top_menu").contains("Women").click()

        cy.get(
          ".product-container > .left-block > .product-image-container > a.product_img_link"
        )
          .eq(1)
          .click("top") // Click top to avoid Quick View button
      })

      it("should display social buttons for twitter, fb, google+ and pinterest", () => {
        cy.get(".socialsharing_product")
          .should("be.visible")
          .within(() => {
            cy.get(".btn-twitter").should("be.visible")
            cy.get(".btn-facebook").should("be.visible")
            cy.get(".btn-google-plus").should("be.visible")
            cy.get(".btn-pinterest").should("be.visible")
          })
      })
    }
  )

  context(
    "As a customer, I want to see 'Send to a friend' button, so that I can email a friend this product:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.get("#block_top_menu").contains("Women").click()

        cy.get(
          ".product-container > .left-block > .product-image-container > a.product_img_link"
        )
          .eq(1)
          .click("top") // Click top to avoid Quick View button
      })

      it("should display 'Send to a friend' button", () => {
        cy.get("#send_friend_button")
          .should("be.visible")
          .and("include.text", "Send to a friend")
      })
    }
  )

  context(
    "As a customer, I want to see 'Print' button, so that I can print this product detail page:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.get("#block_top_menu").contains("Women").click()

        cy.get(
          ".product-container > .left-block > .product-image-container > a.product_img_link"
        )
          .eq(1)
          .click("top") // Click top to avoid Quick View button
      })

      it("should display 'Print' button", () => {
        cy.get(".print > a").should("be.visible").and("include.text", "Print")
      })
    }
  )

  context(
    "As a customer, I want to see a data sheet of product information such as compositions, styles, properties, so that I can know the features of the product:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.get("#block_top_menu").contains("Women").click()

        cy.get(
          ".product-container > .left-block > .product-image-container > a.product_img_link"
        )
          .eq(1)
          .click("top") // Click top to avoid Quick View button
      })

      it("should display data sheet displaying product composition, styles and properties", () => {
        cy.get('[itemtype="http://schema.org/Product"] > :nth-child(2)')
          .should("be.visible")
          .and(
            "include.text",
            "Data sheet",
            "Compositions",
            "Cotton",
            "Styles",
            "Casual",
            "Properties",
            "Short Sleeve"
          )
      })
    }
  )

  context(
    "As a customer, I want to see the product's price, so that I can know how much I will be charged:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.get("#block_top_menu").contains("Women").click()

        cy.get(
          ".product-container > .left-block > .product-image-container > a.product_img_link"
        )
          .eq(1)
          .click("top") // Click top to avoid Quick View button
      })

      it("should display product price", () => {
        cy.get("#our_price_display")
          .should("be.visible")
          .and("include.text", "$27")
      })
    }
  )

  context(
    "As a customer, I want to see the product's discount in case it has one, so that I can know how much I will be charged:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.get("#block_top_menu").contains("Women").click()

        cy.get(
          ".product-container > .left-block > .product-image-container > a.product_img_link"
        )
          .eq(4)
          .click("top") // Click top to avoid Quick View button

        cy.wait(500)
        cy.get("#group_1").select("M")

        cy.wait(500)
        cy.get("#color_13").click({ force: true })
      })

      it("should display product discount", () => {
        cy.get("#reduction_percent_display")
          .should("be.visible")
          .and("include.text", "-5%")
      })

      it("should display product price after discount", () => {
        cy.get("#our_price_display")
          .should("be.visible")
          .and("include.text", "$29")
      })
    }
  )

  context(
    "As a customer, I want to see the product quantity and controls to increase or decrease it, so that I can select as many products as I want:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.get("#block_top_menu").contains("Women").click()

        cy.get(
          ".product-container > .left-block > .product-image-container > a.product_img_link"
        )
          .eq(4)
          .click("top") // Click top to avoid Quick View button

        cy.wait(500)
        cy.get("#group_1").select("M")

        cy.wait(500)
        cy.get("#color_13").click({ force: true })
      })

      it("should display product quantity", () => {
        cy.get("#quantity_wanted").should("be.visible").and("have.value", 1)
      })

      it("should allow the user to increase the product quantity", () => {
        cy.get("#quantity_wanted").should("be.visible").and("have.value", 1)

        cy.get(".button-plus > span").should("be.visible").click()

        cy.get("#quantity_wanted").should("be.visible").and("have.value", 2)
      })

      it("should allow the user to decrease the product quantity", () => {
        cy.get("#quantity_wanted").should("be.visible").and("have.value", 1)

        cy.get(".button-plus > span").should("be.visible").click()

        cy.get("#quantity_wanted").should("be.visible").and("have.value", 2)

        cy.get(".button-minus > span").should("be.visible").click()

        cy.get("#quantity_wanted").should("be.visible").and("have.value", 1)
      })
    }
  )

  context(
    "As a customer, I want to see the product size and controls to increase or decrease it, so that I can select the product best fitted to me:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")

        cy.get("#block_top_menu").contains("Women").click()

        cy.get(
          ".product-container > .left-block > .product-image-container > a.product_img_link"
        )
          .eq(1)
          .click("top") // Click top to avoid Quick View button
      })

      it("should display product size", () => {
        cy.get("select#group_1").should("include.text", "S")
      })

      it("should allow the user to increase the product size", () => {
        cy.get("select#group_1").select("M").should("include.text", "M")
      })

      it("should allow the user to decrease the product size", () => {
        cy.get("select#group_1").select("L").should("include.text", "L")

        cy.get("select#group_1").select("S").should("include.text", "S")
      })
    }
  )

  context("Product Detail Page (PDP) - EP test cases", () => {
    beforeEach(() => {
      cy.visit("http://www.automationpractice.pl/")

      cy.get("#block_top_menu").contains("Women").click()

      cy.get(
        ".product-container > .left-block > .product-image-container > a.product_img_link"
      )
        .eq(4)
        .click("top") // Click top to avoid Quick View button

      cy.get("#group_1").should("exist")

      cy.wait(500)

      cy.get("#group_1").select("L")
    })

    it("should consider setting a product quantity of a minus number as invalid", () => {
      cy.get("#quantity_wanted").clear().type("-1").blur()

      cy.get("#quantity_wanted")
        .should("have.value", "-1")
        .and("have.css", "border", "1px solid rgb(255, 0, 0)")
    })

    it("should consider setting a product quantity of a 0 number as invalid", () => {
      cy.get("#quantity_wanted").clear().type("0").blur()

      cy.get("#quantity_wanted")
        .should("have.value", "0")
        .and("have.css", "border", "1px solid rgb(255, 0, 0)")

      cy.get(".exclusive > span").click()

      cy.get(".fancybox-error")
        .should("be.visible")
        .and("include.text", "Null quantity.")
    })

    it("should consider setting a product quantity higher than the product's available stock as invalid", () => {
      cy.get("#quantity_wanted").clear().type("5000").blur()

      cy.get("#quantity_wanted").should("have.value", "5000")

      cy.get(".exclusive > span").click()

      cy.get(".fancybox-error")
        .should("be.visible")
        .and("include.text", "There isn't enough product in stock.")
    })

    it("should consider setting a product quantity of higher than 0 is less than product's available stock as valid", () => {
      cy.get("#quantity_wanted").clear().type("100").blur()

      cy.get("#quantity_wanted").should("have.value", "100")

      cy.get(".exclusive > span").click()

      cy.get(".layer_cart_product")
        .should("be.visible")
        .and("include.text", "Product successfully added to your shopping cart")
    })
  })

  context("Product Detail Page (PDP) - BVA test cases", () => {
    beforeEach(() => {
      cy.visit("http://www.automationpractice.pl/")

      cy.get("#block_top_menu").contains("Women").click()

      cy.get(
        ".product-container > .left-block > .product-image-container > a.product_img_link"
      )
        .eq(4)
        .click("top") // Click top to avoid Quick View button

      cy.get("#group_1").should("exist")

      cy.wait(500)

      cy.get("#group_1").select("L")
    })

    it("should have boundary for invalid quantity partition at 0", () => {
      cy.get("#quantity_wanted").clear().type("0").blur()

      cy.get("#quantity_wanted")
        .should("have.value", "0")
        .and("have.css", "border", "1px solid rgb(255, 0, 0)")

      cy.get(".exclusive > span").click()

      cy.get(".fancybox-error")
        .should("be.visible")
        .and("include.text", "Null quantity.")
    })

    it("should have lower boundary for valid quantity partition at 1", () => {
      cy.get("#quantity_wanted").clear().type("1").blur()

      cy.get("#quantity_wanted").should("have.value", "1")

      cy.get(".exclusive > span").click()

      cy.get(".layer_cart_product")
        .should("be.visible")
        .and("include.text", "Product successfully added to your shopping cart")
    })

    it("should have upper boundary for valid quantity partition at 'amount available in stock'", () => {
      cy.get("#quantityAvailable").then(($el) => {
        const amountAvailableInStock = $el.text().trim()

        cy.get("#quantity_wanted").clear().type(amountAvailableInStock).blur()

        cy.get("#quantity_wanted").should("have.value", amountAvailableInStock)

        cy.get(".exclusive > span").click()

        cy.get(".layer_cart_product")
          .should("be.visible")
          .and(
            "include.text",
            "Product successfully added to your shopping cart"
          )
      })
    })

    it("should have boundary for invalid quantity partition at 'amount available in stock' + 1", () => {
      cy.get("#quantityAvailable").then(($el) => {
        const amountAvailableInStock = $el.text().trim()

        cy.get("#quantity_wanted")
          .clear()
          .type(amountAvailableInStock + 1)
          .blur()

        cy.get("#quantity_wanted").should(
          "have.value",
          amountAvailableInStock + 1
        )

        cy.get(".exclusive > span").click()

        cy.get(".fancybox-error")
          .should("be.visible")
          .and("include.text", "There isn't enough product in stock.")
      })
    })
  })
})
