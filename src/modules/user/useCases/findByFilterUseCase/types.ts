import { IUser } from '../../../../types/user'
export interface IFindByFilterUseCase {
    prepare: (value: string | number, key: string) => void
    execute: () => Promise<IUser[]>
}
