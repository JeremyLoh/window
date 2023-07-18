import { getClient } from "./supabaseClient"
import { getServer } from "./supabaseServer"

export const IssuePriority = [
  "None",
  "Lowest",
  "Low",
  "Medium",
  "High",
  "Highest",
] as const

export const IssueStatus = [
  "None",
  "New",
  "Backlog",
  "Ready",
  "In Progress",
  "In Review",
  "Done",
  "Closed",
] as const

type GetIssueResponseData = {
  id: string
  created_at: string
  name: string
  description: string
  issue_number: string
  issue_priority: {
    priority: (typeof IssuePriority)[number]
  }
  user: {
    username: string
  }
  issue_status: {
    status: (typeof IssueStatus)[number]
  }
}

export async function getAllIssues(projectId: string) {
  const supabase = await getServer()
  return supabase
    .from("issue")
    .select(
      "id, created_at, name, description, issue_number, issue_priority(priority), user(username)," +
        "issue_status(status)"
    )
    .eq("project_id", projectId)
    .returns<GetIssueResponseData[]>()
}

type GetSingleIssueResponseData = {
  id: string
  created_at: string
  name: string
  description: string
  issue_number: string
  issue_priority: {
    priority: (typeof IssuePriority)[number]
  }
  user: {
    username: string
  }
  issue_status: {
    status: (typeof IssueStatus)[number]
  }
  project: {
    name: string
  }
}

export async function getIssue(projectId: string, issueNumber: string) {
  const supabase = await getServer()
  return supabase
    .from("issue")
    .select(
      "id, created_at, name, description, issue_number, issue_priority(priority), user(username)," +
        "issue_status(status), project(name)"
    )
    .match({ project_id: projectId, issue_number: issueNumber })
    .returns<GetSingleIssueResponseData[]>()
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
  const supabase = getClient()
  const response = await supabase.rpc("get_issue_count", {
    project_id_input: projectId,
  })
  if (response.error) {
    throw new Error("Could not get project issue count")
  }
  const issueNumber: bigint = response.data + 1
  return supabase
    .from("issue")
    .insert({
      project_id: projectId,
      created_by_user_id: userId,
      name: issue.name,
      description: issue.description,
      priority: issue.priority,
      status: issue.status,
      issue_number: issueNumber,
    })
    .select()
}
