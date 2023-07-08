import { loginWithNoEmailConfirmed, loginWithValidAccount } from "./login"

describe("Bug Tracker", () => {
  beforeEach(() => {
    cy.visit("/bugTracker")
  })

  function getLoginButton() {
    return cy.getByTestId("bug-tracker-login-btn")
  }

  function getSignUpButton() {
    return cy.getByTestId("bug-tracker-sign-up-btn")
  }

  context("Existing User", () => {
    function assertConfirmEmailWarning() {
      cy.assertAlertTitle("Confirm email to login")
      cy.assertAlertBody("Please confirm your email before login")
      cy.get(".swal2-confirm").should("have.text", "Resend Email")
      cy.get(".swal2-cancel").should("be.visible").and("have.text", "Cancel")
    }

    function assertUrlIsDashboardPage() {
      cy.url({ timeout: 5000 }).should("include", "/bugTracker/dashboard")
    }

    it("should prevent login when user has not confirmed email", () => {
      getLoginButton().click()
      cy.url().should("include", "/bugTracker/login")
      loginWithNoEmailConfirmed()
      assertConfirmEmailWarning()
    })

    it("should redirect user from login/sign up page to dashboard if already logged in", () => {
      getLoginButton().click()
      loginWithValidAccount()
      assertUrlIsDashboardPage()
      cy.visit("/bugTracker/login")
      assertUrlIsDashboardPage()
      cy.visit("/bugTracker/signUp")
      assertUrlIsDashboardPage()
    })
  })

  context("Anonymous User", () => {
    it("should show signUp and sign up button", () => {
      getLoginButton().should("be.visible").and("have.text", "Login")
      getSignUpButton().should("be.visible").and("have.text", "Sign Up")
    })

    it("should navigate to sign up page when sign up button is clicked", () => {
      getSignUpButton().click()
      cy.url().should("include", "/bugTracker/signUp")
    })

    context("sign up as new user", () => {
      const validEmail: string = "qa-validEmail@example.com"
      const invalidEmail: string = "invalid@"
      const validPassword: string = "Aa345678"
      const validUsername: string = "qa-test"

      beforeEach(() => {
        getSignUpButton().click()
      })

      function getUsernameInput() {
        return cy.get("input[id='username']")
      }

      function getEmailInput() {
        return cy.get("input[id='email']")
      }

      function getPasswordInput() {
        return cy.get("input[id='password']")
      }

      function getConfirmPasswordInput() {
        return cy.get("input[id='confirmPassword']")
      }

      function clickSubmit(): void {
        cy.getByTestId("bugTracker-sign-up-form").find("button").click()
      }

      function assertErrorValidationIsPresent(
        element: Cypress.Chainable<JQuery<HTMLElement>>,
        message: string
      ) {
        element
          .next()
          .contains(new RegExp("^" + message + "$"))
          .should("be.visible")
      }

      it("should not submit for invalid email", () => {
        getUsernameInput().type(validUsername)
        getEmailInput().type(invalidEmail)
        getPasswordInput().type(validPassword)
        getConfirmPasswordInput().type(validPassword)
        clickSubmit()
        assertErrorValidationIsPresent(
          getEmailInput(),
          "please enter a valid email"
        )
      })

      it("should not submit for no username", () => {
        getUsernameInput().clear()
        getEmailInput().type(validEmail)
        getPasswordInput().type(validPassword)
        getConfirmPasswordInput().type(validPassword)
        clickSubmit()
        assertErrorValidationIsPresent(getUsernameInput(), "Required")
      })

      it("should not submit for invalid username that is too long", () => {
        const invalidLongUsername: string = "a".repeat(41)
        getUsernameInput().type(invalidLongUsername)
        getEmailInput().type(validEmail)
        getPasswordInput().type(validPassword)
        getConfirmPasswordInput().type(validPassword)
        clickSubmit()
        assertErrorValidationIsPresent(
          getUsernameInput(),
          "max is 40 characters"
        )
      })

      it("should not submit for not matching confirm password", () => {
        getUsernameInput().type(validUsername)
        getEmailInput().type(validEmail)
        getPasswordInput().type(validPassword)
        getConfirmPasswordInput().type(validPassword + "A")
        clickSubmit()
        assertErrorValidationIsPresent(
          getConfirmPasswordInput(),
          "passwords must match"
        )
      })

      it.skip("should create a new account", () => {
        const email: string = "qa-createNewAccount@example.com"
        const password: string = "qa-createNewAccount@example.comPassword42"
        getUsernameInput().type("QA USERNAME")
        getEmailInput().clear().type(email)
        getPasswordInput().clear().type(password)
        getConfirmPasswordInput().clear().type(password)
        // todo show alert requesting user to confirm email
        clickSubmit()
        cy.url().should("include", "/bugTracker/login")
      })
    })
  })
})
