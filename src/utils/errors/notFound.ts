import { HttpStatusCode } from '../../utils/enums/httpStatusCode'

import { AppError, Options } from './app'

/**
 * Classe responsável por retornar o erro de não encontrado
 */
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
