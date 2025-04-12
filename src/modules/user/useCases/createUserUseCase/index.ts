import { ICreateUserUseCase } from '@/modules/user/useCases/createUserUseCase/types'
import { userModel } from '@/modules/user/model';
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
