import React, { FC, useEffect, useState } from "react"
import CardInfo from "../cardInfo"
import { Cpi, getCPI } from "../../lib/exchange/economy/indicators"
import { Country } from "./economyDisplay"
import styles from "../../styles/components/exchange/EconomyCountryForm.module.css"

type EconomyCountryFormProps = {
  handleSubmit: (cpi: Cpi) => void,
  countries: Map<string, Country>,
}

const EconomyCountryForm:FC<EconomyCountryFormProps> = (props) => {
  const [countryAlphaTwoCode, setCountryAlphaTwoCode] = useState<string>("")
  const [countryOptions, setCountryOptions] = useState<JSX.Element[]>()

  useEffect(() => {
    function getCountryInputOptions(): JSX.Element[] {
      const countries: Array<Country> = Array.from(props.countries.values())
      return countries.map((country) => {
        return (
          <option key={country.alpha2Code}
                  value={country.alpha2Code}
                  aria-label={`economy-country-${country.name}`}
          >
            {country.name}
          </option>
        )
      })
    }
    setCountryOptions(getCountryInputOptions())
  }, [props.countries])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const cpi: Cpi = await getCPI(countryAlphaTwoCode)
    props.handleSubmit(cpi)
  }

  function handleCountryChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setCountryAlphaTwoCode(event.target.value)
  }

  return (
    <CardInfo>
      <h2>View Economic Data</h2>
      <form action="/api/exchange/economy/country"
            method="post"
            onSubmit={handleSubmit}
            aria-label="exchange-economy-form"
            className={styles.economyCountryForm}
      >
        <div className={styles.countryInput}>
          <label htmlFor="economy-country-select">Country</label>
          <select required
                  aria-label="economy-country-select"
                  value={countryAlphaTwoCode}
                  onChange={handleCountryChange}
          >
            <option value="" aria-label="default-country" disabled hidden>
              -- select a country --
            </option>
            { props.countries && countryOptions }
          </select>
        </div>
        <button type="submit">
          Get Economic Data
        </button>
      </form>
    </CardInfo>
  )
}

export default EconomyCountryForm