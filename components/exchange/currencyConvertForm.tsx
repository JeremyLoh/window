import React, { FC, useState } from "react"
import Swal from "sweetalert2"
import Currency from "../currency"
import { Symbol } from "../../lib/exchange/currency/symbols"

const ErrorToast = Swal.mixin({
  icon: "error",
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  width: "42em",
})

interface CurrencyConvertFormProps {
  handleSubmit: (
    fromCurrency: string,
    toCurrency: string,
    amount: Currency
  ) => void
  symbols: Record<string, Symbol>
}

const CurrencyConvertForm: FC<CurrencyConvertFormProps> = (props) => {
  const [amount, setAmount] = useState<string>("")
  const [fromCurrency, setFromCurrency] = useState<string>("")
  const [toCurrency, setToCurrency] = useState<string>("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (fromCurrency === toCurrency) {
      await ErrorToast.fire({
        title: "Invalid currency chosen",
        text: "Currency chosen for conversion should be different",
      })
      return
    }
    props.handleSubmit(
      fromCurrency,
      toCurrency,
      new Currency(parseFloat(amount) * 100)
    )
  }

  function handleFromCurrencyChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    setFromCurrency(event.target.value)
  }

  function handleToCurrencyChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setToCurrency(event.target.value)
  }

  function handleChangeAmount(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setAmount(event.target.value)
  }

  function getCurrencyInputOptions(prepend: string): JSX.Element[] {
    return Object.entries(props.symbols).map(([currencyCode, symbol]) => {
      const label: string = `${prepend}-${currencyCode}`
      return (
        <option value={currencyCode} key={label} aria-label={label}>
          {`${currencyCode} - ${symbol.description}`}
        </option>
      )
    })
  }

  return (
    <form
      action="/api/exchange"
      method="post"
      onSubmit={handleSubmit}
      className="flex w-full flex-col justify-center gap-4 lg:flex-row"
      aria-label="exchange-currency-form"
    >
      <div className="flex flex-col">
        <label htmlFor="conversion-amount">Conversion Amount</label>
        <input
          data-test="conversion-amount"
          type="number"
          required
          id="conversion-amount"
          min="0.01"
          max="99999999"
          step="0.01"
          value={amount}
          onChange={handleChangeAmount}
          className="font-lg h-full w-full px-4 py-2 text-black"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="from-currency-select">From</label>
        <select
          required
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          data-test="from-currency-select"
          aria-label="from-currency-select"
          className="font-lg h-full w-full px-4 py-2 text-black"
        >
          <option value="" aria-label="default-from-currency" disabled hidden>
            -- select an option --
          </option>
          {props.symbols && getCurrencyInputOptions("from")}
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="to-currency-select">To</label>
        <select
          required
          value={toCurrency}
          onChange={handleToCurrencyChange}
          data-test="to-currency-select"
          aria-label="to-currency-select"
          className="font-lg h-full w-full px-4 py-2 text-black"
        >
          <option value="" aria-label="default-to-currency" disabled hidden>
            -- select an option --
          </option>
          {props.symbols && getCurrencyInputOptions("to")}
        </select>
      </div>
      <button
        type="submit"
        className="items-center rounded bg-cyan-600 px-4 py-2 text-white transition-colors hover:bg-cyan-700"
      >
        Convert
      </button>
    </form>
  )
}

export default CurrencyConvertForm
