import * as Yup from "yup"
import { passwordErrorMessage, passwordRule } from "./password"

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(1)
    .max(40, "max is 40 characters")
    .matches(/^\S+$/, "whitespace is not allowed")
    .required("Required"),
  email: Yup.string()
    .min(3, "email must be at least 3 characters")
    .matches(/^\S+$/, "whitespace is not allowed")
    .email("please enter a valid email")
    .required("Required"),
  password: Yup.string()
    .min(8, "min length of 8 characters")
    .matches(passwordRule, {
      message: passwordErrorMessage,
    })
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "passwords must match")
    .required("Required"),
})

export default SignUpSchema
