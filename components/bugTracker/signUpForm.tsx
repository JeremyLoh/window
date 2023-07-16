"use client"

import React, { FC, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FormikHelpers, useFormik } from "formik"
import SignUpSchema from "./formSchema/signUpSchema"
import { getClientSession } from "../../lib/db/supabaseClient"
import { signUpUsingEmail } from "../../lib/db/auth"
import { getWarningToast } from "../alert/warning"

type SignUpFormValues = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const SignUpForm: FC<any> = () => {
  const router = useRouter()

  useEffect(() => {
    getClientSession().then(async (session) => {
      if (session) {
        router.push("/bugTracker/dashboard")
      }
    })
  }, [])

  async function handleSignUp(
    values: SignUpFormValues,
    actions: FormikHelpers<SignUpFormValues>
  ) {
    actions.resetForm()
    // we need to get the location.origin in client component
    const redirectUrl: string = `${location.origin}/auth/callback`
    const response = await signUpUsingEmail(
      {
        username: values.username,
        email: values.email,
        password: values.password,
      },
      redirectUrl
    )
    if (response.error) {
      await getWarningToast(
        "Could not create an account",
        "Please try again later"
      ).fire()
      return
    }
    router.refresh()
    router.push("/bugTracker/login")
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
      username: "",
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
      className="flex w-full flex-col gap-y-1 rounded bg-slate-600 px-8 py-4 md:w-2/3 lg:w-1/2"
    >
      <label htmlFor="username" className="mr-2 md:text-lg">
        Username
      </label>
      <input
        data-test="sign-up-username-input"
        className={`${defaultStyle} ${
          errors.username && touched.username
            ? "border-red-600 text-red-800"
            : ""
        }`}
        type="text"
        id="username"
        name="username"
        placeholder="Enter a unique username"
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      {errors.username && touched.username && (
        <p className="text-red-500">{errors.username}</p>
      )}

      <label htmlFor="email" className="mr-2 md:text-lg">
        Email
      </label>
      <input
        data-test="sign-up-email-input"
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

      <label htmlFor="password" className="mr-2 md:text-lg">
        Password
      </label>
      <input
        data-test="sign-up-password-input"
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

      <label htmlFor="confirmPassword" className="mr-2 md:text-lg">
        Confirm Password
      </label>
      <input
        data-test="sign-up-confirm-password-input"
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
