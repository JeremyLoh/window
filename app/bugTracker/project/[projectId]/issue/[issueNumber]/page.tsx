export default async function ProjectIssuePage({
  params,
}: {
  params: { projectId: string; issueNumber: string }
}) {
  const { projectId, issueNumber } = params

  return (
    <div className="flex h-screen w-full flex-col">
      {params.issueNumber}, {params.projectId}
    </div>
  )
}
