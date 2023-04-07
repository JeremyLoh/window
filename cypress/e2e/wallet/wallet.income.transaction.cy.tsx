describe("wallet income", () => {
  beforeEach(() => {
    cy.visit("/wallet")
  })

  function getFirstDeleteTransactionButton() {
    return cy.getByTestId("delete-transaction")
  }

  describe("total", () => {
    function getTotalIncomeElement() {
      return cy.getByTestId("wallet-income")
    }

    function assertZeroTotalIncome(): void {
      getTotalIncomeElement().should("contain.text", "$0.00")
    }

    it("should start with zero total income", () => {
      assertZeroTotalIncome()
    })

    it("should update total income when income transaction is added", () => {
      cy.submitIncomeTransaction("Income Transaction Name", ".01")
      getTotalIncomeElement().should("contain.text", "$0.01")
    })

    it("should update total income for multiple income transactions", () => {
      cy.submitIncomeTransaction("Income Transaction Name", ".01")
      cy.submitIncomeTransaction("Income Transaction Name", "0.09")
      getTotalIncomeElement().should("contain.text", "$0.10")
    })

    it("should reduce total income when income transaction is deleted", () => {
      cy.submitIncomeTransaction("Income Transaction Name", "0.09")
      getFirstDeleteTransactionButton().click()
      assertZeroTotalIncome()
    })
  })
})