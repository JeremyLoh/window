import React, { FC } from "react"

interface CardInfoProps {
  ariaLabel?: string
  "data-test"?: string
  children: any
}

const CardInfo: FC<CardInfoProps> = (props) => {
  return (
    <div
      className="rounded bg-secondary px-6 py-4 text-left"
      aria-label={props.ariaLabel}
      data-test={props["data-test"]}
    >
      {props.children}
    </div>
  )
}

export default CardInfo
