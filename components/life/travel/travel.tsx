import { ChangeEvent, FC, useCallback, useState } from "react"
import TravelMap from "./travelMap"
import { NearbyPlaceData, Place } from "../../../pages/api/travel/nearbyPlace"
import { HttpResponse, XmlHttpRequest } from "../../../lib/request"
import TravelSidebar from "./travelSidebar"

const Travel: FC<any> = () => {
  const [searchRadiusMeters, setSearchRadiusMeters] = useState<number>(1000)
  const [places, setPlaces] = useState<Place[]>([])

  const handleRadiusChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchRadiusMeters(Number(event.target.value))
    },
    []
  )
  const handlePlaces = useCallback((places: Place[]) => {
    setPlaces(places)
  }, [])
  const getNearbyPlaces = useCallback(
    async (longitude: number, latitude: number) => {
      const url: string = "/api/travel/nearbyPlace"
      const params = {
        longitude,
        latitude,
        searchRadiusMeters: searchRadiusMeters,
      }
      const response: HttpResponse = await XmlHttpRequest.get(url, params)
      if (response.status === 200) {
        const data: NearbyPlaceData = response.data
        return data.points
      }
      return []
    },
    [searchRadiusMeters]
  )

  return (
    <div className="flex h-screen w-full flex-col md:flex-row">
      <div className="h-1/3 w-full scroll-p-10 overflow-y-auto md:h-full md:w-1/3">
        <label className="mb-2 flex flex-row items-center justify-center border-b-2 border-b-white bg-secondary p-2">
          <p className="mr-2">Search Radius (meters): {searchRadiusMeters}</p>
          <input
            type="range"
            min={1000}
            max={10000}
            step={500}
            value={searchRadiusMeters}
            onChange={handleRadiusChange}
          />
        </label>
        <TravelSidebar places={places} />
      </div>
      <TravelMap onResult={handlePlaces} getNearbyPlaces={getNearbyPlaces} />
    </div>
  )
}

export default Travel
