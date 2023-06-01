import { ChangeEvent, FC, useCallback, useState } from "react"
import TravelMap from "./travelMap"
import { NearbyPlaceData, Place } from "../../../pages/api/travel/nearbyPlace"
import { nanoid } from "nanoid"
import Emoji from "../../emoji"
import { HttpResponse, XmlHttpRequest } from "../../../lib/request"

const Travel: FC<any> = () => {
  const [searchRadiusMeters, setSearchRadiusMeters] = useState<number>(1000)
  const [sidebar, setSidebar] = useState<JSX.Element>(
    <div className="text-lg">
      Search for a location to find nearby places of interest!
    </div>
  )
  const handleRadiusChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchRadiusMeters(Number(event.target.value))
    },
    []
  )
  const handlePlaces = useCallback((places: Place[]) => {
    const isEmpty = places.length === 0
    setSidebar(
      <div className="h-full">
        <p className="rounded bg-white p-2 text-lg text-black">
          Nearby Places of Interest
        </p>
        {isEmpty ? (
          <p className="border-b-2 border-b-pink-500 p-4 text-center text-lg">
            Data is not available. Please try another location!
          </p>
        ) : (
          places.map((place: Place, index: number) => {
            return getPlaceElement(index + 1, place)
          })
        )}
      </div>
    )
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
        {sidebar}
      </div>
      <TravelMap onResult={handlePlaces} getNearbyPlaces={getNearbyPlaces} />
    </div>
  )
}

function getPlaceElement(count: number, place: Place) {
  return (
    <div
      key={`place-${nanoid()}`}
      className="border-b-2 border-b-pink-500 p-4 odd:bg-transparent even:bg-secondary"
    >
      <p className="float-right w-fit rounded-full bg-pink-500 px-2 text-black">
        {count}
      </p>
      <p className="text-lg">{place.name}</p>
      <p className="">
        <Emoji symbol={"📍"} /> {place.address.freeformAddress}
      </p>
      <p>
        <Emoji symbol={"🕿"} /> {place.phone || "Not Available"}
      </p>
    </div>
  )
}

export default Travel
