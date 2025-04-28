import { Request } from 'express'

import { InvalidParamError } from '@/utils/errors/invalid-param'

export const fromRequest = <T>(
    request: Request,
    context: 'params' | 'body' | 'query' | 'file',
    field: string,
    required = true,
    ErrorInstance = InvalidParamError
): T => {
    const value =
        context === 'file' ? request[context] : request[context][field]

    if (required && (!value || value === '')) {
        throw new ErrorInstance({
            message: `The parameter ${field} is required!`,
        })
    }

    return value || false
}
