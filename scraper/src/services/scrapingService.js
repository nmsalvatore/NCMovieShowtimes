import getOnyxShowings from "../scrapers_v2/onyx.js";
import getSuttonShowings from "../scrapers_v2/sutton.js";
import getDelOroShowings from "../scrapers_v2/deloro.js";
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
        const showings = [].concat(
            onyxShowings,
            suttonShowings,
            delOroShowings,
        );
        return showings;
    } catch (error) {
        logger.error("Error retrieving all showings");
        throw error;
    }
}
