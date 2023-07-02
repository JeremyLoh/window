"use client"

import { FC, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Session } from "@supabase/supabase-js"
import { getClientSession } from "../../lib/db/supabaseClient"
import { signOut } from "../../lib/db/auth"
import { getWarningToast } from "../alert/warning"
import Emoji from "../emoji"
import { ArrowRightCircleIcon, UserCircleIcon } from "@heroicons/react/24/solid"

const Navbar: FC<any> = () => {
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    getClientSession().then((session) => {
      if (session) {
        setSession(session)
      }
    })
  })

  async function handleSignOut() {
    const response = await signOut()
    if (response.error) {
      await getWarningToast("Unable to sign out", "Please try again").fire()
    } else {
      setSession(null)
      router.push("/bugTracker")
    }
  }

  function handleNavigateToProfile() {
    router.push("/bugTracker/profile")
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
        <div className="flew-row ml-auto mr-2 flex items-center gap-x-4">
          <UserCircleIcon
            className="h-6 w-6 transition-colors hover:text-gray-500"
            onClick={handleNavigateToProfile}
          />
          <ArrowRightCircleIcon
            className="h-6 w-6 transition-colors hover:text-gray-500"
            onClick={handleSignOut}
          />
        </div>
      )}
    </nav>
  )
}

export default Navbar
