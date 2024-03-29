import React, { FC, useEffect, useState } from "react"
import Select, { ActionMeta, GroupBase, StylesConfig } from "react-select"
import { produce } from "immer"
import CardInfo from "../cardInfo"
import { Series } from "../../lib/exchange/economy/indicators"
import { Country } from "./economyDisplay"
import { HttpRequest } from "../../lib/request"

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
      : (
          await HttpRequest.get(
            `${location.origin}/api/exchange/economy/country?country=${countryName}`
          )
        ).data
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
      <h2 className="text-xl">View Economic Data</h2>
      <form
        className="flex flex-col justify-center gap-4 text-black sm:w-full"
        method="post"
        onSubmit={handleSubmit}
        aria-label="exchange-economy-form"
      >
        <div className="flex w-full flex-col">
          <label className="text-white" htmlFor="economy-country-select">
            Country
          </label>
          <select
            required
            data-test="economy-country-select"
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
            <label className="text-white" htmlFor="economy-country-series">
              Series
            </label>
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
          className="rounded-md bg-cyan-600 px-2 py-3 text-base text-white transition-colors
                     hover:bg-cyan-700 sm:w-full md:w-3/12"
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
