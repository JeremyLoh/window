import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/dataTable"
import {
  columns,
  Issue,
} from "../../../../components/bugTracker/project/issues/columns"
import ProjectInfo from "../../../../components/bugTracker/project/projectInfo"

export default async function ProjectIdPage({
  params,
}: {
  params: { projectId: string }
}) {
  const { projectId } = params
  const data = await getData()

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
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}

async function getData(): Promise<Issue[]> {
  // todo get data for project issues here, mock data given here
  // todo get data from supabase issue table for the project id
  return [
    {
      id: "1",
      created_at: new Date("2023-07-02 12:14:25.068842+00"),
      name: "test issue 1",
      description: "new issue description",
      priority: "Low",
      status: "New",
    },
    {
      id: "2",
      created_at: new Date("2023-07-01 12:54:20.068842+00"),
      name: "test issue 2",
      description: "new issue description 2",
      priority: "Lowest",
      status: "Ready",
    },
    {
      id: "3",
      created_at: new Date("2023-07-06 12:55:20.068842+00"),
      name: "test issue 3",
      description: "new issue description 3",
      priority: "Lowest",
      status: "Backlog",
    },
    {
      id: "4",
      created_at: new Date("2023-06-06 12:56:20.068842+00"),
      name: "test issue 4",
      description: "new issue description 4",
      priority: "Lowest",
      status: "In Progress",
    },
    {
      id: "5",
      created_at: new Date("2023-02-06 12:56:21.068842+00"),
      name: "test issue 5",
      description:
        "new issue description 5                 dddddddddddddddddddd3",
      priority: "Lowest",
      status: "In Review",
    },
    {
      id: "6",
      created_at: new Date("2022-07-06 12:56:48.068842+00"),
      name: "test issue 6",
      description: "new issue description 6",
      priority: "Lowest",
      status: "Done",
    },
    {
      id: "7",
      created_at: new Date("2021-07-06 12:57:18.068842+00"),
      name: "test issue 7",
      description: "new issue description 7",
      priority: "Lowest",
      status: "In Review",
    },
  ]
}
