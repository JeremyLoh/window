import ProjectInfo from "../../../../components/bugTracker/project/projectInfo"

export default function ProjectIdPage({
  params,
}: {
  params: { projectId: string }
}) {
  const { projectId } = params

  return (
    <div className="flex h-screen w-full flex-col items-start justify-start">
      <ProjectInfo projectId={projectId} />
    </div>
  )
}
