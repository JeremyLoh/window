import axios from "axios"
import { test, expect, describe, vi, afterEach } from "vitest"
import { render, screen, within } from "@testing-library/react"
import { UserEvent } from "@testing-library/user-event/setup/setup"
import userEvent from "@testing-library/user-event"
import EconomyDisplay, { Country } from "../../../components/exchange/economyDisplay"

describe("EconomyDisplay", () => {
  const user: UserEvent = userEvent.setup()

  function getCountryDropdown(): HTMLSelectElement {
    return screen.getByLabelText("economy-country-select")
  }

  function getEconomySubmitButton(): HTMLButtonElement {
    const form: HTMLElement = screen.getByLabelText("exchange-economy-form")
    return within(form).getByRole("button", { name: "Get Economic Data" })
  }

  function getOption(selectElement: HTMLSelectElement, optionLabelText: string): HTMLOptionElement {
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

  function getUnitedStatesDetails(): Country {
    // https://flagpedia.net/the-united-states/emoji
    return {
      alpha2Code: "USA",
      name: "United States of America",
      flag: "\ud83c\uddfa\ud83c\uddf8",
    }
  }

  describe("country choice", () => {
    test("should show dropdown for default choice", () => {
      const countries: Map<string, Country> = new Map()
      render(<EconomyDisplay countries={countries} />)
      const countryDropdown: HTMLSelectElement = getCountryDropdown()
      expect(countryDropdown).toBeInTheDocument()
      expect(countryDropdown).toHaveAttribute("required")
      const defaultOption: HTMLOptionElement = getOption(countryDropdown, "default-country")
      expect(defaultOption.selected).toBe(true)
      expect(defaultOption.textContent).toBe("-- select a country --")
    })

    test("should show dropdown for one country choice", () => {
      const countries: Map<string, Country> = new Map([
        ["Singapore", getSingaporeDetails()]
      ])
      render(<EconomyDisplay countries={countries} />)
      const countryDropdown: HTMLSelectElement = getCountryDropdown()
      const option: HTMLOptionElement = getOption(countryDropdown, "economy-country-Singapore")
      expect(option).toBeInTheDocument()
    })

    test("should show dropdown for multiple country choice", () => {
      const countries: Map<string, Country> = new Map([
        ["Singapore", getSingaporeDetails()],
        ["United States of America", getUnitedStatesDetails()],
      ])
      render(<EconomyDisplay countries={countries} />)
      const countryDropdown: HTMLSelectElement = getCountryDropdown()
      expect(getOption(countryDropdown, "economy-country-Singapore"))
        .toBeInTheDocument()
      expect(getOption(countryDropdown, "economy-country-United States of America"))
        .toBeInTheDocument()
    })
  })

  test("should show submit button for economy country form", () => {
    const countries: Map<string, Country> = new Map()
    render(<EconomyDisplay countries={countries} />)
    const submitButton: HTMLButtonElement = getEconomySubmitButton()
    expect(submitButton).toBeInTheDocument()
  })

  describe("CPI data", () => {
    const axiosSpy = vi.spyOn(axios, "get")

    afterEach(() => {
      vi.restoreAllMocks()
    })

    test("should call correct API for CPI data when country is selected and submitted", async () => {
      const countries: Map<string, Country> = new Map([
        ["Singapore", getSingaporeDetails()]
      ])
      render(<EconomyDisplay countries={countries} />)
      const countryDropdown: HTMLSelectElement = getCountryDropdown()
      const option: HTMLOptionElement = getOption(countryDropdown, "economy-country-Singapore")
      await user.selectOptions(countryDropdown, option)
      const submitButton: HTMLButtonElement = getEconomySubmitButton()
      await user.click(submitButton)
      expect(axiosSpy).toHaveBeenCalledOnce()
      expect(axiosSpy).toHaveBeenCalledWith("https://www.econdb.com/api/series/CPISG/?format=json")
    })
  })
})