import startScrapingService from './services/scrapingService.js'
import logger from './utils/logger.js'

async function init() {
    try {
        await startScrapingService()
    } catch (error) {
        logger.info('Terminating script')
        process.exit(1)
    }
}

init()
