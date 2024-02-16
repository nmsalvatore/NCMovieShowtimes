import { Router } from 'express'
import { authenticateWithApiKey } from '../middleware/auth.js'
import { getMovies } from '../db/movies.js'

const router = Router()
router.get('/', authenticateWithApiKey, async (req, res) => {
    try {
        const movies = await getMovies()
        res.json(movies)
    } catch (err) {
        console.error(err)
    }
})

export default router
