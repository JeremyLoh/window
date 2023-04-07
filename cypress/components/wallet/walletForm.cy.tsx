import WalletForm from "../../../components/wallet/walletAddTransactionForm"

describe("Wallet Form", () => {
  beforeEach(() => {
    const date = new Date()
    cy.mount(<WalletForm handleNewTransaction={() => {}}
                         transactionDate={date} />)
  })

  function getExpenseRadioInput() {
    return cy.get("input[id='expense']")
  }

  function getIncomeRadioInput() {
    return cy.get("input[id='income']")
  }

  function getNameInput() {
    return cy.get("input[id='name']")
  }

  function getAmountInput() {
    return cy.get("input[id='amount']")
  }

  function clickSubmit() {
    cy.get("button[type='submit']").click()
  }

  it("show expense radio input as default checked value", () => {
    getExpenseRadioInput().should("be.checked")
  })

  it("show allow change between expense and income radio input", () => {
    getIncomeRadioInput().should("not.be.checked")
    getIncomeRadioInput().click()
    getIncomeRadioInput().should("be.checked")
    getExpenseRadioInput().click()
    getExpenseRadioInput().should("be.checked")
  })

  it("should allow name input", () => {
    getNameInput().should("be.empty")
    getNameInput().type("Test N@me3")
    getNameInput().should("have.value", "Test N@me3")
    getNameInput().clear()
    getNameInput().should("be.empty")
  })

  describe("amount input", () => {
    function assertAmountInputIsValid(): void {
      getAmountInput().invoke("prop", "validationMessage")
        .should("equal", "")
    }

    function assertAmountInputIsInvalid(expectedValidationMessage: string): void {
      getAmountInput().invoke("prop", "validationMessage")
        .should("equal", expectedValidationMessage)
    }

    it("should allow amount input", () => {
      const amount: string = "99999.99"
      getAmountInput().should("be.empty")
      getAmountInput().type(amount)
      getAmountInput().should("have.value", amount)
    })

    it("should not allow zero amount", () => {
      const amount: string = "0.00"
      getAmountInput().type(amount)
      clickSubmit()
      assertAmountInputIsInvalid("Please select a value that is no less than 0.01.")
    })

    it("should allow 1 cent amount", () => {
      const amount: string = "0.01"
      getAmountInput().type(amount)
      clickSubmit()
      assertAmountInputIsValid()
    })

    it("should not allow negative amount", () => {
      const amount: string = "-0.01"
      getAmountInput().type(amount)
      clickSubmit()
      assertAmountInputIsInvalid("Please select a value that is no less than 0.01.")
    })

    it("should not allow 3 decimal place amount", () => {
      const amount: string = "23.231"
      const expectedValidationMessage = "Please select a valid value. The two nearest valid values are 23.23 and 23.24."
      getAmountInput().type(amount)
      clickSubmit()
      assertAmountInputIsInvalid(expectedValidationMessage)
    })

    it("should allow 2 decimal place amount", () => {
      const amount: string = "2.00"
      getAmountInput().type(amount)
      clickSubmit()
      assertAmountInputIsValid()
    })

    it("should allow max amount of $9,999,999,999", () => {
      const amount: string = "9999999999"
      getAmountInput().type(amount)
      clickSubmit()
      assertAmountInputIsValid()

      const expectedValidationAmount = `Please select a value that is no more than ${amount}.`
      getAmountInput().clear().type(amount + ".01")
      clickSubmit()
      assertAmountInputIsInvalid(expectedValidationAmount)

      getAmountInput().clear().type(amount + ".00")
      clickSubmit()
      assertAmountInputIsValid()
    })
  })
})