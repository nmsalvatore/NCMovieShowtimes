import express from 'express'
import * as moviesModel from '../models/movies.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const movies = await moviesModel.getAll()
        res.json(movies)
    } catch (err) {
        console.error(err)
    }
})

export default router
