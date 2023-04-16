import { FC } from "react"
import differenceInCalendarISOWeeks from "date-fns/differenceInCalendarISOWeeks"

// Date of birth is in ISO8601 date string format: e.g. 1993-11-01 => November 1, 1993
// https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#date_strings
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
interface LifeCalendarProps {
  dateOfBirth: String
}

const LifeCalendar: FC<LifeCalendarProps> = (props) => {
  // todo find way to convert react component into image for saving
  // todo refactor weeks (cells generation) into own classes
  function generateWeeks() {
    const years = 80
    const totalWeeks = years * 52
    const today: Date = new Date()
    const pastWeeks = differenceInCalendarISOWeeks(today, new Date(props.dateOfBirth))
    return [...createPastWeekCells(pastWeeks),
      createPresentWeekCell(pastWeeks + 1),
      ...createFutureWeekCells(pastWeeks + 2, totalWeeks)
    ]
  }

  function createPastWeekCells(pastWeeks: number) {
    const cells = []
    for (let i = 1; i <= pastWeeks; i++) {
      cells.push(
        <div key={`past-week-${i}`}
             className="flex justify-center items-center aspect-square bg-red-700 text-white text-sm
                        hover:animate-bounce duration-700 ease-in
                        past">
          { (i % 52 === 0) && (i/52 + "y") }
        </div>)
    }
    return cells
  }

  function createPresentWeekCell(week: number) {
    return (
      <div key={`present-week`}
           data-test="present-week"
           className="flex justify-center items-center aspect-square bg-amber-500 text-white text-sm
                        hover:animate-bounce
                        present">
        {week}
      </div>
    )
  }

  function createFutureWeekCells(startWeek: number, totalWeeks: number) {
    const cells = []
    for (let j = startWeek; j <= totalWeeks; j++) {
      cells.push(
        <div key={`future-week-${j}`}
             className="flex justify-center items-center aspect-square bg-green-700 text-white text-sm
                        hover:animate-bounce duration-700 ease-in
                        future">
          { (j % 52 === 0) && (j/52 + "y") }
        </div>
      )
    }
    return cells
  }

  return (
    <div data-test="life-calendar"
         className="grid gap-2 p-4 max-w-full md:max-w-[80%] m-auto
                    grid-rows-[repeat(auto-fit,_32px)]
                    grid-cols-[repeat(auto-fit,_32px)]
                    xl:grid-rows-[repeat(auto-fit,_26px)]
                    xl:grid-cols-[repeat(auto-fit,_26px)]
                    grid-flow-row-dense"
    >
      {generateWeeks()}
    </div>
  )
}

export default LifeCalendar