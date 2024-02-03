import * as db from '../config/db.js'
import logger from '../utils/logger.js'

export async function addMovie(title, rating, runtime) {
    try {
        const result = await db.client.query(
            'INSERT INTO movies (movie_title, rating, runtime) VALUES ($1, $2, $3) ON CONFLICT (movie_title) DO NOTHING RETURNING movie_id',
            [title, rating, runtime])
        const movieID = result.rows[0].movie_id
        return movieID
    } catch (error) {
        logger.error(`Error inserting movie "${title}" into database:`, error)
        throw error
    }
}

export async function getMovieID(title) {
    try {
        const result = await db.client.query('SELECT movie_id FROM movies WHERE movie_title = $1', [title])
        if (result.rowCount > 0) {
            const movieID = result.rows[0].movie_id
            return movieID
        }
    } catch (error) {
        logger.error(`Error retrieving movie "${title}" from database:`, error)
        throw error
    }
}

export async function getMovieTitle(movie_id) {
    try {
        const result = await db.client.query('SELECT movie_title FROM movies WHERE movie_id = $1', [movie_id])
        if (result.rowCount > 0) {
            const movieTitle = result.rows[0].movie_title
            return movieTitle
        }
    } catch (error) {
        logger.error(`Error retrieving title from movie_id "${movie_id}":`, error)
        throw error
    }
}

export async function resetMoviesTable() {
    try {
        const dbShowings = await db.client.query('SELECT * FROM showings')
        if (dbShowings.rows.length > 0) {
            await db.client.query('DELETE FROM movies')
        }
    } catch (error) {
        logger.error('Error clearing movies table:', error)
        throw error
    }
}
