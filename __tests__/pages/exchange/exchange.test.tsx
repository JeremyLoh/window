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

  function getSubmitButton(): HTMLButtonElement {
    const form: HTMLElement = screen.getByLabelText("exchange-currency-form")
    return within(form).getByRole("button", { name: "Convert" })
  }

  describe("convert currency", () => {
    const httpRequestSpy = vi.spyOn(HttpRequest, "post")
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
