import { onyx } from '../scrapers/onyx.js'
import { sierra } from '../scrapers/sierra.js'
import { mystic } from '../scrapers/mystic.js'
import startDatabaseUpdateService from './databaseService.js'

export default async function startScrapingService() {
    try {
        const showings = await getAllShowings()
        await startDatabaseUpdateService(showings)
    } catch (error) {
        throw error
    }
}

async function getAllShowings() {
    try {
        const onyxShowings = await onyx.getShowings()
        const sierraShowings = await sierra.getShowings()
        const mysticShowings = await mystic.getShowings()
    
        const showings = [].concat(
            onyxShowings,
            sierraShowings,
            mysticShowings
        )
    
        return showings
    } catch (error) {
        throw error
    }
}
