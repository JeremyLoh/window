import axios from "axios"
import Swal from "sweetalert2"
import { test, expect, describe, vi, beforeAll, afterEach } from "vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { UserEvent } from "@testing-library/user-event/setup/setup"

import Exchange from "../../../pages/exchange"
import { mockExchangeRate } from "../../serverSetup"
import {
  CurrencySymbolApiResponse,
  Symbol,
} from "../../../lib/exchange/currency/symbols"
import { HttpRequest, HttpResponse } from "../../../lib/request"

describe("exchange rate", () => {
  let symbols: Record<string, Symbol>

  beforeAll(async () => {
    const response: HttpResponse = await HttpRequest.get(
      "/api/exchange/currency/symbols"
    )
    const data: CurrencySymbolApiResponse = response.data
    symbols = data.symbols
  })

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

  function getOption(
    selectElement: HTMLSelectElement,
    optionLabelText: string
  ): HTMLOptionElement {
    return within(selectElement).getByLabelText(optionLabelText)
  }

  function getSubmitButton(): HTMLButtonElement {
    const form: HTMLElement = screen.getByLabelText("exchange-currency-form")
    return within(form).getByRole("button", { name: "Convert" })
  }

  test("should show amount to convert input element", () => {
    render(<Exchange symbols={symbols} countries={[]} />)
    const conversionAmountInput: HTMLInputElement = getConversionAmountInput()
    expect(conversionAmountInput.getAttribute("type")).toEqual("number")
    expect(conversionAmountInput.getAttribute("min")).toEqual("0.01")
    expect(conversionAmountInput.getAttribute("max")).toEqual("99999999")
  })

  describe("from currency", () => {
    test("should show 'from' currency dropdown", () => {
      render(<Exchange symbols={symbols} countries={[]} />)
      const fromCurrencyDropdown: HTMLSelectElement = getFromCurrencyDropdown()
      expect(fromCurrencyDropdown).toBeInTheDocument()
      expect(fromCurrencyDropdown).toHaveAttribute("required")
      const defaultOption: HTMLOptionElement = getOption(
        fromCurrencyDropdown,
        "default-from-currency"
      )
      expect(defaultOption.selected).toBe(true)
      expect(defaultOption.textContent).toBe("-- select an option --")
    })

    test("should allow user to select 'from' currency", async () => {
      render(<Exchange symbols={symbols} countries={[]} />)
      const fromCurrencyDropdown: HTMLSelectElement = getFromCurrencyDropdown()
      const fromSgdOption: HTMLOptionElement = getOption(
        fromCurrencyDropdown,
        "from-SGD"
      )
      expect(fromSgdOption.selected).toBeFalsy()
      await user.selectOptions(fromCurrencyDropdown, fromSgdOption)
      expect(fromSgdOption.selected).toBeTruthy()
    })
  })

  describe("to currency", () => {
    test("should show 'to' currency dropdown", () => {
      render(<Exchange symbols={symbols} countries={[]} />)
      const toCurrencyDropdown: HTMLSelectElement = getToCurrencyDropdown()
      expect(toCurrencyDropdown).toBeInTheDocument()
      expect(toCurrencyDropdown).toHaveAttribute("required")
      const defaultOption: HTMLOptionElement = getOption(
        toCurrencyDropdown,
        "default-to-currency"
      )
      expect(defaultOption.selected).toBe(true)
      expect(defaultOption.textContent).toBe("-- select an option --")
    })

    test("should allow user to select 'to' currency", async () => {
      render(<Exchange symbols={symbols} countries={[]} />)
      const toCurrencyDropdown: HTMLSelectElement = getToCurrencyDropdown()
      const toSgdOption: HTMLOptionElement = getOption(
        toCurrencyDropdown,
        "to-SGD"
      )
      expect(toSgdOption.selected).toBeFalsy()
      await user.selectOptions(toCurrencyDropdown, toSgdOption)
      expect(toSgdOption.selected).toBeTruthy()
    })
  })

  describe("convert currency", () => {
    const axiosSpy = vi.spyOn(axios, "post")
    const alertSpy = vi.spyOn(Swal, "fire")

    afterEach(() => {
      vi.restoreAllMocks()
    })

    function getCurrencyExchangeResult(): HTMLElement {
      return screen.getByLabelText(/currency-exchange-result/i)
    }

    async function submitCurrencyConvert(
      amount: string,
      fromCurrency: string,
      toCurrency: string
    ) {
      await user.type(getConversionAmountInput(), amount)
      await user.selectOptions(getFromCurrencyDropdown(), fromCurrency)
      await user.selectOptions(getToCurrencyDropdown(), toCurrency)
      await user.click(getSubmitButton())
    }

    test("should submit valid exchange request", async () => {
      render(<Exchange symbols={symbols} countries={[]} />)
      await submitCurrencyConvert("0.01", "SGD", "USD")
      expect(axiosSpy).toHaveBeenCalledOnce()
      expect(axiosSpy).toHaveBeenCalledWith("/api/exchange", {
        fromCurrencyCode: "SGD",
        toCurrencyCode: "USD",
        amount: 0.01,
      })
    })

    test("should not submit exchange request for invalid zero amount", async () => {
      render(<Exchange symbols={symbols} countries={[]} />)
      await submitCurrencyConvert("0", "SGD", "USD")
      expect(axiosSpy).not.toHaveBeenCalled()
    })

    test("should not submit exchange request for negative amount", async () => {
      render(<Exchange symbols={symbols} countries={[]} />)
      await expect(
        submitCurrencyConvert("-2", "SGD", "SGD")
      ).resolves.not.toThrowError()
      expect(axiosSpy).not.toHaveBeenCalled()
    })

    test("should not submit exchange request for same currency conversion", async () => {
      render(<Exchange symbols={symbols} countries={[]} />)
      await submitCurrencyConvert("10", "SGD", "SGD")
      expect(axiosSpy).not.toHaveBeenCalled()
      expect(alertSpy).toHaveBeenCalledTimes(1)
    })

    test("should display exchange result", async () => {
      render(<Exchange symbols={symbols} countries={[]} />)
      await submitCurrencyConvert("2", "SGD", "USD")
      const currencyExchangeResult: HTMLElement = getCurrencyExchangeResult()
      const expectedExchangeAmount: string = (mockExchangeRate * 2).toFixed(3)
      expect(currencyExchangeResult).toHaveTextContent(
        `2 SGD = ${expectedExchangeAmount} USD`
      )
      expect(currencyExchangeResult).toHaveTextContent(
        `Exchange Rate: ${mockExchangeRate}`
      )
    })
  })
})
