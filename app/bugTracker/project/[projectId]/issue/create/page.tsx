import CreateIssueForm from "../../../../../../components/bugTracker/project/issues/createIssueForm"

export default function CreateIssuePage() {
  return (
    <div className="flex h-screen w-full flex-col">
      <h1 className="mx-auto w-full p-2 pt-4 md:w-4/5">Create a New Issue</h1>
      <div className="h-fit">
        <CreateIssueForm />
      </div>
    </div>
  )
}
