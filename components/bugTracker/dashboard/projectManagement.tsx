"use client"

import React, { FC, useEffect, useState } from "react"
import { Session } from "@supabase/supabase-js"
import { getClientSession } from "../../../lib/db/supabaseClient"
import { useRouter } from "next/navigation"
import { getCreatedProjects } from "../../../lib/db/project"
import { InvalidDataToast } from "../../alert/error"
import ProjectCard from "../project/projectCard"

export type Project = {
  id: string
  name: string
  description: string
  created_at: string
  user: User
}

type User = {
  display_name: string
}

const ProjectManagement: FC<any> = () => {
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null)
  const [projects, setProjects] = useState<Array<Project> | null>(null)

  useEffect(() => {
    getClientSession().then(async (session) => {
      if (!session) {
        return
      }
      setSession(session)
      const response = await getCreatedProjects()
      if (response.data) {
        // @ts-ignore
        setProjects(response.data)
      } else {
        await InvalidDataToast.fire({
          title: "Could not find your project(s)! Please try again later",
        })
      }
      // todo display the list of projects as clickable list, navigate to that project
    })
  }, [])

  function handleCreateProject(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    router.push("/bugTracker/project/create")
  }

  return (
    <div
      data-test="projects-container"
      className="flex flex-col items-center justify-center"
    >
      <button
        data-test="create-project-btn"
        className="mb-3 w-full rounded bg-green-700 px-2 py-1 text-lg hover:bg-green-600 md:ml-28 md:mr-auto md:w-fit"
        onClick={handleCreateProject}
      >
        Create a New Project
      </button>
      {projects ? (
        <div className="w-full">
          <h1 className="text-center text-lg">Your Projects</h1>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <h1 className="text-center text-lg">
          No Projects found. Please add a new project
        </h1>
      )}
    </div>
  )
}

export default ProjectManagement
