import axios from 'axios';
import { createWriteStream, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import logger from '../utils/logger.js';
import sharp from 'sharp'

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
            responseType: 'arraybuffer'
        });

        const resizedBuffer = await sharp(response.data)
            .resize(200)
            .toBuffer()

        const writer = createWriteStream(filepath)
        writer.write(resizedBuffer, () => {
            writer.close()
        })

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve)
            writer.on('error', reject)
        })
    } catch (error) {
        logger.error(`Error downloading movie poster "${filename}"`)
        throw error;
    }
}
