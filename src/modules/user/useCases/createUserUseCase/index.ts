import { IUser } from '@/types/user'
import { ICreateUserUseCase } from './types'
import { userModel } from '../../model';
import { UserSchema } from '@/schemas';


export class CreateUserUseCase implements ICreateUserUseCase {
    user: Partial<UserSchema>;
    userModel = userModel;

    prepare = (user: Partial<UserSchema>): void => {
        this.user = user
    }
    execute = async (): Promise<UserSchema> => {
        return await this.userModel.create(this.user)

    }
}
