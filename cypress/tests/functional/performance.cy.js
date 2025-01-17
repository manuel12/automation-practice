/// <reference types="cypress" />

function getPerformanceMetric(win, startMark, endMark) {
  return win.performance.timing[endMark] - win.performance.timing[startMark]
}

describe("Performance Testing Suite", () => {
  it("should load the page in less than 2 seconds", () => {
    cy.visit("/")
    cy.window().then((win) => {
      const loadTime = getPerformanceMetric(
        win,
        "navigationStart",
        "domContentLoadedEventEnd"
      )
      console.log(loadTime)
      expect(loadTime).to.be.lessThan(2000)
    })
  })
})
