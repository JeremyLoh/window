import React from "react"
import Head from "next/head"
import Navbar from "../components/navbar"

export default function BugTracker() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <Head>
        <title>Window - Bug Tracker</title>
        <meta name="description" content="Bug Tracker" />
      </Head>
      <Navbar />

      <h1>TODO Bug Tracker Show login and sign up page here</h1>
    </div>
  )
}
