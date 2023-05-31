import { FC, useCallback, useState } from "react"
import Image from "next/image"
import { nanoid } from "nanoid"
import Map, { Marker } from "react-map-gl"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import { NearbyPlaceData, Place } from "../../../pages/api/travel/nearbyPlace"
import { HttpResponse, XmlHttpRequest } from "../../../lib/request"
import GeocoderControl from "./geocoderControl"

type TravelMapProps = {
  onResult: (places: Place[]) => void
}

const TravelMap: FC<TravelMapProps> = (props) => {
  const [places, setPlaces] = useState<Place[]>([])

  const setNearbyPlaces = useCallback(
    async (event: MapboxGeocoder.Result) => {
      const [longitude, latitude] = event.geometry.coordinates
      const url: string = "/api/travel/nearbyPlace"
      const searchRadiusMeters: number = 5000
      const params = { longitude, latitude, searchRadiusMeters }
      const response: HttpResponse = await XmlHttpRequest.get(url, params)
      if (response.status === 200) {
        const data: NearbyPlaceData = response.data
        setPlaces(data.points)
        props.onResult(data.points)
      }
    },
    [props]
  )

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
        places.map((place: Place, index: number) => {
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
              <p className="w-fit rounded-full bg-pink-500 px-2 text-center text-lg text-black">
                {index + 1}
              </p>
            </Marker>
          )
        })}
    </Map>
  )
}

export default TravelMap
