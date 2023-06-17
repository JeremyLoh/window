import { Metadata } from "next"
import React, { FC } from "react"
import { AuthTokenResponse } from "@supabase/gotrue-js"
import LoginForm from "../../../components/bugTracker/loginForm"
import {
  resendSignUpConfirmEmail,
  signInWithEmail,
} from "../../../lib/auth/login"

export const metadata: Metadata = {
  title: "Bug Tracker Sign Up",
}

const Login: FC<any> = () => {
  async function handleLogin(email: string, password: string) {
    // https://stackoverflow.com/questions/75676177/error-functions-cannot-be-passed-directly-to-client-components-unless-you-expli
    "use server"
    const response: AuthTokenResponse = await signInWithEmail(email, password)
    return {
      data: response.data,
      errorMessage: (response.error && response.error.message) || "",
    }
  }

  async function handleResendConfirmEmail(email: string) {
    "use server"
    await resendSignUpConfirmEmail(email)
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <h1 className="my-4 text-2xl">Login</h1>
      <LoginForm
        handleLogin={handleLogin}
        handleResendConfirmEmail={handleResendConfirmEmail}
      />
    </div>
  )
}

export default Login
