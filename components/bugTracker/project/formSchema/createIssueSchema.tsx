import * as Yup from "yup"

const CreateIssueSchema = Yup.object().shape({
  name: Yup.string()
    .min(1)
    .max(200, "max is 200 characters")
    .required("Required"),
  description: Yup.string().max(1000, "max is 1000 characters").optional(),
  priority: Yup.string().required("Required"),
  status: Yup.string().min(1).required("Required"),
})

export default CreateIssueSchema
