import { Metadata } from "next"
import React, { FC } from "react"
import LoginForm from "../../../components/bugTracker/loginForm"
import { signInWithEmail } from "../../../lib/auth/login"
import { AuthTokenResponse } from "@supabase/gotrue-js"

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

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <h1 className="my-4 text-2xl">Login</h1>
      <LoginForm handleLogin={handleLogin} />
    </div>
  )
}

export default Login
