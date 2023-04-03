import { test, expect, describe, vi, afterEach } from "vitest"
import { render, screen, waitFor, within } from "@testing-library/react"
import { UserEvent } from "@testing-library/user-event/setup/setup"
import userEvent from "@testing-library/user-event"
import EconomyDisplay, {
  Country,
} from "../../../components/exchange/economyDisplay"
import { HttpRequest } from "../../../lib/request"

describe("EconomyDisplay", () => {
  const user: UserEvent = userEvent.setup()

  function getCountryDropdown(): HTMLSelectElement {
    return screen.getByLabelText("economy-country-select")
  }

  function getEconomySubmitButton(): HTMLButtonElement {
    const form: HTMLElement = screen.getByLabelText("exchange-economy-form")
    return within(form).getByRole("button", { name: "Get Economic Data" })
  }

  function getOption(
    selectElement: HTMLSelectElement,
    optionLabelText: string
  ): HTMLOptionElement {
    return within(selectElement).getByLabelText(optionLabelText)
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

  describe("country choice", () => {
    test("should show dropdown for multiple country choice", () => {
      const countries: Map<string, Country> = new Map([
        ["Singapore", getSingaporeDetails()],
        ["United States of America", getUnitedStatesDetails()],
      ])
      render(<EconomyDisplay countries={countries} />)
      const countryDropdown: HTMLSelectElement = getCountryDropdown()
      expect(
        getOption(countryDropdown, "economy-country-Singapore")
      ).toBeInTheDocument()
      expect(
        getOption(countryDropdown, "economy-country-United States of America")
      ).toBeInTheDocument()
    })
  })

  describe("Country economy input form", () => {
    const httpRequestSpy = vi.spyOn(HttpRequest, "get")

    afterEach(() => {
      vi.restoreAllMocks()
    })

    async function selectCountryDropdown(optionLabelText: string) {
      const countryDropdown: HTMLSelectElement = getCountryDropdown()
      const option: HTMLOptionElement = getOption(
        countryDropdown,
        optionLabelText
      )
      await user.selectOptions(countryDropdown, option)
    }

    test("should show multi-select for available country series", async () => {
      const countries: Map<string, Country> = new Map([
        ["Singapore", getSingaporeDetails()],
      ])
      render(<EconomyDisplay countries={countries} />)
      await selectCountryDropdown("economy-country-Singapore")
      await waitFor(() => {
        const availableCountrySeries: HTMLSelectElement = screen.getByLabelText(
          "economy-country-series"
        )
        expect(availableCountrySeries).toBeInTheDocument()
      })
    })
  })
})
