import React from "react"
import ProgressBar from "../../components/wallet/progressBar"

describe("ProgressBar", () => {
  function renderProgressBar(current: number, max: number) {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ProgressBar current={current} max={max} />)
  }

  function getCurrentProgressElement() {
    return cy.getByTestId("progress-current")
  }

  function setViewport(width: number, height: number) {
    cy.viewport(width, height)
  }

  it("render with zero progress for max value of zero", () => {
    renderProgressBar(0, 0)
    getCurrentProgressElement().should("have.css", "width", "0px")
  })

  it("render with zero progress for division by zero", () => {
    renderProgressBar(1, 0)
    getCurrentProgressElement().should("have.css", "width", "0px")
  })

  it("render with zero progress", () => {
    renderProgressBar(0, 100)
    getCurrentProgressElement().should("have.css", "width", "0px")
  })

  it("render with zero progress for negative values", () => {
    const width = 500
    const height = 500
    const expectedWidth = "0px"
    setViewport(width, height)
    renderProgressBar(-1, 100)
    getCurrentProgressElement().should("have.css", "width", expectedWidth)
  })

  it("render with one percent progress", () => {
    const width = 500
    const height = 500
    const expectedWidth = `${width / 100}px`
    setViewport(width, height)
    renderProgressBar(1, 100)
    getCurrentProgressElement().should("have.css", "width", expectedWidth)
  })

  it("render with half progress", () => {
    const width = 500
    const height = 500
    const expectedWidth = `${width / 2}px`
    setViewport(width, height)
    renderProgressBar(500, 1000)
    getCurrentProgressElement().should("have.css", "width", expectedWidth)
  })

  it("render with max progress if current value is greater than max", () => {
    const width = 500
    const height = 500
    const expectedWidth = `${width}px`
    setViewport(width, height)
    renderProgressBar(2001, 2000)
    getCurrentProgressElement().should("have.css", "width", expectedWidth)
  })

  it("render with max progress using integer values", () => {
    const width = 500
    const height = 500
    const expectedWidth = `${width}px`
    setViewport(width, height)
    renderProgressBar(2000, 2000)
    getCurrentProgressElement().should("have.css", "width", expectedWidth)
  })

  it("render with max progress using float values", () => {
    const width = 500
    const height = 500
    const expectedWidth = `${width}px`
    setViewport(width, height)
    renderProgressBar(100.1, 100.1)
    getCurrentProgressElement().should("have.css", "width", expectedWidth)
  })
})
