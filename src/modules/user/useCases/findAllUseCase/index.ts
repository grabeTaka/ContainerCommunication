import { IFindAllUsersUseCase } from '@/modules/user/useCases/findAllUseCase/types'
import { userModel } from '@/modules/user/model';
import { UserSchema } from '@/schemas';


export class FindAllUsersUseCase implements IFindAllUsersUseCase {
    user: Partial<UserSchema>;
    userModel = userModel;

    execute = async (): Promise<UserSchema[]> => {
        return await this.userModel.find()
    }
}
