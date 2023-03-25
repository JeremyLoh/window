import React, { FC } from "react"

interface CardInfoProps {
  ariaLabel?: string
  children: any
}

const CardInfo: FC<CardInfoProps> = (props) => {
  return (
    <div
      className="rounded border border-2 border-secondary px-6 py-4 text-left"
      aria-label={props.ariaLabel}
    >
      {props.children}
    </div>
  )
}

export default CardInfo
