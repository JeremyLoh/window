import React, { FC } from "react"
import Head from "next/head"
import Navbar from "../components/navbar"

const Life: FC<any> = () => {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Window - Life</title>
        <meta name="description" content="Manage your Life" />
      </Head>

      <Navbar />
      <blockquote data-test="life-quote" className="text-center pt-2 bg-gray-700 rounded-lg mt-4 w-4/5 lg:w-2/5 mx-auto">
        <svg aria-hidden="true"
             className="w-10 h-10 text-gray-400 dark:text-white ml-5"
             viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
            fill="currentColor" />
        </svg>
        <p className="text-lg -mt-2 p-2 sm:-mt-10">
          A small night storm blows <br />
          Saying “Falling is the essence of a flower” <br />
          Preceding those who hesitate.
        </p>
        <p>— Yukio Mishima</p>
      </blockquote>
    </div>
  )
}

export default Life