import { differenceInCalendarDays } from "date-fns"
import format from "date-fns/format"

export function formatDate(date: string): string {
  const projectDate = new Date(date)
  const daysAgo = differenceInCalendarDays(new Date(), projectDate)
  return `${format(projectDate, "do MMMM yyyy")}, ${daysAgo} days ago`
}

export function formatTableDate(date: Date): string {
  return format(date, "d MMMM yyyy ppp")
}
