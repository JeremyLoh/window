import React, { FC, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import styles from "../styles/components/Clock.module.css"
import Emoji from "./emoji"

const Clock:FC<any> = () => {
  const [date, setDate] = useState<Date>(new Date())

  function updateClock(): void {
    setDate(new Date())
  }

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
      updateClock()
    }, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div className={styles.clock}>
      <h2 aria-label="current-clock-time">
        <Emoji symbol={getCurrentTimeEmoji()} />
        {" "}
        <span>{date.toLocaleTimeString()}</span>
      </h2>
    </div>
  )
}

export default dynamic(() => Promise.resolve(Clock), { ssr: false })