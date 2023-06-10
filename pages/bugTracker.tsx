import React from "react"
import Head from "next/head"
import Link from "next/link"
import Navbar from "../components/navbar"
import BugTrackerFeature from "../components/bugTracker/bugTrackerFeature"

export default function BugTracker() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <Head>
        <title>Window - Bug Tracker</title>
        <meta name="description" content="Bug Tracker" />
      </Head>
      <Navbar />
      <div>
        <BugTrackerFeature />
        <div className="flex flex-row justify-end gap-x-2 text-lg">
          <button
            data-test="bug-tracker-login-btn"
            className="bg-blue-700 p-2 hover:bg-blue-800"
          >
            Login
          </button>
          <Link href="/bugTracker/signUp" passHref>
            <button
              data-test="bug-tracker-sign-up-btn"
              className="bg-pink-700 p-2 hover:bg-pink-800"
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
