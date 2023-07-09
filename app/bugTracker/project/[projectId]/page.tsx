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
      <div className="mx-auto w-full lg:w-2/3">
        <h2 className="border-[1px] border-b-0 px-2 w-fit lg:text-lg">
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
      name: "test issue 1",
      description: "new issue description",
      priority: "Low",
    },
  ]
}
