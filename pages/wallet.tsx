import React, { FC, useState } from "react"
import Calendar from "react-calendar"
import WalletForm, { Transaction } from "../components/wallet/walletAddTransactionForm"
import CardInfo from "../components/cardInfo"
import styles from "../styles/pages/Wallet.module.css"

//https://www.copycat.dev/blog/react-calendar/

const Wallet:FC<any> = () => {
  const [date, setDate] = useState<Date>(new Date())

  function displayNewTransaction(transaction: Transaction) {
    console.log(JSON.stringify(transaction))
    // TODO Display Transaction
  }

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
        <Calendar
          navigationAriaLabel="wallet-calendar-date-selection"
          onChange={setDate}
          value={date}
        />
      </div>

      <div className={styles.transactions} aria-label="wallet-transactions">
        <h1>Zero Transactions</h1>
        <div className={styles.walletSummary}>
          <CardInfo ariaLabel="wallet-expenses">
            <h2>Expenses</h2>
            <p className={styles.warning}>$0</p>
          </CardInfo>
          <CardInfo ariaLabel="wallet-income">
            <h2>Income</h2>
            <p>$0</p>
          </CardInfo>
        </div>
        <div className={styles.walletTransactionHistory}>
          <CardInfo ariaLabel="add-transaction-form">
            <WalletForm handleNewTransaction={displayNewTransaction}/>
          </CardInfo>
          {/* TODO Show transaction history here */}
        </div>
      </div>
    </div>
  )
}

export default Wallet