import * as db from '../config/db.js'


export async function addVenue(name, address) {
    try {
        const result = await db.client.query(
            'INSERT INTO venues (venue_name, address) VALUES ($1, $2) ON CONFLICT (venue_name) DO NOTHING RETURNING venue_id',
            [name, address]
        )

        const venueID = result.rows[0].venue_id
        return venueID
    } catch (err) {
        console.error(`Error inserting venue: ${err}`)
    }
}


export async function getVenueID(name) {
    const result = await db.client.query('SELECT venue_id FROM venues WHERE venue_name = $1', [name])
    if (result.rowCount > 0) {
        const venueID = result.rows[0].venue_id
        return venueID
    }
}
