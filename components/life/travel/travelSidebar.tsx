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
      <p className="rounded bg-white p-2 text-black md:text-lg">
        Nearby Places of Interest
      </p>
      {isEmpty ? (
        <p className="border-b-2 border-b-pink-500 p-4 text-center md:text-lg">
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
      className="border-b-2 border-b-pink-600 p-4 odd:bg-transparent even:bg-secondary"
    >
      <p className="float-right w-fit rounded-full bg-pink-600 px-2">{count}</p>
      <p className="md:text-lg">{place.name}</p>
      <p>
        <Emoji symbol={"📍"} /> {place.address.freeformAddress}
      </p>
      <p>
        <Emoji symbol={"🕿"} /> {place.phone || "Not Available"}
      </p>
      {place.url && (
        // Require // before url to navigate to external site
        <div className="flex flex-row items-center justify-start">
          <Emoji symbol={"🌐"} />
          <a
            href={"//" + place.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300"
          >
            {place.url}
          </a>
        </div>
      )}
      {place.category.map((category) => {
        const key = nanoid()
        return (
          <div
            key={`place-category-${key}`}
            className="flex flex-row items-center justify-end gap-2 capitalize"
          >
            {category.names.map((name) => (
              <p
                key={`place-${name}-${key}`}
                className="rounded bg-pink-600 p-2"
              >
                {name}
              </p>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default TravelSidebar
