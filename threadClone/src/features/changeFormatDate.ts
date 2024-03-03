export default function changeFormatDate(date: string) {
    const startDate = new Date(date)
    const endDate = Date.now()
    
    let milliSecStart = startDate.getTime()
    
    let duration: any = endDate - milliSecStart
    const minutes = Math.floor(duration / 1000 / 60)
    const hours = Math.floor(minutes / 60)
    const day = Math.floor(hours / 24)
    const month = Math.floor(day / 30)
    const year = Math.floor(month / 12)

    // pengkondisian nilai duration
    if (year >= 1) {
        return duration = `${year} years`
    } else if (month >= 1) {
        return duration = `${month} months`
    } else if (day >= 1) {
        return duration = `${day} days`
    } else if (hours >= 1) {
        return duration = `${hours} hours`
    } else if (minutes >= 1) {
        return duration = `${minutes} minutes`
    } else if (minutes < 1) {
        return duration = 'just a few seconds'
    }
    return (
        duration
    )
}
