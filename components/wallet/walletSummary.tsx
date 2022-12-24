import React, { useContext } from "react"
import CardInfo from "../../components/cardInfo"
import styles from "../../styles/components/wallet/WalletSummary.module.css"
import { Transaction, TransactionContext } from "../../pages/wallet"

export function WalletSummary({}) {
  const transactions: Array<Transaction> = useContext(TransactionContext)
  const totalExpense: string = getTotalExpense()
  const totalIncome: string = getTotalIncome()
  const cashFlow: string = getCashFlow()

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

  function getCashFlow(): string {
    const cashFlow: string = Math.abs(Number(totalIncome) - Number(totalExpense)).toFixed(2)
    if (Number(totalIncome) < Number(totalExpense)) {
      return "-$" + cashFlow
    }
    return "$" + cashFlow
  }

  return (
    <div>
      <h1 aria-label="wallet-transaction-day-count">
        { transactions.length === 0 ? "Zero Transactions"
          : `Transaction Count: ${transactions.length}` }
      </h1>
      <div className={styles.walletSummary}>
        <CardInfo ariaLabel="wallet-expenses">
          <h2>Expenses</h2>
          <p className={styles.warning}>${totalExpense}</p>
        </CardInfo>
        <CardInfo ariaLabel="wallet-income">
          <h2>Income</h2>
          <p>${totalIncome}</p>
        </CardInfo>
        <CardInfo ariaLabel="wallet-cash-flow">
          <h2>Cash Flow</h2>
          <p>{cashFlow}</p>
        </CardInfo>
      </div>
    </div>
  )
}
  