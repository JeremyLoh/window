import { describe, expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { UserEvent } from "@testing-library/user-event/setup/setup"
import format from "date-fns/format"
import {
  getAmountInput, getExpenseInput, getIncomeInput,
  getNameInput,
  submitExpenseTransaction,
} from "./util/submitTransactionForm"
import Wallet from "../../../pages/wallet"

describe("transactions", () => {
  const user: UserEvent = userEvent.setup()
  const VALID_NAME: string = "test name"
  const VALID_AMOUNT: string = "3.00"

  function assertEmptyInput(input: HTMLInputElement): void {
    expect(input).toBeInTheDocument()
    expect(input.value).toBe("")
  }

  function assertExpenseInputSelected(expenseInput: HTMLElement, incomeInput: HTMLElement) {
    expect(expenseInput).toBeChecked()
    expect(incomeInput).not.toBeChecked()
  }

  function assertIncomeInputSelected(expenseInput: HTMLElement, incomeInput: HTMLElement) {
    expect(expenseInput).not.toBeChecked()
    expect(incomeInput).toBeChecked()
  }

  describe("add transaction", () => {
    test("should show form to add transaction by default", async () => {
      render(<Wallet />)
      expect(screen.getByLabelText("add-transaction-form"))
        .toBeInTheDocument()
    })

    test("should show expense radio input as checked input", async () => {
      render(<Wallet />)
      const expenseInput: HTMLElement = getExpenseInput()
      const incomeInput: HTMLElement = getIncomeInput()
      expect(expenseInput).toBeInTheDocument()
      expect(incomeInput).toBeInTheDocument()
      assertExpenseInputSelected(expenseInput, incomeInput)
    })

    test("should allow change between expense and income radio input", async () => {
      render(<Wallet />)
      const expenseInput: HTMLElement = getExpenseInput()
      const incomeInput: HTMLElement = getIncomeInput()
      assertExpenseInputSelected(expenseInput, incomeInput)
      await user.click(incomeInput)
      assertIncomeInputSelected(expenseInput, incomeInput)
      await user.click(expenseInput)
      assertExpenseInputSelected(expenseInput, incomeInput)
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
      await submitExpenseTransaction(user, VALID_NAME, amount)
      expect(amountInput).toBeInvalid()
    })

    test("should not allow 3 decimal place amount", async () => {
      render(<Wallet />)
      const amount: string = "23.231"
      const amountInput: HTMLInputElement = getAmountInput()
      assertEmptyInput(amountInput)
      await submitExpenseTransaction(user, VALID_NAME, amount)
      expect(amountInput).toBeInvalid()
    })

    test("should allow 2 decimal place amount", async () => {
      render(<Wallet />)
      const amount: string = "2.01"
      const amountInput: HTMLInputElement = getAmountInput()
      assertEmptyInput(amountInput)
      await submitExpenseTransaction(user, VALID_NAME, amount)
      expect(amountInput).not.toBeInvalid()
    })

    test("should not allow zero amount", async() => {
      render(<Wallet />)
      const amount: string = "0.00"
      const amountInput: HTMLInputElement = getAmountInput()
      assertEmptyInput(amountInput)
      await submitExpenseTransaction(user, VALID_NAME, amount)
      expect(amountInput).toBeInvalid()
    })

    test("should allow 1 cent amount", async () => {
      render(<Wallet />)
      const amount: string = "0.01"
      const amountInput: HTMLInputElement = getAmountInput()
      assertEmptyInput(amountInput)
      await submitExpenseTransaction(user, VALID_NAME, amount)
      expect(amountInput).not.toBeInvalid()
    })

    test("should allow max amount of $9,999,999,999", async () => {
      render(<Wallet />)
      const amount: string = "9999999999"
      const amountInput: HTMLInputElement = getAmountInput()
      assertEmptyInput(amountInput)
      await submitExpenseTransaction(user, VALID_NAME, amount)
      expect(amountInput).not.toBeInvalid()

      await submitExpenseTransaction(user, VALID_NAME, amount + ".01")
      expect(amountInput).toBeInvalid()
    })
  })

  describe("transaction history", () => {
    function assertTransactionHistoryContains(transactionHistory: HTMLElement,
                                              name: string,
                                              amount: string): void {
      expect(transactionHistory.textContent).toContain(name)
      expect(transactionHistory.textContent).toContain("$" + amount)
    }

    function assertTransactionHistoryDoesNotContain(transactionHistory: HTMLElement,
                                                    name: string,
                                                    amount: string): void {
      expect(transactionHistory.textContent).not.toContain(name)
      expect(transactionHistory.textContent).not.toContain("$" + amount)
    }

    function getTransactionHistory(): HTMLElement {
      return screen.getByLabelText("wallet-transaction-history")
    }

    describe("add transaction on different date", () => {
      function getWalletTransactionDate(): HTMLElement {
        return screen.getByLabelText("wallet-transaction-date")
      }

      function getButtonForTransactionDate(date: Date): HTMLButtonElement {
        // e.g. "LLLL d, y" => December 1, 2022
        const dateName = format(date, "LLLL d, y")
        return screen.getByRole("button", { name: dateName })
      }

      function getDisplayedTransactionDateFormat(date: Date): string {
        // e.g. "EEE LLL dd y" => Thu Dec 01 2022
        return format(date, "EEE LLL dd y")
      }

      function getDateElementOfCurrentMonth(date: number) {
        const now: Date = new Date()
        now.setDate(date)
        return {
          element: getButtonForTransactionDate(now),
          date: now,
        }
      }

      test("should remember added transaction when changing dates", async () => {
        render(<Wallet />)
        const transactionHistory: HTMLElement = getTransactionHistory()
        const walletTransactionDate: HTMLElement = getWalletTransactionDate()
        const {element: firstOfCurrentMonth, date: firstOfMonth} = getDateElementOfCurrentMonth(1)
        const {element: secondOfCurrentMonth, date: secondOfMonth} = getDateElementOfCurrentMonth(2)

        await user.click(firstOfCurrentMonth)
        expect(walletTransactionDate).toHaveTextContent(getDisplayedTransactionDateFormat(firstOfMonth))
        await submitExpenseTransaction(user, VALID_NAME, VALID_AMOUNT)

        await user.click(secondOfCurrentMonth)
        expect(walletTransactionDate).toHaveTextContent(getDisplayedTransactionDateFormat(secondOfMonth))
        assertTransactionHistoryDoesNotContain(transactionHistory, VALID_NAME, VALID_AMOUNT)

        await user.click(firstOfCurrentMonth)
        expect(walletTransactionDate).toHaveTextContent(getDisplayedTransactionDateFormat(firstOfMonth))
        assertTransactionHistoryContains(transactionHistory, VALID_NAME, VALID_AMOUNT)
      })
    })
  })
})