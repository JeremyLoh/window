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

  function loginWithEmailAndPassword() {
    cy.getByTestId("login-input").type("qa-createNewAccount@example.com")
    cy.getByTestId("password-input").type(
      "qa-createNewAccount@example.comPassword42"
    )
    cy.getByTestId("login-submit-btn").click()
  }

  context("Existing User", () => {
    function assertConfirmEmailWarning() {
      cy.assertAlertTitle("Confirm email to login")
      cy.assertAlertBody("Please confirm your email before login")
      cy.get(".swal2-confirm").should("have.text", "Resend Email")
      cy.get(".swal2-cancel").should("be.visible").and("have.text", "Cancel")
    }

    it("should prevent login when user has not confirmed email", () => {
      getLoginButton().click()
      cy.url().should("include", "/bugTracker/login")
      loginWithEmailAndPassword()
      assertConfirmEmailWarning()
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
      const invalidEmail: string = "invalid@"
      const validPassword: string = "12345678"

      beforeEach(() => {
        getSignUpButton().click()
      })

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

      function assertInputValidationIsInvalid(
        element: Cypress.Chainable<JQuery<HTMLElement>>
      ) {
        element.invoke("prop", "validationMessage").should("not.equal", "")
      }

      it("should not submit for invalid email", () => {
        getEmailInput().clear().type(invalidEmail)
        getPasswordInput().clear().type(validPassword)
        getConfirmPasswordInput().clear().type(validPassword)
        clickSubmit()
        assertInputValidationIsInvalid(getEmailInput())
      })

      it.skip("should create a new account", () => {
        const email = "qa-createNewAccount@example.com"
        const password = "qa-createNewAccount@example.comPassword42"
        getEmailInput().clear().type(email)
        getPasswordInput().clear().type(password)
        getConfirmPasswordInput().clear().type(password)
        // todo show alert requesting user to confirm email
        clickSubmit()
        // cy.url().should("include", "/bugTracker/login")
      })
    })
  })
})
