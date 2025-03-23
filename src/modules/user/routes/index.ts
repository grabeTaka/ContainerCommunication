/* eslint-disable require-await */
import express, { Request, Response, NextFunction } from 'express'
import userController from '../controller/index'

const router = express.Router()

router
    .route('/')
    .post(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result  = await userController.create(req, res)
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    })

router
    .route('/')
    .get(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const results  = await userController.getAll(req, res)
            res.status(200).json(results)
        } catch (e) {
            next(e)
        }
    })

router
    .route('/:id')
    .get(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result  = await userController.getById(req, res)
            res.status(200).json(result)
        } catch (e) {
            next(e)
        }
    })

router
    .route('/:id')
    .delete(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result  = await userController.delete(req, res)
            res.status(200).json(result)
        } catch (e) {
            next(e)
        }
    })

router
    .route('/:id')
    .patch(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result  = await userController.getById(req, res)
            res.status(200).json(result)
        } catch (e) {
            next(e)
        }
    })

export default router
