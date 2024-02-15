import pool from './config.js'

export const getMovies = async () => {
    const result = await pool.query(
        `SELECT movies.movie_title, movies.rating, movies.runtime, venues.venue_name, showings.date
        FROM showings
        JOIN movies ON showings.movie_id = movies.movie_id
        JOIN venues ON showings.venue_id = venues.venue_id`
    )

    const movies = result.rows
    return movies
}
