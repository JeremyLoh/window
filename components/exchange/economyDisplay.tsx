import React, { FC, useState } from "react"
import { Cpi } from "../../lib/exchange/economy/indicators"
import LineChart from "../chart/lineChart"
import EconomyCountryForm from "./economyCountryForm"

export type Country = {
  alpha2Code: string,
  name: string,
  flag: string,
}

export type EconomyDisplayProps = {
  countries: Map<string, Country>
}

const EconomyDisplay:FC<EconomyDisplayProps> = (props) => {
  const [cpiData, setCpiData] = useState<Cpi>()

  async function handleSubmit(cpi: Cpi) {
    // todo check if "data" of response.data is { dates: [], values: [], status: [] }, it is not available
    setCpiData(cpi)
  }

  return (
    <div style={{display: "flex", flexDirection: "column", width: "80%"}}>
      <EconomyCountryForm handleSubmit={handleSubmit} countries={props.countries} />
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