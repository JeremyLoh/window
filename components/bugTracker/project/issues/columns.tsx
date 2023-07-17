"use client"

// Contains column definitions of table
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { formatTableDate } from "../../../../lib/date"
import { IssuePriority, IssueStatus } from "../../../../lib/db/issue"

export type Issue = {
  id: string
  project_id: string
  issue_number: string
  created_at: Date
  name: string
  description: string
  priority: (typeof IssuePriority)[number]
  status: (typeof IssueStatus)[number]
}

export const columns: ColumnDef<Issue>[] = [
  {
    accessorKey: "issue_number",
    header: "Issue #",
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    sortingFn: "datetime",
    cell: ({ row }) => {
      return <div>{formatTableDate(row.original.created_at)}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="line-clamp-2 md:line-clamp-3 lg:line-clamp-4">
          {row.original.name}
        </div>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <div className="line-clamp-2 md:line-clamp-3 lg:line-clamp-4">
          {row.original.description}
        </div>
      )
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const issue = row.original

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="m-0 h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href={`/bugTracker/project/${issue.project_id}/issue/${issue.issue_number}`}
                >
                  View Issue
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
