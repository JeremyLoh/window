import { test, expect, describe } from "vitest"
import { render, screen } from '@testing-library/react'
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
      const calendarHeader = `${getMonth(currentDate)} ${currentDate.getFullYear()}`
      expect(screen.getByText(calendarHeader)).toBeInTheDocument()
    })

    test("should show current day wallet transaction date", () => {
      render(<Wallet />)
      const currentDate: Date = new Date()
      const walletTransactionDate = screen.getByLabelText("wallet-transaction-date")
      expect(walletTransactionDate).toBeInTheDocument()
      expect(walletTransactionDate).toHaveTextContent("Transaction Date")
      expect(walletTransactionDate)
        .toHaveTextContent(`${currentDate.toDateString()}`)
    })
  })
})