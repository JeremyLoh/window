import React, { FC, useState } from "react"
import styles from "../../styles/components/exchange/EconomyDisplay.module.css"
import CardInfo from "../cardInfo"

export type Country = {
  alpha2Code: string,
  name: string,
  flag: string,
}

export type EconomyDisplayProps = {
  countries: Map<string, Country>
}

const EconomyDisplay:FC<EconomyDisplayProps> = (props) => {
  const [country, setCountry] = useState<string>("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO retrieve data from econdb api based on country alpha2Code
  }

  function handleCountryChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setCountry(event.target.value)
  }

  function getCountryInputOptions(): JSX.Element[] {
    return Array.from(props.countries.values()).map((country) => {
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
                  value={country}
                  onChange={handleCountryChange}
          >
            <option value="" aria-label="default-country" disabled hidden>
              -- select a country --
            </option>
            { props.countries && getCountryInputOptions() }
          </select>
        </div>
        <button type="submit">
          Get Economic Data
        </button>
      </form>
    </CardInfo>
  )
}

export default EconomyDisplay