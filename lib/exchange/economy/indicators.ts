import axios, { AxiosResponse } from "axios"
import { sleep } from "../../request"

export type Series = {
  ticker: string,
  description: string,
  geography: string,
  dataset: string,
  frequency: string,
  units: string,
}

type SeriesResponse = {
  count: number,
  pages: number,
  next: string | null,
  previous: string | null,
  results: Array<Series>,
}

export async function getCountrySeries(country: string): Promise<Array<Series>> {
  const url: string = `https://www.econdb.com/api/series/?search=${country}&format=json&expand=meta`
  const response: AxiosResponse = await axios.get(url)
  if (response.status !== 200) {
    throw new Error(`Could not get series information for country: ${country}`)
  }
  let data: SeriesResponse = response.data
  let series: Array<Series> = data.results
  while (data.next != null) {
    const next: AxiosResponse = await axios.get(data.next)
    data = next.data
    series = series.concat(data.results)
    await sleep(0.3)
  }
  return series
}

export type EconomySeries = {
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

export async function getEconomySeries(series: string): Promise<EconomySeries> {
  const url: string = `https://www.econdb.com/api/series/${series}/?format=json`
  const response: AxiosResponse = await axios.get(url)
  if (response.status !== 200) {
    throw new Error(`Could not get series data for ${series}`)
  }
  return response.data
}