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

export default SignUpSchema