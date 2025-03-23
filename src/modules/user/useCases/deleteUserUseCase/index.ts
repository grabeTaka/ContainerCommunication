import { IUser } from '@/types/user'
import { IDeleteUserUseCase } from './types'
import { userModel } from '../../model';


export class DeleteUserUseCase implements IDeleteUserUseCase {
    id: string;
    userModel = userModel;

    prepare = (id: string): void => {
        this.id = id
    }
    execute = async (): Promise<IUser> => {
        return this.userModel.deleteOne({ _id: this.id }) as unknown as IUser
    }
}
