import { FC } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ClockIcon, UserIcon } from "@heroicons/react/24/solid"
import { formatDate } from "../../../../lib/date"

type UserDetailProps = {
  username: string
  createdAt: string
}

const UserDetail: FC<UserDetailProps> = (props) => {
  const { username, createdAt } = props

  return (
    <div>
      <Avatar className="mb-2 h-20 w-20">
        <AvatarImage
          src={`https://ui-avatars.com/api/?background=random&name=${username}&size=80`}
        />
        <AvatarFallback>
          <UserIcon className="h-6 w-6" fill="black" />
        </AvatarFallback>
      </Avatar>
      <h1 className="font-bold">{username}</h1>
      <div className="flex items-center text-gray-300">
        <ClockIcon className="mr-2 h-6 w-6" />
        <span className="mt-0.5">{formatDate(createdAt)}</span>
      </div>
    </div>
  )
}

export default UserDetail
