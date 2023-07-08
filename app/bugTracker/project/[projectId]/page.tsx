"use client"

import { useEffect, useState } from "react"
import { getProject } from "../../../../lib/db/project"
import ProjectInfo from "../../../../components/bugTracker/project/projectInfo"

type Project = {
  id: string
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

  return (
    <div className="flex h-screen w-full flex-col items-start justify-start">
      {project && (
        <div className="mt-4 flex w-full flex-col gap-y-2 divide-y-2 divide-slate-300 px-2 lg:px-40">
          <ProjectInfo project={project} />
        </div>
      )}
    </div>
  )
}
