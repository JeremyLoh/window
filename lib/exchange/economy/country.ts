import axios, { AxiosResponse } from "axios"
import * as TimSort from "timsort"
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
  const data: RestCountryResponse = getAvailableCountryCodes(response.data)
  TimSort.sort(data, (a: CountryDetails, b: CountryDetails) =>
    a.name.common.localeCompare(b.name.common))
  return data.map((country: CountryDetails) => {
    const {name, cca2, flag} = country
    return {
      alpha2Code: cca2,
      name: name.common,
      flag,
    }
  })
}

const availableCountryData: [string, string][] = [
  ["AL", "Albania"], ["DZ", "Algeria"], ["AO", "Angola"], ["AR", "Argentina"], ["AU", "Australia"],
  ["AT", "Austria"], ["AZ", "Azerbaijan"], ["BD", "Bangladesh"], ["BY", "Belarus"],
  ["BE", "Belgium"], ["BO", "Bolivia"], ["BA", "Bosnia And Herzegovina"], ["BR", "Brazil"],
  ["BG", "Bulgaria"], ["KH", "Cambodia"], ["CA", "Canada"], ["CL", "Chile"], ["CN", "China"],
  ["CO", "Colombia"], ["CR", "Costa Rica"], ["HR", "Croatia"], ["CY", "Cyprus"], ["CZ", "Czechia"],
  ["CD", "Democratic Republic Of Congo"], ["DK", "Denmark"], ["DO", "Dominican Republic"],
  ["EC", "Ecuador"], ["EG", "Egypt"], ["SV", "El Salvador"], ["EE", "Estonia"], ["ET", "Ethiopia"],
  ["EU", "European Union"], ["FI", "Finland"], ["FR", "France"], ["DE", "Germany"], ["GH", "Ghana"],
  ["GR", "Greece"], ["GT", "Guatemala"], ["HN", "Honduras"], ["HK", "Hong Kong"], ["HU", "Hungary"],
  ["IN", "India"], ["ID", "Indonesia"], ["IR", "Iran"], ["IQ", "Iraq"], ["IE", "Ireland"],
  ["IL", "Israel"], ["IT", "Italy"], ["JP", "Japan"], ["JO", "Jordan"], ["KZ", "Kazakhstan"],
  ["KE", "Kenya"], ["KW", "Kuwait"], ["KG", "Kyrgyzstan"], ["LA", "Laos"], ["LV", "Latvia"],
  ["LB", "Lebanon"], ["LY", "Libya"], ["LT", "Lithuania"], ["LU", "Luxembourg"], ["MO", "Macao"],
  ["MY", "Malaysia"], ["MX", "Mexico"], ["MN", "Mongolia"], ["MA", "Morocco"], ["MM", "Myanmar"],
  ["NP", "Nepal"], ["NL", "Netherlands"], ["NZ", "New Zealand"], ["NI", "Nicaragua"],
  ["NG", "Nigeria"], ["NO", "Norway"], ["OM", "Oman"], ["PK", "Pakistan"], ["PA", "Panama"],
  ["PY", "Paraguay"], ["PE", "Peru"], ["PH", "Philippines"], ["PL", "Poland"], ["PT", "Portugal"],
  ["QA", "Qatar"], ["RO", "Romania"], ["RU", "Russian Federation"], ["SA", "Saudi Arabia"],
  ["SN", "Senegal"], ["RS", "Serbia"], ["SG", "Singapore"], ["SK", "Slovakia"], ["SI", "Slovenia"],
  ["ZA", "South Africa"], ["KR", "South Korea"], ["ES", "Spain"], ["LK", "Sri Lanka"],
  ["SD", "Sudan"], ["SE", "Sweden"], ["CH", "Switzerland"], ["TW", "Taiwan"], ["TJ", "Tajikistan"],
  ["TZ", "Tanzania"], ["TH", "Thailand"], ["TN", "Tunisia"], ["TR", "Turkey"],
  ["TM", "Turkmenistan"], ["UA", "Ukraine"], ["AE", "United Arab Emirates"],
  ["UK", "United Kingdom"], ["US", "United States"], ["UY", "Uruguay"], ["UZ", "Uzbekistan"],
  ["VE", "Venezuela"], ["VN", "Vietnam"],
]

function getAvailableCountryCodes(data: Array<CountryDetails>): Array<CountryDetails> {
  // https://www.econdb.com/docs/clients/prognosis#available-country-codes
  const codes = new Map(availableCountryData)
  return data.filter((country: CountryDetails) => codes.has(country.cca2))
}