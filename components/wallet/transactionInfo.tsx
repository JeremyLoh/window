import React, { FC } from "react"
import {Transaction} from "./transactionHistory"
import styles from "../../styles/components/wallet/TransactionInfo.module.css"
interface TransactionInfoProps {
  transaction: Transaction
}

const TransactionInfo:FC<TransactionInfoProps> = (props) => {
  return (
    <div className={styles.container}>
      <h1>{props.transaction.name}</h1>
      <div>
        <h2>{props.transaction.amount.toFixed(2)}</h2>
        <h3>{props.transaction.transactionDate.toLocaleDateString()}</h3>
      </div>
    </div>
  )
}

export default TransactionInfo