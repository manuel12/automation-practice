describe("Catalogue - Filters", () => {
  context(
    "As a customer, I want the catalogue to have a 'Categories' filter, so that I can find products more easily:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")
        cy.get(".sf-menu").contains("Women").click()
      })

      it("should allow user to filter products by category", () => {
        // Create array of tops
        const tops = ["Faded Short Sleeve T-shirts", "Blouse"]

        // Filter products
        cy.get("#layered_category_4").click()

        // Check the names of the remaining products only show tops
        cy.get("#enabled_filters")
          .should("be.visible")
          .then(() => {
            cy.get(
              ".product-container > .right-block > h5 > .product-name"
            ).each(($el) => {
              const text = $el.text().trim()
              cy.log(text)

              // Assert that the text is included in the tops array
              expect(tops).to.include(
                text,
                `${text} should be in the tops array`
              )
            })
          })

        // Uncheck Tops filter and check dresses filters
        cy.get("#layered_category_4").click()
        cy.get("#enabled_filters").should("not.exist")

        cy.get("#layered_category_8").click()

        // Check the names of the products are not found in Tops array
        cy.get("#enabled_filters")
          .should("be.visible")
          .then(() => {
            cy.get(
              ".product-container > .right-block > h5 > .product-name"
            ).each(($el) => {
              const text = $el.text().trim()
              cy.log(text)

              // Assert that the text is included in the tops array
              expect(tops).to.not.include(
                text,
                `${text} should NOT be in the tops array`
              )
            })
          })
      })
    }
  )

  context(
    "As a customer, I want the catalogue to have a 'Size' filter, so that I can find products more easily:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")
        cy.get(".sf-menu").contains("Women").click()
      })

      it("should allow user to filter products by size", () => {
        // Click on S filter
        cy.get("#layered_id_attribute_group_1").click()
        cy.get("#enabled_filters").should("be.visible")

        // Check there are 7 items shown
        cy.get(".product-container").should("have.length", 7)

        // Unclick on S filter and click on M filter
        cy.get("#layered_id_attribute_group_1").click()
        cy.get("#enabled_filters").should("not.exist")

        cy.get("#layered_id_attribute_group_2").click()
        cy.get("#enabled_filters").should("be.visible")

        // Check there are 7 items shown
        cy.get(".product-container").should("have.length", 7)

        // Unclick on M filter and click on L filter
        cy.get("#layered_id_attribute_group_2").click()
        cy.get("#enabled_filters").should("not.exist")

        cy.get("#layered_id_attribute_group_3").click()
        cy.get("#enabled_filters").should("be.visible")

        // Check there are 7 items shown
        cy.get(".product-container").should("have.length", 7)
      })
    }
  )

  context(
    "As a customer, I want the catalogue to have a 'Color' filter, so that I can find products more easily:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")
        cy.get(".sf-menu").contains("Women").click()
      })

      it("should allow user to filter products by color", () => {
        // Click on Beige filter
        cy.get("#layered_id_attribute_group_7").click()
        cy.get("#enabled_filters").should("be.visible")

        // Check there are 1 products present
        cy.get(".product-container").should("have.length", 1)

        cy.get("#layered_id_attribute_group_7").click()
        cy.get("#enabled_filters").should("not.exist")

        // Click on White filter
        cy.get("#layered_id_attribute_group_8").click()
        cy.get("#enabled_filters").should("be.visible")

        // Check there are 2 product present
        cy.get(".product-container").should("have.length", 2)

        cy.get("#layered_id_attribute_group_8").click()
        cy.get("#enabled_filters").should("not.exist")

        // Click on Black filter
        cy.get("#layered_id_attribute_group_11").click()
        cy.get("#enabled_filters").should("be.visible")

        // Check there are 2 products present
        cy.get(".product-container").should("have.length", 2)

        cy.get("#layered_id_attribute_group_11").click()
        cy.get("#enabled_filters").should("not.exist")

        // Click on Orange filter
        cy.get("#layered_id_attribute_group_13").click()
        cy.get("#enabled_filters").should("be.visible")

        // Check there are 3 products present
        cy.get(".product-container").should("have.length", 3)

        cy.get("#layered_id_attribute_group_13").click()
        cy.get("#enabled_filters").should("not.exist")

        // Click on Blue filter
        cy.get("#layered_id_attribute_group_14").click()
        cy.get("#enabled_filters").should("be.visible")

        // Check there are 2 products present
        cy.get(".product-container").should("have.length", 2)

        cy.get("#layered_id_attribute_group_14").click()
        cy.get("#enabled_filters").should("not.exist")

        // Click on Green filter
        cy.get("#layered_id_attribute_group_15").click()
        cy.get("#enabled_filters").should("be.visible")

        // Check there are 1 products present
        cy.get(".product-container").should("have.length", 1)

        cy.get("#layered_id_attribute_group_15").click()
        cy.get("#enabled_filters").should("not.exist")

        // Click on Yellow filter
        cy.get("#layered_id_attribute_group_16").click()
        cy.get("#enabled_filters").should("be.visible")

        // Check there are 3 products present
        cy.get(".product-container").should("have.length", 3)

        cy.get("#layered_id_attribute_group_16").click()
        cy.get("#enabled_filters").should("not.exist")

        // Click on Pink filter
        cy.get("#layered_id_attribute_group_24").click()
        cy.get("#enabled_filters").should("be.visible")

        // Check there are 1 products present
        cy.get(".product-container").should("have.length", 1)

        cy.get("#layered_id_attribute_group_24").click()
        cy.get("#enabled_filters").should("not.exist")
      })
    }
  )

  context(
    "As a customer, I want the catalogue to have a 'Properties' filter, so that I can find products more easily:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")
        cy.get(".sf-menu").contains("Women").click()
      })

      it("should allow user to filter products by properties", () => {
        // Click on Colorful Dress filter
        cy.get("#layered_id_feature_18").click()
        cy.get("#enabled_filters").should("be.visible")

        // Check there are 1 products present
        cy.get(".product-container").should("have.length", 1)

        cy.get("#layered_id_feature_18").click()
        cy.get("#enabled_filters").should("not.exist")

        // Click on Maxi Dress filter
        cy.get("#layered_id_feature_21").click()
        cy.get("#enabled_filters").should("be.visible")

        // Check there are 1 product present
        cy.get(".product-container").should("have.length", 1)

        cy.get("#layered_id_feature_21").click()
        cy.get("#enabled_filters").should("not.exist")

        // Click on Midi Dress filter
        cy.get("#layered_id_feature_20").click()
        cy.get("#enabled_filters").should("be.visible")

        // Check there are 1 products present
        cy.get(".product-container").should("have.length", 1)

        cy.get("#layered_id_feature_20").click()
        cy.get("#enabled_filters").should("not.exist")

        // Click on Short Dress filter
        cy.get("#layered_id_feature_19").click()
        cy.get("#enabled_filters").should("be.visible")

        // Check there are 2 products present
        cy.get(".product-container").should("have.length", 2)

        cy.get("#layered_id_feature_19").click()
        cy.get("#enabled_filters").should("not.exist")

        // Click on Short Sleeve filter
        cy.get("#layered_id_feature_17").click()
        cy.get("#enabled_filters").should("be.visible")

        // Check there are 2 products present
        cy.get(".product-container").should("have.length", 2)

        cy.get("#layered_id_feature_17").click()
        cy.get("#enabled_filters").should("not.exist")
      })
    }
  )

  context(
    "As a customer, I want the catalogue to have a 'Compositions' filter, so that I can find products more easily:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")
        cy.get(".sf-menu").contains("Women").click()
      })

      it("should allow user to filter products by compositions", () => {
        // Click on Cotton filter
        cy.get("#layered_id_feature_5").click()
        cy.get("#enabled_filters").should("be.visible")

        // Check there are 3 products present
        cy.get(".product-container").should("have.length", 3)

        cy.get("#layered_id_feature_5").click()
        cy.get("#enabled_filters").should("not.exist")

        // Click on Polyester filter
        cy.get("#layered_id_feature_1").click()
        cy.get("#enabled_filters").should("be.visible")

        // Check there are 2 product present
        cy.get(".product-container").should("have.length", 2)

        cy.get("#layered_id_feature_1").click()
        cy.get("#enabled_filters").should("not.exist")

        // Click on Viscose filter
        cy.get("#layered_id_feature_3").click()
        cy.get("#enabled_filters").should("be.visible")

        // Check there are 2 products present
        cy.get(".product-container").should("have.length", 2)
      })
    }
  )

  context(
    "As a customer, I want the catalogue to have a 'Styles' filter, so that I can find products more easily:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")
        cy.get(".sf-menu").contains("Women").click()
      })

      it("should allow user to filter products by styles", () => {
        // Click on Casual filter
        cy.get("#layered_id_feature_11").click()
        cy.get("#enabled_filters").should("be.visible")

        // Check there are 3 products present
        cy.get(".product-container").should("have.length", 3)

        cy.get("#layered_id_feature_11").click()
        cy.get("#enabled_filters").should("not.exist")

        // Click on Dressy filter
        cy.get("#layered_id_feature_16").click()
        cy.get("#enabled_filters").should("be.visible")

        // Check there are 1 product present
        cy.get(".product-container").should("have.length", 1)

        cy.get("#layered_id_feature_16").click()
        cy.get("#enabled_filters").should("not.exist")

        // Click on Girly filter
        cy.get("#layered_id_feature_13").click()
        cy.get("#enabled_filters").should("be.visible")

        // Check there are 3 products present
        cy.get(".product-container").should("have.length", 3)
      })
    }
  )

  context(
    "As a customer, I want the catalogue to have a 'Availability' filter, so that I can find products more easily:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")
        cy.get(".sf-menu").contains("Women").click()
      })

      it("should allow user to filter products by availability", () => {
        // Click on Not available filter
        cy.get("#layered_quantity_0").click()
        cy.get("#enabled_filters").should("be.visible")

        // Check there are 2 products present
        cy.get(".product-container").should("have.length", 2)

        cy.get("#layered_quantity_0").click()
        cy.get("#enabled_filters").should("not.exist")

        // Click on In stock filter
        cy.get("#layered_quantity_1").click()
        cy.get("#enabled_filters").should("be.visible")

        // Check there are 5 products present
        cy.get(".product-container").should("have.length", 5)
      })
    }
  )

  context(
    "As a customer, I want the catalogue to have a 'Condition' filter, so that I can find products more easily:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")
        cy.get(".sf-menu").contains("Women").click()
      })

      it("should allow user to filter products by condition", () => {
        // Click on New condition filter
        cy.get("#layered_condition_new").click()
        cy.get("#enabled_filters").should("be.visible")
      })
    }
  )

  context(
    "As a customer, I want the catalogue to have a 'Price' filter, so that I can find products more easily:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")
        cy.get(".sf-menu").contains("Women").click()
      })

      it("should allow user to filter products by price", () => {
        // Slide price range to display $16-$30
        cy.get(".ui-slider-handle")
          .eq(1)
          .trigger("mousedown", { which: 1, pageX: 300, pageY: 0 })
          .trigger("mousemove", { which: 1, pageX: 150, pageY: 0 })
          .trigger("mouseup", { force: true })

        cy.get(".product-container").should("have.length", 5)

        // Slide price range to display $30-$53
        cy.get(".ui-slider-handle")
          .first()
          .trigger("mousedown", { which: 1, pageX: 0, pageY: 0 })
          .trigger("mousemove", { which: 1, pageX: 190, pageY: 0 })
          .trigger("mouseup", { force: true })

        cy.wait(1000)
        cy.get(".ui-slider-handle")
          .eq(1)
          .trigger("mousedown", { which: 1, pageX: 150, pageY: 0 })
          .trigger("mousemove", { which: 1, pageX: 300, pageY: 0 })
          .trigger("mouseup", { force: true })

        cy.get(".product-container").should("have.length", 2)
      })
    }
  )
})
