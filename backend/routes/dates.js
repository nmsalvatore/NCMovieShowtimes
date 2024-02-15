import { Router } from 'express'
import { getDates } from '../db/dates.js'

const router = Router()
router.get('/', async (req, res) => {
    try {
        const dates = await getDates()
        res.json(dates)
    } catch (err) {
        console.error(err)
    }
})

export default router
