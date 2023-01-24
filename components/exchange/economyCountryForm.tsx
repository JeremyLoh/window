import React, { FC, useEffect, useState } from "react"
import Select, { ActionMeta, GroupBase, StylesConfig } from "react-select"
import produce from "immer"
import CardInfo from "../cardInfo"
import { getCountrySeries, Series } from "../../lib/exchange/economy/indicators"
import { Country } from "./economyDisplay"

type EconomyCountryFormProps = {
  handleSubmit: (selectedSeries: Array<string>) => void
  countries: Map<string, Country>
}

type Option = {
  key: string
  label: string
  value: string
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
  },
}

const EconomyCountryForm: FC<EconomyCountryFormProps> = (props) => {
  const [countryName, setCountryName] = useState<string>("")
  const [countryOptions, setCountryOptions] = useState<JSX.Element[]>()
  const [selectedSeries, setSelectedSeries] = useState<Array<Option>>([])
  const [seriesBasedOnSelectedCountry, setSeriesBasedOnSelectedCountry] =
    useState<Array<Option>>([])
  const [allSeries, setAllSeries] = useState<Map<string, Series[]>>(new Map())

  useEffect(() => {
    function getCountryInputOptions(): JSX.Element[] {
      const countries: Array<Country> = Array.from(props.countries.values())
      return countries.map((country) => {
        return (
          <option
            key={country.alpha2Code}
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
    props.handleSubmit(selectedSeries.map((series) => series.value))
  }

  async function handleCountryChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ): Promise<void> {
    const countryName = event.target.value
    setSelectedSeries([])
    setCountryName(countryName)
    // @ts-ignore
    const countrySeries: Series[] = allSeries.has(countryName)
      ? allSeries.get(countryName)
      : await getCountrySeries(countryName)
    setAllSeries(
      produce((draft) => {
        draft.set(countryName, countrySeries)
      })
    )
    setSeriesBasedOnSelectedCountry(convertToSelectOptions(countrySeries))
  }

  function handleSeriesChange(
    option: readonly Option[],
    actionMeta: ActionMeta<Option>
  ): void {
    setSelectedSeries(option.map((o) => o))
  }

  return (
    <CardInfo>
      <h2>View Economic Data</h2>
      <form
        className="flex flex-col justify-center gap-4 sm:w-full"
        action="/api/exchange/economy/country"
        method="post"
        onSubmit={handleSubmit}
        aria-label="exchange-economy-form"
      >
        <div className="flex w-full flex-col">
          <label htmlFor="economy-country-select">Country</label>
          <select
            required
            aria-label="economy-country-select"
            value={countryName}
            onChange={handleCountryChange}
          >
            <option value="" aria-label="default-country" disabled hidden>
              -- select a country --
            </option>
            {props.countries && countryOptions}
          </select>
        </div>
        {
          <div className="flex w-full flex-col">
            <label htmlFor="economy-country-series">Series</label>
            <Select
              aria-label="economy-country-series"
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
        }
        <button
          type="submit"
          className="rounded-md bg-cyan-300 px-3.5 text-base text-black hover:bg-cyan-500 sm:w-full md:w-4/12"
        >
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
