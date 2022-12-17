import React, { FC, useContext } from "react"
import TransactionInfo from "./transactionInfo"
import styles from "../../styles/components/wallet/TransactionHistory.module.css"
import { Transaction, TransactionContext } from "../../pages/wallet"

const TransactionHistory:FC<any> = () => {
  const transactions: Array<Transaction> = useContext(TransactionContext)

  return (
    <div aria-label="wallet-transaction-history" className={styles.container}>
      { transactions &&
        transactions.map((transaction: Transaction) => {
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