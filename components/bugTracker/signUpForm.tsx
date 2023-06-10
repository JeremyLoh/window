import React, { FC } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"

// Min 8 chars, 1 uppercase letter, 1 lowercase letter, 1 numeric digit
const passwordRule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
const passwordErrorMessage =
  "please create a stronger password: Min 8 chars, 1 uppercase letter, 1 lowercase letter, 1" +
  " numeric digit"

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("please enter a valid email").required("Required"),
  password: Yup.string()
    .min(8)
    .matches(passwordRule, {
      message: passwordErrorMessage,
    })
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "passwords must match")
    .required("Required"),
})

// todo React Formik Tutorial with Yup (React Form Validation) https://www.youtube.com/watch?v=7Ophfq0lEAY
// 16:06
function handleSignUpFormSubmit() {
  // todo create api for http://www.passportjs.org/tutorials/email/prompt/ action="/api/bugTracker/signUp"
}

const SignUpForm: FC<any> = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: SignUpSchema,
      onSubmit: handleSignUpFormSubmit,
    })

  const defaultStyle: string =
    "rounded-lg text-black shadow-sm focus:border-cyan-500" +
    " focus:outline-none focus:ring"

  return (
    <form
      data-test="bugTracker-sign-up-form"
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

      <label htmlFor="confirmPassword" className="mr-2 text-lg">
        Confirm Password
      </label>
      <input
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
                     hover:border-indigo-500 hover:bg-indigo-400"
        type="submit"
      >
        Submit
      </button>
    </form>
  )
}

export default SignUpForm