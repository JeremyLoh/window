import Link from "next/link"
import React, { FC } from "react"
import styles from "../styles/components/CardLink.module.css"
import {specialElite} from "../pages/_app"

interface CardLinkProps {
  ariaLabel?: string,
  href: string,
  children: any
}

const CardLink:FC<CardLinkProps> = (props) => {
  return (
    <Link href={props.href} passHref>
      <button className={`${styles.card} ${specialElite.className}`}
              aria-label={props.ariaLabel}
      >
        {props.children}
      </button>
    </Link>
  )
}

export default CardLink