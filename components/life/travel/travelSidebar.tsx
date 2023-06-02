import { FC } from "react"
import { nanoid } from "nanoid"
import { Place } from "../../../pages/api/travel/nearbyPlace"
import Emoji from "../../emoji"

type TravelSidebarProps = {
  places: Place[]
}

const TravelSidebar: FC<TravelSidebarProps> = (props) => {
  const isEmpty = props.places.length === 0

  return (
    <div className="h-full">
      <p className="rounded bg-white p-2 text-lg text-black">
        Nearby Places of Interest
      </p>
      {isEmpty ? (
        <p className="border-b-2 border-b-pink-500 p-4 text-center text-lg">
          Data is not available. Please try searching for a location!
        </p>
      ) : (
        props.places.map((place: Place, index: number) => {
          return getPlaceElement(index + 1, place)
        })
      )}
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

export default TravelSidebar
