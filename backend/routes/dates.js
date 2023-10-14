import express from 'express'
import * as datesModel from '../models/dates.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const dates = await datesModel.getEach()
        res.json(dates)
    } catch (err) {
        console.error(err)
    }
})

export default router
