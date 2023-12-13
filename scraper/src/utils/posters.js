import axios from 'axios';
import { createWriteStream, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import logger from './logger';

export async function downloadMoviePoster(url, filename) {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filepath = join(__dirname, '..', '..', '..', 'posters', filename);

    if (existsSync(filepath)) {
        return;
    }

    const writer = createWriteStream(filepath);

    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => {
                resolve();
            });
            writer.on('error', reject);
        });
    } catch (error) {
        logger.error(`Error downloading movie poster "${filename}"`)
        throw error;
    }
}
