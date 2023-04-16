import React, { FC } from "react"
import Head from "next/head"
import Navbar from "../components/navbar"
import Quote from "../components/life/quote"
import DateOfBirthForm from "../components/life/dateOfBirthForm"

const Life: FC<any> = () => {
  function handleSubmit(date: Date) {
    // TODO generate life calendar
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
    </div>
  )
}

export default Life