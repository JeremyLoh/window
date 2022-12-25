import { test, expect, describe } from "vitest"
import { render, screen } from "@testing-library/react"
import Exchange from "../../../pages/exchange"

describe("exchange rate", () => {
  function getConversionAmountInput(): HTMLInputElement {
    return screen.getByRole("spinbutton", { name: /conversion amount/i })
  }

  test("should show amount to convert input element", () => {
    render(<Exchange />)
    const conversionAmountInput: HTMLInputElement = getConversionAmountInput()
    expect(conversionAmountInput.getAttribute("type")).toEqual("number")
    expect(conversionAmountInput.getAttribute("min")).toEqual("0.01")
    expect(conversionAmountInput.getAttribute("max")).toEqual("99999999")
  })
})