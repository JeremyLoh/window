import { FC } from "react"
import { Project } from "../dashboard/projectManagement"
import { DocumentIcon, UserIcon } from "@heroicons/react/24/solid"

type ProjectCardProps = {
  project: Project
}

const ProjectCard: FC<ProjectCardProps> = (props) => {
  const { project } = props

  return (
    <div className="m-auto my-2 flex w-full flex-col border-b-2 border-slate-400 bg-slate-600 p-0 md:w-1/2">
      <div className="bg-slate-700 p-2">
        <div className="flex items-stretch">
          <UserIcon className="mr-2 inline h-6 w-6 text-sky-400" />
          <p className="break-words text-xl">{project.user.display_name}</p>
        </div>
        <div className="mt-2 flex items-stretch">
          <DocumentIcon className="mr-2 inline h-6 w-6 text-gray-200" />
          <p className="break-words text-xl">{project.name}</p>
        </div>
      </div>
      {project.description && (
        <h3 className="break-words pl-2 pt-2 indent-2">
          {project.description}
        </h3>
      )}
      <h4 className="px-2 pt-2 text-right">
        {new Date(project.created_at).toLocaleDateString()}
      </h4>
    </div>
  )
}

export default ProjectCard
