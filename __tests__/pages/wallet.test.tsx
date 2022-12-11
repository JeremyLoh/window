import { test, expect, describe } from "vitest"
import { render, screen, within } from "@testing-library/react"
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
      expect(screen.getByLabelText("wallet-calendar-date-selection").textContent)
        .toBe(calendarHeader)
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
  })

  describe("transactions", () => {
    const user: UserEvent = userEvent.setup()

    function getForm(): HTMLElement {
      return screen.getByLabelText("add-transaction-form")
    }

    function getNameInput(): HTMLInputElement {
      const form: HTMLElement = getForm()
      return within(form).getByRole("textbox", { name: "Name" })
    }

    function getAmountInput(): HTMLInputElement {
      const form: HTMLElement = getForm()
      return within(form).getByRole("spinbutton", {
        name: "Amount"
      })
    }

    function getSubmitButton(): HTMLButtonElement {
      const form: HTMLElement = getForm()
      return within(form).getByRole("button", { name: "Submit" })
    }

    async function submitTransaction(name: string, amount: string) {
      const nameInput: HTMLInputElement = getNameInput()
      const amountInput: HTMLInputElement = getAmountInput()
      const submitButton: HTMLButtonElement = getSubmitButton()
      await user.type(nameInput, name)
      await user.type(amountInput, amount)
      await user.click(submitButton)
    }

    describe("add transaction", () => {
      test("should show form to add transaction by default", async () => {
        render(<Wallet />)
        expect(screen.getByLabelText("add-transaction-form"))
          .toBeInTheDocument()
      })

      test("should allow name input", async () => {
        render(<Wallet />)
        const nameInput: HTMLInputElement = getNameInput()
        expect(nameInput).toBeInTheDocument()
        expect(nameInput.value).toBe("")
        await user.type(nameInput, "Test N@me3")
        expect(nameInput.value).toBe("Test N@me3")
      })

      test("should allow amount input", async () => {
        render(<Wallet />)
        const amountInput: HTMLInputElement = getAmountInput()
        expect(amountInput).toBeInTheDocument()
        expect(amountInput.value).toBe("")
        await user.type(amountInput, "3.21")
        expect(amountInput.value).toBe("3.21")
      })

      test("should not allow negative amount", async () => {
        render(<Wallet />)
        const name: string = "test name"
        const amount: string = "-23.21"
        const amountInput: HTMLInputElement = getAmountInput()
        expect(amountInput).toBeInTheDocument()
        expect(amountInput.value).toBe("")
        await submitTransaction(name, amount)
        expect(amountInput).toBeInvalid()
      })

      test("should not allow 3dp amount", async () => {
        render(<Wallet />)
        const name: string = "test name"
        const amount: string = "23.231"
        const amountInput: HTMLInputElement = getAmountInput()
        expect(amountInput).toBeInTheDocument()
        expect(amountInput.value).toBe("")
        await submitTransaction(name, amount)
        expect(amountInput).toBeInvalid()
      })
    })

    describe("transaction history", () => {
      function getTransactionHistory(): HTMLElement {
        return screen.getByLabelText("wallet-transaction-history")
      }
      
      test("should show transaction history", async () => {
        render(<Wallet />)
        const transactionHistory: HTMLElement = getTransactionHistory()
        expect(transactionHistory).toBeInTheDocument()
      })
    })
  })
})