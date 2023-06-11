"use client"

import React, { FC } from "react"
import { FormikHelpers, useFormik } from "formik"
import SignUpSchema from "./formSchema/signUpSchema"
import { redirect } from "next/navigation"

type SignUpFormValues = {
  email: string
  password: string
  confirmPassword: string
}

type SignUpFormProps = {
  handleSignUp: (
    email: string,
    password: string,
    redirectUrl: string
  ) => Promise<void>
}

const SignUpForm: FC<SignUpFormProps> = (props) => {
  async function handleSignUp(
    values: SignUpFormValues,
    actions: FormikHelpers<SignUpFormValues>
  ) {
    actions.resetForm()
    // we need to get the location.origin in client component
    const redirectUrl: string = `${location.origin}/auth/callback`
    await props.handleSignUp(values.email, values.password, redirectUrl)
    redirect("/bugTracker/login")
  }

  const {
    isSubmitting,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: handleSignUp,
  })

  const defaultStyle: string =
    "rounded-lg text-black shadow-sm focus:border-cyan-500" +
    " focus:outline-none focus:ring"

  return (
    <form
      data-test="bugTracker-sign-up-form"
      onSubmit={handleSubmit}
      method="post"
      className="flex w-4/5 flex-col gap-y-1 rounded bg-slate-600 px-8 py-4 md:w-1/3"
    >
      <label htmlFor="email" className="mr-2 text-lg">
        Email
      </label>
      <input
        className={`${defaultStyle} ${
          errors.email && touched.email ? "border-red-600 text-red-800" : ""
        }`}
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      {errors.email && touched.email && (
        <p className="text-red-500">{errors.email}</p>
      )}

      <label htmlFor="password" className="mr-2 text-lg">
        Password
      </label>
      <input
        className={`${defaultStyle} ${
          errors.password && touched.password
            ? "border-red-600 text-red-800"
            : ""
        }`}
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      {errors.password && touched.password && (
        <p className="text-red-500">{errors.password}</p>
      )}

      <label htmlFor="confirmPassword" className="mr-2 text-lg">
        Confirm Password
      </label>
      <input
        className={`${defaultStyle} ${
          errors.confirmPassword && touched.confirmPassword
            ? "border-red-600 text-red-800"
            : ""
        }`}
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Enter your password again"
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      {errors.confirmPassword && touched.confirmPassword && (
        <p className="text-red-500">{errors.confirmPassword}</p>
      )}

      <button
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

export default SignUpForm
