import { expect, beforeAll, afterEach, afterAll, vi } from "vitest"
import { cleanup } from "@testing-library/react"
import matchers from "@testing-library/jest-dom/matchers"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { nanoid } from "nanoid"
import { enableAllPlugins } from "immer"
import { Data as CreateTransactionResponseData } from "../pages/api/wallet/transaction/create"
import {
  CurrencyConvertResponse as ExchangeResponseData,
  RequestData as ExchangeRequestData
} from "../pages/api/exchange/index"
import { CurrencySymbolResponse } from "../pages/api/exchange/currency/symbols"

export const mockExchangeRate: number = 1.352

export const restHandlers = [
  rest.post("/api/wallet/transaction/create", async (req, res, ctx) => {
    const requestData: CreateTransactionResponseData = await req.json()
    const transaction = getTransaction(requestData)
    return res(ctx.status(200), ctx.json(transaction))
  }),
  rest.get("/api/exchange", async (req, res, ctx) => {
    // https://api.exchangerate.host/convert
    const requestData: ExchangeRequestData = await req.json()
    const mockResponse: ExchangeResponseData = {
      date: new Date("2022-12-26"),
      rate: mockExchangeRate,
      result: getExchangeResult(requestData.amount),
    }
    return res(ctx.status(200), ctx.json(mockResponse))
  }),
  rest.post("/api/exchange", async (req, res, ctx) => {
    // https://api.exchangerate.host/convert
    const requestData: ExchangeRequestData = await req.json()
    const mockResponse: ExchangeResponseData = {
      date: new Date("2022-12-30"),
      rate: mockExchangeRate,
      result: getExchangeResult(requestData.amount),
    }
    return res(ctx.status(200), ctx.json(mockResponse))
  }),
  rest.get("/api/exchange/currency/symbols", async (req, res, ctx) => {
    // https://api.exchangerate.host/symbols
    const mockResponse: CurrencySymbolResponse = {
      "symbols": {
        "BTC": {
          "description": "Bitcoin",
          "code": "BTC"
        },
        "CNH": {
          "description": "Chinese Yuan (Offshore)",
          "code": "CNH"
        },
        "CNY": {
          "description": "Chinese Yuan",
          "code": "CNY"
        },
        "EUR": {
          "description": "Euro",
          "code": "EUR"
        },
        "GBP": {
          "description": "British Pound Sterling",
          "code": "GBP"
        },
        "HKD": {
          "description": "Hong Kong Dollar",
          "code": "HKD"
        },
        "JPY": {
          "description": "Japanese Yen",
          "code": "JPY"
        },
        "SGD": {
          "description": "Singapore Dollar",
          "code": "SGD"
        },
        "TWD": {
          "description": "New Taiwan Dollar",
          "code": "TWD"
        },
        "USD": {
          "description": "United States Dollar",
          "code": "USD"
        },
      }
    }
    return res(ctx.status(200), ctx.json(mockResponse))
  })
]

const server = setupServer(...restHandlers)

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)

beforeAll(() => {
  console.error = (error) => {
    throw new Error(error)
  }
  console.warn = (warning) => {
    throw new Error(warning)
  }
  server.listen({ onUnhandledRequest: "error" })
  mockNextFont()
  enableAllPlugins()
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

function getTransaction(data: CreateTransactionResponseData) {
  const { name, amount, isExpense, transactionDate }: CreateTransactionResponseData = data
  return {
    id: nanoid(),
    name,
    amount,
    isExpense,
    transactionDate
  }
}

function getExchangeResult(amount: number) {
  return Number((amount * mockExchangeRate).toFixed(3));
}