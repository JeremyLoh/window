import { Metadata } from "next"
import React, { FC } from "react"
import LoginForm from "../../../components/bugTracker/loginForm"

export const metadata: Metadata = {
  title: "Bug Tracker Sign Up",
}

const Login: FC<any> = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <h1 className="my-4 text-2xl">Login</h1>
      <LoginForm />
    </div>
  )
}

export default Login
