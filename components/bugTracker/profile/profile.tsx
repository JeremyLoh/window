"use client"

import { FC, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Session } from "@supabase/supabase-js"
import { getClientSession } from "../../../lib/db/supabaseClient"
import { getWarningToast } from "../../alert/warning"
import { deleteProfile } from "../../../lib/db/auth"
import { getSuccessToast } from "../../alert/success"
import { ClockIcon, TrashIcon } from "@heroicons/react/24/solid"
import { getProfileInfo } from "../../../lib/db/user"
import { formatDate } from "../../../lib/date"

type ProfileInfo = {
  username: string
  created_at: string
}

const Profile: FC<any> = () => {
  const router = useRouter()
  const [profile, setProfile] = useState<ProfileInfo>()
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    getClientSession().then((session) => {
      if (!session) {
        return
      }
      setSession(session)
      getProfileInfo(session.user.id).then((response) => {
        if (response.data) {
          const data = response.data[0]
          setProfile(data)
        } else {
          void getWarningToast(
            "Could not get profile information",
            "Try again later",
          ).fire()
        }
      })
    })
  }, [])

  async function handleDelete() {
    const result = await getWarningToast(
      "Delete your account?",
      "Are you sure you want to delete your account? It cannot be undone!",
    ).fire()
    if (session && result.isConfirmed) {
      const response = await deleteProfile(session.user.id)
      if (response.error) {
        await getWarningToast(
          "Unable to delete your account",
          "Please try again later",
        ).fire()
      } else {
        await getSuccessToast("Your account is deleted", "Goodbye!").fire()
        router.push("/bugTracker")
        router.refresh()
      }
    }
  }

  return (
    <>
      {session && profile && (
        <div className="flex h-full w-full items-center flex-col gap-y-2 p-2">
          <div className="w-2/3">
            <p>Username</p>
            <p>{profile.username}</p>
          </div>

          <div className="w-2/3">
            <p className="">Created At</p>
            <div className="flex justify-start items-stretch">
              <ClockIcon className="h-5 w-5" />
              <h4 className="px-2">{formatDate(profile.created_at)}</h4>
            </div>
          </div>

          <button
            className="flex flex-row w-2/3 rounded-full bg-red-700 p-4 hover:bg-red-600"
            onClick={handleDelete}
          >
            <TrashIcon className="mr-2 h-5 w-5 rounded-full" />
            <p className="">Delete Profile</p>
          </button>
        </div>
      )}
    </>
  )
}

export default Profile
