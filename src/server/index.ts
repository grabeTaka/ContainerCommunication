import mongoose from 'mongoose'
import express from 'express'

import config from '@/config/database/index'
import { errorHandler } from '@/middleware/index'

import { join, resolve } from 'path'
import { addAliases } from 'module-alias'

import usersRoutes from '@/modules/user/routes/index'
import bodyParser from 'body-parser';

const app = express()

async function startServer() {
    const srcDir = join(__dirname, '..')
    addAliases({ '@': resolve(srcDir) })

    await mongoose.connect(config.mongoURI)

    app.use(bodyParser.json())

    app.get('/healthcheck', (req, res) => {
        res.status(200).json({
            status: 'ok',
            message: 'API is running',
            timestamp: new Date(),
        });
    });

    app.use('/api/users', usersRoutes);
    app.use(errorHandler)

    app.listen(3000, () => {
        console.log(`Server is running on port ${3000} 🚀`)
    })
}

startServer()