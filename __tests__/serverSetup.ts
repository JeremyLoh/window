import { rest } from "msw"
import { Data as CreateTransactionResponseData } from "../pages/api/wallet/transaction/create"
import {
  CurrencyConvertResponse as ExchangeResponseData,
  RequestData as ExchangeRequestData
} from "../pages/api/exchange"
import { CurrencySymbolResponse } from "../pages/api/exchange/currency/symbols"
import { setupServer } from "msw/node"
import { nanoid } from "nanoid"

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
  rest.get("https://api.exchangerate.host/symbols", async (req, res, ctx) => {
    const mockResponse: CurrencySymbolResponse = getCurrencySymbolMockResponse()
    return res(ctx.status(200), ctx.json(mockResponse))
  }),
  rest.get("/api/exchange/currency/symbols", async (req, res, ctx) => {
    // https://api.exchangerate.host/symbols
    const mockResponse: CurrencySymbolResponse = getCurrencySymbolMockResponse()
    return res(ctx.status(200), ctx.json(mockResponse))
  }),
]

export const server = setupServer(...restHandlers)

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

function getCurrencySymbolMockResponse() {
  return {
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
}