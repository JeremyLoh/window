import { describe, expect, test } from "vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup"
import Wallet from "../../../pages/wallet"
import format from "date-fns/format"

const VALID_NAME: string = "test name"
const VALID_AMOUNT: string = "3.00"
const user: UserEvent = userEvent.setup()

describe("transactions", () => {
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

  function getIncomeInput(): HTMLElement {
    return within(getForm()).getByRole("radio", { name: "Income" })
  }

  function getExpenseInput(): HTMLElement {
    return within(getForm()).getByRole("radio", { name: "Expense" })
  }

  function getSubmitButton(): HTMLButtonElement {
    const form: HTMLElement = getForm()
    return within(form).getByRole("button", { name: "Submit" })
  }

  async function submitIncomeTransaction(name: string, amount: string) {
    const nameInput: HTMLInputElement = getNameInput()
    const amountInput: HTMLInputElement = getAmountInput()
    await user.clear(nameInput)
    await user.type(nameInput, name)
    await user.clear(amountInput)
    await user.type(amountInput, amount)
    await user.click(getIncomeInput())
    await user.click(getSubmitButton())
  }

  async function submitExpenseTransaction(name: string, amount: string) {
    const nameInput: HTMLInputElement = getNameInput()
    const amountInput: HTMLInputElement = getAmountInput()
    await user.clear(nameInput)
    await user.type(nameInput, name)
    await user.clear(amountInput)
    await user.type(amountInput, amount)
    await user.click(getExpenseInput())
    await user.click(getSubmitButton())
  }

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
      await submitExpenseTransaction(VALID_NAME, amount)
      expect(amountInput).toBeInvalid()
    })

    test("should not allow 3 decimal place amount", async () => {
      render(<Wallet />)
      const amount: string = "23.231"
      const amountInput: HTMLInputElement = getAmountInput()
      assertEmptyInput(amountInput)
      await submitExpenseTransaction(VALID_NAME, amount)
      expect(amountInput).toBeInvalid()
    })

    test("should allow 2 decimal place amount", async () => {
      render(<Wallet />)
      const amount: string = "2.01"
      const amountInput: HTMLInputElement = getAmountInput()
      assertEmptyInput(amountInput)
      await submitExpenseTransaction(VALID_NAME, amount)
      expect(amountInput).not.toBeInvalid()
    })

    test("should not allow zero amount", async() => {
      render(<Wallet />)
      const amount: string = "0.00"
      const amountInput: HTMLInputElement = getAmountInput()
      assertEmptyInput(amountInput)
      await submitExpenseTransaction(VALID_NAME, amount)
      expect(amountInput).toBeInvalid()
    })

    test("should allow 1 cent amount", async () => {
      render(<Wallet />)
      const amount: string = "0.01"
      const amountInput: HTMLInputElement = getAmountInput()
      assertEmptyInput(amountInput)
      await submitExpenseTransaction(VALID_NAME, amount)
      expect(amountInput).not.toBeInvalid()
    })

    test("should allow max amount of $9,999,999,999", async () => {
      render(<Wallet />)
      const amount: string = "9999999999"
      const amountInput: HTMLInputElement = getAmountInput()
      assertEmptyInput(amountInput)
      await submitExpenseTransaction(VALID_NAME, amount)
      expect(amountInput).not.toBeInvalid()

      await submitExpenseTransaction(VALID_NAME, amount + ".01")
      expect(amountInput).toBeInvalid()
    })
  })

  describe("transaction history", () => {
    function assertEmptyTransactionHistory(transactionHistory: HTMLElement): void {
      expect(transactionHistory).toBeInTheDocument()
      expect(within(transactionHistory).getByLabelText("transactions-container"))
        .toBeEmptyDOMElement()
    }

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

    function getFirstTransactionDeleteButton() {
      const transactionHistory: HTMLElement = getTransactionHistory()
      return within(transactionHistory)
        .getAllByRole("button", { name: "delete-transaction" })[0]
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
      await submitExpenseTransaction(VALID_NAME, VALID_AMOUNT)
      assertTransactionHistoryContains(transactionHistory, VALID_NAME, VALID_AMOUNT)
    })

    test("should show delete button in added transaction", async () => {
      render(<Wallet />)
      const transactionHistory: HTMLElement = getTransactionHistory()
      assertEmptyTransactionHistory(transactionHistory)
      await submitExpenseTransaction(VALID_NAME, VALID_AMOUNT)
      const transactionDeleteButton: HTMLElement = getFirstTransactionDeleteButton()
      expect(transactionDeleteButton).toBeInTheDocument()
    })

    test("should delete transaction when delete button is clicked", async () => {
      render(<Wallet />)
      const transactionHistory: HTMLElement = getTransactionHistory()
      assertEmptyTransactionHistory(transactionHistory)
      await submitExpenseTransaction(VALID_NAME, VALID_AMOUNT)
      assertTransactionHistoryContains(transactionHistory, VALID_NAME, VALID_AMOUNT)
      const transactionDeleteButton: HTMLElement = getFirstTransactionDeleteButton()
      await user.click(transactionDeleteButton)
      expect(transactionHistory.textContent).not.toContain(VALID_NAME)
      expect(transactionHistory.textContent).not.toContain("$" + VALID_AMOUNT)
    })

    describe("pagination", () => {
      const transactionsPerPage: number = 10

      function getAllTransactionOnPage(): HTMLElement[] {
        const transactionHistory: HTMLElement = getTransactionHistory()
        return within(transactionHistory)
          .getAllByRole("generic", { name: "transaction" })
      }

      function getPreviousPaginationButton(): HTMLButtonElement {
        const transactionHistory: HTMLElement = getTransactionHistory()
        return within(transactionHistory).getByRole("button", { name: "previous-transaction-history" })
      }

      function getNextPaginationButton(): HTMLButtonElement {
        const transactionHistory: HTMLElement = getTransactionHistory()
        return within(transactionHistory).getByRole("button", { name: "next-transaction-history" })
      }

      function getCurrentPageNumber(): HTMLElement {
        const transactionHistory: HTMLElement = getTransactionHistory()
        return within(transactionHistory).getByRole("button",
          { name: "current-transaction-history-page" })
      }

      describe("current page number", () => {
        test("should start page number as 1", async () => {
          render(<Wallet />)
          expect(getCurrentPageNumber().textContent).toBe("1")
        })

        test("should show page number as 2 when next page is viewed", async () => {
          render(<Wallet />)
          expect(getCurrentPageNumber().textContent).toBe("1")
          for (let i = 0; i < transactionsPerPage + 1; i++) {
            await submitExpenseTransaction(VALID_NAME, VALID_AMOUNT)
          }
          await user.click(getNextPaginationButton())
          expect(getCurrentPageNumber().textContent).toBe("2")
        })
      })

      describe("pagination buttons", () => {
        test("should show pagination buttons", async () => {
          render(<Wallet />)
          expect(getPreviousPaginationButton()).toBeInTheDocument()
          expect(getNextPaginationButton()).toBeInTheDocument()
        })

        test("should have previous pagination button disabled for first page", async () => {
          render(<Wallet />)
          expect(getPreviousPaginationButton()).toBeDisabled()
        })

        test("should have next pagination button disabled for zero transactions", async () => {
          render(<Wallet />)
          expect(getNextPaginationButton()).toBeDisabled()
        })

        test("should have next pagination button disabled for last page", async () => {
          render(<Wallet />)
          for (let i = 0; i < transactionsPerPage + 1; i++) {
            await submitExpenseTransaction(VALID_NAME, VALID_AMOUNT)
          }
          const nextPage: HTMLButtonElement = getNextPaginationButton()
          expect(nextPage).not.toBeDisabled()
          await user.click(nextPage)
          expect(nextPage).toBeDisabled()
        })

        test("should have next pagination button disabled for first 10 transactions", async () => {
          render(<Wallet />)
          const nextPage: HTMLButtonElement = getNextPaginationButton()
          expect(nextPage).toBeDisabled()
          for (let i = 0; i < transactionsPerPage; i++) {
            await submitExpenseTransaction(VALID_NAME, VALID_AMOUNT)
          }
          expect(nextPage).toBeDisabled()
        })
      })

      test("should show 10 transactions per page", async () => {
        render(<Wallet />)
        for (let i = 0; i < transactionsPerPage + 1; i++) {
          await submitExpenseTransaction(VALID_NAME, VALID_AMOUNT)
        }
        expect(getAllTransactionOnPage().length).toEqual(10)
        await user.click(getNextPaginationButton())
        expect(getAllTransactionOnPage().length).toEqual(1)
      })
    })

    describe("transaction count", () => {
      describe("day", () => {
        function getTransactionDayCount(): HTMLElement {
          return screen.getByLabelText("wallet-transaction-day-count");
        }

        function assertZeroTransactionCount(): void {
          expect(getTransactionDayCount().textContent).toBe("Zero Transactions")
        }

        function assertTransactionCount(expectedCount: number): void {
          expect(getTransactionDayCount().textContent).toBe(`Transaction Count: ${expectedCount}`)
        }

        test("should start with zero transactions", async () => {
          render(<Wallet />)
          assertZeroTransactionCount()
        })

        test("should show one transaction count", async () => {
          render(<Wallet />)
          assertZeroTransactionCount()
          await submitExpenseTransaction(VALID_NAME, VALID_AMOUNT)
          assertTransactionCount(1)
        })

        test("should show multiple transaction count", async () => {
          render(<Wallet />)
          assertZeroTransactionCount()
          await submitExpenseTransaction(VALID_NAME, VALID_AMOUNT)
          await submitExpenseTransaction(VALID_NAME, VALID_AMOUNT)
          assertTransactionCount(2)
        })

        test("should reduce transaction count when transaction is deleted", async () => {
          render(<Wallet />)
          assertZeroTransactionCount()
          await submitExpenseTransaction(VALID_NAME, VALID_AMOUNT)
          assertTransactionCount(1)
          await user.click(getFirstTransactionDeleteButton())
          assertZeroTransactionCount()
        })
      })
    })

    describe("total expense", () => {
      function getExpenseTotalElement(): HTMLElement {
        return screen.getByLabelText("wallet-expenses")
      }

      test("should update total expense when an expense transaction is added", async () => {
        render(<Wallet />)
        const amount: string = "3.20"
        assertEmptyInput(getAmountInput())
        await submitExpenseTransaction(VALID_NAME, amount)
        expect(getExpenseTotalElement()).toHaveTextContent("$3.20")
      })

      test("should update total expense when multiple expense transactions are added", async () => {
        render(<Wallet />)
        const amount: string = "3.20"
        const amountInput: HTMLInputElement = getAmountInput()
        assertEmptyInput(amountInput)
        await submitExpenseTransaction(VALID_NAME, amount)
        await submitExpenseTransaction(VALID_NAME, amount)
        expect(getExpenseTotalElement()).toHaveTextContent("$6.40")
      })

      test("should reduce total expense when expense transaction is deleted", async () => {
        render(<Wallet />)
        const amount: string = "3.20"
        assertEmptyInput(getAmountInput())
        await submitExpenseTransaction(VALID_NAME, amount)
        expect(getExpenseTotalElement()).toHaveTextContent("$3.20")
        await user.click(getFirstTransactionDeleteButton())
        expect(getExpenseTotalElement()).toHaveTextContent("$0.00")
      })
    })

    describe("total income", () => {
      function getIncomeTotalElement(): HTMLElement {
        return screen.getByLabelText("wallet-income")
      }

      test("should update total income when an income transaction is added", async () => {
        render(<Wallet />)
        const amount: string = "3.20"
        const amountInput: HTMLInputElement = getAmountInput()
        assertEmptyInput(amountInput)
        await submitIncomeTransaction(VALID_NAME, amount)
        expect(getIncomeTotalElement()).toHaveTextContent("$3.20")
      })

      test("should update total income for multiple income transactions", async () => {
        render(<Wallet />)
        const amount: string = "3.20"
        const amountInput: HTMLInputElement = getAmountInput()
        assertEmptyInput(amountInput)
        await submitIncomeTransaction(VALID_NAME, amount)
        await submitIncomeTransaction(VALID_NAME, amount)
        expect(getIncomeTotalElement()).toHaveTextContent("$6.40")
      })

      test("should reduce total income when income transaction is deleted", async () => {
        render(<Wallet />)
        const amount: string = "3.20"
        const amountInput: HTMLInputElement = getAmountInput()
        assertEmptyInput(amountInput)
        await submitIncomeTransaction(VALID_NAME, amount)
        const incomeTotalElement = getIncomeTotalElement()
        expect(incomeTotalElement).toHaveTextContent("$3.20")
        await user.click(getFirstTransactionDeleteButton())
        expect(incomeTotalElement).toHaveTextContent("$0.00")
      })
    })

    describe("cash flow", () => {
      function getCashFlowElement(): HTMLElement {
        return screen.getByLabelText("wallet-cash-flow")
      }

      test("should start with zero", async () => {
        render(<Wallet />)
        const cashFlow: HTMLElement = getCashFlowElement()
        expect(cashFlow).toHaveTextContent("$0.00")
      })

      test("should be negative", async () => {
        render(<Wallet />)
        const cashFlow: HTMLElement = getCashFlowElement()
        await submitExpenseTransaction(VALID_NAME, VALID_AMOUNT)
        expect(cashFlow).toHaveTextContent("-$" + VALID_AMOUNT)
      })

      test("should be positive", async () => {
        render(<Wallet />)
        const cashFlow: HTMLElement = getCashFlowElement()
        await submitIncomeTransaction(VALID_NAME, VALID_AMOUNT)
        expect(cashFlow).toHaveTextContent("$" + VALID_AMOUNT)
      })
    })

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
        await submitExpenseTransaction(VALID_NAME, VALID_AMOUNT)

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