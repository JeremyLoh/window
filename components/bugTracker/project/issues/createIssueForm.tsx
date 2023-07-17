"use client"

import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { FormikHelpers, useFormik } from "formik"
import CreateIssueSchema from "../formSchema/createIssueSchema"
import {
  createIssue,
  IssuePriority,
  IssueStatus,
} from "../../../../lib/db/issue"
import { getWarningToast } from "../../../alert/warning"
import { InvalidDataToast } from "../../../alert/error"
import { getSuccessToast } from "../../../alert/success"
import useSession from "../../../../lib/hooks/useSession"

type CreateIssueFormValues = {
  name: string
  description: string
  priority: string
  status: string
}

type CreateIssueFormProps = {
  projectId: string
}

export default function CreateIssueForm(props: CreateIssueFormProps) {
  const { projectId } = props
  const router = useRouter()
  const session = useSession()

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      priority: "",
      status: "",
    },
    validationSchema: CreateIssueSchema,
    onSubmit: handleCreateIssue,
  })

  async function handleCreateIssue(
    values: CreateIssueFormValues,
    actions: FormikHelpers<CreateIssueFormValues>
  ) {
    if (!session) {
      await getWarningToast("Please Login to Create an Issue", "").fire()
      return
    }
    actions.resetForm()
    const response = await createIssue(projectId, session.user.id, values)
    if (response.error) {
      await InvalidDataToast.fire({
        title: "Could not create issue",
        text: response.statusText,
      })
      return
    }
    await handleOptionalNavigation()
  }

  async function handleOptionalNavigation() {
    const result = await getSuccessToast(
      "Created Issue",
      "Navigate back to project issues?"
    ).fire({
      showCancelButton: true,
      confirmButtonText: "Back to issues",
    })
    if (result.isConfirmed) {
      router.push(`/bugTracker/project/${projectId}`)
      router.refresh()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      method="post"
      className="flex h-full w-full flex-col gap-y-1 rounded bg-slate-600 px-8 py-4 md:mx-auto md:w-4/5"
    >
      <label htmlFor="name" className="mr-2 md:text-lg">
        Name
      </label>
      <Input
        data-test="create-issue-name-input"
        className={`${
          errors.name && touched.name ? "border-red-600 text-red-800" : ""
        }`}
        type="text"
        id="name"
        name="name"
        placeholder="Enter issue name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      {errors.name && touched.name && (
        <p className="text-red-500">{errors.name}</p>
      )}

      <label htmlFor="description" className="mr-2 md:text-lg">
        Description
      </label>
      <Textarea
        data-test="create-issue-description-input"
        className={`${
          errors.description && touched.description
            ? "border-red-600 text-red-800"
            : ""
        }`}
        id="description"
        placeholder="Issue description"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.description && touched.description && (
        <p className="text-red-500">{errors.description}</p>
      )}

      <label htmlFor="priority" className="mr-2 md:text-lg">
        Priority
      </label>
      <select
        className="font-mono text-black"
        name="priority"
        value={values.priority}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        <option value="" label="Select a priority" disabled>
          Select a priority
        </option>
        {IssuePriority.map((p) => (
          <option value={p} key={p}>
            {p}
          </option>
        ))}
      </select>
      {errors.priority && touched.priority && (
        <p className="text-red-500">{errors.priority}</p>
      )}

      <label htmlFor="status" className="mr-2 md:text-lg">
        Status
      </label>
      <select
        className="font-mono text-black"
        name="status"
        value={values.status}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        <option value="" label="Select a status" disabled>
          Select a status
        </option>
        {IssueStatus.map((s) => (
          <option value={s} key={s}>
            {s}
          </option>
        ))}
      </select>
      {errors.status && touched.status && (
        <p className="text-red-500">{errors.status}</p>
      )}

      <button
        data-test="create-issue-submit-btn"
        className="rounded border-b-4 border-indigo-700 bg-indigo-500 px-4 py-2 font-bold text-white
                     hover:border-indigo-500 hover:bg-indigo-400 disabled:opacity-40"
        type="submit"
        disabled={isSubmitting}
      >
        Submit
      </button>
    </form>
  )
}
