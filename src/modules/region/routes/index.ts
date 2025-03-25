import express, { Request, Response, NextFunction } from 'express'
import regionController from '../controller/index'
import { HttpStatusCode } from '../../../utils/enums/httpStatusCode'

const router = express.Router()

router
    .route('/')
    .post(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result  = await regionController.create(req, res)
            res.status(HttpStatusCode.CREATED).json(result)
        } catch (e) {
            next(e)
        }
    })

router
    .route('/')
    .get(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const results  = await regionController.getAll(req, res)
            res.status(HttpStatusCode.OK).json(results)
        } catch (e) {
            next(e)
        }
    })

router
    .route('/:id')
    .get(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result  = await regionController.getById(req, res)
            res.status(HttpStatusCode.OK).json(result)
        } catch (e) {
            next(e)
        }
    })

router
    .route('/:id')
    .delete(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result  = await regionController.delete(req, res)
            res.status(HttpStatusCode.OK).json(result)
        } catch (e) {
            next(e)
        }
    })

router
    .route('/:id')
    .patch(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await regionController.update(req, res)
            res.status(HttpStatusCode.OK).json(result)
        } catch (e) {
            next(e)
        }
    })

export default router
