import { getClient } from "./supabaseClient"
import { getServer } from "./supabaseServer"

type GetIssueResponseData = {
  id: string
  created_at: string
  name: string
  description: string
  issue_priority: {
    priority: "None" | "Lowest" | "Low" | "Medium" | "High" | "Highest"
  }
  user: {
    username: string
  }
  issue_status: {
    status:
      | "None"
      | "New"
      | "Backlog"
      | "Ready"
      | "In Progress"
      | "In Review"
      | "Done"
  }
}

export async function getAllIssues(projectId: string) {
  const supabase = await getServer()
  return supabase
    .from("issue")
    .select(
      "id, created_at, name, description, issue_priority(priority), user(username)," +
        "issue_status(status)"
    )
    .eq("project_id", projectId)
    .returns<GetIssueResponseData[]>()
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
