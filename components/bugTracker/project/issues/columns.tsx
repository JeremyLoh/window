"use client"

// Contains column definitions of table
import { ColumnDef } from "@tanstack/react-table"

export type Issue = {
  id: string
  name: string
  description: string
  priority: "Lowest" | "Low" | "Medium" | "High" | "Highest"
  status: "New" | "Backlog" | "Ready" | "In Progress" | "In Review" | "Done"
}

export const columns: ColumnDef<Issue>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "description",
  },
  {
    accessorKey: "priority",
    header: "priority",
  },
]
