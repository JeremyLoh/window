import { screen } from "@testing-library/react"

export function getTransactionHistory(): HTMLElement {
  return screen.getByLabelText("wallet-transaction-history")
}