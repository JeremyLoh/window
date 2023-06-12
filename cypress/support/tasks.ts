//  How to implement authentication in Cypress E2E tests? #6177
//  https://github.com/orgs/supabase/discussions/6177
import { AuthTokenResponse, Session } from "@supabase/supabase-js"
import { existsSync, rm } from "fs"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

require("dotenv").config({ path: ".env.local", override: true })

const sessions = new Map<string, Session>()

export async function getBugTrackerUserSession({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const supabase = createClientComponentClient()
  if (!sessions.has(email)) {
    const response: AuthTokenResponse = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (response.data.session) {
      sessions.set(email, response.data.session)
    }
  }
  return sessions.get(email) || null
}

export async function deleteFolder(path: string) {
  return new Promise((resolve, reject) => {
    if (!existsSync(path)) {
      console.log("Folder does not exist: %s", path)
      resolve(null)
    }
    rm(path, { maxRetries: 2, recursive: true }, (error) => {
      if (error) {
        console.error(error)
        return reject(error)
      }
      console.log("Deleted folder %s", path)
      resolve(null)
    })
  })
}
