describe("life", () => {
  beforeEach(() => {
    cy.visit("/life")
  })

  it("should show navbar", () => {
    cy.getByTestId("navbar").should("be.visible")
  })

  it("should show quote", () => {
    cy.getByTestId("life-quote")
      .should("be.visible")
      .should("have.length.greaterThan", 0)
  })

  it("should show life page content tab", () => {
    cy.getByTestId("life-calendar-tab")
      .should("have.text", "Life Calendar")
      .and("have.class", "border-b-2")
    cy.getByTestId("photography-tab")
      .should("contain.text", "Photography")
      .and("not.have.class", "border-b-2")
  })

  it("should switch active content when other content tab is clicked", () => {
    cy.getByTestId("photography-tab").should("not.have.class", "border-b-2")
    cy.getByTestId("photography-tab").click()
    cy.getByTestId("photography-tab").should("have.class", "border-b-2")
    // TODO mock any api calls if present
  })
})
