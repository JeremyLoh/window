// To remove Type error: 'commands.ts' cannot be compiled under '--isolatedModules'
// because it is considered a global script file.
// Add an import, export, or an empty 'export {}' statement to make it a module.
export {}

Cypress.Commands.add("getByTestId", (selector) => {
  return cy.get(`[data-test=${selector}]`, { timeout: 5000 })
})

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.task("getBugTrackerUserSession", { email, password }).then((session) => {
    cy.setCookie("supabase-auth-token", JSON.stringify(session))
  })
})

Cypress.Commands.add("assertAlertTitle", (text: string) => {
  cy.get(".swal2-title").should("have.text", text)
})

Cypress.Commands.add("assertAlertBody", (text: string) => {
  cy.get(".swal2-html-container").should("have.text", text)
})

Cypress.Commands.add("clickAlertConfirm", () => {
  cy.get(".swal2-confirm").click()
})

Cypress.Commands.add("clickAlertCancel", () => {
  cy.get(".swal2-cancel").click()
})

Cypress.Commands.add("clickOutside", () => {
  cy.get("body").click(0, 0)
})

Cypress.Commands.add(
  "assertInputErrorValidation",
  (element: Cypress.Chainable, message: string) => {
    element
      .next()
      .contains(new RegExp("^" + message + "$"))
      .should("be.visible")
  }
)

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(selector: string): Chainable

      login(email: string, password: string): Chainable

      assertAlertTitle(text: string): Chainable

      assertAlertBody(text: string): Chainable

      clickAlertConfirm(): Chainable

      clickAlertCancel(): Chainable

      clickOutside(): Chainable

      assertInputErrorValidation(
        element: Cypress.Chainable,
        message: string
      ): Chainable
    }
  }
}

/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// -- This is a parent command --
// Cypress.Commands.add('signUp', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       signUp(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
