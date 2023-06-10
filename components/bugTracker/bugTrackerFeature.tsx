import React, { FC } from "react"

const BugTrackerFeature: FC<any> = () => {
  return (
    <section className="flex w-full flex-col items-center py-4">
      <h1 className="text-2xl">Bug Tracker</h1>
      <p className="bg-teal-600 p-2 text-xl hover:line-through">
        Squash your bugs from a single source of truth
      </p>
    </section>
  )
}

export default BugTrackerFeature
