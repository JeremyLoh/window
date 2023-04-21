import { FC } from "react"
import { Cell, LifeCalendarModel } from "./lifeCalendarModel"

// Date of birth is in ISO8601 date string format: e.g. 1993-11-01 => November 1, 1993
// https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#date_strings
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
interface LifeCalendarProps {
  dateOfBirth: string
}

const LifeCalendar: FC<LifeCalendarProps> = (props) => {
  // todo find way to convert react component into image for saving
  const MAX_YEARS = 80
  const today = new Date()
  const dateOfBirth: Date = new Date(props.dateOfBirth)

  function generateCalendar() {
    const model: LifeCalendarModel = new LifeCalendarModel(dateOfBirth, today)
    const pastWeeksCells: Cell[] = model.getPastWeeksText()
    const presentWeekCell: Cell = model.getPresentWeekText()
    const futureWeeksCells: Cell[] = model.getFutureWeeksText(MAX_YEARS)
    return [
      ...createPastWeekCells(pastWeeksCells),
      createPresentWeekCell(presentWeekCell),
      ...createFutureWeekCells(futureWeeksCells)
    ]
  }

  function createPastWeekCells(cells: Cell[]): JSX.Element[] {
    return cells.map((cell: Cell, i: number) => {
      return (
        <div key={`past-week-${i}`}
             className="flex justify-center items-center aspect-square bg-red-700 text-white text-sm
                        hover:animate-bounce duration-700 ease-in
                        past">
          { cell.text }
        </div>
      )
    })
  }

  function createPresentWeekCell(cell: Cell): JSX.Element {
    return (
      <div key={`present-week`}
           data-test="present-week"
           className="flex justify-center items-center aspect-square bg-amber-500 text-white text-sm
                        hover:animate-bounce
                        present">
        { cell.text }
      </div>
    )
  }

  function createFutureWeekCells(cells: Cell[]): JSX.Element[] {
    return cells.map((cell: Cell, i: number) => {
      return (
        <div key={`future-week-${i}`}
             className="flex justify-center items-center aspect-square bg-green-700 text-white text-sm
                        hover:animate-bounce duration-700 ease-in
                        future">
          { cell.text }
        </div>
      )
    })
  }

  return (
    <div>
      <h2 data-test="life-calendar-title"
          className="text-center border-t-2 pt-2 mt-2 text-2xl"
      >
        Life Calendar <br /> {`(${MAX_YEARS} Years)`}
      </h2>
      <div data-test="life-calendar"
           className="grid gap-2 p-4 max-w-full md:max-w-[80%] m-auto
                      grid-rows-[repeat(auto-fit,_32px)]
                      grid-cols-[repeat(auto-fit,_32px)]
                      xl:grid-rows-[repeat(auto-fit,_26px)]
                      xl:grid-cols-[repeat(auto-fit,_26px)]
                      grid-flow-row-dense"
      >
        { generateCalendar() }
      </div>
    </div>
  )
}

export default LifeCalendar