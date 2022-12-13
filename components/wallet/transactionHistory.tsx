import React, { FC } from "react"
import TransactionInfo from "./transactionInfo"
import styles from "../../styles/components/wallet/TransactionHistory.module.css"

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
    <div aria-label="wallet-transaction-history" className={styles.container}>
      { props.transactions &&
        props.transactions.map((transaction: Transaction) => {
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

export default TransactionHistory