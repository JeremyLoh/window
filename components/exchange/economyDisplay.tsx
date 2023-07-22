import React, { FC, useState } from "react"
import pLimit from "p-limit"
import { EconomySeries } from "../../lib/exchange/economy/indicators"
import LineChart from "../chart/lineChart"
import EconomyCountryForm from "./economyCountryForm"
import { errorToast } from "../alert/error"
import Carousel from "../carousel"
import { HttpRequest } from "../../lib/request"

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
    const promises = series.map((s) =>
      limit(() =>
        HttpRequest.get(
          `${location.origin}/api/exchange/economy/series?series=${s}`
        ).then((response) => response.data as EconomySeries)
      )
    )
    try {
      const result = await Promise.all(promises)
      setData(result)
    } catch (error) {
      await errorToast.fire({
        title: "Could not obtain data for selected country",
      })
    }
  }

  return (
    <div className="flex w-full flex-col md:w-4/5">
      <div className="z-10">
        <EconomyCountryForm
          handleSubmit={handleSubmit}
          countries={props.countries}
        />
      </div>
      <Carousel
        keys={data.map((economySeries: EconomySeries) => economySeries.ticker)}
        items={data.map((economySeries: EconomySeries) => {
          return (
            <div
              key={`ticker-${economySeries.ticker}`}
              className="h-[50vh] py-8 md:h-[80vh]"
            >
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
      />
    </div>
  )
}

export default EconomyDisplay
