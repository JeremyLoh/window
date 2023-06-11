import React, { FC } from "react"
import SignUpForm from "../../../components/bugTracker/signUpForm"
import { Metadata } from "next"
import { signUpUsingEmail } from "../../../lib/auth/login"

export const metadata: Metadata = {
  title: "Bug Tracker Sign Up",
}

const SignUp: FC<any> = () => {
  async function handleSignUp(
    email: string,
    password: string,
    redirectUrl: string
  ) {
    "use server"
    await signUpUsingEmail(email, password, redirectUrl)
    // todo redirect to bug tracker dashboard
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <h1 className="my-4 text-2xl">Sign Up</h1>
      <SignUpForm handleSignUp={handleSignUp} />
    </div>
  )
}

export default SignUp
