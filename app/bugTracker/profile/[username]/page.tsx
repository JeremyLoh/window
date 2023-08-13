import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getUserInfo, UserInfo } from "../../../../lib/db/user"
import UserDetail from "../../../../components/bugTracker/profile/user/userDetail"
import ProjectCard from "../../../../components/bugTracker/profile/user/projectCard"

export default async function UsernamePage({
  params,
}: {
  params: { username: string }
}) {
  const username: string = decodeURIComponent(params.username)
  const userData = await getUserData(username)

  if (!userData) {
    return (
      <div className="flex items-center justify-center">
        <h1 className="text-lg">404 Page Not Found</h1>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col py-4">
      <div className="flex flex-col items-center justify-center">
        <UserDetail username={username} createdAt={userData.created_at} />
        <Separator className="my-4 bg-zinc-400" />
        <div className="flex flex-col flex-wrap items-start justify-center gap-4 md:flex-row">
          {userData.project.length > 0 ? (
            userData.project.map((p) => <ProjectCard project={p} key={p.id} />)
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Projects Available</CardTitle>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

async function getUserData(username: string): Promise<UserInfo | null> {
  return await getUserInfo(username)
}
