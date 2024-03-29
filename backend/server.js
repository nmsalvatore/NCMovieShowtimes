import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'
import moviesRouter from './routes/movies.js'
import datesRouter from './routes/dates.js'
import showingsRouter from './routes/showings.js'
import postersRouter from './routes/posters.js'

const app = express()
const port = process.env.PORT || 3000
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
const errorLogStream = fs.createWriteStream(path.join(__dirname, 'error.log'), { flags: 'a' })
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5000,
    standardHeaders: 'draft-7',
    legacyHeaders: false
})

app.use(express.json({ limit: '1mb' }))
app.use(helmet())
app.use(morgan('combined', { stream: accessLogStream }))
app.use(limiter)
app.use('/api/movies', moviesRouter)
app.use('/api/dates', datesRouter)
app.use('/api/showings', showingsRouter)
app.use('/posters', postersRouter)
app.use((err, req, res, next) => {
    const errorLogEntry = `${new Date().toISOString()}\n${err.stack || err.message}\n\n`
    errorLogStream.write(errorLogEntry);
    res.status(500).send('An unexpected error occurred. Please try again later.');
});
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
