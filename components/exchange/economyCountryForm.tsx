import React, { FC, useEffect, useState } from "react"
import CardInfo from "../cardInfo"
import { Cpi, getCPI, getCountrySeries } from "../../lib/exchange/economy/indicators"
import { Country } from "./economyDisplay"
import Select, { ActionMeta, GroupBase, StylesConfig } from "react-select"
import styles from "../../styles/components/exchange/EconomyCountryForm.module.css"

type EconomyCountryFormProps = {
  handleSubmit: (cpi: Cpi) => void,
  countries: Map<string, Country>,
}

type Option = {
  key: string,
  label: string,
  value: string,
}

const multiSelectStyles: StylesConfig<Option, true, GroupBase<Option>> = {
  option: (provided, state) => {
    return {
      ...provided,
      color: "black",
    }
  },
  control: (provided, state) => {
    return {
      ...provided,
      color: "black",
    }
  },
  singleValue: (provided, state) => {
    return {
      ...provided,
      color: "black",
    }
  }
}

const EconomyCountryForm:FC<EconomyCountryFormProps> = (props) => {
  const [countryName, setCountryName] = useState<string>("")
  const [countryOptions, setCountryOptions] = useState<JSX.Element[]>()
  const [series, setSeries] = useState<Array<Option>>([])
  const [selectedSeries, setSelectedSeries] = useState<Array<Option>>([])

  useEffect(() => {
    function getCountryInputOptions(): JSX.Element[] {
      const countries: Array<Country> = Array.from(props.countries.values())
      return countries.map((country) => {
        return (
          <option key={country.alpha2Code}
                  value={country.name}
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
    const country: Country | undefined = props.countries.get(countryName)
    if (country == null) {
      return
    }
    const cpi: Cpi = await getCPI(country.alpha2Code)
    props.handleSubmit(cpi)
  }

  async function handleCountryChange(event: React.ChangeEvent<HTMLSelectElement>): Promise<void> {
    const countryName = event.target.value
    const country: Country | undefined = props.countries.get(countryName)
    if (country == null) {
      return
    }
    setCountryName(countryName)
    // todo update list of series available, cache results of query
    // const data = await getCountrySeries(country.name)
  }

  function handleSeriesChange(option: readonly Option[], actionMeta: ActionMeta<Option>): void {
    setSelectedSeries(option.map((o) => o))
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
        <div className={styles.dropdownContainer}>
          <label htmlFor="economy-country-select">Country</label>
          <select required
                  aria-label="economy-country-select"
                  value={countryName}
                  onChange={handleCountryChange}
          >
            <option value="" aria-label="default-country" disabled hidden>
              -- select a country --
            </option>
            { props.countries && countryOptions }
          </select>
        </div>
        {
          (series.length > 0) && (
            <div className={styles.dropdownContainer}>
              <label htmlFor="economy-country-series">Series</label>
              <Select aria-label="economy-country-series"
                      name="economy-country-series"
                      required
                      isMulti
                      options={series}
                      value={selectedSeries}
                      onChange={handleSeriesChange}
                      styles={multiSelectStyles}
              />
            </div>
          )
        }
        <button type="submit" className={styles.submitButton}>
          Get Economic Data
        </button>
      </form>
    </CardInfo>
  )
}

export default EconomyCountryForm