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
      const navbar = getNavbar()
      navbar.should("be.visible")
      cy.url().should("include", exchangeUrl)
      navbar.contains("Window").click()
      cy.url().should("eq", homepageUrl)
    })
  })

  describe("life page", () => {
    it("should navigate to homepage when navbar app name is clicked", () => {
      cy.visit(lifeUrl)
      const navbar = getNavbar()
      navbar.should("be.visible")
      cy.url().should("include", lifeUrl)
      navbar.contains("Window").click()
      cy.url().should("eq", homepageUrl)
    })
  })

  describe("bug tracker page", () => {
    it("should navigate to bug tracker when navbar app name is clicked", () => {
      cy.visit(bugTrackerUrl)
      const navbar = getNavbar()
      navbar.should("be.visible")
      cy.url().should("include", bugTrackerUrl)
      navbar.contains("Bug Tracker").click()
      cy.url().should("include", bugTrackerUrl)
    })
  })
})
