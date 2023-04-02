describe("Wallet", () => {
  beforeEach(() => {
    cy.visit("/wallet")
  })

  const transactionsPerPage: number = 10

  describe("transaction history", () => {
    function getTransactionHistoryContainer() {
      return cy.getByTestId("transaction-history-container")
    }

    function getFirstDeleteTransactionButton() {
      return cy.getByTestId("delete-transaction")
    }

    it("should start with empty transaction history", () => {
      getTransactionHistoryContainer().should("be.empty")
    })

    it("should show one added transaction", () => {
      cy.submitExpenseTransaction("transaction name", "9999.99")
      getTransactionHistoryContainer()
        .should("contain.text", "transaction name")
        .and("contain.text", "9999.99")
    })

    it("should delete transaction when delete button is clicked", () => {
      cy.submitExpenseTransaction("transaction name", ".01")
      getTransactionHistoryContainer().should("contain.text", "transaction name")
        .and("contain.text", "0.01")
      getFirstDeleteTransactionButton().should("be.visible").click()
      getTransactionHistoryContainer().should("be.empty")
    })

    describe("transaction count", () => {
      describe("day", () => {
        function getTransactionDayCount() {
          return cy.getByTestId("wallet-transaction-day-count")
        }

        function assertTransactionCount(count: string): void {
          getTransactionDayCount().should("have.text", `Transaction Count: ${count}`)
        }

        function assertZeroTransactionCount(): void {
          getTransactionDayCount().should("have.text", "Zero Transactions")
        }

        it("should start with zero transaction count", () => {
          assertZeroTransactionCount()
        })

        it("should show one transaction count", () => {
          cy.submitExpenseTransaction("transaction name", ".08")
          assertTransactionCount("1")
        })

        it("should show multiple transaction count", () => {
          cy.submitExpenseTransaction("transaction name", ".01")
          cy.submitExpenseTransaction("transaction name", "0.01")
          assertTransactionCount("2")
        })

        it("should reduce transaction count when transaction is deleted", () => {
          cy.submitExpenseTransaction("transaction name", ".01")
          assertTransactionCount("1")
          getFirstDeleteTransactionButton().should("be.visible").click()
          assertZeroTransactionCount()
        })
      })
    })
  })

  describe("transaction history pagination", () => {
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
      for (let i = 0; i < transactionsPerPage; i++) {
        cy.submitExpenseTransaction("transaction name", "2.09")
      }
      getNextPaginationButton().should("be.disabled")
    })

    it("should show page number as 2 when next page is viewed", () => {
      for (let i = 0; i < transactionsPerPage + 1; i++) {
        cy.submitExpenseTransaction("transaction name", "2.09")
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
        for (let i = 0; i < transactionsPerPage + 1; i++) {
          cy.submitExpenseTransaction("transaction name", "0.01")
        }
        assertCurrentPageNumber("1")
        getNextPaginationButton().should("not.be.disabled").click()
        assertCurrentPageNumber("2")
        getNextPaginationButton().should("be.disabled")
      })

      it("should have previous pagination button enabled for last page", () => {
        for (let i = 0; i < transactionsPerPage + 1; i++) {
          cy.submitExpenseTransaction("transaction name", "0.01")
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