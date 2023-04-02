import React, { useContext } from "react"
import CardInfo from "../../components/cardInfo"
import { Transaction, TransactionContext } from "../../pages/wallet"
import Currency from "../currency"
import ProgressBar from "./progressBar"

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

  function getCashFlowTextStyle(): string {
    if (cashFlow === "$0.00") {
      return "text-white"
    } else if (cashFlow.startsWith("-")) {
      return "text-red-600"
    } else {
      return "text-green-600"
    }
  }

  return (
    <div className="my-4 flex w-4/5 flex-col flex-wrap items-center justify-center py-3 md:mb-4 md:flex-row md:items-center">
      <h1
        className="px-4 text-center text-2xl"
        data-test="wallet-transaction-day-count"
        aria-label="wallet-transaction-day-count"
      >
        {transactions.length === 0
          ? "Zero Transactions"
          : `Transaction Count: ${transactions.length}`}
      </h1>
      <div className="flex flex-wrap justify-between gap-x-4 gap-y-2 lg:flex-row">
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
          <p className={`${getCashFlowTextStyle()} text-lg`}>{cashFlow}</p>
        </CardInfo>

        <ProgressBar
          current={totalExpense.getAmountInCents()}
          max={totalIncome.getAmountInCents()}
        />
      </div>
    </div>
  )
}
