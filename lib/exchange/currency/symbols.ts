import { HttpRequest, HttpResponse } from "../../request"

export type Symbol = {
  description: string
  code: string
}

export type CurrencySymbolApiResponse = {
  motd: {
    url: string
  }
  success: boolean
  symbols: Record<string, Symbol>
}

export async function getCurrencySymbols() {
  const url: string = "https://api.exchangerate.host/symbols"
  const response: HttpResponse = await HttpRequest.get(url)
  if (response.status !== 200) {
    throw new Error("External Currency API is down")
  }
  const { symbols }: CurrencySymbolApiResponse = response.data
  return { symbols }
}
