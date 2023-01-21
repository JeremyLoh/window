import axios, { AxiosResponse } from "axios"

type CpiResponse = {
  ticker: string,
  description: string,
  geography: string,
  frequency: string,
  dataset: string,
  units: string,
  data: {
    values: Array<number>,
    dates: Array<string>,
  }
}

export type Cpi = {
  ticker: string,
  description: string,
  dates: Array<string>,
  values: Array<number>,
}

export async function getCPI(countryAlphaTwoCode: string): Promise<Cpi> {
  const url: string = `https://www.econdb.com/api/series/CPI${countryAlphaTwoCode}/?format=json`
  const response: AxiosResponse = await axios.get(url)
  if (response.status !== 200) {
    throw new Error(`Could not get CPI data for ${countryAlphaTwoCode}`)
  }
  const cpiData: CpiResponse = response.data
  return extractCpiData(cpiData)
}

function extractCpiData(cpiData: CpiResponse): Cpi {
  return {
    ticker: cpiData.ticker,
    description: cpiData.description,
    dates: cpiData.data.dates,
    values: cpiData.data.values,
  }
}