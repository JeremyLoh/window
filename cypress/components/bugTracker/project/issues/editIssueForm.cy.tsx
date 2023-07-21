import EditIssueForm from "../../../../../components/bugTracker/project/issues/editIssueForm"

describe("Bug Tracker Edit Issue Form", () => {
  const issue = {
    name: "Issue Name",
    description: "Issue Description",
    priority: "Medium",
    status: "In Review",
  }

  function getNameInput(): Cypress.Chainable {
    return cy.getByTestId("edit-issue-name-input")
  }

  function getDescriptionInput(): Cypress.Chainable {
    return cy.getByTestId("edit-issue-description-input")
  }

  function getPrioritySelectInput(): Cypress.Chainable {
    return cy.getByTestId("edit-issue-priority-input")
  }

  it("should show edit form with given initial values", () => {
    cy.mount(<EditIssueForm issue={issue} />)
    getNameInput().should("be.visible").and("have.value", "Issue Name")
    getDescriptionInput()
      .should("be.visible")
      .and("have.value", "Issue Description")
    // todo check priority, status select input, submit button
  })

  context("name input", () => {
    it("should show error for empty name input", () => {
      const expectedErrorMessage: string = "Required"
      cy.mount(<EditIssueForm issue={issue} />)
      getNameInput().clear()
      cy.clickOutside()
      cy.assertInputErrorValidation(getNameInput(), expectedErrorMessage)
    })

    it("should show error for too long name input", () => {
      const expectedErrorMessage: string = "max is 200 characters"
      cy.mount(<EditIssueForm issue={issue} />)
      getNameInput().clear().type("a".repeat(201), { delay: 0 })
      cy.clickOutside()
      cy.assertInputErrorValidation(getNameInput(), expectedErrorMessage)
    })

    it("should not show error for valid name input", () => {
      cy.mount(<EditIssueForm issue={issue} />)
      getNameInput().clear().type("a".repeat(200), { delay: 0 })
      cy.clickOutside()
      cy.getByTestId("edit-issue-name-error").should("not.exist")
    })
  })

  context("description input", () => {
    it("should not show error for empty description input", () => {
      cy.mount(<EditIssueForm issue={issue} />)
      getDescriptionInput().clear()
      cy.clickOutside()
      cy.getByTestId("edit-issue-description-error").should("not.exist")
    })

    it("should show error for too long description input", () => {
      const expectedErrorMessage: string = "max is 1000 characters"
      cy.mount(<EditIssueForm issue={issue} />)
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

    it("should show list of priority options", () => {
      cy.mount(<EditIssueForm issue={issue} />)
      assertPrioritySelectValue("None")
      assertPrioritySelectValue("Lowest")
      assertPrioritySelectValue("Low")
      assertPrioritySelectValue("Medium")
      assertPrioritySelectValue("High")
      assertPrioritySelectValue("Highest")
    })

    it("should select by default given priority", () => {
      cy.mount(<EditIssueForm issue={issue} />)
      getPrioritySelectInput().should("have.value", issue.priority)
    })
  })
})
