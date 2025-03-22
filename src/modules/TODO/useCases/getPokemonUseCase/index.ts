import { TodoUseUsecaseInterface } from './index.d'

export class TodoUseCase implements TodoUseUsecaseInterface {
    constructor() {}
    prepare = (name: string): void => {}
    execute = async () => {}
}
