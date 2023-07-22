import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import EditIssueForm, { EditIssueFormValues } from "./editIssueForm"

type EditIssueDialogProps = {
  issue: EditIssueFormValues
}

export default function EditIssueDialog(props: EditIssueDialogProps) {
  const { issue } = props
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="default"
          className="bg-green-700 text-white hover:bg-green-600 hover:text-white"
        >
          Edit Issue
        </Button>
      </DialogTrigger>
      <DialogContent className="border-none bg-slate-700">
        <DialogHeader>
          <DialogTitle>Edit Issue</DialogTitle>
          <DialogDescription className="text-gray-300">
            Make changes to your issue here. Click submit when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <EditIssueForm issue={issue} />
      </DialogContent>
    </Dialog>
  )
}
