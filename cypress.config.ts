import { defineConfig } from "cypress"
import { existsSync, rm } from "fs"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        deleteFolder: deleteFolder
      })
    },
    experimentalRunAllSpecs: true,
    downloadsFolder: "cypress/downloads",
    trashAssetsBeforeRuns: true,
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
})

async function deleteFolder(path: string) {
  return new Promise((resolve, reject) => {
    if (!existsSync(path)) {
      console.log("Folder does not exist: %s", path)
      resolve(null)
    }
    rm(path, { maxRetries: 2, recursive: true }, (error) => {
      if (error) {
        console.error(error)
        return reject(error)
      }
      console.log("Deleted folder %s", path)
      resolve(null)
    })
  })
}