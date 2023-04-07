describe("wallet expense", () => {
  beforeEach(() => {
    cy.visit("/wallet")
  })

  describe("total", () => {
    function getExpenseElement() {
      return cy.getByTestId("wallet-expenses")
    }

    function getFirstDeleteTransactionButton() {
      return cy.getByTestId("delete-transaction")
    }

    it("should update total expense when expense transaction is added", () => {
      getExpenseElement().should("contain.text", "$0.00")
      cy.submitExpenseTransaction("Transaction Name!", ".03")
      getExpenseElement().should("contain.text", "$0.03")
    })

    it("should update total expense when multiple expense transactions are added", () => {
      getExpenseElement().should("contain.text", "$0.00")
      cy.submitExpenseTransaction("Transaction Name!", ".09")
      cy.submitExpenseTransaction("Transaction Name!", ".01")
      getExpenseElement().should("contain.text", "$0.10")
    })

    it("should reduce total expense when expense transaction is deleted", () => {
      getExpenseElement().should("contain.text", "$0.00")
      cy.submitExpenseTransaction("Transaction Name!", ".09")
      getExpenseElement().should("contain.text", "$0.09")
      getFirstDeleteTransactionButton().click()
      getExpenseElement().should("contain.text", "$0.00")
    })
  })
})