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

  return (
    <div className="flex min-h-screen w-full flex-col py-4">
      {userData ? (
        <div className="flex flex-col items-center justify-center">
          <UserDetail username={username} createdAt={userData.created_at} />
          <Separator className="my-4 bg-zinc-400" />
          <div className="flex flex-col flex-wrap items-start justify-center gap-4 md:flex-row">
            {userData.project.map((p) => (
              <ProjectCard project={p} key={p.id} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <h1 className="text-lg">404 Page Not Found</h1>
        </div>
      )}
    </div>
  )
}

async function getUserData(username: string): Promise<UserInfo | null> {
  return await getUserInfo(username)
}
