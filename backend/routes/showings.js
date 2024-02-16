import { Router } from 'express'
import { authenticateWithApiKey } from '../middleware/auth.js'
import { getShowings } from '../db/showings.js'

const router = Router()
router.get('/', authenticateWithApiKey, async (req, res) => {
    try {
        const showings = await getShowings()
        res.json(showings)
    } catch (err) {
        console.error(err)
    }
})

export default router