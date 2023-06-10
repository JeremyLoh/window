import { getLifeCalendarTab, getTravelTab } from "./selectors"

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
    getLifeCalendarTab()
      .should("have.text", "Life Calendar")
      .and("have.class", "border-b-2")
    getTravelTab()
      .should("contain.text", "Travel")
      .and("not.have.class", "border-b-2")
  })

  it("should switch active content when other content tab is clicked", () => {
    getTravelTab().should("not.have.class", "border-b-2")
    getTravelTab().click()
    getTravelTab().should("have.class", "border-b-2")
    // TODO mock any api calls if present
  })
})
