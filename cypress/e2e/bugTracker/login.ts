export function loginWithEmailAndPassword(email: string, password: string) {
  cy.getByTestId("login-input").type(email)
  cy.getByTestId("password-input").type(password)
  cy.getByTestId("login-submit-btn").click()
}

export function loginWithValidAccount() {
  loginWithEmailAndPassword(
    "lrjmaiuyi@exelica.com",
    "lrjmaiuyi@exelica.comPassword42"
  )
}