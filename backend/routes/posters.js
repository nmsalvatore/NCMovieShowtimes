import express from 'express'
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = express.Router()
const corsOptions = {
    // origin: (origin, callback) => {
    //     const whitelist = process.env.CORS_WHITELIST.split(',')
    //     if (whitelist.indexOf(origin) !== -1 || !origin) {
    //         callback(null, true);
    //     } else {
    //         callback(new Error('Not allowed by CORS'));
    //     }
    // },
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200
};

router.use(cors(corsOptions))
router.use('/', express.static(join(__dirname, '..', '..', 'posters')))

export default router