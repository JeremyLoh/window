import type { NextApiRequest, NextApiResponse } from "next"
import { HttpResponse, XmlHttpRequest } from "../../../lib/request"

export type RequestData = {
  fromCurrencyCode: string
  toCurrencyCode: string
  amount: number
}

export type CurrencyConvertResponse = {
  date?: Date
  rate?: number
  result?: number
  error?: string
}

type ApiResponse = {
  success: boolean
  query: { from: string; to: string; amount: number }
  info: { rate: number }
  historical: boolean
  date: string
  result: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CurrencyConvertResponse>
) {
  function parseCurrencyExchangeResponse(
    responseData: ApiResponse
  ): CurrencyConvertResponse {
    return {
      date: new Date(responseData.date),
      rate: responseData.info.rate,
      result: responseData.result,
    }
  }

  if (req.method === "POST") {
    const params: object = getConvertCurrencyParams(req.body)
    const url: string = "https://api.exchangerate.host/convert"
    try {
      const response: HttpResponse = await getCurrencyExchange(url, params)
      const output: CurrencyConvertResponse = parseCurrencyExchangeResponse(
        response.data
      )
      res.status(200).json(output)
    } catch (error) {
      // TODO handle error
      return res.status(400).json({ error: "Exchange Rate API Call Failed" })
    }
  }
}

function getConvertCurrencyParams(requestData: RequestData): object {
  const { fromCurrencyCode, toCurrencyCode, amount }: RequestData = requestData
  const source: string = "imf"
  return {
    from: fromCurrencyCode,
    to: toCurrencyCode,
    places: 3,
    amount,
    source,
  }
}

async function getCurrencyExchange(url: string, params: object) {
  return await XmlHttpRequest.get(url, params)
}
