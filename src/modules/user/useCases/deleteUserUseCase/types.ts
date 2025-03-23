import { IUser } from '../../../../types/user'
export interface IDeleteUserUseCase {
    prepare: (id: string) => void
    execute: () => Promise<IUser>
}
