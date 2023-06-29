import { BookOpenIcon } from "@heroicons/react/24/outline"
import CreateProjectForm from "../../../../components/bugTracker/project/createProjectForm"

export default function CreateProject() {
  return (
    <div className="flex min-h-screen w-full flex-row items-start justify-center">
      <div className="w-full md:w-2/5">
        <h1 className="inline-flex py-4 text-xl md:mt-6">
          <BookOpenIcon className="mx-2 h-6 w-6" />
          Create a new project
        </h1>
        <CreateProjectForm />
      </div>
    </div>
  )
}
