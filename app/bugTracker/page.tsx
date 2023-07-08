import React from "react"
import { Metadata } from "next"
import BugTrackerFeature from "../../components/bugTracker/bugTrackerFeature"

export const metadata: Metadata = {
  title: "Bug Tracker",
}

export default function BugTracker() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start">
      <BugTrackerFeature />
    </div>
  )
}
