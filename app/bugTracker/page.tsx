import React from "react"
import Link from "next/link"
import { Metadata } from "next"
import BugTrackerFeature from "../../components/bugTracker/bugTrackerFeature"

export const metadata: Metadata = {
  title: "Bug Tracker",
}

export default function BugTracker() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div>
        <BugTrackerFeature />
        <div className="flex flex-row justify-end gap-x-2 text-lg">
          <Link href="/bugTracker/login" passHref>
            <button
              data-test="bug-tracker-login-btn"
              className="bg-blue-700 p-2 hover:bg-blue-800"
            >
              Login
            </button>
          </Link>
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
