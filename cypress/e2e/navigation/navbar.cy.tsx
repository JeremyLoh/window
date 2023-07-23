describe("navbar", () => {
  const homepageUrl = Cypress.config().baseUrl + "/"
  const exchangeUrl = "/exchange"
  const lifeUrl = "/life"
  const bugTrackerUrl = "/bugTracker"

  function getNavbar() {
    return cy.get("#navbar")
  }

  describe("exchange page", () => {
    it("should navigate to homepage when navbar app name is clicked", () => {
      cy.visit(exchangeUrl)
      getNavbar().should("be.visible")
      cy.url().should("include", exchangeUrl)
      getNavbar().contains("Window").click()
      cy.url().should("eq", homepageUrl)
    })
  })

  describe("life page", () => {
    it("should navigate to homepage when navbar app name is clicked", () => {
      cy.visit(lifeUrl)
      getNavbar().should("be.visible")
      cy.url().should("include", lifeUrl)
      getNavbar().contains("Window").click()
      cy.url().should("eq", homepageUrl)
    })
  })

  describe("bug tracker page", () => {
    it("should navigate to bug tracker when navbar app name is clicked", () => {
      cy.visit(bugTrackerUrl)
      getNavbar().should("be.visible")
      cy.url().should("include", bugTrackerUrl)
      getNavbar().contains("Bug Tracker").click()
      cy.url().should("include", bugTrackerUrl)
    })
  })
})
