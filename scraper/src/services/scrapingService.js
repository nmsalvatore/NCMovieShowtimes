import { onyx } from '../scrapers/onyx.js'
import { prime } from '../scrapers/prime.js'
import startDatabaseUpdateService from './databaseService.js'
import logger from '../utils/logger.js'
import * as utils from '../utils/utils.js'


export default async function startScrapingService() {
    try {
        const MAX_ATTEMPTS = 3

        for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
            // Initial showing extraction
            const showings1 = await getAllShowings()

            // Wait 5 minutes and log each minute
            let totalWaitTime = 5
            for (let i = 0; i < totalWaitTime; i++) {
                const timeLeft = totalWaitTime - i 
                logger.info(`${timeLeft} minutes until scraper re-run`)
                utils.delay(1000 * 60)

            }

            // Re-run scraper to check for discrepancies
            const showings2 = await getAllShowings()

            if (JSON.stringify(showings1) === JSON.stringify(showings2)) {
                logger.info('Showings consistency has been validated.')
                await startDatabaseUpdateService(showings1)
                return
            } else {
                logger.error('Discrepancies found between showings retrievals')
            }
        }

        const error = 'Showings consistency could not be validated'
        logger.error(error)
        throw new Error(error)
    } catch (error) {
        logger.error('Error starting scraping service')
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
        logger.error('Error retrieving all showings')
        throw error
    }
}
