describe("Catalogue - Selection Tree", () => {
  context(
    "As a customer, I want the catalogue to display products, so that I can see which products are available:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")
      })

      it("should display products containers in catalogue", () => {
        cy.get(".sf-menu").contains("Women").click()

        cy.get(".heading-counter")
          .should("be.visible")
          .and("have.text", "There are 7 products.")

        cy.get(".top-pagination-content > .product-count")
          .should("be.visible")
          .and("include.text", "Showing 1 - 7 of 7 items")

        cy.get(".sf-menu").contains("Dresses").click({ force: true })

        cy.get(".heading-counter")
          .should("be.visible")
          .and("have.text", "There are 5 products.")

        cy.get(".top-pagination-content > .product-count")
          .should("be.visible")
          .and("include.text", "Showing 1 - 5 of 5 items")

        cy.get(".sf-menu > :nth-child(3) > a").click({ force: true })

        cy.get(".heading-counter")
          .should("be.visible")
          .and("have.text", "There is 1 product.")

        cy.get(".top-pagination-content > .product-count")
          .should("be.visible")
          .and("include.text", "Showing 1 - 1 of 1 item")
      })
    }
  )
  context(
    "As a customer, I want the catalogue to have a 'selection tree', so that I can navigate to different sections of the catalogue more easily:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")
      })

      it("should display selection tree and allow user to navigate to different catalogue sections", () => {
        cy.get(".sf-menu").contains("Women").click()

        cy.get("#categories_block_left")
          .should("be.visible")
          .within(() => {
            cy.get(".title_block")
              .should("be.visible")
              .and("contain.text", "Women")

            cy.get(
              '.tree > :nth-child(1) > [href="http://www.automationpractice.pl/index.php?id_category=4&controller=category"]'
            )
              .should("be.visible")
              .and("contain.text", "Tops")

            cy.get(".block_content > .tree > :nth-child(1) > .grower")
              .should("be.visible")
              .click()

            cy.get(
              ".block_content > .tree > :nth-child(1) > ul > :nth-child(1) > a"
            )
              .should("be.visible")
              .and("contain.text", "T-shirt")
            cy.get(".block_content > .tree > :nth-child(1) > ul > .last > a")
              .should("be.visible")
              .and("contain.text", "Blouses")

            cy.get(
              '.tree > :nth-child(2) > [href="http://www.automationpractice.pl/index.php?id_category=8&controller=category"]'
            )
              .should("be.visible")
              .and("contain.text", "Dresses")

            cy.get(".tree > :nth-child(2) > .grower")
              .should("be.visible")
              .click()

            cy.get(".tree > :nth-child(2) > ul > :nth-child(1) > a")
              .should("be.visible")
              .and("contain.text", "Casual Dresses")

            cy.get(".tree > :nth-child(2) > ul > :nth-child(2) > a")
              .should("be.visible")
              .and("contain.text", "Evening Dresses")

            cy.get(".tree > :nth-child(2) > ul > :nth-child(3) > a")
              .should("be.visible")
              .and("contain.text", "Summer Dresses")
          })
      })
    }
  )
})
