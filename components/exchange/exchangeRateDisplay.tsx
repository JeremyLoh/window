import React, { FC, useState } from "react"
import { produce } from "immer"
import CardInfo from "../cardInfo"
import CurrencyConvertForm from "./currencyConvertForm"
import Currency from "../currency"
import { Symbol } from "../../lib/exchange/currency/symbols"
import { CurrencyConvertResponse, RequestData } from "../../pages/api/exchange"
import { errorToast } from "../alert/error"
import { HttpRequest, HttpResponse } from "../../lib/request"

type ExchangeRateDisplayProps = {
  symbols: Record<string, Symbol>
}

type ExchangeResult = {
  fromCurrency: string
  toCurrency: string
  amount: Currency
  rate: number
  result: number
} | null

const ExchangeRateDisplay: FC<ExchangeRateDisplayProps> = (props) => {
  const [exchangeResult, setExchangeResult] = useState<ExchangeResult>(null)

  async function handleSubmit(
    fromCurrency: string,
    toCurrency: string,
    amount: Currency
  ) {
    const body: RequestData = {
      fromCurrencyCode: fromCurrency,
      toCurrencyCode: toCurrency,
      amount: amount.getAmountInDollars(),
    }
    const response: HttpResponse = await HttpRequest.post("/api/exchange", body)
    const { rate, result }: CurrencyConvertResponse = response.data
    if (rate == null || result == null) {
      await errorToast.fire({
        title: "Currency conversion data unavailable",
      })
      return
    }
    setExchangeResult(
      produce((draft) => {
        draft = {
          fromCurrency,
          toCurrency,
          amount,
          rate,
          result,
        }
        return draft
      })
    )
  }

  function getCurrencyExchangeText() {
    return (
      `${exchangeResult?.amount.getAmountInDollars()} ${
        exchangeResult?.fromCurrency
      }` + ` = ${exchangeResult?.result} ${exchangeResult?.toCurrency}`
    )
  }

  return (
    <div
      className="flex w-4/5 flex-col gap-4 py-4"
      aria-label="currency-exchange-result"
      data-test="currency-exchange-result"
    >
      <CurrencyConvertForm
        handleSubmit={handleSubmit}
        symbols={props.symbols}
      />
      {exchangeResult && (
        <CardInfo>
          <h2 data-test="exchange-rate-conversion" className="text-xl">
            {getCurrencyExchangeText()}
          </h2>
          <h2 data-test="exchange-rate" className="text-xl">
            {`Exchange Rate: ${exchangeResult.rate}`}
          </h2>
        </CardInfo>
      )}
    </div>
  )
}

export default ExchangeRateDisplay
