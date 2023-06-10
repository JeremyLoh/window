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

  context("Anonymous User", () => {
    it("should show login and sign up button", () => {
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
    })
  })
})
