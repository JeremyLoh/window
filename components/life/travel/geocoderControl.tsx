import { useState } from "react"
import { ControlPosition, Marker, useControl } from "react-map-gl"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import "mapbox-gl/dist/mapbox-gl.css"
import { specialElite } from "../../../pages/_app"

interface GeocoderControlProps {
  mapboxAccessToken: string
  position: ControlPosition
  onResult: (event: MapboxGeocoder.Result) => void
  onLoading?: (event: object) => void
  onError?: (event: object) => void
}

function GeocoderControl(props: GeocoderControlProps): JSX.Element | null {
  const [marker, setMarker] = useState<JSX.Element | null>(null)
  const geocoder = useControl<MapboxGeocoder>(
    () => {
      const control = new MapboxGeocoder({
        marker: false,
        accessToken: props.mapboxAccessToken,
        render: (item: MapboxGeocoder.Result) => {
          // https://unpkg.com/browse/@mapbox/maki@8.0.1/icons/
          const customFont = specialElite.className
          return `
            <div class="geocoder-dropdown-item flex flex-row px-4 py-2 bg-gray-100
                        border-b-2 border-b-gray-400 text-black
                        hover:bg-gray-300 hover:cursor-pointer ${customFont}">
              <img class="geocoder-dropdown-icon w-6"
                   src="https://unpkg.com/@mapbox/maki@8.0.1/icons/marker-stroked.svg"
                   alt="marker icon"/>
              <span class="geocoder-dropdown-text ml-2 md:text-lg w-2/3">
                ${item.place_name}
              </span>
              <span class="capitalize ml-auto text-center rounded border-2 border-gray-400
                           bg-gradient-to-r from-gray-300 md:text-lg w-1/3">
                ${item.properties?.category || "N.A"}
              </span>
            </div>
          `
        },
      })
      if (props.onLoading) {
        control.on("loading", props.onLoading)
      }
      if (props.onError) {
        control.on("error", props.onError)
      }
      control.on("result", (event) => {
        props.onResult(event.result)
        const { result }: { result: MapboxGeocoder.Result } = event
        const location =
          result &&
          (result.center ||
            (result.geometry?.type === "Point" && result.geometry.coordinates))
        if (location) {
          setMarker(<Marker longitude={location[0]} latitude={location[1]} />)
        } else {
          setMarker(null)
        }
      })
      return control
    },
    {
      position: props.position,
    }
  )
  return marker
}

export default GeocoderControl
