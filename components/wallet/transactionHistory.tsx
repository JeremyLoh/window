import React, { FC, useContext, useState } from "react"
import TransactionInfo from "./transactionInfo"
import { Transaction, TransactionContext } from "../../pages/wallet"

const TransactionHistory: FC<any> = () => {
  const [pageIndex, setPageIndex] = useState<number>(1)
  const transactions: Array<Transaction> = useContext(TransactionContext)

  function getPaginatedTransactions(transactions: Array<Transaction>) {
    const transactionsPerPage: number = 10
    const start = (pageIndex - 1) * transactionsPerPage
    const end = pageIndex * transactionsPerPage
    return (
      <div aria-label="transactions-container">
        {transactions.slice(start, end).map((transaction: Transaction) => {
          return (
            <TransactionInfo key={transaction.id} transaction={transaction} />
          )
        })}
      </div>
    )
  }

  return (
    <div
      aria-label="wallet-transaction-history"
      className="w-full bg-gray-700 p-4"
    >
      <h2 className="mb-4 text-xl">Transaction History</h2>
      <div className="flex flex-row gap-4 pb-4">
        <button
          data-test="previous-transaction-history"
          aria-label="previous-transaction-history"
          className="rounded bg-cyan-400 px-2 text-black disabled:cursor-not-allowed disabled:bg-cyan-600"
          disabled={pageIndex === 1}
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          Previous
        </button>
        <button
          data-test="current-transaction-history-page"
          aria-label="current-transaction-history-page"
          className="rounded bg-cyan-400 px-4 text-lg text-black"
          disabled
        >
          {pageIndex}
        </button>
        <button
          data-test="next-transaction-history"
          aria-label="next-transaction-history"
          className="rounded bg-cyan-400 px-2 text-black disabled:cursor-not-allowed disabled:bg-cyan-600"
          disabled={pageIndex * 10 >= transactions.length}
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          Next
        </button>
      </div>

      {transactions && getPaginatedTransactions(transactions)}
    </div>
  )
}

export default TransactionHistory
