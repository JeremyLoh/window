// https://locationiq.com/docs
// https://developer.tomtom.com/search-api/documentation/search-service/nearby-search

import { NextApiRequest, NextApiResponse } from "next"
import { XmlHttpRequest } from "../../../lib/request"

export type NearbyPlaceData = {
  points: Place[]
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NearbyPlaceData>
) {
  const requestMethod = req.method
  if (requestMethod !== "GET") {
    return
  }
  const { longitude, latitude } = req.query
  // https://developer.tomtom.com/search-api/documentation/search-service/nearby-search
  const url = "https://api.tomtom.com/search/2/nearbySearch/.json"
  const params = {
    key: process.env.TOMTOM_API_KEY,
    lat: latitude,
    lon: longitude,
    radius: 1000,
    limit: 20,
    language: "en-GB",
    openingHours: "nextSevenDays",
  }
  try {
    const response = await XmlHttpRequest.get(url, params)
    const places = parseNearbyPointsOfInterest(response.data.results)
    res.status(200).json({ points: places })
  } catch (error) {
    return res.status(400).json({
      points: [],
      error: "Nearby Points of Interest API Call Failed",
    })
  }
}

function parseNearbyPointsOfInterest(data: NearbyPointsApiResponse[]): Place[] {
  return data.map((point) => {
    return {
      distanceInMeters: point.dist,
      name: point.poi.name,
      phone: point.poi?.phone,
      url: point.poi?.url,
      openingHours: point.poi?.openingHours?.timeRange,
      category: point.poi.classifications.map((classification) => {
        return {
          code: classification.code,
          names: classification.names.map((n) => n.name),
        }
      }),
      address: {
        streetNumber: point.address.streetNumber,
        streetName: point.address.streetName,
        extendedPostalCode: point.address.extendedPostalCode,
        country: point.address.country,
        freeformAddress: point.address.freeformAddress,
      },
      position: point.position,
    }
  })
}

export type Place = {
  distanceInMeters: number
  name: string
  phone?: string
  url?: string
  openingHours?: TimeRange[]
  category: Array<{
    code: string // https://developer.tomtom.com/search-api/documentation/product-information/supported-category-codes
    names: string[]
  }>
  address: {
    streetNumber: string
    streetName: string
    extendedPostalCode: string
    country: string
    freeformAddress: string // Address line formatted according to country
  }
  position: Position
}

type NearbyPointsApiResponse = {
  type: string
  id: string
  dist: number // in meters
  poi: {
    name: string
    phone: string
    url: string
    brands: Brand[]
    openingHours: {
      mode: string
      timeRange: TimeRange[]
    }
    classifications: Classification[]
    timeZone: {
      ianaId: string // ID from IANA Time Zone Database - https://www.iana.org/time-zones
    }
  }
  address: {
    streetNumber: string // Building number on the street
    streetName: string
    extendedPostalCode: string
    country: string
    freeformAddress: string // Address line formatted according to country
  }
  position: Position
  viewport: {
    // Viewport that can be used to display the result on a map
    topLeftPoint: Position
    btmRightPoint: Position
  }
}

type Position = {
  // https://gisgeography.com/latitude-longitude-coordinates/
  lat: number
  lon: number
}

type Brand = {
  name: string
}

// https://developer.tomtom.com/search-api/documentation/search-service/nearby-search#classifications-array
type Classification = {
  code: string // https://developer.tomtom.com/search-api/documentation/product-information/supported-category-codes
  names: ClassificationName[]
}

type ClassificationName = {
  nameLocale: "en-US"
  name: string
}

// https://developer.tomtom.com/search-api/documentation/search-service/nearby-search#timeRanges
type TimeRange = {
  startTime: Time
  endTime: Time
}

type Time = {
  date: string // Represent current day in calendar year in POI time zone
  hour: number // 24-hour format in the local time of POI. 0 to 23
  minute: number // Minutes in local time of POI. 0 to 59
}
