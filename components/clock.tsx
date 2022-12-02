import React, { FC, useEffect, useState } from "react"
import styles from '../styles/components/Clock.module.css'
import Emoji from "./emoji"

const Clock:FC<any> = () => {
  const [date, setDate] = useState<Date>(new Date())
  const [isDayTime, setIsDayTime] = useState<boolean>()

  function updateClock(): void {
    setDate(new Date())
  }

  useEffect(() => {
    const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
      updateClock()
      setIsDayTime(date.toLocaleTimeString().endsWith("am"))
    }, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div className={styles.clock}>
      <h2>
        <Emoji symbol={isDayTime ? "🌞" : "🌙"}/>
        {" "}
        <span>{date.toLocaleTimeString()}</span>
      </h2>
    </div>
  )
}

export default Clock