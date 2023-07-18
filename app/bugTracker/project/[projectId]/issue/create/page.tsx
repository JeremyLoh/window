import CreateIssueForm from "../../../../../../components/bugTracker/project/issues/createIssueForm"
import BackToProject from "../../../../../../components/bugTracker/project/backToProject"

export default function CreateIssuePage({
  params,
}: {
  params: { projectId: string }
}) {
  const { projectId } = params
  return (
    <div className="flex h-screen w-full flex-col">
      <BackToProject projectId={projectId} />
      <h1 className="mx-auto w-full p-2 pt-4 md:w-4/5">Create a New Issue</h1>
      <div className="h-fit">
        <CreateIssueForm projectId={params.projectId} />
      </div>
    </div>
  )
}
