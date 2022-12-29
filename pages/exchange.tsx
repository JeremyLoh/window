import Head from "next/head"
import React, { useState } from "react"
import axios from "axios"
import Currency from "../components/currency"
import Emoji from "../components/emoji"
import { RequestData } from "./api/exchange"
import styles from "../styles/pages/Exchange.module.css"

export default function Exchange() {
  const [amount, setAmount] = useState<Currency>(new Currency(0))
  const [fromCurrency, setFromCurrency] = useState<string>("")
  const [toCurrency, setToCurrency] = useState<string>("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(fromCurrency, toCurrency, amount.getAmountInDollars())
    const body: RequestData = {
      fromCurrencyCode: fromCurrency,
      toCurrencyCode: toCurrency,
      amount: amount.getAmountInDollars(),
    }
    const response = await axios.post("/api/exchange", body)
    console.log(JSON.stringify(response.data))
    // TODO Display results
  }

  function handleFromCurrencyChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setFromCurrency(event.target.value)
  }

  function handleToCurrencyChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setToCurrency(event.target.value)
  }

  function handleChangeAmount(event: React.ChangeEvent<HTMLInputElement>): void {
    const amountInCents: number = parseFloat(event.target.value) * 100
    setAmount(new Currency(amountInCents))
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

      <form action="/api/exchange"
            method="post"
            onSubmit={handleSubmit}
            className={styles.currencyForm}
            aria-label="exchange-currency-form"
      >
        <div className={styles.currencyFormInput}>
          <label htmlFor="conversion-amount">Conversion Amount</label>
          <input type="number"
                 required
                 id="conversion-amount"
                 min="0.01"
                 max="99999999"
                 step="0.01"
                 value={String(amount.getAmountInDollars())}
                 onChange={handleChangeAmount}
                 className={styles.input}
          />
        </div>
        <div className={styles.currencyFormInput}>
          <label htmlFor="from-currency-select">From</label>
          <select required
                  value={fromCurrency}
                  onChange={handleFromCurrencyChange}
                  aria-label="from-currency-select"
                  className={styles.input}
          >
            <option value="" aria-label="default-from-currency" disabled hidden>
              -- select an option --
            </option>
            <option value="SGD" aria-label="from-SGD">SGD - Singapore Dollar</option>
            <option value="USD" aria-label="from-USD">USD - United States Dollar</option>
          </select>
        </div>
        <div className={styles.currencyFormInput}>
          <label htmlFor="to-currency-select">To</label>
          <select required
                  value={toCurrency}
                  onChange={handleToCurrencyChange}
                  aria-label="to-currency-select"
                  className={styles.input}
          >
            <option value="" aria-label="default-to-currency" disabled hidden>
              -- select an option --
            </option>
            <option value="SGD" aria-label="to-SGD">SGD - Singapore Dollar</option>
            <option value="USD" aria-label="to-USD">USD - United States Dollar</option>
          </select>
        </div>
        <button type="submit" className={styles.currencyFormButton}>
          Convert
        </button>
      </form>
    </div>
  )
}