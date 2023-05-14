import { FC } from "react"
import TravelMap from "./travelMap"

// todo remove https://www.youtube.com/watch?v=6QnTNKOJk5A
// todo 21:00 Getting Started with Mapbox GL JS Part I https://youtu.be/Ldw3mFGyjDE?t=964
// todo https://www.youtube.com/watch?v=JJatzkPcmoI
const Travel: FC<any> = () => {
  return (
    <div className="h-screen w-full">
      <TravelMap />
    </div>
  )
}

export default Travel
