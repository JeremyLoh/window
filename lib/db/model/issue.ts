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

export type GetIssueResponseData = {
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

export type GetSingleIssueResponseData = {
  id: string
  created_at: string
  name: string
  description: string
  issue_number: string
  issue_priority: {
    priority: (typeof IssuePriority)[number]
  }
  user: {
    id: string
    username: string
  }
  issue_status: {
    status: (typeof IssueStatus)[number]
  }
  project: {
    name: string
  }
}