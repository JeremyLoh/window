import { NextRequest, NextResponse } from "next/server"
import { getEconomySeries } from "../../../../../lib/exchange/economy/indicators"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const series = searchParams.get("series")
  if (!series || series.trim() === "") {
    return NextResponse.json(
      { error: "Please provide a series in url params" },
      { status: 400 }
    )
  }
  try {
    const economySeries = await getEconomySeries(series)
    return NextResponse.json(economySeries)
  } catch (error) {
    return NextResponse.json(
      { error: "Could not get economy series data" },
      { status: 400 }
    )
  }
}