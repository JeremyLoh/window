describe("Wallet", () => {
  beforeEach(() => {
    cy.visit("/wallet")
  })

  describe("transaction history pagination", () => {
    const transactionsPerPage: number = 10

    function inputExpenseTransaction(name: string, amount: string) {
      cy.get("input[id='name']").clear().type(name)
      cy.get("input[id='amount']").clear().type(amount)
      cy.get("input[id='expense']").click()
    }

    function submitTransaction() {
      cy.getByTestId("add-transaction-form").find("button")
        .click()
    }

    function assertCurrentPageNumber(value: string) {
      cy.getByTestId("current-transaction-history-page")
        .should("have.text", value)
    }

    function getPreviousPaginationButton() {
      return cy.getByTestId("previous-transaction-history")
    }

    function getNextPaginationButton() {
      return cy.getByTestId("next-transaction-history")
    }

    it("should start page number as 1", () => {
      assertCurrentPageNumber("1")
    })

    it("should show max number of transactions on a single page", () => {
      inputExpenseTransaction("transaction name", "2.09")
      for (let i = 0; i < transactionsPerPage; i++) {
        submitTransaction()
      }
      getNextPaginationButton().should("be.disabled")
    })

    it("should show page number as 2 when next page is viewed", () => {
      inputExpenseTransaction("transaction name", "2.09")
      for (let i = 0; i < transactionsPerPage + 1; i++) {
        submitTransaction()
      }
      assertCurrentPageNumber("1")
      getNextPaginationButton().should("be.enabled")
        .click()
      assertCurrentPageNumber("2")
    })

    describe("pagination buttons", () => {
      it("should show pagination buttons", () => {
        getPreviousPaginationButton().should("be.visible")
        getNextPaginationButton().should("be.visible")
      })

      it("should have next pagination button disabled for zero transactions", () => {
        assertCurrentPageNumber("1")
        getNextPaginationButton().should("be.disabled")
      })

      it("should have next pagination button disabled for last page", () => {
        inputExpenseTransaction("transaction name", "0.01")
        for (let i = 0; i < transactionsPerPage + 1; i++) {
          submitTransaction()
        }
        assertCurrentPageNumber("1")
        getNextPaginationButton().should("not.be.disabled").click()
        assertCurrentPageNumber("2")
        getNextPaginationButton().should("be.disabled")
      })

      it("should have previous pagination button enabled for last page", () => {
        inputExpenseTransaction("transaction name", "0.01")
        for (let i = 0; i < transactionsPerPage + 1; i++) {
          submitTransaction()
        }
        assertCurrentPageNumber("1")
        getNextPaginationButton().should("not.be.disabled").click()
        assertCurrentPageNumber("2")
        getPreviousPaginationButton().should("not.be.disabled").click()
        assertCurrentPageNumber("1")
      })
    })
  })

  describe("calendar", () => {
    function getMonth(date: Date) {
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ]
      return monthNames[date.getMonth()]
    }

    it("should show calendar with current month and year", () => {
      const currentDate: Date = new Date()
      const calendarHeader: string = `${getMonth(currentDate)} ${currentDate.getFullYear()}`
      cy.get("[aria-label='wallet-calendar-date-selection']")
        .should("have.text", calendarHeader)
    })

    it("should show current day transaction date", () => {
      const currentDate: Date = new Date()
      cy.getByTestId("wallet-transaction-date").should("be.visible")
        .should("contain.text", "Transaction Date")
        .should("contain.text", currentDate.toDateString())
    })

    it("should show zero expense", () => {
      cy.getByTestId("wallet-transactions")
        .should("be.visible")
        .and("contain.text", "Zero Transactions")
        .and("contain.text", "Expenses$0.00")
    })

    it("should show zero income", () => {
      cy.getByTestId("wallet-transactions")
        .should("be.visible")
        .and("contain.text", "Zero Transactions")
        .and("contain.text", "Income$0.00")
    })
  })
})