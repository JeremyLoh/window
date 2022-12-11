import React from "react"
import CardInfo from "../../components/cardInfo"
import styles from "../../styles/components/wallet/WalletSummary.module.css"

export function WalletSummary({}) {
  return (
    <div className={styles.walletSummary}>
      <CardInfo ariaLabel="wallet-expenses">
        <h2>Expenses</h2>
        <p className={styles.warning}>$0</p>
      </CardInfo>
      <CardInfo ariaLabel="wallet-income">
        <h2>Income</h2>
        <p>$0</p>
      </CardInfo>
    </div>
  )
}
  