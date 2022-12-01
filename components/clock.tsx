import React, { FC, useEffect, useState } from "react"
import Emoji from "./emoji"

const clock:FC<any> = () => {
  const [date, setDate] = useState<Date>(new Date())

  function isDayTime(): boolean {
    return date.toLocaleTimeString().endsWith("am")
  }

  function updateClock(): void {
    setDate(new Date())
  }

  useEffect(() => {
    const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
      updateClock()
    }, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div>
      <Emoji symbol={isDayTime() ? "🌞" : "🌙"}/>
      {" "}
      <span>{date.toLocaleTimeString()}</span>
    </div>
  )
}

export default clock