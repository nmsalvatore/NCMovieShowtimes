import axios from 'axios';
import { createWriteStream, existsSync, readFileSync } from 'fs';
import { unlink, readdir } from 'node:fs/promises'
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

    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'arraybuffer'
        });

        const resizedBuffer = await sharp(response.data)
            .resize(200)
            .toBuffer();

        const writer = createWriteStream(filepath);
            writer.write(resizedBuffer, () => {
            writer.close();
        });

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        logger.error(`Error downloading movie poster "${filename}"`);

        const placeholderFilepath = join(__dirname, '..', 'assets', 'image_unavailable.png');
        const placeholderBuffer = readFileSync(placeholderFilepath);
        const placeholderOutputPath = join(__dirname, '..', '..', '..', 'posters', filename);
        const placeholderWriter = createWriteStream(placeholderOutputPath);
        const resizedPlaceholderBuffer = await sharp(placeholderBuffer)
            .resize(200)
            .toBuffer();

        placeholderWriter.write(resizedPlaceholderBuffer, () => {
            placeholderWriter.close();
        });

        return new Promise((resolve, reject) => {
            placeholderWriter.on('finish', resolve);
            placeholderWriter.on('error', reject);
        });
    }
}

export async function deleteOldPosters(showings) {
    const titles = new Set(showings.map(showing => showing.title))
    const __dirname = dirname(fileURLToPath(import.meta.url))
    const postersDir = join(__dirname, '..', '..', '..', 'posters')
    
    try {
        const files = await readdir(postersDir)
        for (let filename of files) {
            const posterTitle = filename.replace('.jpg', '')
            const posterIsOld = !titles.has(posterTitle)

            if (posterIsOld) {
                try {
                    const filePath = join(postersDir, filename)
                    await unlink(filePath)
                    logger.info(`${filename} has been deleted`)
                } catch (error) {
                    logger.error(`Error deleting old movie poster "${filename}"`)
                    throw error
                }
            }
        }
    } catch (error) {
        logger.error('Error deleting old movie posters')
        throw error
    }
}