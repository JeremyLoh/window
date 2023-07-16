import SignUpForm from "../../../components/bugTracker/signUpForm"
import MockRouter from "../../support/utils/mockRouter"

describe("Bug Tracker Sign Up Form", function () {
  beforeEach(() => {
    cy.mount(
      <MockRouter>
        <SignUpForm />
      </MockRouter>
    )
  })

  function getUsernameInput(): Cypress.Chainable {
    return cy.getByTestId("sign-up-username-input")
  }

  function getEmailInput(): Cypress.Chainable {
    return cy.getByTestId("sign-up-email-input")
  }

  function getPasswordInput(): Cypress.Chainable {
    return cy.getByTestId("sign-up-password-input")
  }

  context("username input", () => {
    it("should have min of 1 character", () => {
      getUsernameInput().should("be.visible").clear()
      cy.clickOutside()
      getUsernameInput().next().should("contain", "Required")
      getUsernameInput().should("be.visible").type("@")
      cy.clickOutside()
      getUsernameInput().next().should("contain", "")
    })

    it("should allow max of 40 characters", () => {
      const username: string = "a".repeat(40)
      getUsernameInput().should("be.visible").type(username, { delay: 0 })
      cy.clickOutside()
      getUsernameInput().next().should("contain", "")
    })

    it("should not allow 41 characters", () => {
      const expectedErrorMessage: string = "max is 40 characters"
      const username: string = "<".repeat(41)
      getUsernameInput().should("be.visible").type(username, { delay: 0 })
      cy.clickOutside()
      cy.assertInputErrorValidation(getUsernameInput(), expectedErrorMessage)
    })

    it("should not allow whitespace at start of username input", () => {
      const expectedErrorMessage: string = "whitespace is not allowed"
      getUsernameInput().should("be.visible").type(" spaceAtStartOfUsername")
      cy.clickOutside()
      cy.assertInputErrorValidation(getUsernameInput(), expectedErrorMessage)
    })

    it("should not allow whitespace in middle of username input", () => {
      const expectedErrorMessage: string = "whitespace is not allowed"
      getUsernameInput().should("be.visible").type("space between username")
      cy.clickOutside()
      cy.assertInputErrorValidation(getUsernameInput(), expectedErrorMessage)
    })

    it("should not allow whitespace at end of username input", () => {
      const expectedErrorMessage: string = "whitespace is not allowed"
      getUsernameInput().should("be.visible").type("spaceAtEndOfUsername ")
      cy.clickOutside()
      cy.assertInputErrorValidation(getUsernameInput(), expectedErrorMessage)
    })
  })

  //  Cannot type spaces in email input #1327 https://github.com/cypress-io/cypress/issues/1327
  context("email input", () => {
    it("should not allow 2 character email input", () => {
      const expectedErrorMessage: string = "email must be at least 3 characters"
      getEmailInput().should("be.visible").type("@.")
      cy.clickOutside()
      cy.assertInputErrorValidation(getEmailInput(), expectedErrorMessage)
    })

    it("should allow 3 character email input with @", () => {
      getEmailInput().should("be.visible").type("a@b")
      cy.clickOutside()
      getEmailInput().next().should("contain", "")
    })
  })

  context("password input", () => {
    it("should not allow less than 8 character password", () => {
      const expectedErrorMessage: string = "min length of 8 characters"
      getPasswordInput().should("be.visible").type("1234567")
      cy.clickOutside()
      cy.assertInputErrorValidation(getPasswordInput(), expectedErrorMessage)
    })

    it("should not allow 8 character password that do not meet complexity requirements", () => {
      const expectedErrorMessage: string =
        "please create a stronger password: Min 8 chars, 1" +
        " uppercase letter, 1 lowercase letter, 1 numeric digit"
      getPasswordInput().should("be.visible").type("12345678")
      cy.clickOutside()
      cy.assertInputErrorValidation(getPasswordInput(), expectedErrorMessage)
    })

    it("should allow 8 character password that meet complexity requirements", () => {
      getPasswordInput().should("be.visible").type("Aa345678")
      cy.clickOutside()
      getPasswordInput().next().should("contain", "")
    })
  })
})
