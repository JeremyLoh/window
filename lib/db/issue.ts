import { getClient } from "./supabaseClient"

export async function getAllIssues(projectId: string) {
  return getClient()
    .from("issue")
    .select(
      "created_at, name, description, issue_priority(priority), user(username)," +
        "issue_status(status)"
    )
    .eq("project_id", projectId)
}

export type Issue = {
  name: string
  description: string
  priority: string
  status: string
}

export async function createIssue(
  projectId: string,
  userId: string,
  issue: Issue
) {
  return getClient()
    .from("issue")
    .insert({
      project_id: projectId,
      created_by_user_id: userId,
      name: issue.name,
      description: issue.description,
      priority: issue.priority,
      status: issue.status,
    })
    .select()
}
