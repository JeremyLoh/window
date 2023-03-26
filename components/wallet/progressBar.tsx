import { FC } from "react"

interface Data {
  current: number
  max: number
}

function getPercentFilled(current: number, max: number): number {
  if (max <= 0 || current <= 0) {
    return 0
  }
  if (current >= max) {
    return 100
  }
  return Math.round((current / max) * 100)
}

const ProgressBar: FC<Data> = ({ current, max }) => {
  const percentFilled = getPercentFilled(current, max)
  return (
    <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-gray-800">
      <div
        data-test="progress-current"
        aria-label="progress-current"
        className="h-4 rounded-full bg-blue-500"
        style={{ width: `${percentFilled}%` }}
      ></div>
    </div>
  )
}

export default ProgressBar
