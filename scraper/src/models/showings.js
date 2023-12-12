import * as db from '../config/db.js'
import logger from '../utils/logger.js'

export async function addShowing(movie_id, venue_id, date, time, url) {
    try {
        await db.client.query(
            'INSERT INTO showings (movie_id, venue_id, date, time, url) VALUES ($1, $2, $3, $4, $5)',
            [movie_id, venue_id, date, time, url]
        )
    } catch (error) {
        logger.error(`Error inserting showing:`, error)
        throw error
    }
}

export async function getShowingID(movie_id, venue_id, date, time, url) {
    try {
        const result = await db.client.query(
            'SELECT showing_id FROM showings WHERE movie_id = $1 AND venue_id = $2 AND date = $3 AND time = $4 AND url = $5', 
            [movie_id, venue_id, date, time, url]
        )
    
        if (result.rowCount > 0) {
            const showingID = result.rows[0].showing_id
            return showingID
        }
    } catch (error) {
        logger.error(`Error retrieving showing_id:`, error)
        throw error
    }
}
