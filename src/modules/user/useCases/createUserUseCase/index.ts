import { IUser } from '@/types/user'
import { ICreateUserUseCase } from './types'
import { userModel } from '../../model';


export class CreateUserUseCase implements ICreateUserUseCase {
    user: Partial<IUser>;
    userModel = userModel;

    prepare = (user: Partial<IUser>): void => {
        this.user = user
    }
    execute = async (): Promise<IUser> => {
        return await this.userModel.create(this.user)
    }
}
