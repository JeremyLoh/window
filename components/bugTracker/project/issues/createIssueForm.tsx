"use client"

import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { FormikHelpers, useFormik } from "formik"
import CreateIssueSchema from "../formSchema/createIssueSchema"

type CreateIssueFormValues = {
  name: string
  description: string
  priority: string
}

const priorityValues = ["None", "Lowest", "Low", "Medium", "High", "Highest"]

export default function CreateIssueForm() {
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
    },
    validationSchema: CreateIssueSchema,
    onSubmit: handleCreateIssue,
  })

  function handleCreateIssue(
    values: CreateIssueFormValues,
    actions: FormikHelpers<CreateIssueFormValues>
  ) {
    actions.resetForm()
    // todo create a new issue
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
        {priorityValues.map((p) => (
          <option value={p} key={p}>
            {p}
          </option>
        ))}
      </select>
      {errors.priority && touched.priority && (
        <p className="text-red-500">{errors.priority}</p>
      )}
      
      {/* TODO add issue status */}

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
