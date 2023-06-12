import { defineConfig } from "cypress"
import { deleteFolder, getBugTrackerUserSession } from "./cypress/support/tasks"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        deleteFolder: deleteFolder,
        getBugTrackerUserSession: getBugTrackerUserSession,
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
