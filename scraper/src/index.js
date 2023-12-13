import startScrapingService from './services/scrapingService.js'
import logger from './utils/logger.js'
import { notify } from './utils/notify.js'

async function init() {
    try {
        await startScrapingService()
    } catch (error) {
        await notify.sendEmail(
            'Web Scraper Error', `
            <p>An error occurred:<p>
            <pre>${error.message}</pre>
            <p>Please view logs for details.</p>`)

        logger.info('Terminating script')
        process.exit(1)
    }
}

init()
