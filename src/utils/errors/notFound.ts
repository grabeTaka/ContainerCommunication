import { HttpStatusCode } from '@/utils/enums/httpStatusCode'
import { AppError, Options } from '@/utils/errors/app'

export class NotFoundError extends AppError {
    constructor(options: Options) {
        super({
            code: 'not_found',
            statusCode: HttpStatusCode.NOT_FOUND,
            ...options,
        })

        this.name = 'NotFoundError'
    }
}
