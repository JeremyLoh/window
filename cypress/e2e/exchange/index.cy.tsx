describe("Exchange Page", () => {
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
    cy.visit("/exchange")
    cy.getByTestId("navbar").should("be.visible")
  })

  it("should show amount to convert input", () => {
    cy.visit("/exchange")
    getConversionAmountInput().should("be.visible")
    getConversionAmountInput().invoke("attr", "type").should("eq", "number")
    getConversionAmountInput().invoke("attr", "min").should("eq", "0.01")
    getConversionAmountInput().invoke("attr", "max").should("eq", "99999999")
  })

  describe("from currency", () => {
    function assertFromCurrencyText(expectedText: string): void {
      getFromCurrencyDropdown()
        .find("option:selected")
        .should("have.text", expectedText)
    }

    it("should show 'from' currency dropdown with default value", () => {
      cy.visit("/exchange")
      getFromCurrencyDropdown()
        .should("be.visible")
        .should("have.attr", "required")
      assertFromCurrencyText("-- select an option --")
    })

    it("should allow user to select 'from' currency", () => {
      cy.visit("/exchange")
      assertFromCurrencyText("-- select an option --")
      getFromCurrencyDropdown().select("SGD")
      assertFromCurrencyText("SGD - Singapore Dollar")
    })
  })

  describe("to currency", () => {
    function assertToCurrencyText(expectedText: string): void {
      getToCurrencyDropdown()
        .find("option:selected")
        .should("have.text", expectedText)
    }

    it("should show 'to' currency dropdown", () => {
      cy.visit("/exchange")
      getToCurrencyDropdown()
        .should("be.visible")
        .should("have.attr", "required")
      assertToCurrencyText("-- select an option --")
    })

    it("should allow user to select 'to' currency", () => {
      cy.visit("/exchange")
      assertToCurrencyText("-- select an option --")
      getToCurrencyDropdown().select("USD")
      assertToCurrencyText("USD - United States Dollar")
    })
  })

  describe("convert currency", () => {
    function convertCurrency(
      amount: string,
      fromCurrency: string,
      toCurrency: string
    ): void {
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
          result: "0.008",
        },
      }).as(alias)
    }

    function assertRouteCalled(alias: string, times: number): void {
      //  Count number of times intercepted route was called #16655
      //  https://github.com/cypress-io/cypress/issues/16655
      cy.get(`@${alias}.all`).should("have.length", times)
    }

    it("should submit valid exchange request", () => {
      cy.visit("/exchange")
      mockExchangeRate("exchangeRate")
      convertCurrency("0.01", "SGD", "USD")
      cy.wait("@exchangeRate")
      assertRouteCalled("exchangeRate", 1)
      getExchangeRateConversionElement()
        .should("be.visible")
        .and("have.text", "0.01 SGD = 0.008 USD")
      getExchangeRateElement()
        .should("be.visible")
        .and("have.text", "Exchange Rate: 0.800")
    })

    it("should not submit exchange request for invalid zero amount", () => {
      cy.visit("/exchange")
      mockExchangeRate("exchangeRate")
      convertCurrency("0.00", "SGD", "USD")
      assertRouteCalled("exchangeRate", 0)
    })

    it("should not submit exchange request for negative amount", () => {
      cy.visit("/exchange")
      mockExchangeRate("exchangeRate")
      convertCurrency("-0.01", "SGD", "USD")
      assertRouteCalled("exchangeRate", 0)
    })

    it("should not submit exchange request for same currency conversion", () => {
      cy.visit("/exchange")
      mockExchangeRate("exchangeRate")
      convertCurrency("0.01", "USD", "USD")
      assertRouteCalled("exchangeRate", 0)
      cy.assertAlertTitle("Invalid currency chosen")
      cy.assertAlertBody("Currency chosen for conversion should be different")
    })
  })
})
