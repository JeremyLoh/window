import { test, expect, describe } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup"
import Wallet from "../../pages/wallet"

function getMonth(date: Date) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  return monthNames[date.getMonth()]
}

describe("wallet", () => {
  describe("anonymous user", () => {
    test("should show calendar with current month and year", () => {
      render(<Wallet />)
      const currentDate: Date = new Date()
      const calendarHeader: string = `${getMonth(currentDate)} ${currentDate.getFullYear()}`
      expect(screen.getByText(calendarHeader)).toBeInTheDocument()
    })

    test("should show current day wallet transaction date", () => {
      render(<Wallet />)
      const currentDate: Date = new Date()
      const walletTransactionDate: HTMLElement = screen.getByLabelText("wallet-transaction-date")
      expect(walletTransactionDate).toBeInTheDocument()
      expect(walletTransactionDate).toHaveTextContent("Transaction Date")
      expect(walletTransactionDate)
        .toHaveTextContent(`${currentDate.toDateString()}`)
    })

    test("should show zero expense and zero income", () => {
      render(<Wallet />)
      const walletTransactions: HTMLElement = screen.getByLabelText("wallet-transactions")
      expect(walletTransactions).toBeInTheDocument()
      expect(walletTransactions).toHaveTextContent("Zero Transactions")
      expect(screen.getByLabelText("wallet-expenses"))
        .toHaveTextContent("Expenses$0")
      expect(screen.getByLabelText("wallet-income")).toHaveTextContent("Income$0")
    })

    test("should show button to add transaction", () => {
      render(<Wallet />)
      const addTransaction: HTMLElement = screen.getByLabelText("wallet-add-transaction")
      expect(addTransaction).toBeInTheDocument()
      expect(addTransaction).toHaveTextContent("Add Transaction")
    })
  })

  describe("add transaction", () => {
    test("should not show form to add transaction at page load", () => {
      render(<Wallet />)
      expect(screen.queryByLabelText("add-transaction-form")).not
        .toBeInTheDocument()
    })

    test("should show form to add transaction when button is clicked", async () => {
      const user: UserEvent = userEvent.setup()
      render(<Wallet />)
      const addTransaction: HTMLElement = screen.getByRole("button", 
        { name: /wallet-add-transaction/i })
      expect(screen.queryByLabelText("add-transaction-form")).toBeNull()
      await user.click(addTransaction)
      expect(screen.queryByLabelText("add-transaction-form"))
        .toBeInTheDocument()
    })
  })
})