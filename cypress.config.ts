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
    excludeSpecPattern: [
      // Ignore built-in test files
      "**/1-getting-started/**",
      "**/2-advanced-examples/**",
    ],
  },

  component: {
    port: 8081,
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
})
