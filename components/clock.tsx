import React, { FC, useEffect, useState } from "react"
import styles from '../styles/components/Clock.module.css'
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
    <div className={styles.clock}>
      <h2>
        <Emoji symbol={isDayTime() ? "🌞" : "🌙"}/>
        {" "}
        <span>{date.toLocaleTimeString()}</span>
      </h2>
    </div>
  )
}

export default clock