import { onyx } from '../scrapers/onyx.js'
import { prime } from '../scrapers/prime.js'
import startDatabaseUpdateService from './databaseService.js'
import logger from '../utils/logger.js'

export default async function startScrapingService() {
    try {
        const showings = await getAllShowings()
        await startDatabaseUpdateService(showings)
    } catch (error) {
        console.error(error)
        logger.error('Error starting scraping service:', error)
        throw error
    }
}

async function getAllShowings() {
    try {
        const onyxShowings = await onyx.getShowings()
        const primeShowings = await prime.getShowings()
    
        const showings = [].concat(
            onyxShowings,
            primeShowings,
        )

        return showings
    } catch (error) {
        logger.error('Error retrieving all showings:', error)
        throw error
    }
}
