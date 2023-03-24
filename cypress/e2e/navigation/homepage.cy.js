// https://nextjs.org/docs/testing

describe("Homepage (/)", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  function getWalletFeatureNavLink() {
    // *= is a CSS attribute selector for selecting attribute value containing specified value
    return cy.get("a[href*='wallet']")
  }

  function getExchangeFeatureNavLink() {
    return cy.get("a[href*='exchange']")
  }

  it("should display app features", () => {
    cy.contains("Window").should("be.visible")
    getWalletFeatureNavLink().should("be.visible").and("exist")
    getExchangeFeatureNavLink().should("be.visible").and("exist")
  })

  it("should navigate to wallet page when wallet feature is clicked", () => {
    getWalletFeatureNavLink().click()
    cy.url().should("include", "/wallet")
  })

  it("should navigate to exchange page when wallet feature is clicked", () => {
    getExchangeFeatureNavLink().click()
    cy.url().should("include", "/exchange")
  })
})
