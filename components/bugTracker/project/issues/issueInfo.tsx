import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import {
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  ComputerDesktopIcon,
  CursorArrowRaysIcon,
  EyeIcon,
  NoSymbolIcon,
  PlusCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid"
import BackToProject from "../backToProject"
import { IssuePriority, IssueStatus } from "../../../../lib/db/issue"

type IssueProps = {
  projectId: string
  issue: Issue
}

export default function IssueInfo(props: IssueProps) {
  const { projectId, issue } = props

  return (
    <div className="flex flex-col p-2 md:mx-auto md:w-4/5">
      <BackToProject projectId={projectId} />
      <p className="mt-2">
        {issue.name}{" "}
        <span className="text-sm text-gray-300">#{issue.issue_number}</span>
      </p>
      <div className="flex items-center gap-x-2">
        {getIssueBadge(issue.status)}
        <p className="pt-1 text-sm">
          <span className="font-bold">{issue.user.username} </span>
          created {formatDistanceToNow(new Date(issue.created_at))} ago
        </p>
      </div>
    </div>
  )
}

export type Issue = {
  id: string
  project: {
    id: string
    name: string
  }
  user: {
    username: string
  }
  issue_number: string
  created_at: Date
  name: string
  description: string
  priority: (typeof IssuePriority)[number]
  status: (typeof IssueStatus)[number]
}

const statusIcons = new Map<string, JSX.Element>([
  ["None", <QuestionMarkCircleIcon key="None" className="mr-0.5 h-4 w-4" />],
  ["New", <PlusCircleIcon key="New" className="mr-0.5 h-4 w-4" />],
  [
    "Backlog",
    <ClipboardDocumentListIcon key="Backlog" className="mr-0.5 h-4 w-4" />,
  ],
  ["Ready", <ComputerDesktopIcon key="Ready" className="mr-0.5 h-4 w-4" />],
  [
    "In Progress",
    <CursorArrowRaysIcon key="In Progress" className="mr-0.5 h-4 w-4" />,
  ],
  ["In Review", <EyeIcon key="In Review" className="mr-0.5 h-4 w-4" />],
  ["Done", <CheckCircleIcon key="Done" className="mr-0.5 h-4 w-4" />],
  ["Closed", <NoSymbolIcon key="Closed" className="mr-0.5 h-4 w-4" />],
])

function getIssueBadge(status: string) {
  const icon = statusIcons.get(status) || (
    <QuestionMarkCircleIcon className="mr-0.5 h-4 w-4" />
  )
  return (
    <Badge className="w-fit bg-green-700 hover:bg-green-700">
      {icon}
      <p className="pt-1 align-text-bottom">{status}</p>
    </Badge>
  )
}
