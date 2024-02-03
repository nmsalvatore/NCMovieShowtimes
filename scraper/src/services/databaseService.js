import { addVenue, getVenueID } from '../db/venues.js'
import { addMovie, getMovieID, resetMoviesTable } from '../db/movies.js'
import { addShowing, getShowingID } from '../db/showings.js'
import { client } from '../config/db.js'
import logger from '../utils/logger.js'

export default async function startDatabaseUpdateService(showings) {
    try {
        await client.query('BEGIN')
        await resetMoviesTable()
        await insertShowingsData(showings)
        await client.query('COMMIT')
    } catch (error) {
        await client.query('ROLLBACK')
        logger.error('Error updating database:', error)
        throw error
    } finally {
        await client.end()
        logger.info('Database connection closed')
    }
}

async function insertShowingsData(showings) {
    try {
        let newShowingCount = 0
        
        logger.info(`${showings.length} showings staged for database insertion`)

        for (const showing of showings) {
            let venueID = await getVenueID(showing.venue)
            if (!venueID) {
                venueID = await addVenue(showing.venue, showing.address)
            }

            let movieID = await getMovieID(showing.title)
            if (!movieID) {
                movieID = await addMovie(showing.title, showing.rating, showing.runtime)
            }

            const showingID = await getShowingID(movieID, venueID, showing.date, showing.time, showing.url)
            if (!showingID) {
                await addShowing(movieID, venueID, showing.date, showing.time, showing.url)
                newShowingCount++
            } else {
                logger.error('Showing failed database insertion. Aborting update.')
                throw new Error('Showing failed database insertion.')
            }
        }

        logger.info(`${newShowingCount} new showings have been added to the database.`)
    } catch (error) {
        logger.error('Error inserting showings data:', error)
        throw error
    }
}
