import Link from "next/link"
import React, { FC } from "react"

interface CardLinkProps {
  ariaLabel?: string
  href: string
  children: any
}

const CardLink: FC<CardLinkProps> = (props) => {
  return (
    <Link href={props.href} passHref>
      <button
        className="m-4 rounded-xl bg-green-900 p-6 text-left transition-colors hover:bg-green-700"
        aria-label={props.ariaLabel}
      >
        {props.children}
      </button>
    </Link>
  )
}

export default CardLink
