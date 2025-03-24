import { IFindAllUsersUseCase } from './types'
import { userModel } from '../../model';
import { UserSchema } from '@/schemas';


export class FindAllUsersUseCase implements IFindAllUsersUseCase {
    user: Partial<UserSchema>;
    userModel = userModel;

    execute = async (): Promise<UserSchema[]> => {
        return await this.userModel.find()
    }
}
