import { FC } from "react"
import { Metadata } from "next"
import DashboardNavigation from "../../../components/bugTracker/dashboard/dashboardNavigation"

export const metadata: Metadata = {
  title: "Bug Tracker Dashboard",
  description: "Overview of bugs",
}

const Dashboard: FC<any> = async () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <DashboardNavigation />
    </div>
  )
}

export default Dashboard
