import { FC } from "react"
import Link from "next/link"
import { ClockIcon, DocumentIcon, UserIcon } from "@heroicons/react/24/solid"
import { Project } from "../dashboard/projectManagement"
import { formatDate } from "../../../lib/date"

type ProjectCardProps = {
  project: Project
}

const ProjectCard: FC<ProjectCardProps> = (props) => {
  const { project } = props

  return (
    <div className="m-auto my-2 flex w-full flex-col border-b-2 border-slate-400 bg-slate-600 p-0 md:w-1/2">
      <div className="bg-slate-700 p-2">
        <div className="flex items-stretch">
          <UserIcon className="mr-2 h-6 w-6 text-sky-400" />
          <p className="break-all md:text-xl">{project.user.username}</p>
        </div>
        <Link
          href={`/bugTracker/project/${project.id}`}
          className="mt-2 flex items-stretch hover:text-blue-400"
        >
          <DocumentIcon className="mr-2 h-6 w-6" />
          <p className="break-words md:text-xl">{project.name}</p>
        </Link>
      </div>
      {project.description && (
        <h3 className="break-words pl-2 pt-2 indent-2">
          {project.description}
        </h3>
      )}
      <div className="flex items-stretch justify-end py-2">
        <ClockIcon className="h-6 w-6" />
        <h4 className="px-2">{formatDate(project.created_at)}</h4>
      </div>
    </div>
  )
}

export default ProjectCard
