export const deleteDownloadsFolder = () => {
  // https://stackoverflow.com/questions/68176905/how-do-i-delete-downloaded-file-in-using-cypress
  // https://github.com/cypress-io/cypress-example-recipes/blob/7d4751c79c0b755ea4d8d02cf2a9b12a255f8a1d/examples/testing-dom__download/cypress/integration/local-download-spec.js#L17
  const downloadsFolder = Cypress.config("downloadsFolder")
  cy.task("deleteFolder", downloadsFolder)
}