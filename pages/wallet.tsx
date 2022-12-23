import React, { createContext, FC, useState } from "react"
import format from "date-fns/format"
import produce from "immer"
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
  (transactionId: string, date: Date): void
}

export const TransactionContext = createContext<Array<Transaction>>([])
export const DeleteTransactionContext = createContext<DeleteTransactionType>(() => {})

const Wallet:FC<any> = () => {
  const [date, setDate] = useState<Date>(new Date())
  const [transactionsByDate, setTransactionsByDate] = useState<Map<String, Array<Transaction>>>(new Map())

  function formatDate(date: Date): string {
    // e.g. "LLL d y" => Dec 1 2022
    return format(date, "LLL d y")
  }

  function displayNewTransaction(transaction: Transaction): void {
    const selectedDate: string = formatDate(date)
    if (!transactionsByDate.has(selectedDate)) {
      setTransactionsByDate(produce((draft) => {
        draft.set(selectedDate, [])
      }))
    }
    setTransactionsByDate(produce((draft) => {
      draft.get(selectedDate)?.unshift(transaction)
    }))
  }

  function deleteTransaction(transactionId: string, date: Date): void {
    setTransactionsByDate(produce((draft) => {
      const key = formatDate(date)
      const updatedTransactions: Array<Transaction> = draft.get(key)
        ?.filter((transaction: Transaction) => transaction.id !== transactionId) || []
      draft.set(key, updatedTransactions)
    }))
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

      <TransactionContext.Provider value={transactionsByDate.get(formatDate(date)) || []}>
        <div className={styles.transactions} aria-label="wallet-transactions">
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