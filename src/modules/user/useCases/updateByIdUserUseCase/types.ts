import { IUser } from '../../../../types/user'
export interface IUpdateByIdUseCase {
    prepare: (id: string, value: Partial<IUser>) => void
    execute: () => Promise<IUser>
}
