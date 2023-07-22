import EditIssueForm from "../../../../../components/bugTracker/project/issues/editIssueForm"

describe("Bug Tracker Edit Issue Form", () => {
  const issue = {
    name: "Issue Name",
    description: "Issue Description",
    priority: "Medium",
    status: "In Review",
  }

  beforeEach(() => {
    cy.mount(<EditIssueForm issue={issue} />)
  })

  function getNameInput(): Cypress.Chainable {
    return cy.getByTestId("edit-issue-name-input")
  }

  function getDescriptionInput(): Cypress.Chainable {
    return cy.getByTestId("edit-issue-description-input")
  }

  function getPrioritySelectInput(): Cypress.Chainable {
    return cy.getByTestId("edit-issue-priority-input")
  }

  function getStatusSelectInput(): Cypress.Chainable {
    return cy.getByTestId("edit-issue-status-input")
  }

  it("should show edit form with given initial values", () => {
    getNameInput().should("be.visible").and("have.value", "Issue Name")
    getDescriptionInput()
      .should("be.visible")
      .and("have.value", "Issue Description")
    getPrioritySelectInput().should("be.visible").and("have.value", "Medium")
    getStatusSelectInput().should("be.visible").and("have.value", "In Review")
    // todo check submit button
  })

  context("name input", () => {
    it("should show error for empty name input", () => {
      const expectedErrorMessage: string = "Required"
      getNameInput().clear()
      cy.clickOutside()
      cy.assertInputErrorValidation(getNameInput(), expectedErrorMessage)
    })

    it("should show error for too long name input", () => {
      const expectedErrorMessage: string = "max is 200 characters"
      getNameInput().clear().type("a".repeat(201), { delay: 0 })
      cy.clickOutside()
      cy.assertInputErrorValidation(getNameInput(), expectedErrorMessage)
    })

    it("should not show error for valid name input", () => {
      getNameInput().clear().type("a".repeat(200), { delay: 0 })
      cy.clickOutside()
      cy.getByTestId("edit-issue-name-error").should("not.exist")
    })
  })

  context("description input", () => {
    it("should not show error for empty description input", () => {
      getDescriptionInput().clear()
      cy.clickOutside()
      cy.getByTestId("edit-issue-description-error").should("not.exist")
    })

    it("should show error for too long description input", () => {
      const expectedErrorMessage: string = "max is 1000 characters"
      getDescriptionInput().clear().type("a".repeat(1001), { delay: 0 })
      cy.clickOutside()
      cy.assertInputErrorValidation(getDescriptionInput(), expectedErrorMessage)
    })
  })

  context("priority input", () => {
    function assertPrioritySelectValue(value: string) {
      getPrioritySelectInput().select(value)
      getPrioritySelectInput().should("have.value", value)
    }

    it("should show list of priority options and allow selection", () => {
      assertPrioritySelectValue("None")
      assertPrioritySelectValue("Lowest")
      assertPrioritySelectValue("Low")
      assertPrioritySelectValue("Medium")
      assertPrioritySelectValue("High")
      assertPrioritySelectValue("Highest")
    })

    it("should select by default given priority", () => {
      getPrioritySelectInput().should("have.value", issue.priority)
    })
  })

  context("status input", () => {
    function assertStatusSelectValue(value: string) {
      getStatusSelectInput().select(value)
      getStatusSelectInput().should("have.value", value)
    }

    it("should show list of status options and allow selection", () => {
      assertStatusSelectValue("None")
      assertStatusSelectValue("New")
      assertStatusSelectValue("Backlog")
      assertStatusSelectValue("Ready")
      assertStatusSelectValue("In Progress")
      assertStatusSelectValue("In Review")
      assertStatusSelectValue("Done")
      assertStatusSelectValue("Closed")
    })

    it("should select by default given status", () => {
      getStatusSelectInput()
        .should("be.visible")
        .and("have.value", issue.status)
    })
  })
})
