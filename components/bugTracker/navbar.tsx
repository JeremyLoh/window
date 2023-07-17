"use client"

import { FC, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowRightCircleIcon,
  HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid"
import {
  UserCircleIcon as UserCircleIconOutline,
  UserPlusIcon as UserPlusIconOutline,
} from "@heroicons/react/24/outline"
import { Session } from "@supabase/supabase-js"
import { getClientSession } from "../../lib/db/supabaseClient"
import { signOut } from "../../lib/db/auth"
import { getWarningToast } from "../alert/warning"
import Emoji from "../emoji"

const Navbar: FC<any> = () => {
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    if (session) {
      return
    }
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
      {session ? (
        <div className="flew-row ml-auto mr-2 flex items-center gap-x-2">
          <Link href="/bugTracker/dashboard" passHref className="flex">
            <button data-test="bug-tracker-dashboard-btn" className="">
              <HomeIcon className="h-5 w-5 transition-colors hover:text-gray-500 md:h-6 md:w-6" />
            </button>
          </Link>
          <UserCircleIcon
            className="h-5 w-5 transition-colors hover:cursor-pointer hover:text-gray-500 md:h-6 md:w-6"
            onClick={handleNavigateToProfile}
          />
          <ArrowRightCircleIcon
            className="h-5 w-5 transition-colors hover:cursor-pointer hover:text-gray-500 md:h-6 md:w-6"
            onClick={handleSignOut}
          />
        </div>
      ) : (
        <div className="flew-row ml-auto mr-2 flex items-center gap-x-1">
          <Link href="/bugTracker/login" passHref>
            <button
              data-test="bug-tracker-login-btn"
              className="flex rounded-lg border-2 border-teal-700 p-1 transition-colors hover:bg-teal-700"
            >
              <UserCircleIconOutline className="mr-1 hidden h-5 w-5 transition-colors md:block" />
              <p className="text-xs md:py-1">Login</p>
            </button>
          </Link>
          <Link href="/bugTracker/signUp" passHref>
            <button
              data-test="bug-tracker-sign-up-btn"
              className="flex rounded-lg border-2 border-pink-800 p-1 transition-colors hover:bg-pink-800"
            >
              <UserPlusIconOutline className="mr-1 hidden h-5 w-5 transition-colors md:block" />
              <p className="text-xs md:py-1">Sign Up</p>
            </button>
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
