import React, { FC, useState } from "react"
import Head from "next/head"
import format from "date-fns/format"
import Navbar from "../components/navbar"
import Quote from "../components/life/quote"

const Life: FC<any> = () => {
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date())
  const currentDate = new Date()
  const minYear = currentDate.getFullYear() - 80

  function formatDate(date: Date) {
    // e.g. 25th November 2022 => "yyyy-LL-dd" => 2022-11-25
    return format(date, "yyyy-LL-dd")
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO generate life calendar
    return false
  }

  function handleDateChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setDateOfBirth(new Date(event.target.value))
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
      <form data-test="life-date-of-birth"
            className="mt-4 flex flex-col lg:flex-row justify-center items-center"
            onSubmit={handleSubmit}
      >
        <label className="lg:text-lg p-2" htmlFor="birthDate">
          Enter your date of birth
        </label>
        <input required
               className="text-black rounded-md border shadow-sm focus:ring
                          invalid:border-pink-500 invalid:text-red-600"
               id="birthDate"
               name="birthDate"
               type="date"
               min={`${minYear}-01-01`}
               max={formatDate(currentDate)}
               value={formatDate(dateOfBirth)}
               onChange={handleDateChange}
        />
        <button
          data-test="submit-date-of-birth"
          className="rounded border-b-4 border-cyan-700 bg-cyan-500 m-2 py-2 px-4 font-bold text-white hover:border-cyan-500 hover:bg-cyan-400"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Life