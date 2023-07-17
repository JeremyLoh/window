"use client"

import { FC, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ClockIcon, DocumentIcon, TrashIcon } from "@heroicons/react/24/solid"
import { deleteProject, getProject } from "../../../lib/db/project"
import { getWarningToast } from "../../alert/warning"
import { InvalidDataToast } from "../../alert/error"
import { getSuccessToast } from "../../alert/success"
import { formatDate } from "../../../lib/date"

type ProjectInfoProps = {
  projectId: string
}

type Project = {
  id: string
  name: string
  description: string
  created_at: string
  user: { username: string }
}

const ProjectInfo: FC<ProjectInfoProps> = (props) => {
  const { projectId } = props
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    getProject(projectId).then((project) => {
      if (project.error) {
        return
      }
      // @ts-ignore
      setProject(project.data[0])
    })
  }, [projectId])

  async function handleDelete() {
    if (!project) {
      return
    }
    const result = await getWarningToast(
      "Confirm delete project?",
      "Are you sure you want to delete the project? It cannot be undone!"
    ).fire()
    if (result.isConfirmed) {
      const isDeleted = await deleteProject(project.id)
      if (!isDeleted) {
        await InvalidDataToast.fire({ title: "Could not delete project" })
        return
      }
      const deleteToastResponse = await getSuccessToast(
        "Deleted project",
        ""
      ).fire()
      if (deleteToastResponse.isConfirmed) {
        router.push("/bugTracker/dashboard")
      }
    }
  }

  return (
    <>
      {project && (
        <div className="mt-4 flex w-full flex-col gap-y-2 divide-y-2 divide-slate-300 px-2 lg:px-40">
          <div className="flex flex-col md:flex-row">
            <DocumentIcon className="mr-2 h-6 w-6" />
            <h1 className="break-all pr-8 text-lg md:text-xl">
              {project.user.username} / {project.name}
            </h1>
            <TrashIcon
              data-test="delete-project-btn"
              className="ml-auto h-6 w-6 text-gray-300 hover:cursor-pointer hover:text-red-400 md:h-8 md:w-8"
              onClick={handleDelete}
            />
          </div>
          <div className="pt-2">
            <h3 className="mb-2 text-xl">About</h3>
            <h3>Description</h3>
            <h3 className="indent-4 text-lg">{project.description}</h3>
            <div className="flex items-stretch">
              <ClockIcon className="mr-2 h-6 w-6" />
              <p className="text-lg">{formatDate(project.created_at)}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectInfo
