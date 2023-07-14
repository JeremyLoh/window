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
    <div className="flex h-screen w-full flex-col items-start justify-start gap-y-2">
      <ProjectInfo projectId={projectId} />
      <div className="mx-auto w-full lg:px-40">
        <Link href={`/bugTracker/project/${projectId}/issue/create`}>
          <Button className="mb-2 bg-green-600 hover:bg-green-500">
            New Issue
          </Button>
        </Link>
        <h2 className="w-fit border-[1px] border-b-0 px-2 lg:text-lg">
          Issues
        </h2>
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
      created_at: new Date(issue.created_at),
      name: issue.name + "3".repeat(50),
      description: issue.description + "line-clamp-3line-clamp-3".repeat(30),
      priority: issue.issue_priority.priority,
      status: issue.issue_status.status,
      issue_number: issue.issue_number,
    }
  })
}
