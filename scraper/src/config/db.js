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

await client.connect()
