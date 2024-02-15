import { Router } from 'express'
import { getShowings } from '../db/showings.js'

const router = Router()
router.get('/', async (req, res) => {
    try {
        const showings = await getShowings()
        res.json(showings)
    } catch (err) {
        console.error(err)
    }
})

export default router