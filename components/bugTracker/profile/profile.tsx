"use client"

import { FC, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Session } from "@supabase/supabase-js"
import { getClientSession } from "../../../lib/db/supabaseClient"
import { getWarningToast } from "../../alert/warning"
import { deleteProfile } from "../../../lib/db/auth"
import { getSuccessToast } from "../../alert/success"
import { TrashIcon } from "@heroicons/react/24/solid"

const Profile: FC<any> = () => {
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    getClientSession().then((session) => {
      if (session) {
        setSession(session)
      }
    })
  }, [])

  async function handleDelete() {
    const result = await getWarningToast(
      "Delete your account?",
      "Are you sure you want to delete your account? It cannot be undone!"
    ).fire()
    if (session && result.isConfirmed) {
      const response = await deleteProfile(session.user.id)
      if (response.error) {
        await getWarningToast(
          "Unable to delete your account",
          "Please try again later"
        ).fire()
      } else {
        await getSuccessToast("Your account is deleted", "Goodbye!").fire()
        router.push("/bugTracker")
      }
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-2">
      {session && (
        <button
          className="flex flex-row rounded-full bg-red-700 p-4 hover:bg-red-600"
          onClick={handleDelete}
        >
          <TrashIcon className="mr-2 h-6 w-6 rounded-full" />
          <p className="text-lg">Delete Profile</p>
        </button>
      )}
    </div>
  )
}

export default Profile
