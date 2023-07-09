"use client"

// Contains column definitions of table
import { ColumnDef } from "@tanstack/react-table"

export type Issue = {
  id: string
  name: string
  description: string
  priority: "Lowest" | "Low" | "Medium" | "High" | "Highest"
}

export const columns: ColumnDef<Issue>[] = [
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
