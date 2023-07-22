"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EditIssueForm, { EditIssueFormValues } from "./editIssueForm"

type EditIssueDialogProps = {
  id: string
  issue: EditIssueFormValues
}

export default function EditIssueDialog(props: EditIssueDialogProps) {
  const { issue } = props
  const [open, setOpen] = useState<boolean>(false)

  async function handleSubmit(editedIssue: EditIssueFormValues) {
    if (isNotEdited(issue, editedIssue)) {
      // todo show alert that issue is not changed. keep dialog open
      return
    }
    // todo update issue in db
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="rounded bg-green-700 px-2 py-1 text-white hover:bg-green-600 hover:text-white">
        Edit Issue
      </DialogTrigger>
      <DialogContent className="border-none bg-slate-700">
        <DialogHeader>
          <DialogTitle>Edit Issue</DialogTitle>
          <DialogDescription className="text-gray-300">
            Make changes to your issue here. Click submit when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <EditIssueForm issue={issue} handleSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}

function isNotEdited(
  originalIssue: EditIssueFormValues,
  editedIssue: EditIssueFormValues
) {
  return (
    originalIssue.name === editedIssue.name &&
    originalIssue.priority === editedIssue.priority &&
    originalIssue.status === editedIssue.status &&
    originalIssue.description === editedIssue.description
  )
}
