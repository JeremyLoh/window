"use client"

import { FormikHelpers, useFormik } from "formik"
import CreateIssueSchema from "../formSchema/createIssueSchema"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { IssuePriority } from "../../../../lib/db/model/issue"

type EditIssueFormValues = {
  name: string
  description: string
  priority: string
  status: string
}

type EditIssueFormProps = {
  issue: EditIssueFormValues
}

export default function EditIssueForm(props: EditIssueFormProps) {
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        name: props.issue.name,
        description: props.issue.description,
        priority: props.issue.priority,
        status: props.issue.status,
      },
      validationSchema: CreateIssueSchema,
      onSubmit: handleEditIssue,
    })

  async function handleEditIssue(
    values: EditIssueFormValues,
    actions: FormikHelpers<EditIssueFormValues>
  ) {}

  return (
    <form onSubmit={handleSubmit} method="post">
      <label htmlFor="name" className="mr-2 md:text-lg">
        Name
      </label>
      <Input
        data-test="edit-issue-name-input"
        className={`${
          errors.name && touched.name ? "border-red-600 text-red-800" : ""
        }`}
        type="text"
        id="name"
        name="name"
        placeholder="Edit issue name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      {errors.name && touched.name && (
        <p data-test="edit-issue-name-error" className="text-red-500">
          {errors.name}
        </p>
      )}

      <label htmlFor="description" className="mr-2 md:text-lg">
        Description
      </label>
      <Textarea
        data-test="edit-issue-description-input"
        className={`${
          errors.description && touched.description
            ? "border-red-600 text-red-800"
            : ""
        }`}
        id="description"
        placeholder="Edit issue description"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.description && touched.description && (
        <p data-test="edit-issue-description-error" className="text-red-500">
          {errors.description}
        </p>
      )}

      <label htmlFor="priority" className="mr-2 md:text-lg">
        Priority
      </label>
      <select
        data-test="edit-issue-priority-input"
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
    </form>
  )
}
