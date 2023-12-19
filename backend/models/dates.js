import pool from '../config/db.js'

export const getEach = async () => {
    const result = await pool.query('SELECT date FROM showings')

    const sortedDates = result.rows.map(row => row.date)
        .map(dateStr => {
            const [month, day, year] = dateStr.split('/')
            return new Date(year, month - 1, day)
        })
        .sort((a, b) => a - b)
        .map(date => {
            const day = String(date.getDate()).padStart(2, '0')
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const year = date.getFullYear();
            return `${month}/${day}/${year}`
        });

    const uniqueDates = [...new Set(sortedDates)]
    return uniqueDates
}
