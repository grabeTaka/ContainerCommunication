import { IUser } from '@/types/user'
import { IFindUserByIdUseCase } from './types'
import { userModel } from '../../model';
import { UserSchema } from '@/schemas';


export class FindUserByIdUseCase implements IFindUserByIdUseCase {
    id: string;
    userModel = userModel;

    prepare(id: string): void {
        this.id = id
    }
    
    execute = async (): Promise<UserSchema> => {
        return this.userModel.findById(this.id)
    }
}
