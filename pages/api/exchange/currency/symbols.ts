import type { NextApiRequest, NextApiResponse } from "next"
import axios, { AxiosResponse } from "axios"

export type CurrencySymbolResponse = {
  symbols?: Record<string, Symbol>,
  error?: string,
}

type CurrencySymbolApiResponse = {
  motd: {
    url: string,
  },
  success: boolean,
  symbols: Record<string, Symbol>,
}

export type Symbol = {
  description: string,
  code: string,
}

const allowedMethods = ["GET"]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CurrencySymbolResponse>
) {
  if (!allowedMethods.includes(String(req.method)) || req.method == "OPTIONS") {
    return res.status(405)
      .send({ error: "Method not allowed" })
  }
  if (req.method === "GET") {
    const url: string = "https://api.exchangerate.host/symbols"
    const response: AxiosResponse = await axios.get(url)
    if (response.status !== 200) {
      // TODO handle error, retry with exponential backoff algorithm
      return res.status(503)
        .send({ error: "External Currency API is down" })
    }
    const { symbols }: CurrencySymbolApiResponse = response.data
    return res.status(200).json({ symbols })
  }
}