"use client"

import React, { FC } from "react"
import { FormikHelpers, useFormik } from "formik"
import EmailLoginSchema from "./formSchema/emailLoginSchema"

type LoginFormValues = {
  email: string
  password: string
}

type LoginFormProps = {
  handleLogin: (email: string, password: string) => Promise<void>
}

const LoginForm: FC<LoginFormProps> = (props) => {
  async function handleLogin(
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) {
    actions.resetForm()
    await props.handleLogin(values.email, values.password)
    // TODO redirect to bug tracker homepage, which only shows for logged in users
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
    },
    validationSchema: EmailLoginSchema,
    onSubmit: handleLogin,
  })

  const defaultStyle: string =
    "rounded-lg text-black shadow-sm focus:border-cyan-500" +
    " focus:outline-none focus:ring"

  return (
    <>
      <form
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

        <button
          className="rounded border-b-4 border-indigo-700 bg-indigo-500 px-4 py-2 font-bold text-white
                     hover:border-indigo-500 hover:bg-indigo-400 disabled:opacity-40"
          type="submit"
          disabled={isSubmitting}
        >
          Submit
        </button>
      </form>
    </>
  )
}

export default LoginForm
