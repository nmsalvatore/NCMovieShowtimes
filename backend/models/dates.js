import pool from '../config/db.js'

export const getEach = async () => {
    const result = await pool.query('SELECT date FROM showings')
    const dates = new Set(result.rows.map(date => date.date))
    return [...dates].sort()
}
