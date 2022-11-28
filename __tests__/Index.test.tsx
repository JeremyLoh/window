import { test, expect } from "vitest"
import { render, within, screen } from "@testing-library/react"
import Home from "../pages"

test("index", () => {
  render(<Home />)
  const main = within(screen.getByRole("main"))
  expect(main.getByRole("heading", { level: 1, name: /window/i }))
    .toBeDefined()
})