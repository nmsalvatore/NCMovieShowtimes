export function getTodayDateString() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const options = { timeZone: 'America/Los_Angeles' }
    const dateString = today.toLocaleDateString('en-US', options)
    return padDateString(dateString)
}

export function getTodayPath() {
    const today = getTodayDateString()
    const [ month, day, year ] = today.split('/')
    return `/calendar/${year + month + day}`
}

export function getCurrentDatetime() {
    const options = { timeZone: 'America/Los_Angeles'}
    const localeString = new Date().toLocaleString('en-US', options)
    return new Date(localeString)
}

export function convertToLongDateString(dateStr) {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

export function convertToShortDateString(dateStr) {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    })
}

function padDateString(date) {
    let [month, day, year] = date.split('/')
    month = month.padStart(2, 0)
    day = day.padStart(2, 0)
    return `${month}/${day}/${year}`
}

export function removeOldDates(dates) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return dates.filter(dateString => {
        const dateParts = dateString.split('/')
        const date = new Date(dateParts[2], dateParts[0] - 1, dateParts[1])
        return date >= today
    })
}