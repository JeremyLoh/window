// https://nextjs.org/docs/testing

describe("Homepage (/)", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  function getExchangeFeatureNavLink() {
    return cy.get("a[href*='exchange']")
  }

  function getLifeFeatureNavLink() {
    return cy.get("a[href*='life']")
  }

  it("should display app features", () => {
    cy.contains("Window").should("be.visible")
    getExchangeFeatureNavLink().should("be.visible").and("exist")
    getLifeFeatureNavLink().should("be.visible").and("exist")
  })

  it("should navigate to exchange page when exchange feature is clicked", () => {
    getExchangeFeatureNavLink().click()
    cy.url().should("include", "/exchange")
  })

  it("should navigate to life page when life feature is clicked", () => {
    getLifeFeatureNavLink().click()
    cy.url().should("include", "/life")
  })
})
