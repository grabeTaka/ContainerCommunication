/* eslint-disable require-await */
import express, { Request, Response, NextFunction } from 'express'
import pokemonController from '@/modules/pokemon/controller'

const router = express.Router()

router
    .route('/:pokemon_name')
    .get(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await pokemonController.listByName(req, res)
            res.status(200).json(result)
        } catch (e) {
            res.status(500).json({
                code: 500,
                message: e.message,
            })
            next(e)
        }
    })

export default router
