import { Router } from 'express'
import { getMovies } from '../db/movies.js'

const router = Router()
router.get('/', async (req, res) => {
    try {
        const movies = await getMovies()
        res.json(movies)
    } catch (err) {
        console.error(err)
    }
})

export default router
