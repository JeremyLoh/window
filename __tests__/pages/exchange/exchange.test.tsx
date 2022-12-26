import { test, expect, describe } from "vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { UserEvent } from "@testing-library/user-event/setup/setup"
import Exchange from "../../../pages/exchange"

describe("exchange rate", () => {
  const user: UserEvent = userEvent.setup()

  function getConversionAmountInput(): HTMLInputElement {
    return screen.getByRole("spinbutton", { name: /conversion amount/i })
  }

  function getFromCurrencyDropdown(): HTMLSelectElement {
    return screen.getByLabelText("from-currency-select")
  }

  function getToCurrencyDropdown(): HTMLSelectElement {
    return screen.getByLabelText("to-currency-select")
  }

  function getOption(selectElement: HTMLSelectElement, optionLabelText: string): HTMLOptionElement {
    return within(selectElement).getByLabelText(optionLabelText)
  }

  test("should show amount to convert input element", () => {
    render(<Exchange />)
    const conversionAmountInput: HTMLInputElement = getConversionAmountInput()
    expect(conversionAmountInput.getAttribute("type")).toEqual("number")
    expect(conversionAmountInput.getAttribute("min")).toEqual("0.01")
    expect(conversionAmountInput.getAttribute("max")).toEqual("99999999")
  })

  describe("from currency", () => {
    test("should show 'from' currency dropdown", () => {
      render(<Exchange />)
      const fromCurrencyDropdown: HTMLSelectElement = getFromCurrencyDropdown()
      expect(fromCurrencyDropdown).toBeInTheDocument()
      expect(fromCurrencyDropdown).toHaveAttribute("required")
      const defaultOption: HTMLOptionElement = getOption(fromCurrencyDropdown,
        "default-from-currency")
      expect(defaultOption.selected).toBe(true)
      expect(defaultOption.textContent).toBe("-- select an option --")
    })

    test("should allow user to select 'from' currency", async () => {
      render(<Exchange />)
      const fromCurrencyDropdown: HTMLSelectElement = getFromCurrencyDropdown()
      const fromSgdOption: HTMLOptionElement = getOption(fromCurrencyDropdown, "from-SGD")
      expect(fromSgdOption.selected).toBeFalsy()
      await user.selectOptions(fromCurrencyDropdown, fromSgdOption)
      expect(fromSgdOption.selected).toBeTruthy()
    })
  })

  describe("to currency", () => {
    test("should show 'to' currency dropdown", () => {
      render(<Exchange />)
      const toCurrencyDropdown: HTMLSelectElement = getToCurrencyDropdown()
      expect(toCurrencyDropdown).toBeInTheDocument()
      expect(toCurrencyDropdown).toHaveAttribute("required")
      const defaultOption: HTMLOptionElement = getOption(toCurrencyDropdown,
        "default-to-currency")
      expect(defaultOption.selected).toBe(true)
      expect(defaultOption.textContent).toBe("-- select an option --")
    })

    test("should allow user to select 'to' currency", async () => {
      render(<Exchange />)
      const toCurrencyDropdown: HTMLSelectElement = getToCurrencyDropdown()
      const toSgdOption: HTMLOptionElement = getOption(toCurrencyDropdown, "to-SGD")
      expect(toSgdOption.selected).toBeFalsy()
      await user.selectOptions(toCurrencyDropdown, toSgdOption)
      expect(toSgdOption.selected).toBeTruthy()
    })
  })
})