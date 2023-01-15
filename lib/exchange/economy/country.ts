import axios, { AxiosResponse } from "axios"
import { Country } from "../../../components/exchange/economyDisplay"

export type CountryDetails = {
  name: {
    common: string,
    official: string,
  },
  cca2: string,
  capital: Array<string>,
  flag: string,
}

export type RestCountryResponse = Array<CountryDetails>

export async function getCountries(): Promise<Array<Country>> {
  const url: string = "https://restcountries.com/v3.1/all?fields=name,cca2,flag"
  const response: AxiosResponse = await axios.get(url)
  if (response.status !== 200) {
    throw new Error("External Rest Countries API is down")
  }
  const data: RestCountryResponse = response.data
  return data.map((country: CountryDetails) => {
    const {name, cca2, flag} = country
    return {
      alpha2Code: cca2,
      name: name.common,
      flag,
    }
  })
}