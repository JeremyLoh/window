import { enableMapSet, enablePatches } from "immer"
import EconomyDisplay, {
  Country,
} from "../../../components/exchange/economyDisplay"

describe("EconomyDisplay", () => {
  before(() => {
    enablePatches()
    enableMapSet()
  })

  function mockSingaporeCountrySeriesApi() {
    // https://www.econdb.com/api/series/?search=Singapore&format=json&expand=meta&token=?????
    cy.intercept(
      "GET",
      "http://localhost:8081/api/exchange/economy/country?country=Singapore",
      {
        fixture: "/econdb/singaporeSeries.json",
      }
    ).as("singaporeSeriesSearchFirstPage")

    // https://www.econdb.com/api/series/Y10YDSG/?format=json&token=????
    cy.intercept(
      "GET",
      "http://localhost:8081/api/exchange/economy/series?series=Y10YDSG",
      {
        fixture: "/econdb/series/singapore/Y10YDSG.json",
      }
    ).as("singaporeLongTermYield")

    // https://www.econdb.com/api/series/RPUCSG/?format=json&token=????
    cy.intercept(
      "GET",
      "http://localhost:8081/api/exchange/economy/series?series=RPUCSG",
      {
        fixture: "/econdb/series/singapore/RPUCSG.json",
      }
    ).as("singaporeRealPublicConsumption")
  }

  function getSingaporeDetails(): Country {
    // https://flagpedia.net/singapore/emoji
    return {
      alpha2Code: "SG",
      name: "Singapore",
      flag: "\ud83c\uddf8\ud83c\uddec",
    }
  }

  function getAngolaDetails(): Country {
    // https://flagpedia.net/angola/emoji
    return {
      alpha2Code: "AO",
      name: "Angola",
      flag: "\ud83c\udde6\ud83c\uddf4",
    }
  }

  function getUnitedStatesDetails(): Country {
    // https://flagpedia.net/the-united-states/emoji
    return {
      alpha2Code: "USA",
      name: "United States of America",
      flag: "\ud83c\uddfa\ud83c\uddf8",
    }
  }

  function getCountryDropdown() {
    return cy.getByTestId("economy-country-select")
  }

  function getCountrySeriesDropdown() {
    return cy.get("[aria-label='economy-country-series']")
  }

  function assertSeriesChartIsShown(series: string) {
    cy.get(`canvas[aria-label='${series}-graph']`).should("be.visible")
  }

  function getSubmitButton() {
    return cy.contains("button", "Get Economic Data")
  }

  function clickNextSeriesChart() {
    cy.get(".swiper-button-next").click()
  }

  function clickPreviousSeriesChart() {
    cy.get(".swiper-button-prev").click()
  }

  it("should show submit button for form", () => {
    const countries: Map<string, Country> = new Map()
    cy.mount(<EconomyDisplay countries={countries} />)
    getSubmitButton().should("be.visible")
  })

  it("should show default choice for country choice", () => {
    const countries: Map<string, Country> = new Map()
    cy.mount(<EconomyDisplay countries={countries} />)
    getCountryDropdown()
      .find("option:selected")
      .should("have.text", "-- select a country --")
  })

  it("should show dropdown for one country and get series information", () => {
    const countries: Map<string, Country> = new Map([
      ["Singapore", getSingaporeDetails()],
    ])
    cy.mount(<EconomyDisplay countries={countries} />)
    mockSingaporeCountrySeriesApi()
    getCountryDropdown().select("Singapore")
    getCountryDropdown()
      .find("option:selected")
      .should("have.text", "Singapore")
    cy.wait("@singaporeSeriesSearchFirstPage")

    getCountrySeriesDropdown().type("Singapore - Long term yield{enter}")
    getSubmitButton().click()
    cy.wait("@singaporeLongTermYield")
    assertSeriesChartIsShown("Y10YDSG")
  })

  it("should allow multi select series for country", () => {
    const countries: Map<string, Country> = new Map([
      ["Singapore", getSingaporeDetails()],
    ])
    cy.mount(<EconomyDisplay countries={countries} />)
    mockSingaporeCountrySeriesApi()
    getCountryDropdown().select("Singapore")
    cy.wait("@singaporeSeriesSearchFirstPage")

    getCountrySeriesDropdown().type("Singapore - Long term yield{enter}")
    getCountrySeriesDropdown().type(
      "Singapore - Real public consumption{enter}"
    )
    getSubmitButton().click()
    cy.wait("@singaporeLongTermYield")
    cy.wait("@singaporeRealPublicConsumption")

    assertSeriesChartIsShown("Y10YDSG")
    clickNextSeriesChart()
    assertSeriesChartIsShown("RPUCSG")
    clickPreviousSeriesChart()
    assertSeriesChartIsShown("Y10YDSG")
  })

  it("should show multiple countries", () => {
    const countries: Map<string, Country> = new Map([
      ["Singapore", getSingaporeDetails()],
      ["United States of America", getUnitedStatesDetails()],
    ])
    cy.mount(<EconomyDisplay countries={countries} />)
    getCountryDropdown().find("option").contains("Singapore")
    getCountryDropdown().find("option").contains("United States of America")
  })
})
