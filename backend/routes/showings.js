import { Router } from 'express'
import { getShowingsByDate } from '../models/showings.js'

const router = Router()

router.get('/', async (req, res) => {
    const date = req.query.date;

    if (!date) {
        return res.status(400).json({ error: 'Date parameter is required.'})
    }

    try {
        const showings = await getShowingsByDate(date)
        res.json(showings)
    } catch (err) {
        console.error(err)
    }
})

export default router