import express from 'express'
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = express.Router()

const corsOptions = {
    origin: true, // You can adjust this as per your requirements
    credentials: true,
    optionsSuccessStatus: 200
};

router.use(cors(corsOptions))

router.use('/', express.static(join(__dirname, '..', '..', 'posters')))

export default router