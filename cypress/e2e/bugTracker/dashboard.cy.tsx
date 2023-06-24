import { loginWithValidAccount } from "./login"

describe("Bug Tracker Dashboard", () => {
  beforeEach(() => {
    cy.visit("/bugTracker/login")
    loginWithValidAccount()
  })

  context("Create a new project", () => {
    it("should show empty list of projects", () => {
      cy.url().should("include", "/bugTracker/dashboard")
      cy.getByTestId("dashboard-projects-tab").should("be.visible").click()
      cy.getByTestId("projects-container")
        .should("be.visible")
        .and("contain.text", "No Projects found. Please add a new project")
    })
  })

  context("Delete an existing project", () => {})
})
