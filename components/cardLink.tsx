import Link from "next/link"
import React, { FC } from "react"
import styles from "../styles/components/CardLink.module.css"

interface CardProps {
  ariaLabel?: string,
  href: string,
  children: any
}

const Card:FC<CardProps> = (props) => {
  return (
    <Link href={props.href} passHref>
      <button className={styles.card} aria-label={props.ariaLabel}>
        {props.children}
      </button>
    </Link>
  )
}

export default Card