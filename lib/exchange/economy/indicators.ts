import { HttpRequest, HttpResponse, sleep } from "../../request"

export type Series = {
  ticker: string
  description: string
  geography: string
  dataset: string
  frequency: string
  units: string
}

type SeriesResponse = {
  count: number
  pages: number
  next: string | null
  previous: string | null
  results: Array<Series>
}

const ECONDB_KEY: string = process.env.ECONDB_API_KEY as string

export async function getCountrySeries(
  country: string
): Promise<Array<Series>> {
  const url: string = `https://www.econdb.com/api/series/?search=${country}&format=json&expand=meta&token=${ECONDB_KEY}`
  const response: HttpResponse = await HttpRequest.get(url)
  if (response.status !== 200) {
    throw new Error("Could not get series information for country")
  }
  let data: SeriesResponse = response.data
  let series: Array<Series> = data.results
  while (data.next != null) {
    const next: HttpResponse = await HttpRequest.get(data.next)
    if (next.status !== 200) {
      break
    }
    data = next.data
    series = series.concat(data.results)
    await sleep(0.35)
  }
  return series
}

export type EconomySeries = {
  ticker: string
  description: string
  geography: string
  frequency: string
  dataset: string
  units: string
  data: {
    values: Array<number>
    dates: Array<string>
  }
}

export async function getEconomySeries(series: string): Promise<EconomySeries> {
  const url: string = `https://www.econdb.com/api/series/${series}/?format=json&token=${ECONDB_KEY}`
  const response: HttpResponse = await HttpRequest.get(url)
  if (response.status !== 200) {
    throw new Error("Could not get series data")
  }
  return response.data
}
