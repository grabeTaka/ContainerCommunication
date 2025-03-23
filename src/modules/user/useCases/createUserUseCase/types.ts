import { IUser } from '../../../../types/user'
export interface ICreateUserUseCase {
    prepare: (user: IUser) => void
    execute: () => Promise<IUser>
}
