import { HttpStatusCode } from '../enums/http-status-code'

import { AppError, Options } from './app'

export class ConflictError extends AppError {
    constructor(options: Options) {
        super({
            code: 'conflict',
            statusCode: HttpStatusCode.CONFLICT,
            ...options,
        })

        this.name = 'ConflictError'
    }
}
