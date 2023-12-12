import startScrapingService from './services/scrapingService.js'

async function init() {
    try {
        await startScrapingService()
    } catch (err) {
        throw Error(err)
    }
}

init()
