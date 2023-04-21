describe("Exchange Page", () => {
  beforeEach(() => {
    cy.visit("/exchange")
  })

  function getConversionAmountInput() {
    return cy.getByTestId("conversion-amount")
  }

  function getFromCurrencyDropdown() {
    return cy.getByTestId("from-currency-select")
  }

  function getToCurrencyDropdown() {
    return cy.getByTestId("to-currency-select")
  }

  function getConvertCurrencyButton() {
    return cy.contains("button", "Convert")
  }

  it("should show navbar", () => {
    cy.getByTestId("navbar").should("be.visible")
  })

  it("should show amount to convert input", () => {
    getConversionAmountInput().should("be.visible")
    getConversionAmountInput().invoke("attr", "type")
      .should("eq", "number")
    getConversionAmountInput().invoke("attr", "min")
      .should("eq", "0.01")
    getConversionAmountInput().invoke("attr", "max")
      .should("eq", "99999999")
  })

  describe("from currency", () => {
    function assertFromCurrencyText(expectedText: string): void {
      getFromCurrencyDropdown().find("option:selected")
        .should("have.text", expectedText)
    }

    it("should show 'from' currency dropdown with default value", () => {
      getFromCurrencyDropdown().should("be.visible")
        .should("have.attr", "required")
      assertFromCurrencyText("-- select an option --")
    })

    it("should allow user to select 'from' currency", () => {
      assertFromCurrencyText("-- select an option --")
      getFromCurrencyDropdown().select("SGD")
      assertFromCurrencyText("SGD - Singapore Dollar")
    })
  })

  describe("to currency", () => {
    function assertToCurrencyText(expectedText: string): void {
      getToCurrencyDropdown().find("option:selected")
        .should("have.text", expectedText)
    }

    it("should show 'to' currency dropdown", () => {
      getToCurrencyDropdown().should("be.visible")
        .should("have.attr", "required")
      assertToCurrencyText("-- select an option --")
    })

    it("should allow user to select 'to' currency", () => {
      assertToCurrencyText("-- select an option --")
      getToCurrencyDropdown().select("USD")
      assertToCurrencyText("USD - United States Dollar")
    })
  })

  describe("convert currency", () => {
    function convertCurrency(amount: string, fromCurrency: string, toCurrency: string): void {
      getConversionAmountInput().clear().type(amount)
      getFromCurrencyDropdown().select(fromCurrency)
      getToCurrencyDropdown().select(toCurrency)
      getConvertCurrencyButton().click()
    }

    function getExchangeRateConversionElement() {
      return cy.getByTestId("exchange-rate-conversion")
    }

    function getExchangeRateElement() {
      return cy.getByTestId("exchange-rate")
    }

    function mockExchangeRate(alias: string) {
      cy.intercept("POST", "/api/exchange", {
        body: {
          date: "2023-04-04T00:00:00.000Z",
          rate: "0.800",
          result: "0.008"
        }
      }).as(alias)
    }

    function assertRouteCalled(alias: string, times: number): void {
      //  Count number of times intercepted route was called #16655
      //  https://github.com/cypress-io/cypress/issues/16655
      cy.get(`@${alias}.all`).should("have.length", times)
    }

    function assertSwalTitle(text: string): void {
      cy.get(".swal2-title").should("have.text", text)
    }

    function assertSwalBody(text: string): void {
      cy.get(".swal2-html-container").should("have.text",text)
    }

    it("should submit valid exchange request", () => {
      mockExchangeRate("exchangeRate")
      convertCurrency("0.01", "SGD", "USD")
      cy.wait("@exchangeRate")
      assertRouteCalled("exchangeRate", 1)
      getExchangeRateConversionElement().should("be.visible")
        .and("have.text", "0.01 SGD = 0.008 USD")
      getExchangeRateElement().should("be.visible")
        .and("have.text", "Exchange Rate: 0.800")
    })

    it("should not submit exchange request for invalid zero amount", () => {
      mockExchangeRate("exchangeRate")
      convertCurrency("0.00", "SGD", "USD")
      assertRouteCalled("exchangeRate", 0)
    })

    it("should not submit exchange request for negative amount", () => {
      mockExchangeRate("exchangeRate")
      convertCurrency("-0.01", "SGD", "USD")
      assertRouteCalled("exchangeRate", 0)
    })

    it("should not submit exchange request for same currency conversion", () => {
      mockExchangeRate("exchangeRate")
      convertCurrency("0.01", "USD", "USD")
      assertRouteCalled("exchangeRate", 0)
      assertSwalTitle("Invalid currency chosen")
      assertSwalBody("Currency chosen for conversion should be different")
    })
  })
})