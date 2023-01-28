import React, { useContext } from "react"
import CardInfo from "../../components/cardInfo"
import { Transaction, TransactionContext } from "../../pages/wallet"
import Currency from "../currency"

export function WalletSummary() {
  const transactions: Array<Transaction> = useContext(TransactionContext)
  const totalExpense: Currency = getTotalExpense()
  const totalIncome: Currency = getTotalIncome()
  const cashFlow: string = getCashFlow()

  function getTotalAmount(transactions: Array<Transaction>): Currency {
    return transactions.reduce(
      (accumulator, transaction) => accumulator.add(transaction.amount),
      new Currency(0)
    )
  }

  function getTotalExpense(): Currency {
    const expenseTransactions = transactions.filter(
      (transaction) => transaction.isExpense
    )
    return getTotalAmount(expenseTransactions)
  }

  function getTotalIncome(): Currency {
    const incomeTransactions = transactions.filter(
      (transaction) => !transaction.isExpense
    )
    return getTotalAmount(incomeTransactions)
  }

  function getCashFlow(): string {
    if (
      totalIncome.greaterThan(totalExpense) ||
      totalIncome.equalTo(totalExpense)
    ) {
      return totalIncome.subtract(totalExpense).format()
    } else {
      return totalIncome.subtract(totalExpense).formatNegative()
    }
  }

  return (
    <div className="my-4 flex w-4/5 flex-col flex-wrap items-start justify-center bg-gray-800 py-3 transition-colors hover:bg-gray-900 md:mb-4 md:flex-row md:items-center">
      <h1
        className="px-4 text-center text-2xl"
        aria-label="wallet-transaction-day-count"
      >
        {transactions.length === 0
          ? "Zero Transactions"
          : `Transaction Count: ${transactions.length}`}
      </h1>
      <CardInfo ariaLabel="wallet-expenses">
        <h2 className="text-xl">Expenses</h2>
        <p className="text-lg text-red-600">{totalExpense.format()}</p>
      </CardInfo>
      <CardInfo ariaLabel="wallet-income">
        <h2 className="text-xl">Income</h2>
        <p className="text-lg text-green-600">{totalIncome.format()}</p>
      </CardInfo>
      <CardInfo ariaLabel="wallet-cash-flow">
        <h2 className="text-xl">Cash Flow</h2>
        <p className="text-lg">{cashFlow}</p>
      </CardInfo>
    </div>
  )
}
