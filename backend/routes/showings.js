import { Router } from 'express'
import { getAllShowings } from '../models/showings.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const showings = await getAllShowings()
        res.json(showings)
    } catch (err) {
        console.error(err)
    }
})

export default router