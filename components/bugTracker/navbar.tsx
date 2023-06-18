"use client"

import { FC, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Session } from "@supabase/supabase-js"
import { getClientSession } from "../../lib/db/supabaseClient"
import { signOut } from "../../lib/db/auth"
import { getWarningToast } from "../alert/warning"
import Emoji from "../emoji"

const Navbar: FC<any> = () => {
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    getClientSession().then((session) => {
      if (session) {
        setSession(session)
      }
    })
  }, [])

  async function handleSignOut() {
    const response = await signOut()
    if (response.error) {
      await getWarningToast("Unable to sign out", "Please try again").fire()
    } else {
      router.push("/bugTracker")
    }
  }

  return (
    <nav
      data-test="bugTracker-navbar"
      id="navbar"
      className="flex w-full flex-row items-center justify-start gap-x-3 bg-gradient-to-r
                  from-primary via-secondary px-2 py-3
                  text-white shadow-lg lg:flex-row"
    >
      <Link href="/" className="text-lg hover:text-gray-300 lg:text-3xl">
        <Emoji symbol="🗔" />
      </Link>
      <Link href="/bugTracker" className="text-lg lg:text-2xl">
        Bug Tracker
      </Link>
      {session && (
        <button
          className="ml-auto border-2 px-2 py-1 text-sm transition-colors hover:bg-pink-700"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      )}
    </nav>
  )
}

export default Navbar
