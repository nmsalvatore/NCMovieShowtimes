import pool from '../config/db.js'

export const getShowingsByDate = async date => {
    const result = await pool.query(
        `SELECT showings.time, showings.date, movies.movie_title, venues.venue_name, showings.url
         FROM showings
         JOIN movies ON showings.movie_id = movies.movie_id
         JOIN venues ON showings.venue_id = venues.venue_id
         WHERE showings.date = $1`, [date]
    )

    return result.rows
}
