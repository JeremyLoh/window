import * as Yup from "yup"

const EmailLoginSchema = Yup.object().shape({
  email: Yup.string().email("please enter a valid email").required("Required"),
  password: Yup.string().min(8).required("Required"),
})

export default EmailLoginSchema