import pkg from 'pg'
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.PSQL_DB_USER,
    password: process.env.PSQL_DB_PASSWORD,
    database: process.env.PSQL_DB_NAME,
    host: 'localhost',
    port: 5432,
})

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const errorLogStream = fs.createWriteStream(path.join(__dirname, 'error.log'), { flags: 'a' })

pool.on('error', (err, client) => {
    const errorLogEntry = `${new Date().toISOString()}\nUnexpected error on idle client:\n${err.stack || err.message}\n\n`;
    errorLogStream.write(errorLogEntry)
    console.error('Unexpected error on idle client', err)
})

export default pool
