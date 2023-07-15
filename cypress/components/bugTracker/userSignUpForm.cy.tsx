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

  function getUsernameInput() {
    return cy.getByTestId("sign-up-username-input")
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
      getUsernameInput().should("be.visible").type(username)
      cy.clickOutside()
      getUsernameInput().next().should("contain", "")
    })

    it("should not allow 41 characters", () => {
      const expectedErrorMessage: string = "max is 40 characters"
      const username: string = "<".repeat(41)
      getUsernameInput().should("be.visible").type(username)
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
})
