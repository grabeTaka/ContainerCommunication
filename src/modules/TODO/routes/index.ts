/* eslint-disable require-await */
import express, { Request, Response, NextFunction } from 'express'
import todoController from '@/modules/TODO/controller'

const router = express.Router()

router
    .route('/todo')
    .get(async (req: Request, res: Response, next: NextFunction) => {
        try {
            //const result = await todoController.(req, res)
            //res.status(200).json(result)
            
        } catch (e) {
            res.status(500).json({
                code: 500,
                message: e.message,
            })
            next(e)
        }
    })

export default router
