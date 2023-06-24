import { FC } from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bug Tracker Dashboard",
}

const Dashboard: FC<any> = async () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <h1 className="text-xl">Dashboard</h1>
    </div>
  )
}

export default Dashboard
