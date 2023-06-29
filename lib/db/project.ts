import { getClient } from "./supabaseClient"
import { Session } from "@supabase/supabase-js"

type CreateProject = {
  name: string
  description: string
}

export async function createProject(session: Session, value: CreateProject) {
  return getClient()
    .from("project")
    .insert({
      user_id: session.user.id,
      name: value.name,
      description: value.description,
    })
    .select()
}

export async function getProjectCount(name: string) {
  return getClient()
    .from("project")
    .select("name", { count: "exact", head: true })
    .eq("name", name)
}

export async function getCreatedProjects() {
  return getClient()
    .from("project")
    .select("id, created_at, name, description, user(display_name)")
    .order("created_at", { ascending: false })
}

export async function getProject(id: string) {
  return getClient()
    .from("project")
    .select("id, created_at, name, description")
    .eq("id", id)
}

export async function deleteProject(id: string): Promise<boolean> {
  const response = await getClient().from("project").delete().eq("id", id)
  return !response.error
}
