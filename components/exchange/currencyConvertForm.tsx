import React, { FC, useState } from "react"
import Swal from "sweetalert2"
import Currency from "../currency"
import styles from "../../styles/components/exchange/CurrencyConvertForm.module.css"

const ErrorToast = Swal.mixin({
  icon: "error",
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  width: "42em",
})

interface CurrencyConvertFormProps {
  handleSubmit:  (fromCurrency: string, toCurrency: string, amount: Currency) => void
}

const CurrencyConvertForm:FC<CurrencyConvertFormProps> = (props) => {
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
    props.handleSubmit(fromCurrency, toCurrency, new Currency(parseFloat(amount) * 100))
  }

  function handleFromCurrencyChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setFromCurrency(event.target.value)
  }

  function handleToCurrencyChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setToCurrency(event.target.value)
  }

  function handleChangeAmount(event: React.ChangeEvent<HTMLInputElement>): void {
    setAmount(event.target.value)
  }

  return (
    <>
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
                 value={amount}
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
    </>
  )
}

export default CurrencyConvertForm