import React, { createContext, FC, useState } from "react"
import Calendar from "react-calendar"
import WalletForm from "../components/wallet/walletAddTransactionForm"
import { WalletSummary } from "../components/wallet/walletSummary"
import TransactionHistory from "../components/wallet/transactionHistory"
import CardInfo from "../components/cardInfo"
import styles from "../styles/pages/Wallet.module.css"

export interface Transaction {
  id: string,
  name: string,
  amount: number,
  isExpense: boolean,
  transactionDate: Date
}

export interface DeleteTransactionType {
  (transactionId: string): void
}

export const TransactionContext = createContext<Array<Transaction>>([])
export const DeleteTransactionContext = createContext<DeleteTransactionType>(() => {})

const Wallet:FC<any> = () => {
  const [date, setDate] = useState<Date>(new Date())
  const [transactions, setTransactions] = useState<Array<Transaction>>([])

  function displayNewTransaction(transaction: Transaction): void {
    setTransactions([transaction, ...transactions])
  }

  function deleteTransaction(transactionId: string): void {
    setTransactions(transactions.filter((transaction: Transaction) =>
      transaction.id !== transactionId))
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

      <TransactionContext.Provider value={transactions}>
        <div className={styles.transactions} aria-label="wallet-transactions">
          <h1>Zero Transactions</h1>
          <WalletSummary />
          <div className={styles.transactionHistory}>
            <div className={styles["transactionHistory-add-form"]}>
              <CardInfo ariaLabel="add-transaction-form">
                <WalletForm handleNewTransaction={displayNewTransaction} transactionDate={date}/>
              </CardInfo>
            </div>
            <DeleteTransactionContext.Provider value={deleteTransaction}>
              <div className={styles["transactionHistory-transactions"]}>
                  <TransactionHistory />
              </div>
            </DeleteTransactionContext.Provider>
          </div>
        </div>
      </TransactionContext.Provider>
    </div>
  )
}

export default Wallet