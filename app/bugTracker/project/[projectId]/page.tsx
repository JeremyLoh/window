import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/dataTable"
import {
  columns,
  Issue,
} from "../../../../components/bugTracker/project/issues/columns"
import ProjectInfo from "../../../../components/bugTracker/project/projectInfo"
import { getAllIssues } from "../../../../lib/db/issue"

export default async function ProjectIdPage({
  params,
}: {
  params: { projectId: string }
}) {
  const { projectId } = params
  const data = await getData(projectId)

  return (
    <div className="flex h-screen w-full flex-col items-start justify-start gap-y-3 px-2">
      <ProjectInfo projectId={projectId} />
      <div className="mx-auto w-full lg:px-40">
        <h2 className="lg:text-lg">Issues</h2>
        <Link href={`/bugTracker/project/${projectId}/issue/create`}>
          <Button className="mb-2 bg-green-600 hover:bg-green-500">
            New Issue
          </Button>
        </Link>
        <div className="h-full">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  )
}

async function getData(projectId: string): Promise<Issue[]> {
  const response = await getAllIssues(projectId)
  if (response.error) {
    return []
  }
  return response.data.map((issue) => {
    return {
      id: issue.id,
      project_id: projectId,
      created_at: new Date(issue.created_at),
      name: issue.name,
      description: issue.description,
      priority: issue.issue_priority.priority,
      status: issue.issue_status.status,
      issue_number: issue.issue_number,
    }
  })
}
