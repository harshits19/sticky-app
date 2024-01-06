export const calculateTimeDifference = (unixDate: Date | string): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  const providedDate = new Date(unixDate)
  const currentDate = new Date()
  const timeDifferenceMillis = currentDate.getTime() - providedDate.getTime()
  const minutesDifference = Math.floor(timeDifferenceMillis / (1000 * 60))
  const hoursDifference = Math.floor(timeDifferenceMillis / (1000 * 60 * 60))
  const daysDifference = Math.floor(
    timeDifferenceMillis / (1000 * 60 * 60 * 24),
  )
  const yearsDifference = Math.floor(daysDifference / 365)
  if (minutesDifference < 60) {
    return `${minutesDifference >= 1 ? minutesDifference + "m" : "just now"}`
  }
  if (hoursDifference < 24) {
    return `${hoursDifference}h`
  }
  if (daysDifference < 7) {
    return `${daysDifference}d`
  }
  if (yearsDifference < 1) {
    const year = providedDate.getFullYear()
    const month = months[providedDate.getMonth()]
    const day = providedDate.getDate()
    if (year + 1 === currentDate.getFullYear())
      return `${month} ${day}, ${year}`
    return `${month} ${day}`
  }
  return `${yearsDifference}y`
}
