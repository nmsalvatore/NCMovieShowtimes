export function convertDate(date) {
    const [month, day, year] = date.split('/')
    const dateFormatted = `${year}-${month}-${day}`
    return new Date(dateFormatted)
}

export function convertDateForDB(date) {
    const dateObj = new Date(date)
    const options = { timeZone: 'America/Los_Angeles'}
    const localeDateString = dateObj.toLocaleDateString('us-en', options)
    const dbDateString = standardizeDaysAndMonths(localeDateString)
    return dbDateString
}

function standardizeDaysAndMonths(date) {
    let [month, day, year] = date.split('/')
    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    return `${month}/${day}/${year}`
}
