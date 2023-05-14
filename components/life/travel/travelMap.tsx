import { FC, useState } from "react"
import Map from "react-map-gl"
import GeocoderControl from "./geocoderControl"

const TravelMap: FC<any> = () => {
  const [view, setView] = useState({
    longitude: 103.822872,
    latitude: 1.364917,
    zoom: 11,
  })

  return (
    <Map
      {...view}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PK_API_KEY}
      data-test="travel-map"
      reuseMaps
      mapLib={import("mapbox-gl")}
      projection="globe"
      onMove={(event) => setView(event.viewState)}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      <GeocoderControl
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PK_API_KEY || ""}
        position="top-left"
        onResult={(event) => {
          // todo Show list of things to do at area, using coordinates
          // Possible APIs
          // https://locationiq.com/docs
          // https://developer.tomtom.com/search-api/documentation/search-service/nearby-search
        }}
        onError={(event) => {
          // todo handle error
        }}
      />
    </Map>
  )
}

export default TravelMap
