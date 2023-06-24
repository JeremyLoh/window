"use client"

import { FC, useEffect, useState } from "react"
import { Session } from "@supabase/supabase-js"
import { getClientSession } from "../../../lib/db/supabaseClient"

const Project: FC<any> = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [projects, setProjects] = useState(null)

  useEffect(() => {
    getClientSession().then((session) => {
      if (session) {
        setSession(session)
        // todo retrieve the projects created by user
        // todo display the list of projects as clickable list, navigate to that project
      }
    })
  }, [])

  return (
    <div data-test="projects-container">
      {projects ? (
        <h1 className="text-center text-lg">Projects found...</h1>
      ) : (
        <h1 className="text-center text-lg">
          No Projects found. Please add a new project
        </h1>
      )}
    </div>
  )
}

export default Project
