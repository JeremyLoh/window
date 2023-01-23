import React, { FC, useEffect, useState } from "react"
import Select, { ActionMeta, GroupBase, StylesConfig } from "react-select"
import produce from "immer"
import CardInfo from "../cardInfo"
import { Cpi, getCountrySeries, getCPI, Series } from "../../lib/exchange/economy/indicators"
import { Country } from "./economyDisplay"
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
  const [selectedSeries, setSelectedSeries] = useState<Array<Option>>([])
  const [seriesBasedOnSelectedCountry, setSeriesBasedOnSelectedCountry] = useState<Array<Option>>([])
  const [allSeries, setAllSeries] = useState<Map<string, Series[]>>(new Map())

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
    setSelectedSeries([])
    setCountryName(countryName)
    // @ts-ignore
    const countrySeries: Series[] = allSeries.has(countryName) ? allSeries.get(countryName)
      : await getCountrySeries(countryName)
    setAllSeries(produce((draft) => {
      draft.set(countryName, countrySeries)
    }))
    setSeriesBasedOnSelectedCountry(convertToSelectOptions(countrySeries))
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
           (
            <div className={styles.dropdownContainer}>
              <label htmlFor="economy-country-series">Series</label>
                <Select aria-label="economy-country-series"
                        name="economy-country-series"
                        placeholder={"-- select a series --"}
                        required
                        isMulti
                        options={seriesBasedOnSelectedCountry}
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

function convertToSelectOptions(countrySeries: Series[]): Option[] {
  return countrySeries.map((series: Series) => {
    return {
      key: series.ticker,
      label: series.description,
      value: series.ticker,
    }
  })
}

export default EconomyCountryForm