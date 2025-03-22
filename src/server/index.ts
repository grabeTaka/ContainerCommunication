import mongoose from 'mongoose'
import express from 'express'

import config from '../config/index'
const app = express()

async function startServer() {
    console.log('Starting server...')
    await mongoose.connect(config.mongoURI)
    console.log('Connected to database')

    app.listen(3000, () => {
        console.log(`Server is running on port ${3000}`)
    })
}

startServer()