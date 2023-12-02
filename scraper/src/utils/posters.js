import axios from 'axios';
import { createWriteStream, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Function to download a movie poster
export async function downloadMoviePoster(url, filename) {
    // Generate the file path
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filepath = join(__dirname, '..', '..', '..', 'posters', filename);

    // Check if the file already exists
    if (existsSync(filepath)) {
        return;
    }

    // Create a write stream
    const writer = createWriteStream(filepath);

    try {
        // Attempt to download the image
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
        throw error;
    }
}
