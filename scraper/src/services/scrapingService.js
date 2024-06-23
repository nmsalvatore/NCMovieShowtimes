import getOnyxShowings from "../scrapers/onyx.js";
import getSuttonShowings from "../scrapers/sutton.js";
import getDelOroShowings from "../scrapers/deloro.js";
import startDatabaseUpdateService from "./databaseService.js";
import logger from "../utils/logger.js";

export default async function startScrapingService() {
    try {
        const showings = await getAllShowings();
        await startDatabaseUpdateService(showings);
    } catch (error) {
        logger.error("Error starting scraping service");
        throw error;
    }
}

async function getAllShowings() {
    try {
        const onyxShowings = await getOnyxShowings();
        const suttonShowings = await getSuttonShowings();
        const delOroShowings = await getDelOroShowings();

        return [].concat(onyxShowings, suttonShowings, delOroShowings);
    } catch (error) {
        logger.error("Error retrieving all showings");
        throw error;
    }
}
