import { FC, useCallback, useRef } from "react"
import { Cell, LifeCalendarModel } from "./lifeCalendarModel"
import { downloadDomElement } from "../../../lib/domToImageDownload"

// Date of birth is in ISO8601 date string format: e.g. 1993-11-01 => November 1, 1993
// https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#date_strings
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
interface LifeCalendarProps {
  dateOfBirth: string
}

const LifeCalendar: FC<LifeCalendarProps> = (props) => {
  const MAX_YEARS = 80
  const today = new Date()
  const dateOfBirth: Date = new Date(props.dateOfBirth)
  const lifeCalendarRef = useRef<HTMLDivElement>(null)

  function generateCalendar(): JSX.Element[] {
    const model: LifeCalendarModel = new LifeCalendarModel(dateOfBirth, today)
    const pastWeeksCells: Cell[] = model.getPastWeeksText()
    const presentWeekCell: Cell = model.getPresentWeekText()
    const futureWeeksCells: Cell[] = model.getFutureWeeksText(MAX_YEARS)
    return [
      ...createPastWeekCells(pastWeeksCells),
      createPresentWeekCell(presentWeekCell),
      ...createFutureWeekCells(futureWeeksCells),
    ]
  }

  const handleDownload = useCallback(async () => {
    if (lifeCalendarRef.current === null) {
      return
    }
    await downloadDomElement(lifeCalendarRef.current, "life-calendar")
  }, [lifeCalendarRef])

  return (
    <>
      <div className="flex justify-center">
        <button
          data-test="life-calendar-download"
          className="mb-4 mt-2 rounded-xl border border-fuchsia-600 bg-secondary px-4 py-2 text-left
                     transition-colors hover:bg-fuchsia-600"
          onClick={handleDownload}
        >
          Save as Image
        </button>
      </div>
      <div ref={lifeCalendarRef}>
        <h2
          data-test="life-calendar-title"
          className="w-screen bg-gradient-to-r from-secondary to-primary pt-2 text-center text-2xl"
        >
          Life Calendar <br /> {`(${MAX_YEARS} Years)`}
        </h2>
        <div
          data-test="life-calendar"
          className="m-auto grid w-full grid-flow-row-dense grid-cols-[repeat(auto-fit,_32px)]
                     grid-rows-[repeat(auto-fit,_32px)]
                     justify-center gap-2 p-4
                     xl:grid-cols-[repeat(auto-fit,_26px)]
                     xl:grid-rows-[repeat(auto-fit,_26px)]"
        >
          {generateCalendar()}
        </div>
      </div>
    </>
  )
}

function createPastWeekCells(cells: Cell[]): JSX.Element[] {
  return cells.map((cell: Cell, i: number) => {
    return (
      <div
        key={`past-week-${i}`}
        className="past flex aspect-square items-center justify-center bg-red-700 text-sm
                   text-white duration-700 ease-in hover:animate-bounce"
      >
        {cell.text}
      </div>
    )
  })
}

function createPresentWeekCell(cell: Cell): JSX.Element {
  return (
    <div
      key={`present-week`}
      data-test="present-week"
      className="present flex aspect-square items-center justify-center bg-amber-500 text-sm
                 text-white hover:animate-bounce"
    >
      {cell.text}
    </div>
  )
}

function createFutureWeekCells(cells: Cell[]): JSX.Element[] {
  return cells.map((cell: Cell, i: number) => {
    return (
      <div
        key={`future-week-${i}`}
        className="future flex aspect-square items-center justify-center bg-green-700 text-sm
                   text-white duration-700 ease-in hover:animate-bounce"
      >
        {cell.text}
      </div>
    )
  })
}

export default LifeCalendar
