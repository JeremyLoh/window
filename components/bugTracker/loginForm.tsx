"use client"

import React, { FC, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthTokenResponse } from "@supabase/supabase-js"
import { FormikHelpers, useFormik } from "formik"
import EmailLoginSchema from "./formSchema/emailLoginSchema"
import { getWarningToast } from "../alert/warning"
import { resendSignUpConfirmEmail, signInWithEmail } from "../../lib/db/auth"
import { getClientSession } from "../../lib/db/supabaseClient"

type LoginFormValues = {
  email: string
  password: string
}

const LoginForm: FC<any> = () => {
  const router = useRouter()

  useEffect(() => {
    getClientSession().then(async (session) => {
      if (session) {
        router.push("/bugTracker/dashboard")
      }
    })
  }, [])

  async function handleLogin(
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) {
    actions.resetForm()
    const response = await signInWithEmail(values.email, values.password)
    if (response.error) {
      await getWarningToast("Could not login", "Please try again").fire()
      return
    }
    if (isEmailNotConfirmed(response)) {
      await showConfirmEmailWarning(values.email)
      return
    }
    router.refresh()
    router.push("/bugTracker/dashboard")
  }

  async function showConfirmEmailWarning(email: string) {
    const result = await getWarningToast(
      "Confirm email to login",
      "Please confirm your email before login"
    ).fire({
      showCancelButton: true,
      confirmButtonText: "Resend Email",
    })
    if (result.isConfirmed) {
      await resendSignUpConfirmEmail(email)
    }
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
        className="flex w-full flex-col gap-y-1 rounded bg-slate-600 px-8 py-4 md:w-2/3 lg:w-1/2"
      >
        <label htmlFor="email" className="mr-2 md:text-lg">
          Email
        </label>
        <input
          data-test="login-input"
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
          data-test="password-input"
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
          data-test="login-submit-btn"
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

function isEmailNotConfirmed(loginResponse: AuthTokenResponse): boolean {
  if (!loginResponse.error) {
    return false
  }
  return loginResponse.error.message === "Email not confirmed"
}

export default LoginForm
