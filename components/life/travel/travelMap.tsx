import { FC, useCallback, useState } from "react"
import Image from "next/image"
import { nanoid } from "nanoid"
import Map, { Marker } from "react-map-gl"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import { NearbyPlaceData, Place } from "../../../pages/api/travel/nearbyPlace"
import { HttpResponse, XmlHttpRequest } from "../../../lib/request"
import GeocoderControl from "./geocoderControl"

const TravelMap: FC<any> = () => {
  const [places, setPlaces] = useState<Place[]>([])

  const setNearbyPlaces = useCallback(async (event: MapboxGeocoder.Result) => {
    const [longitude, latitude] = event.geometry.coordinates
    const url: string = "/api/travel/nearbyPlace"
    const params = { longitude, latitude }
    const response: HttpResponse = await XmlHttpRequest.get(url, params)
    if (response.status === 200) {
      const data: NearbyPlaceData = response.data
      // console.log(JSON.stringify(data.points, null, 2))
      setPlaces(data.points)
    }
  }, [])

  return (
    <Map
      data-test="travel-map"
      reuseMaps
      initialViewState={{
        longitude: 103.822872,
        latitude: 1.364917,
        zoom: 11,
      }}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PK_API_KEY}
      mapLib={import("mapbox-gl")}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      <GeocoderControl
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PK_API_KEY || ""}
        position="top-left"
        onResult={setNearbyPlaces}
        onError={(event) => {
          // todo handle error
        }}
      />
      {places &&
        places.map((place: Place) => {
          const icon = (
            <Image
              src="/marker-stroked.svg"
              alt="Marker Icon"
              width={40}
              height={40}
            />
          )
          return (
            <Marker
              key={`place-${nanoid()}`}
              longitude={place.position.lon}
              latitude={place.position.lat}
            >
              {icon}
            </Marker>
          )
        })}
    </Map>
  )
}

export default TravelMap
