import Link from "next/link"
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import CreateIssueForm from "../../../../../../components/bugTracker/project/issues/createIssueForm"

export default function CreateIssuePage({
  params,
}: {
  params: { projectId: string }
}) {
  const { projectId } = params
  return (
    <div className="flex h-screen w-full flex-col">
      <Link href={`/bugTracker/project/${projectId}`} className="mt-2 w-fit">
        <Button className="bg-slate-600 hover:bg-slate-500">
          <ArrowLeftCircleIcon className="mx-2 h-6 w-6" />
          <p className="pt-0.5 align-text-bottom text-sm">
            Back to Project Issues
          </p>
        </Button>
      </Link>
      <h1 className="mx-auto w-full p-2 pt-4 md:w-4/5">Create a New Issue</h1>
      <div className="h-fit">
        <CreateIssueForm projectId={params.projectId} />
      </div>
    </div>
  )
}
