import { FC } from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDate } from "../../../../lib/date"
import { UserInfo } from "../../../../lib/db/user"

// https://stackoverflow.com/questions/46376468/how-to-get-type-of-array-items
type ProjectCardProps = {
  project: UserInfo["project"][number]
}

const ProjectCard: FC<ProjectCardProps> = (props) => {
  const { project } = props
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{formatDate(project.created_at)}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="bg-sky-600 hover:bg-sky-500">
          <Link href={`/bugTracker/project/${project.id}/`}>Go To Project</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProjectCard
