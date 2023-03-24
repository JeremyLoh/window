describe("navbar", () => {
  const homepageUrl = Cypress.config().baseUrl + "/"
  const exchangeUrl = "/exchange"
  const walletUrl = "/wallet"

  function getNavbar() {
    return cy.get("#navbar")
  }

  describe("exchange page", () => {
    const startUrl = exchangeUrl
    beforeEach(() => {
      cy.visit(startUrl)
    })

    it("should navigate to wallet page when navbar wallet feature is clicked", () => {
      const navbar = getNavbar()
      navbar.should("be.visible")
      cy.url().should("include", startUrl)
      navbar.contains("Wallet").click()
      cy.url().should("include", walletUrl)
    })

    it("should navigate to homepage when navbar app name is clicked", () => {
      const navbar = getNavbar()
      navbar.should("be.visible")
      cy.url().should("include", startUrl)
      navbar.contains("Window").click()
      cy.url().should("eq", homepageUrl)
    })
  })

  describe("wallet page", () => {
    const startUrl = walletUrl
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
