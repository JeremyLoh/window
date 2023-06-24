import React, { FC } from "react"
import SignUpForm from "../../../components/bugTracker/signUpForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bug Tracker Sign Up",
}

const SignUp: FC<any> = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <h1 className="my-4 text-2xl">Sign Up</h1>
      <SignUpForm />
    </div>
  )
}

export default SignUp
