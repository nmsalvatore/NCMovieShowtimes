import { addVenue, getVenueID } from '../models/venues.js'
import { addMovie, getMovieID, resetMoviesTable } from '../models/movies.js'
import { addShowing, getShowingID } from '../models/showings.js'
import { client } from '../config/db.js'
import { notify } from '../utils/notify.js'
import logger from '../utils/logger.js'

export default async function startDatabaseUpdateService(showings) {
    try {
        await client.query('BEGIN')
        await resetMoviesTable()
        await insertShowingsData(showings)
        await client.query('COMMIT')
    } catch (error) {
        await client.query('ROLLBACK')
        notify.sendEmail(
            'Web Scraper Error: Database Service', `
            <p>An error has occurred.<p>
            <p>Please view error log for details.</p>`
        )
    } finally {
        await client.end()
    }
}

async function insertShowingsData(showings) {
    try {
        let newShowingCount = 0

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
            }
        }

        logger.info(`${newShowingCount} new showings have been added to the database.`)
    } catch (error) {
        logger.error('Error inserting showings data:', error)
        throw error
    }
}
