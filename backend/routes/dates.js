import { Router } from 'express'
import { authenticateWithApiKey } from '../middleware/auth.js'
import { getDates } from '../db/dates.js'

const router = Router()
router.get('/', authenticateWithApiKey, async (req, res) => {
    try {
        const dates = await getDates()
        res.json(dates)
    } catch (err) {
        console.error(err)
    }
})

export default router
