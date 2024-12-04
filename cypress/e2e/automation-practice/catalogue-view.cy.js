describe("Catalogue - View", () => {
  context(
    'As a user I want the catalogue to have a the option to display products in either "grid" or "list" view to see products in the way that better suits me:',
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")
        cy.get(".sf-menu").contains("Women").click()
      })

      it("should display products by default on grid view", () => {
        cy.get(".product_list").should("be.visible").and("have.class", "grid")
      })

      it("should allow user to display products by grid view", () => {
        cy.get(".product_list").should("be.visible")

        cy.get("#list").should("be.visible").click()

        cy.get(".product_list").should("be.visible").and("have.class", "list")

        cy.get("#grid").should("be.visible").click()

        cy.get(".product_list").should("be.visible").and("have.class", "grid")
      })

      it("should allow user to display products by list view", () => {
        cy.get(".product_list").should("be.visible")

        cy.get("#list").should("be.visible").click()

        cy.get(".product_list").should("be.visible").and("have.class", "list")
      })

      it("should remember user view preferences after page reload", () => {
        cy.get("#list").should("be.visible").click()

        cy.get(".product_list").should("be.visible").and("have.class", "list")

        cy.reload()

        cy.get(".product_list").should("be.visible").and("have.class", "list")

        cy.get("#grid").should("be.visible").click()

        cy.get(".product_list").should("be.visible").and("have.class", "grid")

        cy.reload()

        cy.get(".product_list").should("be.visible").and("have.class", "grid")
      })
    }
  )
})
