import React, { FC, useState } from "react"
import Head from "next/head"
import format from "date-fns/format"
import Navbar from "../components/navbar"
import Quote from "../components/life/quote"
import DateOfBirthForm from "../components/life/dateOfBirthForm"
import LifeCalendar from "../components/life/lifeCalendar"

const Life: FC<any> = () => {
  const [date, setDate] = useState<string>(null)

  function handleSubmit(dateOfBirth: Date) {
    setDate(formatDateToIso8601(dateOfBirth))
  }

  function formatDateToIso8601(date: Date) {
    // e.g. 25th November 2022 => "yyyy-LL-dd" => 2022-11-25
    return format(date, "yyyy-LL-dd")
  }

  return (
    <div className="min-h-screen">
      <Head>
        <title>Window - Life</title>
        <meta name="description" content="Manage your Life" />
      </Head>

      <Navbar />
      <Quote dataTest="life-quote">
        <p className="text-lg -mt-2 p-2 sm:-mt-10">
          A small night storm blows <br />
          Saying “Falling is the essence of a flower” <br />
          Preceding those who hesitate.
        </p>
        <p>— Yukio Mishima</p>
      </Quote>
      <DateOfBirthForm handleSubmit={handleSubmit} />
      { date && <LifeCalendar dateOfBirth={date} /> }
    </div>
  )
}

export default Life