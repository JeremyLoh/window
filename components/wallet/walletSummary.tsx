import React, { useContext } from "react"
import CardInfo from "../../components/cardInfo"
import styles from "../../styles/components/wallet/WalletSummary.module.css"
import { Transaction, TransactionContext } from "../../pages/wallet"

export function WalletSummary({}) {
  const transactions: Array<Transaction> = useContext(TransactionContext)

  function getTotalExpense(): string {
    const total: number = transactions
      .filter((transaction) => transaction.isExpense)
      .reduce((accumulator, transaction) =>
        accumulator + transaction.amount
      , 0)
    return total.toFixed(2)
  }

  return (
    <div className={styles.walletSummary}>
      <CardInfo ariaLabel="wallet-expenses">
        <h2>Expenses</h2>
        <p className={styles.warning}>${getTotalExpense()}</p>
      </CardInfo>
      <CardInfo ariaLabel="wallet-income">
        <h2>Income</h2>
        <p>$0.00</p>
      </CardInfo>
    </div>
  )
}
  