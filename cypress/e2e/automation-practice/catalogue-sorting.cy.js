describe("Catalogue - Sorting", () => {
  context(
    'As a user I want the catalogue to have a sorting by "lowest price first" so that I can check products more easily:',
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")
        cy.get(".sf-menu").contains("Women").click()
      })

      it("should allow user to filter products by lowest price first", () => {
        cy.get("#selectProductSort").select("Price: Lowest first")

        cy.get(".content_price > .price").then(($prices) => {
          // Extract the text and convert to an array of numbers
          let priceValues = $prices
            .map((_, el) => parseFloat(el.textContent.replace("$", "").trim()))
            .get()

          // Remove duplicates
          priceValues = Array.from(new Set(priceValues))

          // Verify the array is sorted in ascending order
          const isSorted = priceValues.every(
            (currentValue, currentIndex, array) => {
              const previousValue = array[currentIndex - 1]
              return currentIndex === 0 || previousValue <= currentValue
            }
          )

          expect(isSorted).to.be.true
        })
      })
    }
  )

  context(
    'As a user I want the catalogue to have a sorting by "highest price first" so that I can check products more easily:',
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")
        cy.get(".sf-menu").contains("Women").click()
      })

      it("should allow user to filter products by highest price first", () => {
        cy.get("#selectProductSort").select("Price: Highest first")

        cy.get(".content_price > .price").then(($prices) => {
          // Extract the text and convert to an array of numbers
          let priceValues = $prices
            .map((_, el) => parseFloat(el.textContent.replace("$", "").trim()))
            .get()

          // Remove duplicates
          priceValues = Array.from(new Set(priceValues))

          // Verify the array is sorted in ascending order
          const isSortedDescending = priceValues.every(
            (currentValue, currentIndex, array) => {
              const previousValue = array[currentIndex - 1]
              return currentIndex === 0 || previousValue >= currentValue
            }
          )

          expect(isSortedDescending).to.be.true
        })
      })
    }
  )

  context(
    'As a user I want the catalogue to have a sorting by "product name: A to Z" so that I can check products more easily:',
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")
        cy.get(".sf-menu").contains("Women").click()
      })

      it("should allow user to filter products by A to Z", () => {
        cy.get("#selectProductSort").select("Product Name: A to Z")

        cy.get(" .product-container > .right-block > h5 > .product-name").then(
          ($names) => {
            // Extract text from elements and convert to an array
            const productNames = $names
              .map((_, el) => el.textContent.trim())
              .get()

            // Check if the names are sorted alphabetically
            const isSorted = productNames.every(
              (currentValue, currentIndex, array) => {
                const previousValue = array[currentIndex - 1]
                return (
                  currentIndex === 0 ||
                  previousValue.localeCompare(currentValue) <= 0
                )
              }
            )

            expect(isSorted).to.be.true
          }
        )
      })
    }
  )

  context(
    'As a user I want the catalogue to have a sorting by "product name: Z to A" so that I can check products more easily:',
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")
        cy.get(".sf-menu").contains("Women").click()
      })

      it("should allow user to filter products by Z to A", () => {
        cy.get("#selectProductSort").select("Product Name: Z to A")

        cy.get(" .product-container > .right-block > h5 > .product-name").then(
          ($names) => {
            // Extract text from elements and convert to an array
            const productNames = $names
              .map((_, el) => el.textContent.trim())
              .get()

            // Check if the names are sorted Z to A
            const isSortedDescending = productNames.every(
              (currentValue, currentIndex, array) => {
                const previousValue = array[currentIndex - 1]
                return (
                  currentIndex === 0 ||
                  previousValue.localeCompare(currentValue) >= 0
                )
              }
            )

            expect(isSortedDescending).to.be.true
          }
        )
      })
    }
  )

  context(
    'As a user I want the catalogue to have a sorting by "In Stock" so that I can check products more easily:',
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")
        cy.get(".sf-menu").contains("Women").click()
      })

      it.skip("should allow user to filter products by In Stock", () => {
        cy.get("#selectProductSort").select("In stock")
      })
    }
  )

  context(
    'As a user I want the catalogue to have a sorting by "lowest reference first" so that I can check products more easily:',
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")
        cy.get(".sf-menu").contains("Women").click()
      })

      it("should allow user to filter products by lowest reference first", () => {
        cy.get("#selectProductSort").select("Reference: Lowest first")

        // Get all products array
        cy.get("a.product_img_link").then(($elements) => {
          // Extract the href attribute of each element into an array
          const hrefArray = $elements
            .map((_, el) => {
              const href = el.getAttribute("href") // Get href
              const match = href.match(/id_product=(\d+)/) // Extract id_product number
              return match ? parseInt(match[1], 10) : null // Return the number or null
            })
            .get()
            .filter((id) => id !== null) // Remove null values

          const isSorted = hrefArray.every(
            (currentValue, currentIndex, array) => {
              const previousValue = array[currentIndex - 1]
              return currentIndex === 0 || previousValue <= currentValue
            }
          )

          expect(isSorted).to.be.true
        })
      })
    }
  )

  context(
    'As a user I want the catalogue to have a sorting by "highest reference first" so that I can check products more easily:',
    () => {
      beforeEach(() => {
        cy.visit("http://www.automationpractice.pl/")
        cy.get(".sf-menu").contains("Women").click()
      })

      it("should allow user to filter products by highest reference first", () => {
        cy.get("#selectProductSort").select("Reference: Highest first")

        // Get all products array
        cy.get("a.product_img_link").then(($elements) => {
          // Extract the href attribute of each element into an array
          const hrefArray = $elements
            .map((_, el) => {
              const href = el.getAttribute("href") // Get href
              const match = href.match(/id_product=(\d+)/) // Extract id_product number
              return match ? parseInt(match[1], 10) : null // Return the number or null
            })
            .get()
            .filter((id) => id !== null) // Remove null values

          const isSorted = hrefArray.every(
            (currentValue, currentIndex, array) => {
              const previousValue = array[currentIndex - 1]
              return currentIndex === 0 || previousValue >= currentValue
            }
          )

          expect(isSorted).to.be.true
        })
      })
    }
  )
})
