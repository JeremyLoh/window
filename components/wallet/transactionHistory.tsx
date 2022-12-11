import React, { FC } from "react"

export interface Transaction {
  id: string,
  name: string,
  amount: number,
  transactionDate: Date
}

interface TransactionHistoryProps {
  transactions: Array<Transaction>
}

const TransactionHistory:FC<TransactionHistoryProps> = (props) => {
  return (
    <div aria-label="wallet-transaction-history">
      {/* TODO Create component for each transaction */}
      { props.transactions &&
        props.transactions.map((transaction: Transaction) => {
          return (
            <div key={transaction.id}>
              {transaction.name}
              {transaction.amount}
              {transaction.transactionDate.toLocaleDateString()}
            </div>
          )
        })
      }
    </div>
  )
}

export default TransactionHistory