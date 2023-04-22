describe("life", () => {
  beforeEach(() => {
    cy.visit("/life")
  })

  it("should show navbar", () => {
    cy.getByTestId("navbar").should("be.visible")
  })

  it("should show quote", () => {
    cy.getByTestId("life-quote").should("be.visible")
      .should("have.length.greaterThan", 0)
  })
})