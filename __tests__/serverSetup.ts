import { rest } from "msw"
import { setupServer } from "msw/node"
import {
  CurrencyConvertResponse as ExchangeResponseData,
  RequestData as ExchangeRequestData,
} from "../pages/api/exchange"
import { CurrencySymbolResponse } from "../pages/api/exchange/currency/symbols"
import { RestCountryResponse } from "../lib/exchange/economy/country"

export const mockExchangeRate: number = 1.352

export const restHandlers = [
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
  rest.get(
    "https://restcountries.com/v3.1/independent",
    async (req, res, ctx) => {
      const fields = req.url.searchParams.get("fields")
      if (fields != null && fields.includes("name,cca2,flag")) {
        const mockResponse: RestCountryResponse = getRestCountryMockResponse()
        return res(ctx.status(200), ctx.json(mockResponse))
      }
    }
  ),
  rest.get(
    "https://www.econdb.com/api/series/CPISG/",
    async (req, res, ctx) => {
      const format = req.url.searchParams.get("format")
      if (format != null && format.includes("json")) {
        const mockResponse = getSingaporeCpiMockResponse()
        return res(ctx.status(200), ctx.json(mockResponse))
      }
    }
  ),
  rest.get(
    "https://www.econdb.com/api/series/CPIAO/",
    async (req, res, ctx) => {
      const format = req.url.searchParams.get("format")
      if (format != null && format.includes("json")) {
        const mockResponse = getEmptyCpiMockResponse()
        return res(ctx.status(200), ctx.json(mockResponse))
      }
    }
  ),
  rest.get("https://www.econdb.com/api/series/", async (req, res, ctx) => {
    const page = req.url.searchParams.get("page")
    if (page != null && page.includes("2")) {
      const lastPageMockResponse = getSearchSeriesLastPageMockResponse()
      return res(ctx.status(200), ctx.json(lastPageMockResponse))
    }

    //https://www.econdb.com/api/series/?search=Singapore&format=json&expand=meta
    const search = req.url.searchParams.get("search")
    if (search != null && search.includes("Singapore")) {
      const mockResponse = getSearchSingaporeSeriesMockResponse()
      return res(ctx.status(200), ctx.json(mockResponse))
    }
  }),
]

export const server = setupServer(...restHandlers)

function getExchangeResult(amount: number) {
  return Number((amount * mockExchangeRate).toFixed(3))
}

function getSingaporeCpiMockResponse() {
  return {
    ticker: "CPISG",
    description: "Singapore - Consumer price index",
    geography: "Singapore",
    frequency: "M",
    dataset: "SSG_CPI",
    units: "Index",
    additional_metadata: {
      "3:Indicator": "52:All Items",
      "2:Units": "32:Index",
      "GEO:None": "196:None",
    },
    data: {
      values: [24.25, 24.25, 24.54, 24.36, 110.2, 110.8],
      dates: [
        "1961-01-01",
        "1961-02-01",
        "1961-03-01",
        "1961-04-01",
        "2022-10-01",
        "2022-11-01",
      ],
      status: ["Final", "Final", "Final", "Final", "Final", "Final"],
    },
  }
}

function getEmptyCpiMockResponse() {
  return {
    ticker: "CPIAO",
    description: "",
    geography: "",
    frequency: "",
    dataset: "",
    units: "",
    additional_metadata: "",
    data: {
      dates: [],
      values: [],
      status: [],
    },
  }
}

function getRestCountryMockResponse(): RestCountryResponse {
  return [
    {
      name: {
        common: "Tunisia",
        official: "Tunisian Republic",
      },
      cca2: "TN",
      capital: ["Tunis"],
      flag: "🇹🇳",
    },
    {
      name: {
        common: "Guadeloupe",
        official: "Guadeloupe",
      },
      cca2: "GP",
      capital: ["Basse-Terre"],
      flag: "🇬🇵",
    },
    {
      name: {
        common: "Hong Kong",
        official:
          "Hong Kong Special Administrative Region of the People's Republic of China",
      },
      cca2: "HK",
      capital: ["City of Victoria"],
      flag: "🇭🇰",
    },
  ]
}

function getCurrencySymbolMockResponse() {
  return {
    symbols: {
      BTC: {
        description: "Bitcoin",
        code: "BTC",
      },
      CNH: {
        description: "Chinese Yuan (Offshore)",
        code: "CNH",
      },
      CNY: {
        description: "Chinese Yuan",
        code: "CNY",
      },
      EUR: {
        description: "Euro",
        code: "EUR",
      },
      GBP: {
        description: "British Pound Sterling",
        code: "GBP",
      },
      HKD: {
        description: "Hong Kong Dollar",
        code: "HKD",
      },
      JPY: {
        description: "Japanese Yen",
        code: "JPY",
      },
      SGD: {
        description: "Singapore Dollar",
        code: "SGD",
      },
      TWD: {
        description: "New Taiwan Dollar",
        code: "TWD",
      },
      USD: {
        description: "United States Dollar",
        code: "USD",
      },
    },
  }
}

