import { getIssue } from "../../../../../../lib/db/issue"
import IssueInfo, {
  Issue,
} from "../../../../../../components/bugTracker/project/issues/issueInfo"

export default async function ProjectIssuePage({
  params,
}: {
  params: { projectId: string; issueNumber: string }
}) {
  const { projectId, issueNumber } = params
  const issue = await getData(projectId, issueNumber)

  return (
    <div className="flex h-screen w-full flex-col">
      {issue && <IssueInfo projectId={projectId} issue={issue} />}
    </div>
  )
}

async function getData(
  projectId: string,
  issueNumber: string
): Promise<Issue | null> {
  const response = await getIssue(projectId, issueNumber)
  if (response.error || !response.data) {
    return null
  }
  const issue = response.data[0]
  return {
    id: issue.id,
    project: {
      id: projectId,
      name: issue.project.name,
    },
    user: issue.user,
    created_at: new Date(issue.created_at),
    name: issue.name,
    description: issue.description,
    priority: issue.issue_priority.priority,
    status: issue.issue_status.status,
    issue_number: issue.issue_number,
  }
}
