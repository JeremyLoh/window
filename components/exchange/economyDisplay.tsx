import React, { FC, useEffect, useState } from "react"
import CardInfo from "../cardInfo"
import { Cpi, getCPI } from "../../lib/exchange/economy/indicators"
import LineChart from "../chart/lineChart"
import styles from "../../styles/components/exchange/EconomyDisplay.module.css"

export type Country = {
  alpha2Code: string,
  name: string,
  flag: string,
}

export type EconomyDisplayProps = {
  countries: Map<string, Country>
}

const EconomyDisplay:FC<EconomyDisplayProps> = (props) => {
  const [countryAlphaTwoCode, setCountryAlphaTwoCode] = useState<string>("")
  const [countryOptions, setCountryOptions] = useState<JSX.Element[]>()
  const [cpiData, setCpiData] = useState<Cpi>()

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
    // todo check if "data" of response.data is { dates: [], values: [], status: [] }, it is not available

    setCpiData(cpi)
  }

  function handleCountryChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setCountryAlphaTwoCode(event.target.value)
  }

  return (
    <div style={{display: "flex", flexDirection: "column", width: "80%"}}>
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
      {
        cpiData && (
          <div style={{position: "relative", width: "100%", height: "100%"}}>
            <LineChart ariaLabel="cpi-graph"
                       title={`${cpiData.ticker} - ${cpiData.description}`}
                       description={`${cpiData.description}`}
                       xLabels={cpiData.dates}
                       yLabelData={cpiData.values} />
        </div>)
      }
    </div>
  )
}

export default EconomyDisplay