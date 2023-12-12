import pkg from 'pg'
import 'dotenv/config'

const { Client } = pkg

export const client = new Client({
    user: process.env.PSQL_DB_USER,
    password: process.env.PSQL_DB_PASSWORD,
    database: process.env.PSQL_DB_NAME,
    host: 'localhost',
    port: 5432,
})

try {
    await client.connect()
    logger.info('Database connection established')
} catch (error) {
    logger.error('Failed to connect to database:', error)
    notify.sendEmail(
        'Web Scraper Error: Failed to connect to database', `
        <p>An error occurred:<p>
        <p>Please view error log details.</p>`
    )
    process.exit(1)
}
