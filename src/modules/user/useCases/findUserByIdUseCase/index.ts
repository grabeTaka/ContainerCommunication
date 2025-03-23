import { IUser } from '@/types/user'
import { IFindUserByIdUseCase } from './types'
import { userModel } from '../../model';


export class FindUserByIdUseCase implements IFindUserByIdUseCase {
    id: string;
    userModel = userModel;

    prepare(id: string): void {
        this.id = id
    }
    
    execute = async (): Promise<IUser> => {
        return this.userModel.findById(this.id)
    }
}
