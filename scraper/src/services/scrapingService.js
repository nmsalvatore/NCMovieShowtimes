import { onyx } from '../scrapers/onyx.js'
import { sierra } from '../scrapers/sierra.js'
import { mystic } from '../scrapers/mystic.js'
import startDatabaseUpdateService from './databaseService.js'

export default async function startScrapingService() {
    const showings = await getAllShowings()
    await startDatabaseUpdateService(showings)
}

async function getAllShowings() {
    // Get all showings data
    const onyxShowings = await onyx.getShowings()
    const sierraShowings = await sierra.getShowings()
    const mysticShowings = await mystic.getShowings()

    // Concatenate showings data in a single array
    const showings = [].concat(
        onyxShowings, 
        sierraShowings,
        mysticShowings
    )

    return showings
}
