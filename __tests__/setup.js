import { expect, beforeAll, afterEach, afterAll, vi } from "vitest"
import { cleanup } from "@testing-library/react"
import matchers from "@testing-library/jest-dom/matchers"
import { rest } from "msw"
import { setupServer } from "msw/node"
import {nanoid} from "nanoid"

function mockNextFont() {
  vi.mock("@next/font/google", () => {
    return {
      Special_Elite: vi.fn(() => {
        return {
          className: "className",
          variable: "variable",
          style: { fontFamily: "fontFamily" },
        }
      })
    }
  })
}

function getTransaction(name, amount, transactionDate) {
  return {
    id: nanoid(),
    name,
    amount,
    transactionDate
  }
}

export const restHandlers = [
    rest.post("/api/wallet/transaction/create", async (req, res, ctx) => {
      const { name, amount, transactionDate } = await req.json()
      const transaction = getTransaction(name, amount, transactionDate)
      return res(ctx.status(200), ctx.json(transaction))
    })
]

const server = setupServer(...restHandlers)

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" })
  mockNextFont()
})

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
  // Reset handlers after each test `important for test isolation`
  server.resetHandlers()
})

afterAll(() => {
  server.close()
  vi.restoreAllMocks()
})