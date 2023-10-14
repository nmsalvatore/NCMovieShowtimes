import * as db from '../config/db.js'


export async function addMovie(title) {
    try {
        const result = await db.client.query(
            'INSERT INTO movies (movie_title) VALUES ($1) ON CONFLICT (movie_title) DO NOTHING RETURNING movie_id',
            [title]
        )

        const movieID = result.rows[0].movie_id
        return movieID
    } catch (err) {
        console.error(`Error inserting movie: ${err}`)
    }
}


export async function getMovieID(title) {
    const result = await db.client.query('SELECT movie_id FROM movies WHERE movie_title = $1', [title])
    if (result.rowCount > 0) {
        const movieID = result.rows[0].movie_id
        return movieID
    }
}


export async function getMovieTitle(movie_id) {
    const result = await db.client.query('SELECT movie_title FROM movies WHERE movie_id = $1', [movie_id])
    if (result.rowCount > 0) {
        const movieTitle = result.rows[0].movie_title
        return movieTitle
    }
}


export async function resetMoviesTable() {
    const dbShowings = await db.client.query('SELECT * FROM showings')
    if (dbShowings.rows.length > 0) {
        await db.client.query('TRUNCATE movies RESTART IDENTITY CASCADE')
    }
}
