import { add, differenceInCalendarISOWeeks, differenceInYears } from "date-fns"

interface CalendarModel {
  getPastWeeksText: (today: Date) => Cell[]
  getPresentWeekText: (today: Date) => Cell
  getFutureWeeksText: (maxYears: number) => Cell[]
}

export interface Cell {
  text: string
}

export class LifeCalendarModel implements CalendarModel {
  private readonly dateOfBirth: Date
  private readonly today: Date

  constructor(dateOfBirth: Date, today: Date) {
    this.dateOfBirth = dateOfBirth
    this.today = today
  }

  getPastWeeksText(): Cell[] {
    const pastWeeks = differenceInCalendarISOWeeks(this.today, this.dateOfBirth)
    return this.createPastWeekCells(this.dateOfBirth, pastWeeks)
  }

  getPresentWeekText(): Cell {
    const pastWeeks = differenceInCalendarISOWeeks(this.today, this.dateOfBirth)
    return { text: (pastWeeks + 1).toString() }
  }

  getFutureWeeksText(maxYears: number): Cell[] {
    const pastWeeks = differenceInCalendarISOWeeks(this.today, this.dateOfBirth)
    const startWeek: number = pastWeeks + 2
    const maxYearsAfterDateOfBirth = add(this.dateOfBirth, { years: maxYears })
    const totalWeeks = differenceInCalendarISOWeeks(maxYearsAfterDateOfBirth, this.dateOfBirth)
    return this.createFutureWeekCells(startWeek, totalWeeks)
  }

  private createPastWeekCells(dateOfBirth: Date, pastWeeks: number): Cell[] {
    const cells: Cell[] = []
    let previousDifferenceInYears = 0
    for (let i = 1; i <= pastWeeks; i++) {
      const currentDate = add(dateOfBirth, { weeks: i })
      const yearDifference: number = differenceInYears(currentDate, dateOfBirth)
      const cellText = this.getCellText(yearDifference, previousDifferenceInYears)
      cells.push({ text: cellText })
      const isYearDifferenceChanged = yearDifference !== previousDifferenceInYears
      if (isYearDifferenceChanged) {
        previousDifferenceInYears = yearDifference
      }
    }
    return cells
  }

  private createFutureWeekCells(startWeek: number, totalWeeks: number): Cell[] {
    const cells: Cell[] = []
    let previousDifferenceInYears = differenceInYears(
      add(this.dateOfBirth, { weeks: startWeek }),
      this.dateOfBirth
    )
    for (let j = startWeek; j <= totalWeeks; j++) {
      const currentDate = add(this.dateOfBirth, { weeks: j })
      const yearDifference: number = differenceInYears(currentDate, this.dateOfBirth)
      const cellText = this.getCellText(yearDifference, previousDifferenceInYears)
      cells.push({ text: cellText })
      const isYearDifferenceChanged = yearDifference !== previousDifferenceInYears
      if (isYearDifferenceChanged) {
        previousDifferenceInYears = yearDifference
      }
    }
    return cells
  }

  private getCellText(yearDifference: number, previousDifferenceInYears: number) {
    const isYearDifferenceChanged = yearDifference !== previousDifferenceInYears
    return isYearDifferenceChanged ? (yearDifference + "y") : ""
  }
}