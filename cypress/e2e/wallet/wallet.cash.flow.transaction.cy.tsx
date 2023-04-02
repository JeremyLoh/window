describe("wallet cash flow", () => {
  beforeEach(() => {
    cy.visit("/wallet")
  })

  function getCashFlowElement() {
    return cy.getByTestId("wallet-cash-flow")
  }

  it("should start with zero cash flow", () => {
    getCashFlowElement().should("be.visible")
      .and("contain.text", "$0.00")
      .and("not.contain.text", "-$0.00")
  })

  it("should be negative when expense is greater than income", () => {
    cy.submitExpenseTransaction("Expense Transaction Name", ".01")
    getCashFlowElement().should("contain.text", "-$0.01")
  })

  it("should be positive when income is greater than income", () => {
    cy.submitIncomeTransaction("Income Transaction Name", ".01")
    getCashFlowElement().should("contain.text", "$0.01")
  })
})