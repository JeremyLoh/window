import Head from "next/head"
import React from "react"
import Emoji from "../components/emoji"
import CurrencyConvertForm from "../components/exchange/currencyConvertForm"
import styles from "../styles/pages/Exchange.module.css"

export default function Exchange() {
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

      <CurrencyConvertForm />
    </div>
  )
}