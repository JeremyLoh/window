import { FC } from "react"
import { Metadata } from "next"
import Profile from "../../../components/bugTracker/profile/profile"

export const metadata: Metadata = {
  title: "Bug Tracker Profile",
  description: "Your Profile",
}

const ProfilePage: FC<any> = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Profile />
    </div>
  )
}

export default ProfilePage
