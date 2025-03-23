import { IUser } from '@/types/user'
import { IUpdateByIdUseCase } from './types'
import { userModel } from '../../model';


export class UpdateByIdUseCase implements IUpdateByIdUseCase {
    id: string;
    value: Partial<IUser>;
    userModel = userModel;

    prepare = (id: string, value: Partial<IUser>): void => {
        this.id = id
        this.value = value
    }
    execute = async (): Promise<IUser> => {
        return this.userModel.updateOne({ _id: this.id }, { $set: this.value }) as unknown as IUser
    }
}
