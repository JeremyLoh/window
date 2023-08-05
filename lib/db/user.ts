import { getClient } from "./supabaseClient"
import { getServer } from "./supabaseServer"

export async function getProfileInfo(id: string) {
  return getClient().from("user").select("username, created_at").eq("id", id)
}

export async function isUsernameTaken(username: string) {
  const response = await getClient()
    .rpc("is_username_taken", {
      username_input: username,
    })
    .returns<boolean>()
  return !response.error && response.data
}

export type UserInfo = {
  username: string
  created_at: string
  project: Array<Project>
}

type Project = {
  id: string
  name: string
  description: string
  created_at: string
}

export async function getUserInfo(username: string): Promise<UserInfo | null> {
  const supabase = await getServer()
  const response = await supabase
    .from("user")
    .select("username, created_at, project(id, name, description, created_at)")
    .eq("username", username)
  if (response.error || response.data.length !== 1) {
    return null
  }
  return response.data[0]
}
