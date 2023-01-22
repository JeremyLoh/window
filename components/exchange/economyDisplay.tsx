import React, { FC, useState } from "react"
import { Cpi } from "../../lib/exchange/economy/indicators"
import LineChart from "../chart/lineChart"
import EconomyCountryForm from "./economyCountryForm"
import { InvalidDataToast } from "../alert/error"

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
    if (cpi.values.length === 0 || cpi.dates.length === 0) {
      await InvalidDataToast.fire({
        title: "CPI data unavailable",
      })
      return
    }
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