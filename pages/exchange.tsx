import Head from "next/head"
import React, { useState } from "react"
import axios from "axios"
import produce from "immer"
import Emoji from "../components/emoji"
import CardInfo from "../components/cardInfo"
import Currency from "../components/currency"
import CurrencyConvertForm from "../components/exchange/currencyConvertForm"
import { CurrencyConvertResponse, RequestData } from "./api/exchange"
import styles from "../styles/pages/Exchange.module.css"

type ExchangeResult = {
  fromCurrency: string
  toCurrency: string
  amount: Currency
  rate: number
  result: number
} | null

export default function Exchange() {
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
      // TODO handle error
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
    <div className={styles.container}>
      <Head>
        <title>Window</title>
        <meta name="description" content="Exchange Rate" />
      </Head>

      <h1 className={styles.pageTitle}>
        Exchange {" "}
        <Emoji symbol="🌎" label="world" />
      </h1>

      <div className={styles.currencyConvertContainer} aria-label="currency-exchange-result">
        <CurrencyConvertForm handleSubmit={handleSubmit} />
        { exchangeResult &&
          <CardInfo>
            <h2>{ getCurrencyExchangeText() }</h2>
            <h2>{ `Exchange Rate: ${exchangeResult.rate}` }</h2>
          </CardInfo>
        }
      </div>
    </div>
  )
}