import { FC, useCallback, useState } from "react"
import TravelMap from "./travelMap"
import { Place } from "../../../pages/api/travel/nearbyPlace"
import { nanoid } from "nanoid"
import Emoji from "../../emoji"

const Travel: FC<any> = () => {
  const [sidebar, setSidebar] = useState<JSX.Element>(
    <div className="text-lg">
      Search for a location to find nearby places of interest!
    </div>
  )
  const handlePlaces = useCallback((places: Place[]) => {
    setSidebar(
      <div className="h-full">
        <p className="rounded bg-white p-2 text-lg text-black">
          Nearby Places of Interest
        </p>
        {places.map((place: Place, index: number) => {
          return getPlaceElement(index + 1, place)
        })}
      </div>
    )
  }, [])

  return (
    <div className="flex h-screen w-full flex-col md:flex-row">
      <div className="h-1/3 w-full scroll-p-10 overflow-y-auto md:h-full md:w-1/3">
        {sidebar}
      </div>
      <TravelMap onResult={handlePlaces} />
    </div>
  )
}

function getPlaceElement(count: number, place: Place) {
  return (
    <div
      key={`place-${nanoid()}`}
      className="border-b-2 p-4 odd:bg-stone-700 even:bg-stone-600"
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
