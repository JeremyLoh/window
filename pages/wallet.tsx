import React, { FC, useState } from "react";
import Calendar from "react-calendar"

//https://www.copycat.dev/blog/react-calendar/

const Wallet:FC<any> = () => {
  const [date, setDate] = useState<Date>(new Date())
  return (
    <div>
      <h1>Wallet</h1>
      <Calendar onChange={setDate} value={date} />
      <div aria-label="wallet-transaction-date">
        Date
        {date.getDate()}
      </div>
    </div>
  )
}

export default Wallet