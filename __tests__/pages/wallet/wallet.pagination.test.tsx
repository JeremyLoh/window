import { describe, expect, test } from "vitest"
import { render, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { UserEvent } from "@testing-library/user-event/setup/setup"
import { getTransactionHistory } from "./util/walletElementSelectors"
import { submitExpenseTransaction } from "./util/submitTransactionForm"
import Wallet from "../../../pages/wallet"

describe("pagination", () => {
  const user: UserEvent = userEvent.setup()
  const transactionsPerPage: number = 10
  const VALID_NAME: string = "test name"
  const VALID_AMOUNT: string = "3.00"

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
        await submitExpenseTransaction(user, VALID_NAME, VALID_AMOUNT)
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
        await submitExpenseTransaction(user, VALID_NAME, VALID_AMOUNT)
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
        await submitExpenseTransaction(user, VALID_NAME, VALID_AMOUNT)
      }
      expect(nextPage).toBeDisabled()
    })
  })

  test("should show 10 transactions per page", async () => {
    render(<Wallet />)
    for (let i = 0; i < transactionsPerPage + 1; i++) {
      await submitExpenseTransaction(user, VALID_NAME, VALID_AMOUNT)
    }
    expect(getAllTransactionOnPage().length).toEqual(10)
    await user.click(getNextPaginationButton())
    expect(getAllTransactionOnPage().length).toEqual(1)
  })
})