import pool from './config.js'

export const getShowings = async () => {
    const result = await pool.query(
        `SELECT showings.time, showings.date, movies.movie_title, movies.rating, movies.runtime, venues.venue_name, venues.address, showings.url
         FROM showings
         JOIN movies ON showings.movie_id = movies.movie_id
         JOIN venues ON showings.venue_id = venues.venue_id`
    )

    return result.rows
}