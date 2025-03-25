import type { Request } from 'express'
import { AnyZodObject, ZodError, z } from 'zod'
import { HttpStatusCode } from '../enums/httpStatusCode'
import { BadRequestError } from '../errors/badRequest'

export async function parserSchemaValidations<T extends AnyZodObject>(
    schema: T,
    req: Request
): Promise<z.infer<T>> {
    try {
        const parsedData = await schema.parseAsync(req)
        return parsedData
    } catch (error) {
        if (error instanceof ZodError) {
            console.log(error.errors)
            throw new BadRequestError({
                message: 'Validation failed',
                statusCode: HttpStatusCode.BAD_REQUEST,
                description: error.errors.map(error => `${error.path[1]} - ${error.message}`).join(', '),
            })
        }
        throw new BadRequestError({
            message: 'Internal server error',
            statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR
        })
    }   
}

// TODO se o erro já existir filtrar e não adicionar no map da linha 19, mais fácil criar um útils para isso