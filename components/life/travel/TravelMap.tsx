import { FC, useEffect, useRef, useState } from "react"
import mapboxgl, { Map } from "mapbox-gl"

const TravelMap: FC<any> = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  // "map" ref prevents map reload when user interacts with the map
  const map = useRef<Map>(null)
  const [lng, setLng] = useState<number>(-70.9)
  const [lat, setLat] = useState<number>(42.35)
  const [zoom, setZoom] = useState<number>(9)
  useEffect(() => {
    if (map.current) {
      return
    }
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PK_API_KEY || ""
    // @ts-ignore
    map.current = new mapboxgl.Map({
      // @ts-ignore
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
      projection: { name: "globe" },
    })
    // How to fix canvas size in Mapbox GL - https://stackoverflow.com/a/66599617
    map.current.on("idle", function () {
      // @ts-ignore
      map.current.resize()
    })
  })
  return (
    <div
      data-test="travel-map"
      ref={mapContainer}
      className="relative h-full w-full"
    />
  )
}

export default TravelMap
