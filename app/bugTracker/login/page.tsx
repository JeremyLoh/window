import { Metadata } from "next"
import React, { FC } from "react"
import LoginForm from "../../../components/bugTracker/loginForm"
import { signInWithEmail } from "../../../lib/auth/login"
import { AuthTokenResponse } from "@supabase/gotrue-js"
import { isEmailNotConfirmed } from "../../../lib/auth/session"

export const metadata: Metadata = {
  title: "Bug Tracker Sign Up",
}

const Login: FC<any> = () => {
  async function handleLogin(email: string, password: string) {
    // https://stackoverflow.com/questions/75676177/error-functions-cannot-be-passed-directly-to-client-components-unless-you-expli
    "use server"
    const response: AuthTokenResponse = await signInWithEmail(email, password)
    if (isEmailNotConfirmed(response)) {
      // JSON.stringify(response.error, null, 2)
      // {
      //   "name": "AuthApiError",
      //   "message": "Email not confirmed",
      //   "status": 400
      // }
      // todo fire alert that user should confirm their email
    }
    // If email is not confirmed, we will get this AuthTokenResponse
    //{
    //   data: { user: null, session: null },
    //   error: AuthApiError: Email not confirmed
    //       at eval (webpack-internal:///(sc_server)/./node_modules/@supabase/gotrue-js/dist/main/lib/fetch.js:58:24)
    //       at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
    //     __isAuthError: true,
    //     status: 400
    //   }
    // }
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <h1 className="my-4 text-2xl">Login</h1>
      <LoginForm handleLogin={handleLogin} />
    </div>
  )
}

export default Login
