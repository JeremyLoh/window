import Head from "next/head"
import React, { useEffect, useState } from "react"
import Emoji from "../components/emoji"
import { getCurrencySymbols, Symbol } from "../lib/exchange/currency/symbols"
import { getCountries } from "../lib/exchange/economy/country"
import ExchangeRateDisplay from "../components/exchange/exchangeRateDisplay"
import EconomyDisplay, { Country } from "../components/exchange/economyDisplay"
import Navbar from "../components/navbar"

type ExchangeProps = {
  symbols: Record<string, Symbol>
  countries: Array<Country>
}

export default function Exchange(props: ExchangeProps) {
  const [countriesInfo, setCountriesInfo] = useState<Map<string, Country>>()

  useEffect(() => {
    setCountriesInfo(
      new Map(
        props.countries.map((country: Country) => {
          const key = country.name
          const value = {
            alpha2Code: country.alpha2Code,
            name: country.name,
            flag: country.flag,
          }
          return [key, value]
        })
      )
    )
  }, [props.countries])

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <Head>
        <title>Window - Exchange</title>
        <meta name="description" content="Exchange Rate" />
      </Head>

      <Navbar />
      <h1 className="my-6 w-full text-end text-2xl md:w-4/5 md:text-3xl">
        Exchange <Emoji symbol="🌎" label="world" />
      </h1>

      <ExchangeRateDisplay symbols={props.symbols} />
      {countriesInfo && <EconomyDisplay countries={countriesInfo} />}
    </div>
  )
}

export async function getStaticProps() {
  const revalidateInSeconds: number = 86400
  try {
    const result = await Promise.all([getCurrencySymbols(), getCountries()])
    const { symbols } = result[0]
    const countries = result[1]
    return {
      props: {
        symbols,
        countries,
      },
      revalidate: revalidateInSeconds,
    }
  } catch (error) {
    return { notFound: true }
  }
}
