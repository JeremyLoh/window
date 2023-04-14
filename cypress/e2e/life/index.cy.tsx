import format from "date-fns/format"

describe("life", () => {
  beforeEach(() => {
    cy.visit("/life")
  })

  it("should show navbar", () => {
    cy.getByTestId("navbar").should("be.visible")
  })

  it("should show quote", () => {
    cy.getByTestId("life-quote").should("be.visible")
      .should("have.length.greaterThan", 0)
  })

  context("date of birth input", () => {
    function getDateOfBirthForm() {
      return cy.getByTestId("life-date-of-birth")
    }

    function getDateOfBirthInput() {
      return getDateOfBirthForm().find("input[type='date']")
    }

    function formatDateOfBirthInput(date: Date) {
      return format(date, "yyyy-LL-dd")
    }

    it("should show date of birth label", () => {
      getDateOfBirthForm().find("label")
        .should("be.visible")
        .and("contain.text", "Enter your date of birth")
    })

    it("should show date of birth input", () => {
      const currentDate: Date = new Date()
      const expectedMinYear: number = currentDate.getFullYear() - 80
      getDateOfBirthInput().invoke("attr", "min")
        .should("eq", `${expectedMinYear}-01-01`)

      const expectedMaxDate = formatDateOfBirthInput(currentDate)
      getDateOfBirthInput().invoke("attr", "max")
        .should("eq", expectedMaxDate)
    })

    it("should allow date of birth input change", () => {
      getDateOfBirthInput().type("1999-12-31")
      getDateOfBirthInput().invoke("val")
        .should("eq", "1999-12-31")
      getDateOfBirthInput().invoke("prop", "validationMessage")
        .should("equal", "")
    })

    it("should give warning for date of birth of tomorrow", () => {
      const tomorrow: Date = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      getDateOfBirthInput().type(formatDateOfBirthInput(tomorrow))

      const today: string = formatDateOfBirthInput(new Date())
      const expectedValidationMessage = `Please select a value that is no later than ${today}.`
      getDateOfBirthInput().invoke("prop", "validationMessage")
        .should("equal", expectedValidationMessage)
      getDateOfBirthInput().should("have.css", "border-color",
        "rgb(236, 72, 153)")
      getDateOfBirthInput().should("have.css", "color",
        "rgb(220, 38, 38)")
    })
  })
})