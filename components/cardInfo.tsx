import React, { FC } from "react"
import styles from "../styles/components/CardInfo.module.css"

interface CardInfoProps {
  ariaLabel?: string,
  children: any
}

const CardInfo:FC<CardInfoProps> = (props) => {
  return (
    <div className={styles.card} aria-label={props.ariaLabel}>
      {props.children}
    </div>
  )
}

export default CardInfo