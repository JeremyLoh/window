import Head from "next/head"
import React from "react"
import Emoji from "../components/emoji"
import { getCurrencySymbols, Symbol } from "../lib/exchange/currency/symbols"
import ExchangeRateDisplay from "../components/exchange/exchangeRateDisplay"
import styles from "../styles/pages/Exchange.module.css"

type ExchangeProps = {
  symbols:  Record<string, Symbol>
}

export default function Exchange(props: ExchangeProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Window</title>
        <meta name="description" content="Exchange Rate" />
      </Head>

      <h1 className={styles.pageTitle}>
        Exchange {" "}
        <Emoji symbol="🌎" label="world" />
      </h1>

      <ExchangeRateDisplay symbols={props.symbols} />
    </div>
  )
}

export async function getStaticProps() {
  const revalidateInSeconds: number = 86400
  try {
    const { symbols } = await getCurrencySymbols()
    return {
      props: { symbols },
      revalidate: revalidateInSeconds,
    }
  } catch (error) {
    return { notfound: true }
  }
}