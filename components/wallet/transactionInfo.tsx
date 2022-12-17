import React, { FC } from "react"
import {Transaction} from "./transactionHistory"
import styles from "../../styles/components/wallet/TransactionInfo.module.css"
interface TransactionInfoProps {
  transaction: Transaction
}

const TransactionInfo:FC<TransactionInfoProps> = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.name}>{props.transaction.name}</h1>
      <div className={styles.info}>
        <h2>${props.transaction.amount.toFixed(2)}</h2>
        <h3>{props.transaction.transactionDate.toLocaleDateString()}</h3>
      </div>
      <button className={styles.deleteBtn}
              aria-label="delete-transaction">X</button>
    </div>
  )
}

export default TransactionInfo