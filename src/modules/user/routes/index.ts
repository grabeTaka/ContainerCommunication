import express, { Request, Response, NextFunction } from 'express'
import userController from '@/modules/user/controller'
import { HttpStatusCode } from '@/utils/enums/http-status-code'


const router = express.Router()

router
    .route('/')
    .post(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result  = await userController.create(req, res)
            res.status(HttpStatusCode.OK).json(result)
        } catch (e) {
            next(e)
        }
    })

router
    .route('/')
    .get(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const results  = await userController.getAll(req, res)
            if (!results.length)
                res.status(HttpStatusCode.NO_CONTENT).json()
            res.status(HttpStatusCode.OK).json(results)
        } catch (e) {
            next(e)
        }
    })

router
    .route('/:id')
    .get(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result  = await userController.getById(req, res)
            res.status(HttpStatusCode.OK).json(result)
        } catch (e) {
            next(e)
        }
    })

router
    .route('/:id')
    .delete(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result  = await userController.delete(req, res)
            res.status(HttpStatusCode.OK).json(result)
        } catch (e) {
            next(e)
        }
    })

router
    .route('/:id')
    .patch(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result  = await userController.update(req, res)
            res.status(HttpStatusCode.OK).json(result)
        } catch (e) {
            next(e)
        }
    })

export default router
