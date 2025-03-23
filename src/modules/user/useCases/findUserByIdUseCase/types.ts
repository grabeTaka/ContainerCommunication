import { IUser } from '../../../../types/user'
export interface IFindUserByIdUseCase {
    prepare(id: string): void
    execute: () => Promise<IUser>
}
