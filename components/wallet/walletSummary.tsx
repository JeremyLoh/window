import React, { useContext } from "react"
import CardInfo from "../../components/cardInfo"
import styles from "../../styles/components/wallet/WalletSummary.module.css"
import { Transaction, TransactionContext } from "../../pages/wallet"

export function WalletSummary({}) {
  const transactions: Array<Transaction> = useContext(TransactionContext)

  function getTotalAmount(transactions: Array<Transaction>): number {
    return transactions.reduce((accumulator, transaction) =>
      accumulator + transaction.amount, 0)
  }

  function getTotalExpense(): string {
    const expenseTransactions = transactions.filter((transaction) => transaction.isExpense)
    const total: number = getTotalAmount(expenseTransactions)
    return total.toFixed(2)
  }

  function getTotalIncome(): string {
    const incomeTransactions = transactions.filter((transaction) => !transaction.isExpense)
    const total: number = getTotalAmount(incomeTransactions)
    return total.toFixed(2)
  }

  return (
    <div className={styles.walletSummary}>
      <CardInfo ariaLabel="wallet-expenses">
        <h2>Expenses</h2>
        <p className={styles.warning}>${getTotalExpense()}</p>
      </CardInfo>
      <CardInfo ariaLabel="wallet-income">
        <h2>Income</h2>
        <p>${getTotalIncome()}</p>
      </CardInfo>
    </div>
  )
}
  