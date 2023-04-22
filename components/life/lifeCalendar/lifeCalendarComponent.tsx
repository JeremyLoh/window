import React, { FC, useState } from "react"
import format from "date-fns/format"
import LifeCalendar from "./lifeCalendar"
import Quote from "../quote"
import DateOfBirthForm from "../dateOfBirthForm"

const LifeCalendarComponent: FC<any> = () => {
  const [date, setDate] = useState<string>("")

  function handleSubmit(dateOfBirth: Date): void {
    setDate(formatDateToIso8601(dateOfBirth))
  }

  function formatDateToIso8601(date: Date): string {
    // e.g. 25th November 2022 => "yyyy-LL-dd" => 2022-11-25
    return format(date, "yyyy-LL-dd")
  }

  return (
    <>
      <Quote dataTest="life-quote">
        <p className="-mt-2 p-2 text-lg sm:-mt-10">
          A small night storm blows <br />
          Saying “Falling is the essence of a flower” <br />
          Preceding those who hesitate.
        </p>
        <p>— Yukio Mishima</p>
      </Quote>
      <DateOfBirthForm handleSubmit={handleSubmit} />
      {date && <LifeCalendar dateOfBirth={date} />}
    </>
  )
}

export default LifeCalendarComponent
