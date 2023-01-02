import type { NextApiRequest, NextApiResponse } from "next"
import { getCurrencySymbols, Symbol } from "../../../../lib/exchange/currency/symbols"

export type CurrencySymbolResponse = {
  symbols?: Record<string, Symbol>,
  error?: string,
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
    try {
      const { symbols } = await getCurrencySymbols()
      return res.status(200)
        .json({ symbols })
    } catch (error) {
      return res.status(503)
        .send({ error: "External Currency API is down" })
    }
  }
}