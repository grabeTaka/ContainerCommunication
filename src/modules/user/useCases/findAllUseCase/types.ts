import { IUser } from '../../../../types/user'
export interface IFindAllUsersUseCase {
    execute: () => Promise<IUser[]>
}
