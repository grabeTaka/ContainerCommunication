import { Request, Response, NextFunction } from 'express'
import { AppError } from '@/utils/errors/app'
import { HttpStatusCode } from '@/utils/enums/http-status-code'

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
        return res.status(err.statusCode || HttpStatusCode.BAD_REQUEST).json({
            code: err.code,
            message: err.message,
            description: err.description || 'No description provided',
            metadata: err.metadata || {},
            translateParams: err.translateParams || {},
        })
    }

    console.error(err)

    
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        code: 'internal_server_error',
        message: 'An unexpected error occurred.',
    })
}