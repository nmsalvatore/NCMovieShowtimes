export function getTodayDateString() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const options = { timeZone: 'America/Los_Angeles' }
    const dateString = today.toLocaleDateString('en-US', options)
    return padDateString(dateString)
}

export function getCurrentDatetime() {
    const options = { timeZone: 'America/Los_Angeles'}
    const date = new Date().toLocaleDateString('en-US', options)
    const time = new Date().toLocaleTimeString('en-US', options)
    return new Date(`${date} ${time}`)
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

export async function updateDatesData() {
    const res = await fetch('http://localhost:3000/api/dates')
    const dates = await res.json()
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return dates.filter(dateString => {
        const dateParts = dateString.split('/')
        const date = new Date(dateParts[2], dateParts[0] - 1, dateParts[1])
        return date >= today
    })
}

function padDateString(date) {
    let [month, day, year] = date.split('/')
    month = month.padStart(2, 0)
    day = day.padStart(2, 0)
    return `${month}/${day}/${year}`
}
