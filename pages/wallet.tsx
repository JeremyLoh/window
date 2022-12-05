import React, { FC, useState } from "react"
import Calendar from "react-calendar"
import styles from "../styles/pages/Wallet.module.css"
import CardInfo from "../components/cardInfo"

//https://www.copycat.dev/blog/react-calendar/

const Wallet:FC<any> = () => {
  const [date, setDate] = useState<Date>(new Date())
  return (
    <div>
      <h1 className={styles.pageTitle}>Wallet</h1>
      <div className={styles.transactionInfo}>
        <div aria-label="wallet-transaction-date">
          <CardInfo ariaLabel="wallet-transaction-date-selection">
            <h2>Transaction Date</h2>
            <p>{date.toDateString()}</p>
          </CardInfo>
        </div>
        <Calendar onChange={setDate} value={date} />
      </div>
    </div>
  )
}

export default Wallet