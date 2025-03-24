import { IDeleteUserUseCase } from './types'
import { userModel } from '../../model';
import { UserSchema } from '@/schemas';


export class DeleteUserUseCase implements IDeleteUserUseCase {
    id: string;
    userModel = userModel;

    prepare = (id: string): void => {
        this.id = id
    }
    execute = async (): Promise<UserSchema> => {
        return this.userModel.deleteOne({ _id: this.id }) as unknown as UserSchema
    }
}
