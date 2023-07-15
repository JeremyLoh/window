"use client"

import React, { FC, useEffect, useState } from "react"
import Link from "next/link"
import { HomeIcon } from "@heroicons/react/24/solid"
import { Session } from "@supabase/supabase-js"
import { getClientSession } from "../../lib/db/supabaseClient"

const BugTrackerNavigation: FC<any> = () => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    getClientSession().then((session) => {
      if (session) {
        setSession(session)
      }
    })
  }, [])

  return (
    <div>
      {session && (
        <Link href="/bugTracker/dashboard" passHref className="group">
          <button
            data-test="bug-tracker-dashboard-btn"
            className="flex rounded-full bg-sky-700 px-2 py-1 transition-colors group-hover:bg-sky-500"
          >
            <HomeIcon className="h-5 w-5 md:h-6 md:w-6" />
            <p className="ml-1 pt-0.5 md:pt-1">Dashboard</p>
          </button>
        </Link>
      )}
    </div>
  )
}

export default BugTrackerNavigation
