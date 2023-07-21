"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Bars2Icon,
  CheckCircleIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClipboardDocumentListIcon,
  ComputerDesktopIcon,
  CursorArrowRaysIcon,
  EyeIcon,
  NoSymbolIcon,
  PlusCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid"
import { IssuePriority, IssueStatus } from "../../../../lib/db/issue"
import useSession from "../../../../lib/hooks/useSession"

type IssueProps = {
  projectId: string
  issue: Issue
}

export default function IssueInfo(props: IssueProps) {
  const { projectId, issue } = props
  const session = useSession()

  function isEditable(): boolean {
    if (!session) {
      return false
    }
    return session.user.id === issue.user.id
  }

  return (
    <div className="flex flex-col p-2 md:mx-auto md:w-4/5">
      <div className="my-2 flex items-end justify-between">
        <Link
          href={`/bugTracker/project/${projectId}`}
          className="w-fit text-lg text-blue-500 hover:underline hover:underline-offset-8"
        >
          <h1>{issue.project.name}</h1>
        </Link>
        {isEditable() && (
          <Button
            variant="default"
            className="bg-green-700 text-white hover:bg-green-600 hover:text-white"
          >
            Edit Issue
          </Button>
        )}
      </div>
      <Separator />
      <div className="mt-2">
        <p className="text-lg">
          {issue.name}{" "}
          <span className="text-sm text-gray-300">#{issue.issue_number}</span>
        </p>
      </div>
      <div className="mb-2 flex items-center gap-x-2">
        {statusIcons.get(issue.status)}
        <p className="pt-1 text-sm">
          <span className="font-bold">{issue.user.username} </span>
          created {formatDistanceToNow(new Date(issue.created_at))} ago
        </p>
      </div>
      <div className="mb-2 flex items-center gap-x-2">
        {priorityBadges.get(issue.priority)}
        <p className="pt-1 text-sm font-bold">Priority</p>
      </div>
      <Separator />
      <div className="mt-2 flex flex-col gap-x-2">
        <p className="font-bold">Description</p>
        <p className="break-words pt-1">{issue.description}</p>
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
    id: string
    username: string
  }
  issue_number: string
  created_at: Date
  name: string
  description: string
  priority: (typeof IssuePriority)[number]
  status: (typeof IssueStatus)[number]
}

const priorityBadges = new Map<string, JSX.Element>([
  [
    "None",
    <Badge key="priority-none" className="w-fit bg-gray-500 hover:bg-gray-500">
      None
    </Badge>,
  ],
  [
    "Lowest",
    <Badge
      key="priority-lowest"
      className="w-fit bg-blue-700 hover:bg-blue-700"
    >
      <ChevronDoubleDownIcon className="mr-0.5 h-4 w-4" />
      <p className="pt-1 align-text-bottom">Lowest</p>
    </Badge>,
  ],
  [
    "Low",
    <Badge key="priority-low" className="w-fit bg-blue-700 hover:bg-blue-700">
      <ChevronDownIcon className="mr-0.5 h-4 w-4" />
      <p className="pt-1 align-text-bottom">Low</p>
    </Badge>,
  ],
  [
    "Medium",
    <Badge
      key="priority-medium"
      className="w-fit bg-amber-700 hover:bg-amber-700"
    >
      <Bars2Icon className="mr-0.5 h-4 w-4" />
      <p className="pt-1 align-text-bottom">Medium</p>
    </Badge>,
  ],
  [
    "High",
    <Badge key="priority-high" className="w-fit bg-red-700 hover:bg-red-700">
      <ChevronUpIcon className="mr-0.5 h-4 w-4" />
      <p className="pt-1 align-text-bottom">High</p>
    </Badge>,
  ],
  [
    "Highest",
    <Badge key="priority-highest" className="w-fit bg-red-700 hover:bg-red-700">
      <ChevronDoubleUpIcon className="mr-0.5 h-4 w-4" />
      <p className="pt-1 align-text-bottom">Highest</p>
    </Badge>,
  ],
])

const statusIcons = new Map<string, JSX.Element>([
  [
    "None",
    <Badge key="status-none" className="w-fit bg-green-700 hover:bg-green-700">
      <QuestionMarkCircleIcon className="mr-0.5 h-4 w-4" />
      <p className="pt-1 align-text-bottom">None</p>
    </Badge>,
  ],
  [
    "New",
    <Badge key="status-new" className="w-fit bg-green-700 hover:bg-green-700">
      <PlusCircleIcon className="mr-0.5 h-4 w-4" />
      <p className="pt-1 align-text-bottom">New</p>
    </Badge>,
  ],
  [
    "Backlog",
    <Badge
      key="status-backlog"
      className="w-fit bg-green-700 hover:bg-green-700"
    >
      <ClipboardDocumentListIcon className="mr-0.5 h-4 w-4" />
      <p className="pt-1 align-text-bottom">Backlog</p>
    </Badge>,
  ],
  [
    "Ready",
    <Badge key="status-ready" className="w-fit bg-green-700 hover:bg-green-700">
      <ComputerDesktopIcon className="mr-0.5 h-4 w-4" />
      <p className="pt-1 align-text-bottom">Ready</p>
    </Badge>,
  ],
  [
    "In Progress",
    <Badge
      key="status-in-progress"
      className="w-fit bg-green-700 hover:bg-green-700"
    >
      <CursorArrowRaysIcon className="mr-0.5 h-4 w-4" />
      <p className="pt-1 align-text-bottom">In Progress</p>
    </Badge>,
  ],
  [
    "In Review",
    <Badge
      key="status-in-review"
      className="w-fit bg-green-700 hover:bg-green-700"
    >
      <EyeIcon className="mr-0.5 h-4 w-4" />
      <p className="pt-1 align-text-bottom">In Review</p>
    </Badge>,
  ],
  [
    "Done",
    <Badge key="status-done" className="w-fit bg-green-700 hover:bg-green-700">
      <CheckCircleIcon className="mr-0.5 h-4 w-4" />
      <p className="pt-1 align-text-bottom">Done</p>
    </Badge>,
  ],
  [
    "Closed",
    <Badge
      key="status-closed"
      className="w-fit bg-green-700 hover:bg-green-700"
    >
      <NoSymbolIcon className="mr-0.5 h-4 w-4" />
      <p className="pt-1 align-text-bottom">Closed</p>
    </Badge>,
  ],
])
