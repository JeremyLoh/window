import React, { FC } from "react"

interface Data {
  label?: string,
  symbol: string
}

const Emoji:FC<Data> = (props) => (
  <span
    className="emoji"
    role="img"
    aria-label={props.label ? props.label : ""}
    aria-hidden={props.label ? "false" : "true"}
  >
    {props.symbol}
  </span>
)

export default Emoji