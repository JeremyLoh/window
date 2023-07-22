"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { FormikHelpers, useFormik } from "formik"
import CreateProjectSchema from "./formSchema/createProjectSchema"
import { getWarningToast } from "../../alert/warning"
import { errorToast } from "../../alert/error"
import { createProject, getProjectCount } from "../../../lib/db/project"
import useSession from "../../../lib/hooks/useSession"

type CreateProjectFormValues = {
  name: string
  description: string
}

export default function CreateProjectForm() {
  const router = useRouter()
  const session = useSession()

  async function isNewProjectName(name: string): Promise<boolean> {
    const response = await getProjectCount(name)
    if (response.error) {
      return false
    }
    return response.count === 0
  }

  async function handleCreateProject(
    values: CreateProjectFormValues,
    actions: FormikHelpers<CreateProjectFormValues>
  ) {
    actions.resetForm()
    if (!session) {
      await getWarningToast("Please Login to continue", "").fire()
      return
    }
    if (await isNewProjectName(values.name)) {
      await createNewProject(values)
    } else {
      await getWarningToast(
        "Please select a different project name",
        `"${values.name}" already exists`
      ).fire()
    }
  }

  async function createNewProject(values: CreateProjectFormValues) {
    if (!session) {
      await getWarningToast("Please Login to continue", "").fire()
      return
    }
    const response = await createProject(session, values)
    if (response.error) {
      await errorToast.fire({
        title: "Could not create project, please try again later",
      })
      return
    }

    if (response.status === 201) {
      // use project id as route
      router.push(`/bugTracker/project/${response.data[0].id}`)
    }
  }

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
    },
    validationSchema: CreateProjectSchema,
    onSubmit: handleCreateProject,
  })

  const defaultStyle: string =
    "rounded-lg text-black shadow-sm focus:border-sky-500" +
    " focus:outline-none focus:ring"

  return (
    <form
      onSubmit={handleSubmit}
      method="post"
      className="flex h-full w-full flex-col gap-y-1 rounded bg-slate-600 px-8 py-4"
    >
      <label htmlFor="name" className="mr-2 text-lg">
        Project Name
      </label>
      <input
        data-test="project-name-input"
        className={`${defaultStyle} ${
          errors.name && touched.name ? "border-red-600 text-red-800" : ""
        }`}
        type="text"
        id="name"
        name="name"
        placeholder="Enter your project name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      {errors.name && touched.name && (
        <p className="text-red-500">{errors.name}</p>
      )}

      <label htmlFor="description" className="mr-2 text-lg">
        Project Description
      </label>
      <textarea
        data-test="project-description-input"
        className={`${defaultStyle} bg-white pb-32 ${
          errors.description && touched.description
            ? "border-red-600 text-red-800"
            : ""
        }`}
        id="description"
        name="description"
        placeholder="Enter your project description"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.description && touched.description && (
        <p className="text-red-500">{errors.description}</p>
      )}
      <button
        data-test="create-project-submit-btn"
        className="rounded border-b-4 border-sky-700 bg-sky-500 px-4 py-2 font-bold text-white
                     hover:border-sky-500 hover:bg-sky-400 disabled:opacity-40"
        type="submit"
        disabled={isSubmitting}
      >
        Submit
      </button>
    </form>
  )
}
