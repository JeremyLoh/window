import { FC, useCallback, useMemo, useState } from "react"
import Image from "next/image"
import { nanoid } from "nanoid"
import Map, { Marker } from "react-map-gl"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import { Place } from "../../../pages/api/travel/nearbyPlace"
import GeocoderControl from "./geocoderControl"

type TravelMapProps = {
  onResult: (places: Place[]) => void
  getNearbyPlaces: (longitude: number, latitude: number) => Promise<Place[]>
}

const TravelMap: FC<TravelMapProps> = (props) => {
  const [places, setPlaces] = useState<Place[]>([])
  const { getNearbyPlaces } = props
  const setNearbyPlaces = useCallback(
    async (event: MapboxGeocoder.Result) => {
      const [longitude, latitude] = event.geometry.coordinates
      const data: Place[] = await getNearbyPlaces(longitude, latitude)
      setPlaces(data)
    },
    [getNearbyPlaces]
  )
  const markers = useMemo(
    () =>
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
            <div className="flex flex-col items-center justify-center">
              {icon}
              <p className="w-fit rounded-full bg-pink-500 px-2 text-center text-lg text-black">
                {index + 1}
              </p>
            </div>
          </Marker>
        )
      }),
    [places]
  )

  return (
    <Map
      key={`map-${nanoid()}`}
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
      {places && markers}
    </Map>
  )
}

export default TravelMap
