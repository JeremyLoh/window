import React from "react"
import Navbar from "../../components/bugTracker/navbar"

export const metadata = {
  title: "Bug Tracker",
  description: "Squash your bugs",
}

export default function BugTrackerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}