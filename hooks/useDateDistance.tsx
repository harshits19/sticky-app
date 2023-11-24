export const calculateTimeDifference = (unixDate: Date):string => {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",]
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
      return `${
        minutesDifference >= 1 ? minutesDifference + "m" : "just now"
      }`
    } else if (hoursDifference < 24) {
      return `${hoursDifference}h`
    } else if (daysDifference < 7) {
      return `${daysDifference}d`
    } else if (
      daysDifference < 365 &&
      providedDate.getFullYear() === currentDate.getFullYear()
    ) {
      const month = months[providedDate.getMonth()]
      const day = providedDate.getDate()
      return `${month} ${day}`
    } else {
      return `${yearsDifference}y`
    }
  }