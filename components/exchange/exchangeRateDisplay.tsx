import React, { FC, useState } from "react"
import axios from "axios"
import produce from "immer"
import Swal from "sweetalert2"
import CardInfo from "../cardInfo"
import CurrencyConvertForm from "./currencyConvertForm"
import Currency from "../currency"
import { Symbol } from "../../lib/exchange/currency/symbols"
import { CurrencyConvertResponse, RequestData } from "../../pages/api/exchange"
import styles from "../../styles/pages/Exchange.module.css"

type ExchangeRateDisplayProps = {
  symbols:  Record<string, Symbol>
}

type ExchangeResult = {
  fromCurrency: string
  toCurrency: string
  amount: Currency
  rate: number
  result: number
} | null

const InvalidDataToast = Swal.mixin({
  icon: "info",
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  width: "42em",
})

const ExchangeRateDisplay:FC<ExchangeRateDisplayProps> = (props) => {
  const [exchangeResult, setExchangeResult] = useState<ExchangeResult>(null)

  async function handleSubmit(fromCurrency: string, toCurrency: string, amount: Currency) {
    const body: RequestData = {
      fromCurrencyCode: fromCurrency,
      toCurrencyCode: toCurrency,
      amount: amount.getAmountInDollars(),
    }
    const response = await axios.post("/api/exchange", body)
    const {rate, result}: CurrencyConvertResponse = response.data
    if (rate == null || result == null) {
      await InvalidDataToast.fire({
        title: "Currency conversion data unavailable",
      })
      return
    }
    setExchangeResult(produce((draft) => {
      draft = {
        fromCurrency,
        toCurrency,
        amount,
        rate,
        result
      }
      return draft
    }))
  }

  function getCurrencyExchangeText() {
    return `${exchangeResult?.amount.getAmountInDollars()} ${exchangeResult?.fromCurrency}` +
      ` = ${exchangeResult?.result} ${exchangeResult?.toCurrency}`
  }

  return (
    <div className={styles.currencyConvertContainer} aria-label="currency-exchange-result">
      <CurrencyConvertForm handleSubmit={handleSubmit}
                           symbols={props.symbols} />
      { exchangeResult &&
        <CardInfo>
          <h2>{ getCurrencyExchangeText() }</h2>
          <h2>{ `Exchange Rate: ${exchangeResult.rate}` }</h2>
        </CardInfo>
      }
    </div>
  )
}

export default ExchangeRateDisplay