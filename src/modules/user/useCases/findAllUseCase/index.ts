import { IUser } from '@/types/user'
import { IFindAllUsersUseCase } from './types'
import { userModel } from '../../model';


export class FindAllUsersUseCase implements IFindAllUsersUseCase {
    user: Partial<IUser>;
    userModel = userModel;

    execute = async (): Promise<IUser[]> => {
        return await this.userModel.find()
    }
}
