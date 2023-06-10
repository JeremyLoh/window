import React, { FC } from "react"
import Head from "next/head"
import Navbar from "../../components/navbar"
import SignUpForm from "../../components/bugTracker/signUpForm"

const SignUp: FC<any> = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <Head>
        <title>Window - Bug Tracker Sign Up</title>
        <meta name="description" content="Bug Tracker Sign Up" />
      </Head>
      <Navbar />
      <h1 className="my-4 text-2xl">Sign Up</h1>
      <SignUpForm />
    </div>
  )
}

export default SignUp
