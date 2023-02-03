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
      className="flex w-full flex-col justify-start"
    >
      <div className="flex flex-row gap-4 pb-4">
        <button
          aria-label="previous-transaction-history"
          className="rounded bg-white px-2 text-black disabled:cursor-not-allowed"
          disabled={pageIndex === 1}
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          Previous
        </button>
        <button
          aria-label="current-transaction-history-page"
          className="rounded bg-purple-300 px-4 text-lg text-black"
          disabled
        >
          {pageIndex}
        </button>
        <button
          aria-label="next-transaction-history"
          className="rounded bg-white px-2 text-black disabled:cursor-not-allowed"
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
