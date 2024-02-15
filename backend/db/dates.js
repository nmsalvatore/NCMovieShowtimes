import pool from './config.js'

export const getDates = async () => {
    const result = await pool.query('SELECT date FROM showings')
    const dates = result.rows.map(row => row.date)
        .map(dateString => stringToDate(dateString))
        .sort((a, b) => a - b)
        .map(date => dateToString(date))
    const uniqueDates = getUniqueDates(dates)
    return uniqueDates
}

function stringToDate(dateString) {
    const [month, day, year] = dateString.split('/')
    return new Date(year, month - 1, day)
}

function dateToString(date) {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear();
    return `${month}/${day}/${year}`
}

function getUniqueDates(dates) {
    const datesSet = new Set(dates)
    return Array.from(datesSet)
}