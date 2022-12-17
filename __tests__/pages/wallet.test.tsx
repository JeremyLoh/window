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
    const VALID_NAME: string = "test name"
    const VALID_AMOUNT: string = "3.00"

    function getForm(): HTMLElement {
      return screen.getByLabelText("add-transaction-form")
    }

    function getNameInput(): HTMLInputElement {
      const form: HTMLElement = getForm()
      return within(form).getByRole("textbox", { name: "Name" })
    }

    function getAmountInput(): HTMLInputElement {
      const form: HTMLElement = getForm()
      return within(form).getByRole("spinbutton", { name: "Amount" })
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

    function assertEmptyInput(input: HTMLInputElement): void {
      expect(input).toBeInTheDocument()
      expect(input.value).toBe("")
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
        assertEmptyInput(nameInput)
        await user.type(nameInput, "Test N@me3")
        expect(nameInput.value).toBe("Test N@me3")
      })

      test("should allow amount input", async () => {
        render(<Wallet />)
        const amount: string = "99999.99"
        const amountInput: HTMLInputElement = getAmountInput()
        assertEmptyInput(amountInput)
        await user.type(amountInput, amount)
        expect(amountInput.value).toBe(amount)
      })

      test("should not allow negative amount", async () => {
        render(<Wallet />)
        const amount: string = "-0.01"
        const amountInput: HTMLInputElement = getAmountInput()
        assertEmptyInput(amountInput)
        await submitTransaction(VALID_NAME, amount)
        expect(amountInput).toBeInvalid()
      })

      test("should not allow 3 decimal place amount", async () => {
        render(<Wallet />)
        const amount: string = "23.231"
        const amountInput: HTMLInputElement = getAmountInput()
        assertEmptyInput(amountInput)
        await submitTransaction(VALID_NAME, amount)
        expect(amountInput).toBeInvalid()
      })

      test("should allow 2 decimal place amount", async () => {
        render(<Wallet />)
        const amount: string = "2.01"
        const amountInput: HTMLInputElement = getAmountInput()
        assertEmptyInput(amountInput)
        await submitTransaction(VALID_NAME, amount)
        expect(amountInput).not.toBeInvalid()
      })

      test("should not allow zero amount", async() => {
        render(<Wallet />)
        const amount: string = "0.00"
        const amountInput: HTMLInputElement = getAmountInput()
        assertEmptyInput(amountInput)
        await submitTransaction(VALID_NAME, amount)
        expect(amountInput).toBeInvalid()
      })

      test("should allow 1 cent amount", async () => {
        render(<Wallet />)
        const amount: string = "0.01"
        const amountInput: HTMLInputElement = getAmountInput()
        assertEmptyInput(amountInput)
        await submitTransaction(VALID_NAME, amount)
        expect(amountInput).not.toBeInvalid()
      })

      test("should allow max amount of $9,999,999,999", async () => {
        render(<Wallet />)
        const amount: string = "9999999999"
        const amountInput: HTMLInputElement = getAmountInput()
        assertEmptyInput(amountInput)
        await submitTransaction(VALID_NAME, amount)
        expect(amountInput).not.toBeInvalid()

        await submitTransaction(VALID_NAME, amount + ".01")
        expect(amountInput).toBeInvalid()
      })
    })

    describe("transaction history", () => {
      function assertEmptyTransactionHistory(transactionHistory: HTMLElement): void {
        expect(transactionHistory).toBeInTheDocument()
        expect(transactionHistory).toHaveTextContent("")
      }

      function assertTransactionHistoryContains(transactionHistory: HTMLElement,
                                                name: string,
                                                amount: string): void {
        expect(transactionHistory.textContent).toContain(name)
        expect(transactionHistory.textContent).toContain("$" + amount)
      }

      function getTransactionHistory(): HTMLElement {
        return screen.getByLabelText("wallet-transaction-history")
      }
      
      test("should show empty transaction history element", async () => {
        render(<Wallet />)
        const transactionHistory: HTMLElement = getTransactionHistory()
        assertEmptyTransactionHistory(transactionHistory)
      })

      test("should show added transaction", async () => {
        render(<Wallet />)
        const transactionHistory: HTMLElement = getTransactionHistory()
        assertEmptyTransactionHistory(transactionHistory)
        await submitTransaction(VALID_NAME, VALID_AMOUNT)
        assertTransactionHistoryContains(transactionHistory, VALID_NAME, VALID_AMOUNT)
      })

      test("should show delete button in added transaction", async () => {
        render(<Wallet />)
        const transactionHistory: HTMLElement = getTransactionHistory()
        assertEmptyTransactionHistory(transactionHistory)
        await submitTransaction(VALID_NAME, VALID_AMOUNT)
        const transactionDeleteButton: HTMLElement = within(transactionHistory)
          .getAllByRole("button", { name: "delete-transaction" })[0]
        expect(transactionDeleteButton).toBeInTheDocument()
      })

      test("should delete transaction when delete button is clicked", async () => {
        render(<Wallet />)
        const transactionHistory: HTMLElement = getTransactionHistory()
        assertEmptyTransactionHistory(transactionHistory)
        await submitTransaction(VALID_NAME, VALID_AMOUNT)
        assertTransactionHistoryContains(transactionHistory, VALID_NAME, VALID_AMOUNT)
        const transactionDeleteButton: HTMLElement = within(transactionHistory)
          .getAllByRole("button", { name: "delete-transaction" })[0]
        await user.click(transactionDeleteButton)
        expect(transactionHistory.textContent).not.toContain(VALID_NAME)
        expect(transactionHistory.textContent).not.toContain("$" + VALID_AMOUNT)
      })
    })
  })
})