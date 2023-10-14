import pool from '../config/db.js'

export const getAll = async () => {
    const result = await pool.query(
        `SELECT movies.movie_title, venues.venue_name, showings.date
        FROM showings
        JOIN movies ON showings.movie_id = movies.movie_id
        JOIN venues ON showings.venue_id = venues.venue_id`
    )

    const movies = result.rows
    return movies
}

export const getByID = async id => {
    const movies = await getAll()
    const movie = await movies.find(movie => id === movie.movie_id)
    return movie
}
