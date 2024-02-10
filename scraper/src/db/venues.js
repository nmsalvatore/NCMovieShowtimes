import * as db from '../config/db.js'
import logger from '../utils/logger.js'

export async function addVenue(name, address) {
    try {
        const result = await db.client.query(
            'INSERT INTO venues (venue_name, address) VALUES ($1, $2) ON CONFLICT (venue_name) DO NOTHING RETURNING venue_id',
            [name, address])
        const venueID = result.rows[0].venue_id
        return venueID
    } catch (error) {
        logger.error(`Error inserting venue "${name}" into database:`,  error)
        throw error
    }
}

export async function getVenueID(name) {
    try {
        const result = await db.client.query('SELECT venue_id FROM venues WHERE venue_name = $1', [name])
        if (result.rowCount > 0) {
            const venueID = result.rows[0].venue_id
            return venueID
        }
    } catch (error) {
        logger.error(`Error retrieving venue_id for venue "${name}:`, error)
        throw error
    }
}
