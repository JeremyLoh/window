import React, { FC, useState } from "react"
import pLimit from "p-limit"
import {
  EconomySeries,
  getEconomySeries,
} from "../../lib/exchange/economy/indicators"
import LineChart from "../chart/lineChart"
import EconomyCountryForm from "./economyCountryForm"
import { InvalidDataToast } from "../alert/error"

export type Country = {
  alpha2Code: string
  name: string
  flag: string
}

const limit = pLimit(3)

export type EconomyDisplayProps = {
  countries: Map<string, Country>
}

const EconomyDisplay: FC<EconomyDisplayProps> = (props) => {
  const [data, setData] = useState<Array<EconomySeries>>([])

  async function handleSubmit(series: Array<string>) {
    // todo if returned data has "values" or "dates" that are empty, there is no data present
    const promises = series.map((s) => limit(() => getEconomySeries(s)))
    try {
      const result = await Promise.all(promises)
      setData(result)
    } catch (error) {
      await InvalidDataToast.fire({
        title: "Could not obtain data for selected country",
      })
    }
  }

  return (
    <div className="flex w-4/5 flex-col">
      <EconomyCountryForm
        handleSubmit={handleSubmit}
        countries={props.countries}
      />
      {data.map((economySeries: EconomySeries) => {
        return (
          <div key={economySeries.ticker} className="relative h-full w-full">
            <LineChart
              ariaLabel={`${economySeries.ticker}-graph`}
              title={`${economySeries.ticker} - ${economySeries.description}`}
              description={`${economySeries.description}`}
              xLabels={economySeries.data.dates}
              yLabelData={economySeries.data.values}
            />
          </div>
        )
      })}
    </div>
  )
}

export default EconomyDisplay
