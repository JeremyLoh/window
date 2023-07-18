import { FC } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline"

type BackToProjectProps = {
  projectId: string
}

const BackToProject: FC<BackToProjectProps> = (props) => {
  return (
    <Link
      href={`/bugTracker/project/${props.projectId}`}
      className="mt-2 w-fit"
    >
      <Button className="bg-slate-600 hover:bg-slate-500">
        <ArrowLeftCircleIcon className="mr-1 h-6 w-6" />
        <p className="pt-1 align-text-bottom text-sm">Back to Project</p>
      </Button>
    </Link>
  )
}

export default BackToProject
