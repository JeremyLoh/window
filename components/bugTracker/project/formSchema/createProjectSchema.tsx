import * as Yup from "yup"

const CreateProjectSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "please enter a project name")
    .max(100, "max is 100 characters")
    .required("Required"),
  description: Yup.string().max(350, "max is 350 characters").optional(),
})

export default CreateProjectSchema
