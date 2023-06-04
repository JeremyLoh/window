import React, { FC, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Emoji from "./emoji"

const Clock: FC<any> = () => {
  const [date, setDate] = useState<Date>(new Date())

  function getCurrentTimeEmoji(): string {
    const now = new Date(date)
    const evening = new Date(now.setHours(18, 0, 0, 0))
    const afternoon = new Date(now.setHours(12, 0, 0, 0))
    if (date >= evening) {
      return "🌙"
    } else if (date >= afternoon) {
      return "🌞"
    } else {
      return "🌄"
    }
  }

  useEffect(() => {
    const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
      setDate(new Date())
    }, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="flex justify-center rounded-full border border-zinc-500 bg-stone-600 px-3 py-1">
      <h2 aria-label="current-clock-time">
        <Emoji symbol={getCurrentTimeEmoji()} />{" "}
        <span className="font-mono text-xl font-bold tracking-normal">
          {date.toLocaleTimeString()}
        </span>
      </h2>
    </div>
  )
}

export default dynamic(() => Promise.resolve(Clock), { ssr: false })
