import { IUser } from '@/types/user'
import { IUpdateByIdUseCase } from './types'
import { userModel } from '../../model';
import { UserSchema } from '@/schemas';


export class UpdateByIdUseCase implements IUpdateByIdUseCase {
    id: string;
    value: Partial<UserSchema>;
    userModel = userModel;

    prepare = (id: string, value: Partial<UserSchema>): void => {
        this.id = id
        this.value = value
    }
    execute = async (): Promise<UserSchema> => {
        return this.userModel.updateOne({ _id: this.id }, { $set: this.value }) as unknown as UserSchema
    }
}
