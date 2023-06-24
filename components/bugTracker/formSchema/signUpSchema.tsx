import * as Yup from "yup"
import { passwordErrorMessage, passwordRule } from "./password"

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

export default SignUpSchema
