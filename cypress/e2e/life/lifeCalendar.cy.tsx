import sub from "date-fns/sub"
import format from "date-fns/format"
import add from "date-fns/add"
import differenceInCalendarISOWeeks from "date-fns/differenceInCalendarISOWeeks"
import ViewportPreset = Cypress.ViewportPreset
import { deleteDownloadsFolder } from "../../support/utils"

describe("life calendar", () => {
  beforeEach(() => {
    cy.visit("/life")
    deleteDownloadsFolder()
  })

  after(() => {
    deleteDownloadsFolder()
  })

  const MAX_YEARS = 80

  function getDateOfBirthForm() {
    return cy.getByTestId("life-date-of-birth")
  }

  function getDateOfBirthInput() {
    return getDateOfBirthForm().find("input[type='date']")
  }

  function formatDateOfBirthInput(date: Date) {
    return format(date, "yyyy-LL-dd")
  }

  function getLifeCalendarTitle() {
    return cy.getByTestId("life-calendar-title")
  }

  function getLifeCalendarContainer() {
    return cy.getByTestId("life-calendar")
  }

  function getLifeCalendarDownloadButton() {
    return cy.getByTestId("life-calendar-download")
  }

  function submitDateOfBirth(date: Date) {
    getDateOfBirthInput().type(formatDateOfBirthInput(date))
    getDateOfBirthForm().find("[data-test='submit-date-of-birth']")
      .click()
  }

  function assertFileExists(filename: string) {
    cy.readFile(`cypress/downloads/${filename}`)
  }

  context("date of birth input", () => {
    function assertValidDateOfBirthInput() {
      getDateOfBirthInput().invoke("prop", "validationMessage")
        .should("equal", "")
    }

    function assertInvalidDateOfBirthInputCss() {
      getDateOfBirthInput().should("have.css", "border-color",
        "rgb(236, 72, 153)")
      getDateOfBirthInput().should("have.css", "color",
        "rgb(220, 38, 38)")
    }

    it("should show date of birth label", () => {
      getDateOfBirthForm().find("label")
        .should("be.visible")
        .and("contain.text", "Enter your date of birth")
    })

    it("should show date of birth input", () => {
      const currentDate: Date = new Date()
      const expectedMinYear: number = sub(currentDate, { years: MAX_YEARS })
        .getFullYear()
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
      assertValidDateOfBirthInput()
    })

    it("should allow date of birth of today", () => {
      const today = new Date()
      getDateOfBirthInput().type(formatDateOfBirthInput(today))
      assertValidDateOfBirthInput()
    })

    it("should give warning for date of birth of tomorrow", () => {
      const tomorrow: Date = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      getDateOfBirthInput().type(formatDateOfBirthInput(tomorrow))

      const today: string = formatDateOfBirthInput(new Date())
      const expectedValidationMessage = `Please select a value that is no later than ${today}.`
      getDateOfBirthInput().invoke("prop", "validationMessage")
        .should("equal", expectedValidationMessage)
      assertInvalidDateOfBirthInputCss()
    })
  })

  context("generate life calendar based on date of birth", () => {
    it("should show title of life calendar", () => {
      const today: Date = new Date()
      getLifeCalendarTitle().should("not.exist")
      submitDateOfBirth(today)
      getLifeCalendarTitle().should("be.visible")
        .and("have.text", `Life Calendar  (${MAX_YEARS} Years)`)
    })

    it("should not show when date of birth input is not submitted", () => {
      getLifeCalendarContainer().should("not.exist")
      getDateOfBirthInput().type("1999-12-31")
      getLifeCalendarContainer().should("not.exist")
    })

    it("should show life calendar when date of birth input is submitted", () => {
      getLifeCalendarContainer().should("not.exist")
      submitDateOfBirth(new Date("1999-12-31"))
      getLifeCalendarContainer().should("be.visible")
    })

    it("should show life calendar grid of one past week", () => {
      const today = new Date()
      const oneWeekAgoDateOfBirth: Date = sub(today, { weeks: 1 })
      const expectedEndDate: Date = add(oneWeekAgoDateOfBirth, { years: MAX_YEARS })
      // Subtract 1 for present week
      const expectedFutureWeeks: number = differenceInCalendarISOWeeks(expectedEndDate, today) - 1
      submitDateOfBirth(oneWeekAgoDateOfBirth)
      getLifeCalendarContainer().find(".past")
        .should("have.length", 1)
      getLifeCalendarContainer().find(".present")
        .should("have.length", 1)
      getLifeCalendarContainer().find(".future")
        .should("have.length", expectedFutureWeeks)
        .last()
        .should("not.have.text", "80y")
    })

    it("should show life calendar grid of zero past weeks", () => {
      const today: Date = new Date()
      const expectedEndDate: Date = add(today, { years: MAX_YEARS })
      // Subtract 1 for present week
      const expectedFutureWeeks: number = differenceInCalendarISOWeeks(expectedEndDate, today) - 1
      submitDateOfBirth(today)
      getLifeCalendarContainer().find(".past")
        .should("have.length", 0)
      getLifeCalendarContainer().find(".present")
        .should("have.length", 1)
      getLifeCalendarContainer().find(".future")
        .should("have.length", expectedFutureWeeks)
        .last()
        .should("not.have.text", "80y")
    })

    it("should show life calendar grid of one future week", () => {
      const today = new Date()
      const maxYearsAgo: Date = sub(today, { years: MAX_YEARS })
      const dateOfBirth: Date = add(maxYearsAgo, { weeks: 2 })
      submitDateOfBirth(dateOfBirth)
      getLifeCalendarContainer().find(".past")
        .should("have.length", differenceInCalendarISOWeeks(today, dateOfBirth))
      getLifeCalendarContainer().find(".present")
        .should("have.length", 1)
      getLifeCalendarContainer().find(".future")
        .should("have.length", 1)
    })

    it("should show life calendar grid of zero future weeks", () => {
      const today = new Date()
      const maxYearsAgo: Date = sub(today, { years: MAX_YEARS })
      submitDateOfBirth(maxYearsAgo)
      getLifeCalendarContainer().find(".past")
        .should("have.length", differenceInCalendarISOWeeks(today, maxYearsAgo))
        .last()
        .should("not.have.text", `${MAX_YEARS}y`)
      getLifeCalendarContainer().find(".present")
        .should("have.length", 1)
      getLifeCalendarContainer().find(".future")
        .should("have.length", 0)
    })
  })

  context("desktop tests", () => {
    const sizes: (ViewportPreset | [number, number])[] = ["macbook-16", [1366, 768],
      [1600, 900], [1920, 1080], [2560, 1440], [3840, 2160],
      [3440, 1440], [5120, 1440]]
    sizes.forEach((size) => {
      context(`${size} resolution`, () => {
        beforeEach(() => {
          if (Array.isArray(size)) {
            cy.viewport(size[0], size[1])
          } else {
            cy.viewport(size)
          }
        })

        it("should download desktop life calendar as png image when download button is" +
          " clicked", () => {
          const today = new Date()
          getLifeCalendarDownloadButton().should("not.exist")
          submitDateOfBirth(today)
          getLifeCalendarDownloadButton().should("be.visible")
            .and("have.text", "Save as Image")
          getLifeCalendarDownloadButton().click()
          assertFileExists("life-calendar.png")
        })
      })
    })
  })

  context("mobile tests", () => {
    const sizes: ViewportPreset[] = ["iphone-5", "iphone-xr", "ipad-2", "ipad-mini", "samsung-s10"]
    sizes.forEach((size) => {
      context(`${size} resolution`, () => {
        beforeEach(() => {
          cy.viewport(size)
        })

        it("should download desktop life calendar as png image when download button is" +
          " clicked", () => {
          const today = new Date()
          getLifeCalendarDownloadButton().should("not.exist")
          submitDateOfBirth(today)
          getLifeCalendarDownloadButton().should("be.visible")
            .and("have.text", "Save as Image")
          getLifeCalendarDownloadButton().click()
          assertFileExists("life-calendar.png")
        })
      })
    })
  })
})