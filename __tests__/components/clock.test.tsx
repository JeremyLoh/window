import { test, expect, describe, beforeEach, vi, afterEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import Clock from "../../components/clock"

describe("clock", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  test("shows morning emoji for 12:00:00 am (midnight)", async () => {
    const date = new Date(2022, 1, 1,
      0, 0, 0, 0)
    vi.setSystemTime(date)
    render(<Clock />)
    await waitFor(() => {
      const display: HTMLElement = screen.getByLabelText("current-clock-time")
      expect(display).toHaveTextContent("🌄 12:00:00 am")
    })
  })

  test("shows morning emoji for 11:59:59 am", async () => {
    const date = new Date(2022, 1, 1,
      11, 59, 59, 0)
    vi.setSystemTime(date)
    render(<Clock />)
    await waitFor(() => {
      const display: HTMLElement = screen.getByLabelText("current-clock-time")
      expect(display).toHaveTextContent("🌄 11:59:59 am")
    })
  })

  test("shows afternoon emoji for 12:00:00 pm", async () => {
    const date = new Date(2022, 1, 1,
      12, 0, 0, 0)
    vi.setSystemTime(date)
    render(<Clock />)
    await waitFor(() => {
      const display: HTMLElement = screen.getByLabelText("current-clock-time")
      expect(display).toHaveTextContent("🌞 12:00:00 pm")
    })
  })

  test("shows afternoon emoji for 5:59:59 pm", async () => {
    const date = new Date(2022, 1, 1,
      17, 59, 59, 0)
    vi.setSystemTime(date)
    render(<Clock />)
    await waitFor(() => {
      const display: HTMLElement = screen.getByLabelText("current-clock-time")
      expect(display).toHaveTextContent("🌞 5:59:59 pm")
    })
  })

  test("shows night emoji for 6:00:00 pm", async () => {
    const date = new Date(2022, 1, 1,
      18, 0, 0, 0)
    vi.setSystemTime(date)
    render(<Clock />)
    await waitFor(() => {
      const display: HTMLElement = screen.getByLabelText("current-clock-time")
      expect(display).toHaveTextContent("🌙 6:00:00 pm")
    })
  })

  test("shows night emoji for 11:59:59 pm", async () => {
    const date = new Date(2022, 1, 1,
      23, 59, 59, 0)
    vi.setSystemTime(date)
    render(<Clock />)
    await waitFor(() => {
      const display: HTMLElement = screen.getByLabelText("current-clock-time")
      expect(display).toHaveTextContent("🌙 11:59:59 pm")
    })
  })
})