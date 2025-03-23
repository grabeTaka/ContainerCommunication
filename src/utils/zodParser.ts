import type { Request } from 'express'
import { AnyZodObject, ZodError, z } from 'zod'
import { HttpStatusCode } from '../utils/enums/httpStatusCode'
import { BadRequestError } from './errors/badRequest'

export async function zodParser<T extends AnyZodObject>(
    schema: T,
    req: Request
): Promise<z.infer<T>> {
    try {
        const parsedData = await schema.parseAsync(req)
        return parsedData
    } catch (error) {
        if (error instanceof ZodError) {
            const errors = error.errors.map((err) => ({
                message: err.message,
                path: err.path.join('.'),
            }))
            throw new BadRequestError({
                message: 'Validation failed',
                statusCode: HttpStatusCode.BAD_REQUEST,
            })
        }
        throw new BadRequestError({
            message: 'Internal server error',
            statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR
        })
    }
}