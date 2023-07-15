import { NextRequest, NextResponse } from "next/server"
import { getCountrySeries } from "../../../../../lib/exchange/economy/indicators"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const country = searchParams.get("country")
  if (!country || country.trim() === "") {
    return NextResponse.json(
      { error: "Please provide a country in url params" },
      { status: 400 }
    )
  }

  try {
    const series = await getCountrySeries(country)
    return NextResponse.json(series)
  } catch (error) {
    return NextResponse.json(
      { error: "Could not get country series data" },
      { status: 400 }
    )
  }
}
