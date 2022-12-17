import { test, expect, describe } from "vitest"
import { render, screen } from '@testing-library/react'
import Home from "../pages"

describe("index", () => {
  test("app name is present", () => {
    render(<Home />)
    expect(screen.getByRole("heading", { name: /^window/i }))
      .toBeDefined()
  })

  test("wallet feature is described", () => {
    render(<Home />)
    const walletFeatureDescription = screen.getByText(/^track your cash flow/i)
    expect(walletFeatureDescription)
      .toBeDefined()
  })

  test("wallet feature should have link to wallet page", () => {
    render(<Home />)
    expect(screen.getByRole("button", { name: /wallet-feature/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /track your cash flow!/i }))
      .toHaveAttribute("href", "/wallet")
  })
})