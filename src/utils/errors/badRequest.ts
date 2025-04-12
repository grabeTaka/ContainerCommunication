import { HttpStatusCode } from '../../utils/enums/httpStatusCode'

import { AppError, Options } from './app'

export class BadRequestError extends AppError {
    constructor(options: Options) {
        super({
            code: 'bad_request',
            statusCode: HttpStatusCode.BAD_REQUEST,
            ...options,
        })

        this.name = 'BadRequestError'
    }
}
