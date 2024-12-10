describe("Search", () => {
  beforeEach(() => {
    cy.visit("http://www.automationpractice.pl/")
  })

  it("should display all the necessary elements", () => {
    cy.get("#searchbox")
      .should("be.visible")
      .within(() => {
        cy.get("#search_query_top").should("be.visible")

        cy.get(".button-search").should("be.visible")
      })
  })

  context(
    "As a customer, I want to be able to search for the products by name, so that I can find them more easily:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")
      })

      it("should display search bar on every page of the shop", () => {
        cy.get("#search_query_top").should("be.visible").should("be.visible")

        cy.get("#block_top_menu").contains("Women").click()

        cy.get("#search_query_top").should("be.visible").should("be.visible")

        cy.get(".sf-menu > :nth-child(2) > .sf-with-ul").click()

        cy.get("#search_query_top").should("be.visible").should("be.visible")

        cy.get(".sf-menu > :nth-child(3) > a").click()

        cy.get("#search_query_top").should("be.visible").should("be.visible")

        cy.get(".nav").contains("Contact us").click()

        cy.get("#search_query_top").should("be.visible").should("be.visible")

        cy.get(".nav").contains("Sign in").click()

        cy.get("#search_query_top").should("be.visible").should("be.visible")

        cy.get('[title="View my shopping cart"]').click({ force: true })

        cy.get("#search_query_top").should("be.visible").should("be.visible")
      })

      it("should display placeholder text on search bar", () => {
        cy.get("#search_query_top")
          .should("be.visible")
          .should("have.attr", "placeholder", "Search")
      })

      it("should display search suggestions and autocomplete text as user types the search", () => {
        cy.get("#search_query_top").type("Summ")
        cy.get(".ac_results")
          .should("be.visible")
          .and("contain.text", "Summer Dresses")

        cy.get("#search_query_top").clear().type("Dress")
        cy.get(".ac_results")
          .should("be.visible")
          .and("contain.text", "Dresses")

        cy.get("#search_query_top").clear().type("Blo")
        cy.get(".ac_results").should("be.visible").and("contain.text", "Blouse")

        cy.get("#search_query_top").clear().type("T-shi")
        cy.get(".ac_results")
          .should("be.visible")
          .and("contain.text", "T-shirt")
      })

      it("should return results for completed and partial word matches", () => {
        cy.get("#search_query_top").type("Summer Dresses")
        cy.get(".ac_results")
          .should("be.visible")
          .and("contain.text", "Summer Dresses")

        cy.get("#search_query_top").clear().type("Dresses")
        cy.get(".ac_results")
          .should("be.visible")
          .and("contain.text", "Dresses")

        cy.get("#search_query_top").clear().type("Blouse")
        cy.get(".ac_results").should("be.visible").and("contain.text", "Blouse")

        cy.get("#search_query_top").clear().type("T-shirt")
        cy.get(".ac_results")
          .should("be.visible")
          .and("contain.text", "T-shirt")
      })
    }
  )

  context(
    "As a customer, I want detailed error messages if no results for my search were found, so that I search for something else:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")
      })

      it("should display error message 'No results were found for your search [searchQuery]' if no results are found", () => {
        cy.get("#search_query_top").type("Blue Jeans")

        cy.get("#searchbox > .btn").click()

        cy.get(".heading-counter")
          .should("be.visible")
          .and("contain.text", "0 results have been found.")

        cy.get(".alert")
          .should("be.visible")
          .and("include.text", "No results were found for your search")
          .and("include.text", "Blue Jeans")

        cy.get("#search_query_top").clear().type("Shorts")

        cy.get("#searchbox > .btn").click()

        cy.get(".alert")
          .should("be.visible")
          .and("include.text", "No results were found for your search")
          .and("include.text", "Shorts")

        cy.get("#search_query_top").clear().type("Socks")

        cy.get("#searchbox > .btn").click()

        cy.get(".alert")
          .should("be.visible")
          .and("include.text", "No results were found for your search")
          .and("include.text", "Socks")
      })
    }
  )

  context(
    "As a customer, I want detailed error messages if I didn't input any text on search field, so that I can search for something else:",
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")
      })

      it("should display error message 'Please enter a search keyword' if search query was empty", () => {
        cy.get("#searchbox > .btn").click()

        cy.get(".heading-counter")
          .should("be.visible")
          .and("have.text", "0 results have been found.")

        cy.get(".alert")
          .should("be.visible")
          .and("include.text", "Please enter a search keyword")
      })
    }
  )
})
