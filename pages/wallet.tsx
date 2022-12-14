import React, { FC, useState } from "react"
import Calendar from "react-calendar"
import WalletForm, { Transaction } from "../components/wallet/walletAddTransactionForm"
import { WalletSummary } from "../components/wallet/walletSummary"
import TransactionHistory from "../components/wallet/transactionHistory"
import CardInfo from "../components/cardInfo"
import styles from "../styles/pages/Wallet.module.css"

//https://www.copycat.dev/blog/react-calendar/

const Wallet:FC<any> = () => {
  const [date, setDate] = useState<Date>(new Date())
  const [transactions, setTransactions] = useState<Array<Transaction>>([])

  function displayNewTransaction(transaction: Transaction) {
    console.log(JSON.stringify(transaction))
    setTransactions([transaction, ...transactions])
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
        <WalletSummary />
        <div className={styles.transactionHistory}>
          <div className={styles["transactionHistory-add-form"]}>
            <CardInfo ariaLabel="add-transaction-form">
              <WalletForm handleNewTransaction={displayNewTransaction}/>
            </CardInfo>
          </div>
          <div className={styles["transactionHistory-transactions"]}>
            <TransactionHistory transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wallet