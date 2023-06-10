describe("navbar", () => {
  const homepageUrl = Cypress.config().baseUrl + "/"
  const exchangeUrl = "/exchange"
  const lifeUrl = "/life"

  function getNavbar() {
    return cy.get("#navbar")
  }

  describe("exchange page", () => {
    const startUrl = exchangeUrl
    beforeEach(() => {
      cy.visit(startUrl)
    })

    it("should navigate to life page when navbar life feature is clicked", () => {
      const navbar = getNavbar()
      navbar.should("be.visible")
      cy.url().should("include", startUrl)
      navbar.contains("Life").click()
      cy.url().should("include", lifeUrl)
    })

    it("should navigate to homepage when navbar app name is clicked", () => {
      const navbar = getNavbar()
      navbar.should("be.visible")
      cy.url().should("include", startUrl)
      navbar.contains("Window").click()
      cy.url().should("eq", homepageUrl)
    })
  })

  describe("life page", () => {
    const startUrl = lifeUrl
    beforeEach(() => {
      cy.visit(startUrl)
    })

    it("should navigate to exchange page when navbar exchange feature is clicked", () => {
      const navbar = getNavbar()
      navbar.should("be.visible")
      cy.url().should("include", startUrl)
      navbar.contains("Exchange").click()
      cy.url().should("include", exchangeUrl)
    })

    it("should navigate to homepage when navbar app name is clicked", () => {
      const navbar = getNavbar()
      navbar.should("be.visible")
      cy.url().should("include", startUrl)
      navbar.contains("Window").click()
      cy.url().should("eq", homepageUrl)
    })
  })
})
