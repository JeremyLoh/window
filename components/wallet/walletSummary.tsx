import React, { useContext } from "react"
import CardInfo from "../../components/cardInfo"
import { Transaction, TransactionContext } from "../../pages/wallet"
import Currency from "../currency"
import styles from "../../styles/components/wallet/WalletSummary.module.css"

export function WalletSummary({}) {
  const transactions: Array<Transaction> = useContext(TransactionContext)
  const totalExpense: Currency = getTotalExpense()
  const totalIncome: Currency = getTotalIncome()
  const cashFlow: string = getCashFlow()

  function getTotalAmount(transactions: Array<Transaction>): Currency {
    return transactions.reduce((accumulator, transaction) =>
      accumulator.add(transaction.amount), new Currency(0))
  }

  function getTotalExpense(): Currency {
    const expenseTransactions = transactions.filter((transaction) => transaction.isExpense)
    return getTotalAmount(expenseTransactions)
  }

  function getTotalIncome(): Currency {
    const incomeTransactions = transactions.filter((transaction) => !transaction.isExpense)
    return getTotalAmount(incomeTransactions)
  }

  function getCashFlow(): string {
    if (totalIncome.greaterThan(totalExpense)) {
      return totalIncome.subtract(totalExpense).format()
    } else {
      return totalIncome.subtract(totalExpense).formatNegative()
    }
  }

  return (
    <div>
      <h1 className={styles.transactionCount}
        aria-label="wallet-transaction-day-count"
      >
        { transactions.length === 0 ? "Zero Transactions"
          : `Transaction Count: ${transactions.length}` }
      </h1>
      <div className={styles.walletSummary}>
        <CardInfo ariaLabel="wallet-expenses">
          <h2>Expenses</h2>
          <p className={styles.warning}>{totalExpense.format()}</p>
        </CardInfo>
        <CardInfo ariaLabel="wallet-income">
          <h2>Income</h2>
          <p>{totalIncome.format()}</p>
        </CardInfo>
        <CardInfo ariaLabel="wallet-cash-flow">
          <h2>Cash Flow</h2>
          <p>{cashFlow}</p>
        </CardInfo>
      </div>
    </div>
  )
}
  