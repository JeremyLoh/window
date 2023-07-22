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
import { updateIssue } from "../../../../lib/db/issue"
import { useRouter } from "next/navigation"
import { getWarningToast } from "../../../alert/warning"

type EditIssueDialogProps = {
  id: string
  issue: EditIssueFormValues
}

export default function EditIssueDialog(props: EditIssueDialogProps) {
  const { id, issue } = props
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()

  async function handleSubmit(editedIssue: EditIssueFormValues) {
    if (isNotEdited(issue, editedIssue)) {
      await getWarningToast("Issue was not edited", "").fire({
        timer: 3000,
        timerProgressBar: true,
        showCancelButton: false,
        showConfirmButton: false,
      })
      return
    }
    await updateIssue(id, editedIssue)
    setOpen(false)
    router.refresh()
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
