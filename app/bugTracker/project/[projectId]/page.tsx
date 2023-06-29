"use client"

import { useEffect, useState } from "react"
import { ClockIcon, DocumentIcon, TrashIcon } from "@heroicons/react/24/solid"
import format from "date-fns/format"
import { getWarningToast } from "../../../../components/alert/warning"
import { getProject } from "../../../../lib/db/project"

type Project = {
  name: string
  description: string
  created_at: string
}

export default function ProjectIdPage({
  params,
}: {
  params: { projectId: string }
}) {
  const { projectId } = params
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    getProject(projectId).then((project) => {
      if (project.error) {
        return
      }
      setProject(project.data[0])
    })
  }, [projectId])

  async function handleDelete() {
    const result = await getWarningToast(
      "Confirm delete project?",
      "Are you sure you want to delete the project? It cannot be undone!"
    ).fire()
    if (result.isConfirmed) {
      // delete project
    }
  }

  function formatDate(date: string): string {
    return format(new Date(date), "do MMMM yyyy")
  }

  return (
    <div className="flex h-screen w-full flex-col items-start justify-start">
      {project && (
        <div className="mt-4 flex w-full flex-col gap-y-2 divide-y-2 divide-slate-300 px-2 lg:px-40">
          <div className="flex flex-col md:flex-row">
            <DocumentIcon className="mr-2 inline h-6 w-6" />
            <h1 className="break-all pr-8 text-lg md:text-xl">
              {project.name}
            </h1>
            <TrashIcon
              className="ml-auto h-6 w-6 text-gray-300 hover:cursor-pointer hover:text-red-400 md:h-8 md:w-8"
              onClick={handleDelete}
            />
          </div>

          <div className="pt-2">
            <h3 className="mb-2 text-xl">About</h3>
            <h3 className="indent-4 text-lg">{project.description}</h3>
            <div className="flex items-stretch">
              <ClockIcon className="mr-2 inline h-6 w-6" />
              <p className="text-lg">{formatDate(project.created_at)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
