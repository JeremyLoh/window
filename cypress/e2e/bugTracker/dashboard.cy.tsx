import { loginWithValidAccount } from "./login"

describe("Bug Tracker Dashboard", () => {
  beforeEach(() => {
    cy.visit("/bugTracker/login")
    loginWithValidAccount()
  })

  context("Create a new project", () => {
    it("should create a new project and delete the project afterwards", () => {
      cy.getByTestId("dashboard-projects-tab").should("be.visible").click()
      cy.getByTestId("projects-container").should("be.visible")
      cy.getByTestId("create-project-btn").should("be.visible").click()
      cy.url().should("include", "/bugTracker/project/create")

      cy.getByTestId("project-name-input").type("QA Project 1 Cre@te")
      cy.getByTestId("project-description-input").clear()
      cy.getByTestId("create-project-submit-btn").click()

      cy.getByTestId("delete-project-btn").should("be.visible").click()
      cy.assertAlertTitle("Confirm delete project?")
      cy.assertAlertBody(
        "Are you sure you want to delete the project? It cannot be undone!"
      )
      cy.clickAlertConfirm()

      cy.clickAlertConfirm()
      cy.url().should("include", "/bugTracker/dashboard")
    })
  })
})
