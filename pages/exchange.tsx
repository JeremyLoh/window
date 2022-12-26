import Head from "next/head"
import React, { useState } from "react"
import axios from "axios"
import Currency from "../components/currency"
import { RequestData } from "./api/exchange"

export default function Exchange() {
  const [amount, setAmount] = useState<Currency>(new Currency(0))

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const body: RequestData = {
      fromCurrencyCode: "USD", // TODO CHANGE TO USER FORM INPUT VALUE
      toCurrencyCode: "SGD", // TODO CHANGE TO USER FORM INPUT VALUE
      amount: amount.getAmountInDollars(),
    }
    const response = await axios.post("/api/exchange", body)
    console.log(JSON.stringify(response.data))
    // TODO Display results
  }

  function handleChangeAmount(event: React.ChangeEvent<HTMLInputElement>): void {
    const amountInCents: number = parseFloat(event.target.value) * 100
    setAmount(new Currency(amountInCents))
  }

  return (
    <div>
      <Head>
        <title>Window</title>
        <meta name="description" content="Exchange Rate" />
      </Head>

      <form action="/api/exchange"
            method="post"
            onSubmit={handleSubmit}
      >
        <label htmlFor="conversion-amount">Conversion Amount</label>
        <input type="number"
               required
               id="conversion-amount"
               min="0.01"
               max="99999999"
               step="0.01"
               value={String(amount.getAmountInDollars())}
               onChange={handleChangeAmount}
        />

        <label htmlFor="from-currency-select">From</label>
        <select required defaultValue="" aria-label="from-currency-select">
          <option value="" aria-label="default-from-currency" disabled hidden>
            -- select an option --
          </option>
          <option value="SGD" aria-label="from-SGD">SGD - Singapore Dollar</option>
          <option value="USD" aria-label="from-USD">USD - United States Dollar</option>
        </select>

        <label htmlFor="to-currency-select">To</label>
        <select required defaultValue="" aria-label="to-currency-select">
          <option value="" aria-label="default-to-currency" disabled hidden>
            -- select an option --
          </option>
          <option value="SGD" aria-label="to-SGD">SGD - Singapore Dollar</option>
          <option value="USD" aria-label="to-USD">USD - United States Dollar</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}