function getSearchSingaporeSeriesMockResponse() {
  return {
    count: 46,
    pages: 5,
    next: "https://www.econdb.com/api/series/?expand=meta&format=json&page=2&search=Singapore",
    previous: null,
    results: [
      {
        ticker: "CPISG",
        description: "Singapore - Consumer price index",
        geography: "Singapore",
        frequency: "M",
        dataset: "SSG_CPI",
        units: "Index",
        additional_metadata: {
          "3:Indicator": "52:All Items",
          "2:Units": "32:Index",
          "GEO:None": "196:None",
        },
      },
      {
        ticker: "Y10YDSG",
        description: "Singapore - Long term yield",
        geography: "Singapore",
        frequency: "M",
        dataset: "SSG_IR",
        units: "Per Cent Per Annum",
        additional_metadata: {
          "3:Indicator": "502:Government Securities - 10-Year Bond Yield",
          "2:Units": "154:Per Cent Per Annum",
          "GEO:None": "196:None",
        },
      },
      {
        ticker: "GDPSG",
        description: "Singapore - Gross domestic product",
        geography: "Singapore",
        frequency: "Q",
        dataset: "SSG_GDP_EXP",
        units: "Million Dollars",
        additional_metadata: {
          "3:Indicator": "41:GDP At Current Market Prices",
          "2:Units": "1:Million Dollars",
          "GEO:None": "196:None",
        },
      },
      {
        ticker: "RGDPSG",
        description: "Singapore - Real gross domestic product",
        geography: "Singapore",
        frequency: "Q",
        dataset: "SSG_RGDP_EXP",
        units: "Million Dollars",
        additional_metadata: {
          "3:Indicator": "42:GDP In Chained (2015) Dollars",
          "2:Units": "1:Million Dollars",
          "GEO:None": "196:None",
        },
      },
      {
        ticker: "GFCFSG",
        description: "Singapore - Gross fixed capital formation",
        geography: "Singapore",
        frequency: "Q",
        dataset: "SSG_GDP_EXP",
        units: "Million Dollars",
        additional_metadata: {
          "3:Indicator": "28:Gross Fixed Capital Formation",
          "2:Units": "1:Million Dollars",
          "GEO:None": "196:None",
        },
      },
      {
        ticker: "RETASG",
        description: "Singapore - Retail trade",
        geography: "Singapore",
        frequency: "M",
        dataset: "SSG_RETA",
        units: "Index",
        additional_metadata: {
          "3:Indicator": "78:Total",
          "2:Units": "32:Index",
          "GEO:None": "196:None",
        },
      },
      {
        ticker: "IPSG",
        description: "Singapore - Industrial production",
        geography: "Singapore",
        frequency: "M",
        dataset: "SSG_IPP",
        units: "Index",
        additional_metadata: {
          "3:Indicator": "78:Total",
          "2:Units": "32:Index",
          "GEO:None": "196:None",
        },
      },
      {
        ticker: "RPRCSG",
        description: "Singapore - Real private consumption",
        geography: "Singapore",
        frequency: "Q",
        dataset: "SSG_RGDP_EXP",
        units: "Million Dollars",
        additional_metadata: {
          "3:Indicator": "26:Private Consumption Expenditure",
          "2:Units": "1:Million Dollars",
          "GEO:None": "196:None",
        },
      },
      {
        ticker: "RGFCFSG",
        description: "Singapore - Real gross fixed capital formation",
        geography: "Singapore",
        frequency: "Q",
        dataset: "SSG_RGDP_EXP",
        units: "Million Dollars",
        additional_metadata: {
          "3:Indicator": "28:Gross Fixed Capital Formation",
          "2:Units": "1:Million Dollars",
          "GEO:None": "196:None",
        },
      },
      {
        ticker: "RPUCSG",
        description: "Singapore - Real public consumption",
        geography: "Singapore",
        frequency: "Q",
        dataset: "SSG_RGDP_EXP",
        units: "Million Dollars",
        additional_metadata: {
          "3:Indicator": "29:Government Consumption Expenditure",
          "2:Units": "1:Million Dollars",
          "GEO:None": "196:None",
        },
      },
    ],
  }
}

function getSearchSeriesLastPageMockResponse() {
  return {
    "count": 46,
    "pages": 5,
    "next": null,
    "previous": null,
    "results": []
  }
}