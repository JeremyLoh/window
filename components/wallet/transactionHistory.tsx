import React, { FC, useContext, useState } from "react"
import TransactionInfo from "./transactionInfo"
import styles from "../../styles/components/wallet/TransactionHistory.module.css"
import { Transaction, TransactionContext } from "../../pages/wallet"

const TransactionHistory:FC<any> = () => {
  const [pageIndex, setPageIndex] = useState(1)
  const transactions: Array<Transaction> = useContext(TransactionContext)

  function getPaginatedTransactions(transactions: Array<Transaction>) {
    const transactionsPerPage: number = 10
    const start = (pageIndex - 1) * transactionsPerPage
    const end = pageIndex * transactionsPerPage
    return (
      <div aria-label="transactions-container">
        {
          transactions.slice(start, end).map((transaction: Transaction) => {
            return (
              <TransactionInfo key={transaction.id}
                transaction={transaction}
              />
            )
          })
        }
      </div>
    )
  }

  return (
    <div aria-label="wallet-transaction-history" className={styles.container}>
      <div className={styles.pagination}>
        <button aria-label="previous-transaction-history"
                disabled={pageIndex === 1}
                onClick={() => setPageIndex(pageIndex - 1)}
        >
          Previous
        </button>
        <button aria-label="current-transaction-history-page">
          {pageIndex}
        </button>
        <button aria-label="next-transaction-history"
                disabled={(pageIndex * 10) >= transactions.length}
                onClick={() => setPageIndex(pageIndex + 1)}
        >
          Next
        </button>
      </div>

      { transactions &&
        getPaginatedTransactions(transactions)
      }
    </div>
  )
}

export default TransactionHistory